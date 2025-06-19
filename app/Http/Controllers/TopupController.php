<?php

namespace App\Http\Controllers;

use App\Models\Identitas;
use App\Models\Indentitas;
use App\Models\Transaction;
use App\Services\MidtransService;
use Illuminate\Http\Request;
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
            'bank' => 'required|string',
            'amount' => 'required|numeric|min:10000',
            'phone' => 'required|string',
        ]);

        $identitas = Indentitas::where('nouid', $nouid)->firstOrFail();
        $siswa = $identitas->siswa()->first();

        $midtrans = new MidtransService();

        $orderId = 'topup-' . uniqid();
        
        $params = [
            'payment_type' => 'bank_transfer',
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $request->amount,
            ],
            'bank_transfer' => [
                'bank' => $request->bank,
            ],
            'customer_details' => [
                'first_name' => $siswa->nama ?? $identitas->nama,
                'email' => $identitas->email,
                'phone' => $request->phone,
            ],
        ];

        try {
            $transaction = Transaction::create([
                'identitas_id' => $identitas->id,
                'siswa_id' => $siswa->id ?? null,
                'order_id' => $orderId,
                'nouid' => $nouid,
                'amount' => $request->amount,
                'bank' => $request->bank,
                'phone' => $request->phone,
                'status' => 'pending',
                'payment_type' => 'bank_transfer',
            ]);

            $response = $midtrans->chargeBankTransfer($params);
            
            $transaction->update([
                'payment_data' => json_encode($response),
                'va_number' => $response->va_numbers[0]->va_number ?? null,
                'expiry_time' => $response->expiry_time ?? null,
            ]);

            return response()->json([
                'success' => true,
                'data' => $response,
            ]);
        } catch (\Exception $e) {
            if (isset($transaction)) {
                $transaction->update([
                    'status' => 'failed',
                    'failure_message' => $e->getMessage(),
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function paymentInstruction($nouid, Request $request)
    {
        $request->validate([
            'id' => 'required|string',
        ]);

        $identitas = Indentitas::where('nouid', $nouid)->firstOrFail();
        $transaction = Transaction::where('order_id', $request->id)
            ->where('nouid', $nouid)
            ->firstOrFail();

        return Inertia::render('PaymentInstruction', [
            'id' => $request->id,
            'transaction' => $transaction,
            'siswa' => $identitas->siswa()->first(),
        ]);
    }
}