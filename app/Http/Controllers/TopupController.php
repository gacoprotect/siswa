<?php

namespace App\Http\Controllers;

use App\Models\Indentitas; // Corrected model name (assuming typo fix)
use App\Models\Transaction;
use App\Models\Tsalpenrut;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
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
            'va_number' => 'required|numeric|unique:transactions,va_number',
        ]);

        $identitas = Indentitas::where('nouid', $nouid)->firstOrFail();
        $hasPending = Transaction::where('nouid', $nouid)
            ->where('status', 'pending')
            ->where('expiry_time', '>', now())
            ->exists();

        if ($hasPending) {
            return back()->withErrors([
                'message' => 'Masih ada transaksi yang sedang diproses. Harap selesaikan atau batalkan transaksi sebelumnya terlebih dahulu.',
            ]);
        }
        $siswa = $identitas->siswa()->first();
        $orderId = 'topup-' . uniqid();

        try {
            $transaction = Transaction::create([
                'phone' => $siswa->tel,
                'nouid' => $nouid,
                'order_id' => $orderId,
                'amount' => $request->amount,
                'status' => 'pending',
                'type' => 'topup',
                'payment_type' => 'bank_transfer',
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

            return response()->json([
                'success' => false,
                'message' => 'Payment processing failed. Please try again.',
            ], 500);
        }
    }
    public function cancel(Request $request, $nouid)
    {
        $request->validate([
            'order_id' => ['required', 'string'],
            'nouid' => ['required', 'string'],
        ]);

        $transaction = Transaction::where('nouid', $nouid)
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

        $transaction = Transaction::where('order_id', $orderId)
            ->where('nouid', $nouid)
            ->firstOrFail();

        $transactionData = $transaction->toArray();
        $transactionData['spr'] = $req->spr;
        $transactionData['tah'] = $req->tah;
        $transactionData['month'] = $req->month;
        $transactionData['type'] = $req->type;
        $transactionData['amount'] = abs($transaction->amount);
        $transactionData['formatted_amount'] = abs($transaction->amount);
        return Inertia::render('PaymentInstruction', [
            'nouid' => $nouid,
            'order_id' => $orderId,
            'transaction' => $transactionData,
            'siswa' => $identitas->siswa()->first(),
        ]);
    }

    public function simulate(Request $request, $nouid)
    {
        $validated = $request->validate([
            'va_number' => 'required|numeric',
            'order_id' => 'required|string',
            'type' => 'required|string|in:payment,topup',
            'tah' => 'required_if:type,payment|string|nullable',
            'month' => 'required_if:type,payment|string|nullable',
            'spr' => 'required_if:type,payment|array',
            'spr.*' => 'required_if:type,payment|integer|exists:mysql2.tsalpenrut,id',
            'amount' => 'sometimes|numeric|min:0'
        ]);

        DB::beginTransaction();

        try {
            $transaction = Transaction::where('nouid', $nouid)
                ->where('order_id', $validated['order_id'])
                ->where('va_number', $validated['va_number'])
                ->firstOrFail();

            $transaction->update(['status' => 'success']);

            if ($validated['type'] === 'payment') {
                $bulan = DB::connection('mysql')->table('tbulan')
                    ->where('bul', $validated['month'])
                    ->firstOrFail();

                $identitas = Indentitas::with(['siswa', 'tagihan' => function ($q) use ($bulan, $validated) {
                    $q->where('bulid', $bulan->bulid)
                        ->where('tah', $validated['tah']);
                }])->where('nouid', $nouid)->firstOrFail();

                // Validate all SPRs exist
                $sprDetails = Tsalpenrut::whereIn('id', $validated['spr'])
                    ->get(['id', 'ket', 'jum']);

                if ($sprDetails->count() !== count($validated['spr'])) {
                    throw new \Exception("Some SPR records not found");
                }

                // Update SPR status
                $updatedCount = Tsalpenrut::whereIn('id', $validated['spr'])
                    ->update(['sta' => 2]);

                $currentDate = now()->format('Y-m-d');
                $tprId = DB::connection('mysql2')->table('ttpenrut')->insertGetId([
                    'nopr' => 'PR' . date('Y') . str_pad($transaction->id, 4, '0', STR_PAD_LEFT),
                    'tgl' => $currentDate,
                    'idsis' => $identitas->siswa->id,
                    'via' => 1,
                    'idkas' => 2,
                    'nova' => null,
                    'ket' => 'Pembayaran via Virtual Account',
                    'jum' => $validated['amount'],
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
                    DB::connection('mysql2')->table('ttpenrut1')->insert([
                        'idpr' => $tprId,
                        'nmr' => $index + 1, // Sequential number
                        'idspr' => $spr->id, // Dynamic SPR ID
                        'ket' => $spr->ket ?? 'Pembayaran SPR ' . $spr->id,
                        'jum' => $spr->jum ?? $validated['amount'],
                        'idcoa' => 0,
                        'nolai' => null,
                        'salpr' => 0,
                        'sta' => null,
                        'stapos' => 0,
                        'createdby' =>  1,
                        'updatedby' => 0,
                    ]);
                }
            }

            DB::commit();

            return redirect()->back()->with([
                'success' => true,
                'message' => 'Simulasi pembayaran berhasil',
                'transaction' => $transaction->fresh()
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            logger()->error('Payment simulation failed: ' . $e->getMessage());

            return redirect()->back()->with([
                'success' => false,
                'message' => 'Simulasi pembayaran gagal: ' . $e->getMessage()
            ])->withInput();
        }
    }
}
