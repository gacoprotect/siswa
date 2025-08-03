<?php

namespace Database\Seeders;

use App\Models\Admin\Tkelas;
use App\Models\Admin\Tkelsis;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExculSeeder extends Seeder
{
    public function run(): void
    {
        $excul = Tkelas::class;
        // id	74
        // tin	1
        // idta	1
        // nam	Basket
        // jen	6
        // lev	1
        // qty	20
        // idk	7
        // ket	
        // sta	0
        // rev	0
        // createdat	2024-10-05 03:23:11
        // updatedat	2024-10-05 03:23:11
        // createdby	1
        // updatedby	0
        DB::connection('mai2')->table('texcul')->insert([
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
