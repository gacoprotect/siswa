<?php

namespace Database\Factories\Trx;

use App\Models\Trx\Tbank;
use Illuminate\Database\Eloquent\Factories\Factory;

class TbankFactory extends Factory
{
    protected $model = Tbank::class;

    public function definition(): array
    {

        return [
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
        ];
    }
}
