<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TbankSeeder extends Seeder
{
    public function run(): void
    {
        DB::connection('mai4')->table('tbank')->insert([
            [
                'code' => 'bca',
                'bank' => 'Bank Central Asia',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'bni',
                'bank' => 'Bank Negara Indonesia',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'bri',
                'bank' => 'Bank Rakyat Indonesia',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'mandiri',
                'bank' => 'Bank Mandiri',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
