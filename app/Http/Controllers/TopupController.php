<?php

namespace App\Http\Controllers;

use App\Models\Datmas\Indentitas;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class TopupController extends Controller
{
    /**
     * Menampilkan halaman topup
     */
    public function index($nouid)
    {
        try {
            // Validasi nouid
            if (empty($nouid) || ! is_string($nouid)) {
                abort(400, 'Parameter nouid tidak valid');
            }

            $identitas = Indentitas::with('siswa')
                ->where('nouid', $nouid)
                ->firstOrFail();

            $siswa = $identitas->siswa;

            if (! $siswa) {
                abort(404, 'Data siswa tidak ditemukan');
            }

            $va = $this->trx->getVa($nouid);

            return Inertia::render('Transaction/Topup', [
                'va' => $va,
                'nouid' => $nouid,
                'siswa' => $siswa,
            ]);

        } catch (ModelNotFoundException $e) {
            Log::error('Topup index - Data tidak ditemukan', [
                'nouid' => $nouid,
                'error' => $e->getMessage(),
            ]);
            abort(404, 'Data tidak ditemukan');
        } catch (\Exception $e) {
            Log::error('Topup index - Error tidak terduga', [
                'nouid' => $nouid,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            abort(500, 'Terjadi kesalahan sistem');
        }
    }

    /**
     * Memproses charge topup
     */
    public function charge(Request $request, $nouid)
    {
        try {
            // Validasi parameter nouid
            if (empty($nouid) || ! is_string($nouid)) {
                return back()->withErrors([
                    'message' => 'Parameter nouid tidak valid',
                ])->withInput();
            }

            // Validasi request data
            $validated = $request->validate([
                'amount' => [
                    'required',
                    'numeric',
                    'min:10000',
                    'max:10000000', // Batas maksimal 10 juta
                ],
                'va_number' => [
                    'required',
                    'numeric',
                    'digits_between:10,20',
                ],
            ], [
                'amount.required' => 'Jumlah topup wajib diisi',
                'amount.numeric' => 'Jumlah topup harus berupa angka',
                'amount.min' => 'Jumlah topup minimal Rp 10.000',
                'amount.max' => 'Jumlah topup maksimal Rp 10.000.000',
                'va_number.required' => 'Nomor VA wajib diisi',
                'va_number.numeric' => 'Nomor VA harus berupa angka',
                'va_number.digits_between' => 'Nomor VA harus 10-20 digit',
            ]);

            // Cek apakah ada transaksi pending
            $this->checkPendingTransaction($nouid);

            // Proses topup dalam transaction database
            $topup = DB::transaction(function () use ($validated, $nouid) {
                return $this->trx->topup($validated, $nouid);
            });

            if (! $topup || ! isset($topup['data']['orderId'])) {
                throw new \Exception('Gagal membuat transaksi topup');
            }

            Log::info('Topup berhasil dibuat', [
                'nouid' => $nouid,
                'orderId' => $topup['data']['orderId'],
                'amount' => $validated['amount'],
            ]);

            return redirect()->route('payment.instruction', [
                'type' => 'topup',
                'nouid' => $nouid,
                'orderId' => $topup['data']['orderId'],
            ]);

        } catch (ValidationException $e) {
            Log::warning('Topup validation failed', [
                'nouid' => $nouid,
                'errors' => $e->errors(),
                'input' => $request->except(['_token']),
            ]);

            return back()->withErrors($e->errors())
                ->withInput()
                ->withMessage(['message' => 'Validasi data gagal. Silakan periksa kembali input Anda.']);

        } catch (\Illuminate\Database\QueryException $e) {
            Log::error('Topup database error', [
                'nouid' => $nouid,
                'error' => $e->getMessage(),
                'sql' => $e->getSql() ?? 'N/A',
            ]);

            return back()->withErrors([
                'message' => 'Terjadi kesalahan database. Silakan coba lagi.',
            ])->withInput();

        } catch (\Exception $e) {
            Log::error('Topup failed - Unexpected error', [
                'nouid' => $nouid,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'input' => $request->except(['_token']),
            ]);

            $errorMessage = config('app.debug')
                ? 'Proses Pembayaran Gagal: '.$e->getMessage()
                : 'Proses Pembayaran Gagal. Silakan coba lagi atau hubungi administrator.';

            return back()->withErrors([
                'message' => $errorMessage,
            ])->withInput();
        }
    }

    /**
     * Cek apakah ada transaksi pending
     */
    private function checkPendingTransaction(string $nouid): void
    {
        try {
            $pendingTransaction = \App\Models\Saving\Ttrx::where('nouid', $nouid)
                ->where('status', 'pending')
                ->where('expiry_time', '>', now())
                ->where('type', 'topup')
                ->first();

            if ($pendingTransaction) {
                throw new \Exception('Masih ada transaksi topup yang sedang diproses. Harap selesaikan atau batalkan transaksi sebelumnya terlebih dahulu.');
            }
        } catch (\Exception $e) {
            Log::warning('Pending transaction check failed', [
                'nouid' => $nouid,
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }
}
