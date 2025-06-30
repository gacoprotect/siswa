<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExculSeeder extends Seeder
{
    public function run(): void
    {
        DB::connection('mai2')->table('excul')->insert([
            [
                'name' => 'Futsal',
                'day' => 'Senin',
                'time' => '15.00-17.00',
                'pel_id' => 1,
                'quota' => 20,
                'icon' => 'FaRunning',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pramuka',
                'day' => 'Rabu',
                'time' => '14.00-16.00',
                'pel_id' => 2,
                'quota' => 30,
                'icon' => 'FaUsers',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Seni Lukis',
                'day' => 'Kamis',
                'time' => '13.00-15.00',
                'pel_id' => 3,
                'quota' => 15,
                'icon' => 'FaPaintBrush',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Robotika',
                'day' => 'Selasa',
                'time' => '15.00-17.00',
                'pel_id' => 4,
                'quota' => 12,
                'icon' => 'FaFlask',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Paduan Suara',
                'day' => 'Jumat',
                'time' => '14.00-16.00',
                'pel_id' => 5,
                'quota' => 25,
                'icon' => 'FaMusic',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Catur',
                'day' => 'Senin',
                'time' => '16.00-18.00',
                'pel_id' => 6,
                'quota' => 10,
                'icon' => 'FaChess',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
