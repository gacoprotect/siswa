<?php

namespace App\Services;

use App\Models\Datmas\Indentitas;
use App\Models\Saving\PaidBill;
use App\Models\Saving\Tbank;
use App\Models\Saving\Ttrx;
use App\Models\Spp\Tsalpenrut;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TransactionService
{
    public function getVa(string $nouid): string
    {
        try {
            // Validasi parameter
            if (empty($nouid) || ! is_string($nouid)) {
                throw new \InvalidArgumentException('Parameter nouid tidak valid');
            }

            // Ambil VA code dari bank yang aktif
            $bank = Tbank::where('sta', 1)->first();
            if (! $bank) {
                throw new \Exception('Tidak ada bank yang aktif untuk pembayaran');
            }

            $vaCode = $bank->va_code;
            if (empty($vaCode)) {
                throw new \Exception('VA code bank tidak valid');
            }

            // Ambil data identitas siswa
            $ident = Indentitas::with('siswa')
                ->where('nouid', $nouid)
                ->firstOrFail();

            if (! $ident->siswa) {
                throw new \Exception('Data siswa tidak ditemukan');
            }

            $nis = $ident->siswa->nis;
            if (empty($nis)) {
                throw new \Exception('NIS siswa tidak valid');
            }

            return $vaCode.$nis;
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::error('getVa failed - Data not found', [
                'nouid' => $nouid,
                'error' => $e->getMessage(),
            ]);
            throw new \Exception('Data siswa tidak ditemukan');
        } catch (\Exception $e) {
            Log::error('getVa failed', [
                'nouid' => $nouid,
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    private function toLocaleNumber(string $number): string
    {
        try {
            // Validasi input
            if (empty($number) || ! is_string($number)) {
                throw new \InvalidArgumentException('Parameter number tidak valid');
            }

            // Hapus semua karakter non-digit
            $cleanedNumber = preg_replace('/\D/', '', $number);

            if (empty($cleanedNumber)) {
                throw new \InvalidArgumentException('Nomor telepon tidak valid');
            }

            // Konversi format 62 ke 0
            $localNumber = preg_replace('/^(62)/', '0', $cleanedNumber);

            return $localNumber;
        } catch (\Exception $e) {
            Log::error('toLocaleNumber failed', [
                'input' => $number,
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    public function topup(array $data, string $nouid): array
    {
        try {
            // Validasi input
            if (empty($nouid) || ! is_string($nouid)) {
                throw new \InvalidArgumentException('Parameter nouid tidak valid');
            }

            if (empty($data) || ! isset($data['amount']) || ! isset($data['va_number'])) {
                throw new \InvalidArgumentException('Data topup tidak lengkap');
            }

            // Cek identitas siswa
            $ident = Indentitas::with('siswa')
                ->where('nouid', $nouid)
                ->firstOrFail();

            if (! $ident->siswa) {
                throw new \Exception('Data siswa tidak ditemukan');
            }

            // Cek transaksi pending
            self::existsTransaction($nouid);

            // Generate order ID yang unik
            $orderId = 'topup-'.time().'-'.$nouid;

            // Proses dalam database transaction
            $transaction = DB::connection('mai4')->transaction(function () use ($nouid, $ident, $orderId, $data) {
                $trx = self::createTrx(new DataValidatorService, [
                    'phone' => $ident->siswa->tel ?? '',
                    'nouid' => $nouid,
                    'order_id' => $orderId,
                    'amount' => $data['amount'],
                    'status' => 'pending',
                    'type' => 'topup',
                    'pt_id' => 1,
                    'va_number' => $data['va_number'],
                    'expiry_time' => now()->addHours(6),
                    'created_by' => 1,
                ]);

                if (! $trx) {
                    throw new \Exception('Gagal membuat transaksi topup');
                }

                return $trx;
            });

            Log::info('Topup transaction created successfully', [
                'nouid' => $nouid,
                'orderId' => $orderId,
                'amount' => $data['amount'],
            ]);

            return [
                'nouid' => $nouid,
                'data' => [
                    'type' => 'topup',
                    'nouid' => $nouid,
                    'orderId' => $orderId,
                ],
            ];

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::error('Topup failed - Data not found', [
                'nouid' => $nouid,
                'error' => $e->getMessage(),
            ]);
            throw new \Exception('Data siswa tidak ditemukan');
        } catch (\Exception $e) {
            Log::error('Topup failed', [
                'nouid' => $nouid,
                'error' => $e->getMessage(),
                'data' => $data,
            ]);
            throw $e;
        }
    }

    private function existsTransaction(string $nouid): void
    {
        try {
            $va = self::getVa($nouid);
            $hasPending = Ttrx::where('nouid', $nouid)
                ->where('va_number', $va)
                ->where('status', 'pending')
                ->where('expiry_time', '>', now())
                ->exists();

            if ($hasPending) {
                throw new \Exception('Masih ada transaksi yang sedang diproses. Harap selesaikan atau batalkan transaksi sebelumnya terlebih dahulu.');
            }
        } catch (\Exception $e) {
            Log::warning('Pending transaction check failed in service', [
                'nouid' => $nouid,
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    public function createTrx(DataValidatorService $validator, array $data): ?Ttrx
    {
        try {
            // Validasi data
            if (empty($data)) {
                throw new \InvalidArgumentException('Data transaksi tidak boleh kosong');
            }

            $v = $validator->ttrx($data);

            return DB::connection('mai4')->transaction(function () use ($validator, $v) {
                $trx = Ttrx::create($v);

                // Handle pembayaran tagihan jika diperlukan
                if (($v['for'] ?? null) === 'tagihan' && $v['type'] === 'payment' && (int) $v['pt_id'] === 3) {
                    $this->createPaidBillsForTransaction($validator, $trx);
                }

                return $trx;
            });
        } catch (\Throwable $e) {
            Log::error('Gagal membuat transaksi', [
                'error' => $e->getMessage(),
                'data' => $data,
                'trace' => $e->getTraceAsString(),
            ]);

            return null;
        }
    }

    /**
     * Membuat paid bills untuk transaksi tagihan
     */
    private function createPaidBillsForTransaction(DataValidatorService $validator, Ttrx $trx): void
    {
        try {
            if (empty($trx->spr_id)) {
                Log::warning('No SPR IDs found for transaction', ['trx_id' => $trx->id]);

                return;
            }

            $sprs = Tsalpenrut::whereIn('id', $trx->spr_id)
                ->orderBy('tah')
                ->orderBy('bulid')
                ->get();

            if ($sprs->isEmpty()) {
                Log::warning('No SPR records found for transaction', ['trx_id' => $trx->id, 'spr_ids' => $trx->spr_id]);

                return;
            }

            $sprs->each(function ($spr, $index) use ($validator, $trx) {
                try {
                    $pb = self::createPaidBill($validator, [
                        'trx_id' => $trx->id,
                        'nouid' => $trx->nouid,
                        'nmr' => $index + 1,
                        'spr_id' => $spr->id,
                        'jum' => $spr->jumlah,
                        'ket' => $spr->ket,
                        'sta' => 0,
                        'created_by' => 0,
                        'paid_at' => $trx->updated_at,
                    ]);

                    if (! $pb) {
                        Log::error('Gagal createPaidBill', [
                            'trx_id' => $trx->id,
                            'spr_id' => $spr->id,
                            'data' => $trx->toArray(),
                        ]);
                        throw new \RuntimeException("Failed to create paid bill for SPR #{$spr->id}");
                    }
                } catch (\Throwable $e) {
                    Log::error("Failed to create paid bill for SPR #{$spr->id}", [
                        'error' => $e->getMessage(),
                        'trx_id' => $trx->id,
                        'spr_id' => $spr->id,
                    ]);
                    throw new \RuntimeException("Failed to create paid bill for SPR #{$spr->id}");
                }
            });
        } catch (\Exception $e) {
            Log::error('Error creating paid bills for transaction', [
                'trx_id' => $trx->id,
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    public function createPaidBill(DataValidatorService $validator, array $data): ?PaidBill
    {
        try {
            // Validasi data
            if (empty($data)) {
                throw new \InvalidArgumentException('Data paid bill tidak boleh kosong');
            }

            $v = $validator->paidbill($data);

            return DB::connection('mai4')->transaction(function () use ($v) {
                return PaidBill::create($v);
            });
        } catch (\Throwable $e) {
            Log::error('createPaidBill: Gagal membuat Tagihan', [
                'error' => $e->getMessage(),
                'data' => $data,
                'trace' => $e->getTraceAsString(),
            ]);

            return null;
        }
    }
}
