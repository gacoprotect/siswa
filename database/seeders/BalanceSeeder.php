<?php

namespace Database\Seeders;

use App\Models\Datmas\Indentitas;
use App\Models\Trx\Tbalance;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BalanceSeeder extends Seeder
{
    public function run(): void
    {

        $identitasList = Indentitas::with('siswa')->get();

        foreach ($identitasList as $identitas) {
            $nouid = $identitas->nouid;

            // Lewati jika nouid kosong/null
            if (empty($nouid)) {
                continue;
            }

            $nis = optional($identitas->siswa)->nis; // aman jika siswa null

            Tbalance::updateOrInsert(
                ['nouid' => $nouid],
                [
                    'nis' => $nis,
                    'balance' => 0,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }
    }
}
