<?php

namespace App\Http\Controllers;

use App\Models\Datmas\Indentitas; // Corrected model name (assuming typo fix)
use App\Models\Trx\Ttrx;
use App\Models\Spp\Tsalpenrut;
use App\Models\Trx\Tbalance;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Exists;
use Inertia\Inertia;

class TopupController extends Controller
{
    public function index($nouid)
    {
        $identitas = Indentitas::where('nouid', $nouid)->firstOrFail();
        $siswa = $identitas->siswa()->first();

        return Inertia::render('Topup', [
            'nouid' => $nouid,
            'siswa' => $siswa,
        ]);
    }

    public function charge(Request $request, $nouid)
    {
        $request->validate([
            'amount' => 'required|numeric|min:10000',
            'va_number' => 'required|numeric|unique:mai4.ttrx,va_number',
        ]);

        $identitas = Indentitas::where('nouid', $nouid)->firstOrFail();
        $hasPending = Ttrx::where('nouid', $nouid)
            ->where('status', 'pending')
            ->where('expiry_time', '>', now())
            ->exists();

        if ($hasPending) {
            return back()->with([
                'success' => false,
                'message' => 'Masih ada transaksi yang sedang diproses. Harap selesaikan atau batalkan transaksi sebelumnya terlebih dahulu.',
            ]);
        }
        $siswa = $identitas->siswa()->first();
        $orderId = 'topup-' . uniqid();
        DB::transaction(function () use ($nouid, $siswa, $orderId, $request) {
            try {
                $transaction = Ttrx::create([
                    'phone' => $siswa->tel,
                    'nouid' => $nouid,
                    'order_id' => $orderId,
                    'amount' => $request->amount,
                    'status' => 'pending',
                    'type' => 'topup',
                    'pt_id' => 1,
                    'va_number' => $request->va_number,
                    'expiry_time' => now()->addMinutes(6 * 60),
                ]);

                return redirect()->intended(route('payment.instruction', [
                    'tah' => date('Y'),
                    'month' => Carbon::now()->locale('id')->translatedFormat('F'),
                    'type' => 'topup',
                    'nouid' => $nouid,
                    'orderId' => $orderId
                ], absolute: false));
            } catch (\Exception $e) {
                logger('Topup failed: ' . $e->getMessage());

                if (isset($transaction)) {
                    $transaction->update([
                        'status' => 'failed',
                        'failure_message' => $e->getMessage(),
                    ]);
                }

                return back()->with([
                    'success' => false,
                    'message' => 'Proses Pembayaran Gagal. Silakan coba lagi',
                ])->withErrors([
                    'message' => $e
                ]);
            }
        });
    }
    public function cancel(Request $request, $nouid)
    {
        $request->validate([
            'order_id' => ['required', 'string'],
            'nouid' => ['required', 'string'],
        ]);

        $transaction = Ttrx::where('nouid', $nouid)
            ->where('order_id', $request->order_id)
            ->first();

        if (!$transaction) {
            return back()->withErrors(['message' => 'Transaksi tidak ditemukan.']);
        }

        // Fixed logic error in status check
        if ($transaction->status !== 'pending') {
            return back()->withErrors(['message' => 'Hanya transaksi dengan status pending yang bisa dibatalkan.']);
        }

        DB::transaction(function () use ($transaction, $nouid) {
            $transaction->update([
                'status' => 'canceled',
                'failure_message' => 'Order dibatalkan oleh user nouid: ' . $nouid
            ]);
        });

        return redirect()
            ->intended(route('siswa.index', ['nouid' => $nouid]))
            ->with('success', 'Transaksi berhasil dibatalkan');
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


    public function simulate(Request $request, $nouid)
    {
        $validated = $request->validate([
            'va_number' => 'required|numeric',
            'order_id' => 'required|string',
        ]);

        // Inisialisasi flag untuk mengetahui apakah transaction aktif
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



            if ($transaction->type === 'payment') {
                $bulid = getidTagihan('bulid', $validated['order_id']);
                $tah = getidTagihan('tah', $validated['order_id']);
                $currentBalance = Tbalance::where('nouid', $nouid)->value('balance');

                if ($currentBalance < $transaction->amount) {
                    throw new \Exception("Saldo tidak mencukupi untuk pembayaran.");
                }

                

                $identitas = Indentitas::with(['siswa', 'tagihan' => function ($q) use ($bulid, $tah) {
                    $q->where('bulid', $bulid)
                        ->where('tah', $tah);
                }])->where('nouid', $nouid)->firstOrFail();

                // Validate all SPRs exist
                $sprDetails = Tsalpenrut::whereIn('id', $validated['spr'])
                    ->get(['id', 'ket', 'jum']);

                if ($sprDetails->count() !== count($validated['spr'])) {
                    throw new \Exception("Some SPR records not found");
                }

                Tsalpenrut::whereIn('id', $validated['spr'])
                    ->update(['sta' => 2]);

                $currentDate = now()->format('Y-m-d');
                $tprId = DB::connection('mai3')->table('ttpenrut')->insertGetId([
                    'nopr' => 'PR' . date('Y') . str_pad($transaction->id, 4, '0', STR_PAD_LEFT),
                    'tgl' => $currentDate,
                    'idsis' => $identitas->siswa->id,
                    'via' => 1,
                    'idkas' => 2,
                    'nova' => null,
                    'ket' => 'Pembayaran via Virtual Account',
                    'jum' => $transaction->amount,
                    'cat' => null,
                    'cet' => 0,
                    'dar' => 0,
                    'sta' => 0,
                    'stapos' => 0,
                    'rev' => 0,
                    'createdby' => 1,
                    'updatedby' => 0,
                ]);

                // Insert payment details
                foreach ($sprDetails as $index => $spr) {
                    DB::connection('mai3')->table('ttpenrut1')->insert([
                        'idpr' => $tprId,
                        'nmr' => $index + 1,
                        'idspr' => $spr->id,
                        'ket' => $spr->ket ?? 'Pembayaran SPR ' . $spr->id,
                        'jum' => $spr->jum ?? $transaction->amount,
                        'idcoa' => 0,
                        'nolai' => null,
                        'salpr' => 0,
                        'sta' => null,
                        'stapos' => 0,
                        'createdby' => 1,
                        'updatedby' => 0,
                    ]);
                }

                Tbalance::where('nouid', $nouid)
                    ->decrement('balance', $transaction->amount);
            } elseif ($transaction->amount === 'topup') {
                Tbalance::where('nouid', $nouid)
                    ->increment('balance', $transaction->amount);
            }
            $transaction->update(['status' => 'success']);
            DB::commit();
            DB::connection('mai2')->commit();
            DB::connection('mai3')->commit();

            return redirect()->back()->with([
                'success' => true,
                'message' => 'Simulasi pembayaran berhasil',
                'transaction' => $transaction->fresh()
            ]);
        } catch (\Exception $e) {
            logger()->error('Payment simulation failed: ' . $e->getMessage());

            // Rollback dengan urutan terbalik dari commit
            if ($mai3DbTransaction) {
                DB::connection('mai3')->rollBack();
            }
            if ($mai2DbTransaction) {
                DB::connection('mai2')->rollBack();
            }
            if ($mainDbTransaction) {
                DB::rollBack();
            }

            return back()->with([
                'success' => false,
                'message' => 'Simulasi pembayaran gagal: ' . $e->getMessage()
            ])->withInput();
        }
    }
}
