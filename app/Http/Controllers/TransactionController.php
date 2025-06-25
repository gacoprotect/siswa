<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request, $nouid)
    {
        if (!Auth::check()) {
            return redirect()->intended(route('siswa.index', $nouid));
        }

        Transaction::where('nouid', $nouid)
            ->where('status', 'pending')
            ->where('expiry_time', '<', Carbon::now())
            ->update([
                'status'          => 'failed',
                'failure_message' => 'Pembayaran melebihi batas waktu.',
                'updated_at'      => Carbon::now(),
            ]);


        $transactions = Transaction::where('nouid', $nouid)
            ->orderBy('created_at', 'desc')->get();

        return Inertia::render('Transaction/History', [
            'nouid' => $nouid,
            'transactions' => $transactions,
        ]);
    }

    public function show($nouid, $orderId)
    {
        $transaction = Transaction::where('order_id', $orderId)
            ->where('nouid', $nouid)
            ->where('user_id', auth('siswa')->id())
            ->firstOrFail();

        return Inertia::render('Transaction/Detail', [
            'transaction' => $transaction,
        ]);
    }

    public function checkStatus($orderId)
    {
        $transaction = Transaction::where('order_id', $orderId)
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
        $transaction = Transaction::where('order_id', $orderId)->first();

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
}
