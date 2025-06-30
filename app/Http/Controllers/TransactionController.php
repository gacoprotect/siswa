<?php

namespace App\Http\Controllers;

use App\Helpers\DataValidator;
use App\Models\Datmas\Indentitas;
use App\Models\Spp\Tsalpenrut;
use App\Models\Trx\PaidBill;
use App\Models\Trx\Ttrx;
use App\Models\Trx\Ttrxlog;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request, $nouid)
    {
        if (!Auth::check()) {
            return redirect()->intended(route('siswa.index', $nouid));
        }

        Ttrx::where('nouid', $nouid)
            ->where('status', 'pending')
            ->where('expiry_time', '<', Carbon::now())
            ->update([
                'status'          => 'failed',
                'failure_message' => 'Pembayaran melebihi batas waktu.',
                'updated_at'      => Carbon::now(),
            ]);


        $transactions = Ttrx::where('nouid', $nouid)
            ->orderBy('created_at', 'desc')->get();

        return Inertia::render('Transaction/History', [
            'nouid' => $nouid,
            'transactions' => $transactions,
        ]);
    }

    public function show($nouid, $orderId)
    {
        $transaction = Ttrx::where('order_id', $orderId)
            ->where('nouid', $nouid)
            ->where('user_id', auth('siswa')->id())
            ->firstOrFail();

        return Inertia::render('Transaction/Detail', [
            'transaction' => $transaction,
        ]);
    }

    public function checkStatus($orderId)
    {
        $transaction = Ttrx::where('order_id', $orderId)
            ->where('user_id', auth('siswa')->id())
            ->firstOrFail();

        // Implementasi pengecekan status ke Midtrans
        // ...

        return response()->json([
            'status' => $transaction->status,
            'updated_at' => $transaction->updated_at,
        ]);
    }

    public function handleCallback(Request $request)
    {
        $payload = $request->all();

        // Verifikasi signature key (penting untuk keamanan)
        $signatureKey = hash(
            'sha512',
            $payload['order_id'] .
                $payload['status_code'] .
                $payload['gross_amount'] .
                config('services.midtrans.server_key')
        );

        if ($signatureKey !== $payload['signature_key']) {
            return response()->json(['message' => 'Invalid signature'], 403);
        }

        $orderId = $payload['order_id'];
        $transactionStatus = $payload['transaction_status'];
        $fraudStatus = $payload['fraud_status'] ?? null;

        // Cari transaksi
        $transaction = Ttrx::where('order_id', $orderId)->first();

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        // Update status berdasarkan callback
        if ($transactionStatus == 'capture') {
            if ($fraudStatus == 'accept') {
                $transaction->status = 'success';
            }
        } elseif ($transactionStatus == 'settlement') {
            $transaction->status = 'success';
        } elseif ($transactionStatus == 'pending') {
            $transaction->status = 'pending';
        } elseif ($transactionStatus == 'deny' || $transactionStatus == 'expire' || $transactionStatus == 'cancel') {
            $transaction->status = 'failed';
        }

        $transaction->save();

        return response()->json(['message' => 'Callback processed']);
    }


    public static function createTrx(array $data): ?Ttrx
    {
        try {
            $v = DataValidator::ttrx($data);
            logger('Input transaksi', $v);

            return DB::connection('mai4')->transaction(function () use ($v) {
                $trx = Ttrx::create($v);

                if (($v['for'] ?? null) === 'tagihan' && $v['type'] === "payment" && (int)$v['pt_id'] === 3) {
                    logger('Memasuki blok createPaidBill', $v);

                    $pb = self::createPaidBill([
                        'trx_id' => $trx->id, // pakai ID dari hasil create
                        'orderId' => $trx->order_id,
                        'nouid' => $trx->nouid,
                        'spr_id' => $trx->spr_id,
                        'jen1' => $trx->jen1,
                        'amount' => $trx->amount,
                        'paid_at' => now(),
                        'note' => $trx->note,
                        'sta' => 1,
                        'created_by' => $trx->created_by
                    ]);

                    if (!$pb) {
                        logger('Gagal createPaidBill', ['data' => $trx->toArray()]);
                        throw new \RuntimeException("Failed to create paid bill");
                    }
                }

                return $trx;
            });
        } catch (\Throwable $e) {
            logger()->error('Gagal membuat transaksi', [
                'error' => $e->getMessage(),
                'data' => $data,
            ]);
            return null;
        }
    }

    public static function createTrxLog(array $data): ?Ttrxlog
    {
        try {
            $v = DataValidator::ttrxlog($data);

            return DB::connection('mai4')->transaction(function () use ($v) {
                return Ttrxlog::create($v);
            });
        } catch (\Throwable $e) {
            logger()->error('Gagal membuat log transaksi', [
                'error' => $e->getMessage(),
                'data' => $data,
            ]);
            return null;
        }
    }
    public static function createPaidBill(array $data): ?Ttrxlog
    {
        try {
            $v = DataValidator::paidbill($data);

            return DB::connection('mai4')->transaction(function () use ($v) {
                return PaidBill::create($v);
            });
        } catch (\Throwable $e) {
            logger()->error('createPaidBill: #Gagal membuat Tagihan', [
                'error' => $e->getMessage(),
                'data' => $data,
            ]);
            return null;
        }
    }


    public function simulateVa(Request $request, $nouid)
    {
        $validated = $request->validate([
            'va_number' => 'required|numeric',
            'order_id' => 'required|string',
        ]);

        // Inisialisasi flag transaksi
        $mainDbTransaction = false;
        $mai2DbTransaction = false;
        $mai3DbTransaction = false;

        try {
            DB::beginTransaction();
            $mainDbTransaction = true;

            DB::connection('mai2')->beginTransaction();
            $mai2DbTransaction = true;

            DB::connection('mai3')->beginTransaction();
            $mai3DbTransaction = true;

            $transaction = Ttrx::where('nouid', $nouid)
                ->where('order_id', $validated['order_id'])
                ->where('va_number', $validated['va_number'])
                ->firstOrFail();

            $currentBalance = Ttrxlog::where('nouid', $nouid)
                ->orderByDesc('id')
                ->value('ab') ?? 0;

            $bulid = getidTagihan('bulid', $validated['order_id']);
            $tah = getidTagihan('tah', $validated['order_id']);

            $identitas = Indentitas::with(['siswa', 'tagihan' => function ($q) use ($bulid, $tah) {
                $q->where('bulid', $bulid)->where('tah', $tah);
            }])->where('nouid', $nouid)->firstOrFail();

            $bb = $currentBalance;
            $ab = match ($transaction->type) {
                'topup', 'refund' => $bb + $transaction->amount,
                'payment', 'withdraw' => $bb - $transaction->amount,
                default => throw new \Exception("Unknown transaction type : " . $transaction->type),
            };
            $action = match ($transaction->type) {
                'topup', 'refund' => 'increase',
                'payment', 'withdraw' => 'decrease',
            };

            $dataLog = [
                'nouid' => $nouid,
                'nis' => $identitas->siswa->nis,
                'bb' => $bb,
                'ab' => $ab,
                'amount' => $transaction->amount,
                'trx_id' => $transaction->id,
                'action' => $action,
                'description' => $transaction->note,
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            if ($transaction->type === 'payment') {
                if ($transaction->spr_id) {
                    $sprExists = Tsalpenrut::where('id', $transaction->spr_id)->exists();
                    if (!$sprExists) {
                        throw new \Exception("SPR record not found");
                    }

                    Tsalpenrut::where('id', $transaction->spr_id)->update(['sta' => 2]);
                }
            }

            // Catat log dan update status transaksi
            $log = $this->createTrxLog($dataLog);
            if (!$log) {
                throw new \Exception("Transaksi gagal : " . $log);
            }
            $transaction->update(['status' => 'success']);

            // Commit semua DB
            DB::commit();
            DB::connection('mai2')->commit();
            DB::connection('mai3')->commit();

            return back()->with([
                'success' => true,
                'message' => 'Simulasi pembayaran berhasil',
                'transaction' => $transaction->fresh(),
            ]);
        } catch (\Exception $e) {
            logger()->error('Payment simulation failed: ' . $e->getMessage());

            if ($mai3DbTransaction) DB::connection('mai3')->rollBack();
            if ($mai2DbTransaction) DB::connection('mai2')->rollBack();
            if ($mainDbTransaction) DB::rollBack();

            return back()->with([
                'success' => false,
                'message' => 'Simulasi pembayaran gagal: ' . $e->getMessage(),
            ])->withInput();
        }
    }
}
