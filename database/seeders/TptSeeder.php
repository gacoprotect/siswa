<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TptSeeder extends Seeder
{
    public function run(): void
    {
        DB::connection('mai4')->table('tpt')->insert([
            [
                'code' => 'va',
                'pt' => 'Virtual Account',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'cash',
                'pt' => 'Pembayaran Tunai / Kasir',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'wallet',
                'pt' => 'Saldo Dompet',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
