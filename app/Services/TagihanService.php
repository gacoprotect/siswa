<?php

namespace App\Services;

use App\Models\Datmas\Indentitas;

class TagihanService
{
    public function getTagihan(string $nouid): array
    {
        $identitas = Indentitas::select('idok')
            ->where('nouid', $nouid)
            ->with(['siswa', 'tagihan' => function ($query) {
                $currentYear = date('Y');
                $currentMonth = date('n');

                $query->whereIn('sta', [0, 1])
                    ->where(function ($query) use ($currentYear, $currentMonth) {
                        $query->where('tah', '<', $currentYear)
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
                'tah'    => $item->tah,
                'bulan'  => $item->bulan,
                'ket'    => $item->ket,
                'jumlah' => $item->jumlah,
                'jen' => $item->jen,
            ];
        });

        $spr = $identitas->tagihan->pluck('id')->values()->all();
        $total_disc = $identitas->tagihan->where('jen', 1)->sum('jumlah');
        $totalTagihan = max(0, $identitas->tagihan->sum('jumlah'));

        return [
            'nouid' => $nouid,
            'data' => [
                'tagihan' => $data,
                'siswa' => $identitas->siswa,
                'summary' => [
                    'total_tagihan' => $totalTagihan,
                    'total_disc'    => $total_disc,
                    'spr'           => $spr,
                ],
            ],

        ];
    }

    public function detail(): array
    {

        return [];
    }
}
