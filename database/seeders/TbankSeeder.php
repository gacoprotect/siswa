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
                'va_code'=> 1111,
                'sta'=> 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'bni',
                'bank' => 'Bank Negara Indonesia',
                'va_code'=> 2222,
                'sta'=> 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'bri',
                'bank' => 'Bank Rakyat Indonesia',
                'va_code'=> 3333,
                'sta'=> 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'mandiri',
                'bank' => 'Bank Mandiri',
                'va_code'=> 4444,
                'sta'=> 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
