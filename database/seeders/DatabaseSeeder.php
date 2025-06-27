<?php

namespace Database\Seeders;

use App\Models\Trx\Tbank;
use App\Models\Trx\Tpt;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            BalanceSeeder::class,
        ]);
        // User::factory(10)->create();
        // Tbank::insert([

        //     [
        //         'code' => 'bca',
        //         'bank' => 'Bank Central Asia',
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'code' => 'bni',
        //         'bank' => 'Bank Negara Indonesia',
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'code' => 'bri',
        //         'bank' => 'Bank Rakyat Indonesia',
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'code' => 'mandiri',
        //         'bank' => 'Bank Mandiri',
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],

        // ]);
        // Tpt::insert([
        //     [
        //         'code' => 'va',
        //         'pt' => 'Virtual Account',
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'code' => 'cash',
        //         'pt' => 'Pembayaran Tunai',
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'code' => "wallet",
        //         'pt' => 'Saldo Dompet',
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        // ]);
    }
}
