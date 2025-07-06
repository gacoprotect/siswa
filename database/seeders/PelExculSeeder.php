<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PelExculSeeder extends Seeder
{
    public function run(): void
    {
        DB::connection('mai2')->table('tpel_excul')->insert([
            ['name' => 'Coach Ahmad', 'telepon' => '081234567890'],
            ['name' => 'Pak Budi', 'telepon' => '081234567891'],
            ['name' => 'Bu Citra', 'telepon' => '081234567892'],
            ['name' => 'Pak Dedi', 'telepon' => '081234567893'],
            ['name' => 'Bu Eka', 'telepon' => '081234567894'],
            ['name' => 'Pak Fajar', 'telepon' => '081234567895'],
        ]);
    }
}
