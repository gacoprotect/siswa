<?php

namespace App\Http\Controllers;

use App\Helpers\DataValidator;
use App\Models\Datmas\Indentitas;
use App\Models\Spp\Tsalpenrut;
use App\Models\Trx\PaidBill;
use App\Models\Trx\Ttrx;
use App\Models\Trx\Ttrxlog;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
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
    public static function createTrx(array $data): ?Ttrx
    {
        try {
            $v = DataValidator::ttrx($data);
            // logger('Input transaksi', $v);

            return DB::connection('mai4')->transaction(function () use ($v) {
                $trx = Ttrx::create($v);

                if (($v['for'] ?? null) === 'tagihan' && $v['type'] === "payment" && (int)$v['pt_id'] === 3) {
                    // logger('Memasuki blok createPaidBill', $v);

                    $pb = self::createPaidBill([
                        'trx_id' => $trx->id,
                        'order_id' => $trx->order_id,
                        'nouid' => $trx->nouid,
                        'spr_id' => $trx->spr_id,
                        'jen1' => $trx->jen1,
                        'amount' => abs($v['amount']),
                        'paid_at' => now(),
                        'note' => $trx->note,
                        'sta' => 1,
                        'created_by' => 1
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
    public static function createPaidBill(array $data): ?PaidBill
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
    public static function createBill(array $data): ?Tsalpenrut
    {
        try {
            $v = DataValidator::tsalpenrut($data);

            return DB::connection('mai3')->transaction(function () use ($v) {
                return Tsalpenrut::create($v);
            });
        } catch (\Throwable $e) {
            logger()->error('createBill: #Gagal membuat Tagihan', [
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
                    $sprExists = Tsalpenrut::whereIn('id', $transaction->spr_id)->exists();
                    if (!$sprExists) {
                        throw new \Exception("SPR record not found");
                    }

                    $pb = self::createPaidBill([
                        'trx_id' => $transaction->id,
                        'order_id' => $transaction->order_id,
                        'nouid' => $transaction->nouid,
                        'spr_id' => $transaction->spr_id,
                        'jen1' => $transaction->jen1,
                        'amount' => abs($transaction->amount),
                        'paid_at' => now(),
                        'note' => $transaction->note,
                        'sta' => 1,
                        'created_by' => 1
                    ]);

                    if (!$pb) {
                        logger('Gagal createPaidBill', ['data' => $transaction->toArray()]);
                        throw new \RuntimeException("Failed to create paid bill");
                    }

                    Tsalpenrut::whereIn('id', $transaction->spr_id)->update(['sta' => 2]);
                }
            } else {
                $log = $this->createTrxLog($dataLog);
                if (!$log) {
                    throw new \Exception("Transaksi gagal : " . json_encode($dataLog));
                }
            }

            $transaction->update(['status' => 'success']);

            DB::commit();
            DB::connection('mai2')->commit();
            DB::connection('mai3')->commit();

            return back()->with([
                'success' => true,
                'message' => 'Simulasi pembayaran berhasil',
                'transaction' => $transaction->fresh(),
            ]);
        } catch (\Exception $e) {
            logger()->error('Simulasi pembayaran gagal', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            if ($mai3DbTransaction) DB::connection('mai3')->rollBack();
            if ($mai2DbTransaction) DB::connection('mai2')->rollBack();
            if ($mainDbTransaction) DB::rollBack();

            return back()->with([
                'success' => false,
                'message' => 'Simulasi pembayaran gagal: ' . $e->getMessage(),
            ])->withInput();
        }
    }

    public function paymentInstruction(Request $req, $nouid, $orderId)
    {
        $validated = $req->validate([
            'type' => 'sometimes|string|in:payment,topup',
            'tah' => 'sometimes|string',
            'month' => 'sometimes|string',
            'spr' => 'sometimes|array',
            'spr.*' => 'sometimes|integer',
        ]);

        $identitas = Indentitas::with('siswa')
            ->where('nouid', $nouid)
            ->firstOrFail();

        $transaction = Ttrx::where('order_id', $orderId)
            ->where('nouid', $nouid)
            ->firstOrFail();

        $transactionData = $transaction->toArray();

        // Tambahan parameter untuk instruction page
        $transactionData['spr'] = $validated['spr'] ?? [];
        $transactionData['tah'] = $validated['tah'] ?? null;
        $transactionData['month'] = $validated['month'] ?? null;
        $transactionData['type'] = $validated['type'] ?? $transaction->type;
        $transactionData['amount'] = abs($transaction->amount);
        $transactionData['formatted_amount'] = number_format(abs($transaction->amount), 0, ',', '.'); // jika butuh

        return Inertia::render('PaymentInstruction', [
            'nouid' => $nouid,
            'order_id' => $orderId,
            'transaction' => $transactionData,
            'siswa' => $identitas->siswa,
        ]);
    }

    public function cancel(Request $request, $nouid)
    {
        try {
            $validated = $request->validate([
                'order_id' => 'required|string|max:255',
                'nouid' => 'required|string|max:50|exists:mai4.ttrx,nouid'
            ]);

            $transaction = Ttrx::where('nouid', $nouid)
                ->where('order_id', $validated['order_id'])
                ->firstOrFail();

            if (!in_array($transaction->status, ['pending', 'waiting'])) {
                throw new \Exception('Hanya transaksi dengan status pending/waiting yang bisa dibatalkan');
            }

            DB::transaction(function () use ($transaction, $nouid) {
                $updateResult = $transaction->update([
                    'status' => 'canceled',
                    'failure_message' => 'Order dibatalkan oleh user nouid: ' . $nouid,
                    'updated_at' => now()
                ]);

                if (!$updateResult) {
                    throw new \Exception('Gagal memperbarui status transaksi');
                }

                // // Optional: Add transaction log
                // Ttrxlog::create([
                //     'trx_id' => $transaction->id,
                //     'action' => 'cancel',
                //     'description' => 'Transaksi dibatalkan oleh user',
                //     'created_by' => auth()->id() ?? 1
                // ]);
            });

            return redirect()
                ->route('siswa.index', ['nouid' => $nouid])
                ->with(['success' => true, 'message' => 'Transaksi berhasil dibatalkan']);
        } catch (ValidationException $e) {
            return back()
                ->withErrors($e->validator)
                ->withInput();
        } catch (ModelNotFoundException $e) {
            logger()->error('Transaction not found', [
                'nouid' => $nouid,
                'order_id' => $request->order_id
            ]);
            return back()->withErrors(['message' => 'Transaksi tidak ditemukan']);
        } catch (\Exception $e) {
            logger()->error('Transaction cancellation failed', [
                'error' => $e->getMessage(),
                'nouid' => $nouid,
                'order_id' => $request->order_id,
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors(['message' => 'Gagal membatalkan transaksi: ' . $e->getMessage()]);
        }
    }
}
