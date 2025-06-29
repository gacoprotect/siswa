<?php

namespace App\Http\Controllers;

use App\Models\Datmas\Indentitas; // Corrected model name (assuming typo fix)
use App\Models\Trx\Ttrx;
use App\Models\Spp\Tsalpenrut;
use App\Services\MidtransService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Exists;
use Illuminate\Validation\ValidationException;
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
            if (isset($transaction) && $transaction instanceof \App\Models\Trx\Ttrx) {
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
}
