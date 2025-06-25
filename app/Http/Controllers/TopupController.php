<?php

namespace App\Http\Controllers;

use App\Models\Indentitas; // Corrected model name (assuming typo fix)
use App\Models\Transaction;
use App\Services\MidtransService;
use Illuminate\Http\Request;
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
    public function paymentInstruction($nouid, $orderId)
    {
        $identitas = Indentitas::where('nouid', $nouid)->firstOrFail();
        $transaction = Transaction::where('order_id', $orderId)
            ->where('nouid', $nouid)
            ->firstOrFail();
        return Inertia::render('PaymentInstruction', [
            'nouid' => $nouid,
            'order_id' => $orderId,
            'transaction' => $transaction,
            'siswa' => $identitas->siswa()->first(),
        ]);
    }

    public function simulate(Request $request, $nouid)
    {
        $request->validate([
            'va_number' => 'required|numeric|',
            'order_id' => ['required', 'string'],
            'nouid' => ['required', 'string'],
        ]);
        $transaction = Transaction::where('nouid', $nouid)
            ->where('order_id', $request->order_id)
            ->where('va_number', $request->va_number)
            ->firstOrFail();

        $transaction->update([
            'status' => 'success',
        ]);

        return back()->with([
            'message' => 'Payment simulation successful',
            'transaction' => $transaction->fresh()
        ]);
    }
}
