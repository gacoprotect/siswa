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
            TbankSeeder::class,
            TptSeeder::class,
        ]);
        
    }
}
