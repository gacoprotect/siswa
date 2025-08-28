<?php

namespace App\Services;

use App\Models\Datmas\Indentitas;

class TagihanService
{
    public function getTagihan(string $nouid, ?int $t = null, ?int $b = null): array
    {
        $identitas = Indentitas::select('idok')
            ->where('nouid', $nouid)
            ->with(['siswa', 'tagihan' => function ($query) use ($t, $b) {
                $currentYear = $t ?? date('Y');
                $currentMonth = min($b ?? date('n'), 9);

                $query->whereIn('sta', [0, 1])
                    ->where(function ($query) use ($currentYear, $currentMonth) {

                        $query->where('tah', '<', $currentYear)
                            ->where('bulid', '<=', 9) // Batasi bulan maksimal 9 untuk tahun sebelumnya
                            ->orWhere(function ($q) use ($currentYear, $currentMonth) {
                                $q->where('tah', $currentYear)
                                    ->where('bulid', '<=', $currentMonth);
                            });
                    })
                    ->orderBy('tah', 'desc')
                    ->orderBy('bulid', 'asc');
            }])
            ->firstOrFail();

        $data = $identitas->tagihan->map(function ($item) {
            return [
                'tah' => $item->tah,
                'bulan' => $item->bulan,
                'ket' => $item->ket,
                'jumlah' => $item->jumlah,
                'jen' => $item->jen,
            ];
        });

        $spr = $identitas->tagihan->pluck('id')->values()->all();
        $total_disc = $identitas->tagihan->where('jen', 1)->sum('jumlah');
        $totalTagihan = max(0, $identitas->tagihan->sum('jumlah'));
        logger('data', [
            'data' => $identitas->tagihan,
            'total_tagihan' => $totalTagihan
        ]); // [2025-08-23 23:21:09] local.DEBUG: data {"data":{"Illuminate\\Database\\Eloquent\\Collection":[{"id":4333,"tah":"2025","jen":0,"ket":"SPP SMA TA 2025/2026 - Semester 1","sta":0,"jumlah":100000.0,"bulan":"Juli"},{"id":4334,"tah":"2025","jen":1,"ket":"BanYas TA 2025/2026 - Semester 1","sta":0,"jumlah":-10000.0,"bulan":"Juli"},{"id":4335,"tah":"2025","jen":0,"ket":"SPP SMA TA 2025/2026 - Semester 1","sta":0,"jumlah":100000.0,"bulan":"Agustus"},{"id":4336,"tah":"2025","jen":1,"ket":"BanYas TA 2025/2026 - Semester 1","sta":0,"jumlah":-10000.0,"bulan":"Agustus"}]}} 

        return [
            'nouid' => $nouid,
            'data' => [
                'tagihan' => $data,
                'siswa' => $identitas->siswa,
            ],
            'summary' => [
                ...(($t && $b) ? ['future_bills' => true] : []),
                'total_tagihan' => $totalTagihan,
                'total_disc' => $total_disc,
                'spr' => $spr,
            ],
        ];
    }

    public function getExistTagihan(string $nouid): array
    {
        $identitas = Indentitas::with(['tagihan' => function ($q) {
            $currentYear = date('Y');
            $currentMonth = 9;
            $q->whereIn('sta', [0, 1])
                ->where(function ($q) use ($currentYear, $currentMonth) {
                    $q->where('tah', '>', $currentYear)
                        ->where('bulid', '<=', $currentMonth)
                        ->orWhere(function ($q) use ($currentYear) {
                            $q->where('tah', $currentYear)
                                ->where(function ($q) {
                                    $q->whereBetween('bulid', [date('n') + 1, 9]);
                                });
                        });

                })
                ->orderBy('tah', 'desc')
                ->orderBy('bulid', 'asc');
        }])->where('nouid', $nouid)->first();

        // Siapkan array hasil
        $result = [];

        if ($identitas && $identitas->tagihan) {
            foreach ($identitas->tagihan as $tagihan) {
                $tahun = $tagihan->tah;
                $bulan = (int) $tagihan->bulid; // pastikan integer

                if (! isset($result[$tahun])) {
                    $result[$tahun] = [];
                }

                if (! in_array($bulan, $result[$tahun])) {
                    $result[$tahun][] = $bulan;
                }
            }

            foreach ($result as &$bulanList) {
                sort($bulanList);
            }

            ksort($result);
        }

        return [
            'nouid' => $nouid,
            'tab' => 0,
            'exist_bills' => $result,
        ];
    }

    public function history(string $nouid): array
    {
        return [];
    }

    public function detail(): array
    {

        return [];
    }
}
