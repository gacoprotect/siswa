<?php

namespace Database\Seeders;

use App\Models\Admin\Tizinjenis;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TizinjenisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                'name' => 'lain',
                'title' => 'Lainnya',
                'sta' => 0,
            ],
            [
                'name' => 'sakit',
                'title' => 'Sakit',
                'sta' => 0,
            ],
            [
                'name' => 'dispensasi',
                'title' => 'Dispensasi',
                'sta' => 0,
            ],
            [
                'name' => 'personal',
                'title' => 'Keperluan Pribadi',
                'sta' => 0,
            ],
        ];
        foreach ($datas as $data) {
            Tizinjenis::create($data);
        }
        
    }
}
