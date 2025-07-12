<?php

namespace App\Http\Controllers;

use App\Models\Datmas\Indentitas; // Corrected model name (assuming typo fix)
use App\Models\Saving\Ttrx;
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

        try {
            $transaction = DB::connection('mai4')->transaction(function () use ($nouid, $siswa, $orderId, $request) {
                $trx = TransactionController::createTrx([
                    'phone'        => $siswa->tel,
                    'nouid'        => $nouid,
                    'order_id'     => $orderId,
                    'amount'       => $request->amount,
                    'status'       => 'pending',
                    'type'         => 'topup',
                    'pt_id'        => 1,
                    'va_number'    => $request->va_number,
                    'expiry_time'  => now()->addHours(6),
                    'created_by'    => 1
                ]);

                if (!$trx) {
                    throw new \Exception("Transaksi Gagal");
                }

                return $trx;
            });

            return redirect()->route('payment.instruction', [
                'tah'     => date('Y'),
                'month'   => \Carbon\Carbon::now()->locale('id')->translatedFormat('F'),
                'type'    => 'topup',
                'nouid'   => $nouid,
                'orderId' => $orderId
            ]);
        } catch (\Throwable $e) {
            logger()->error('Topup failed: ' . $e->getMessage());

            // Jika transaksi sempat dibuat tapi gagal, set status = failed
            if (isset($transaction) && $transaction instanceof \App\Models\Saving\Ttrx) {
                $transaction->update([
                    'status' => 'failed',
                    'failure_message' => $e->getMessage(),
                ]);
            }

            return back()->withErrors([
                'message' => 'Proses Pembayaran Gagal: ' . $e->getMessage(),
            ])->withInput();
        }
    }

   
}
