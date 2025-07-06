<?php

namespace Database\Factories\Trx;

use App\Models\Trx\Tpt;
use Illuminate\Database\Eloquent\Factories\Factory;

class TptFactory extends Factory
{
    protected $model = Tpt::class;

    public function definition(): array
    {
        return [
            [
                'code' => 'va',
                'pt' => 'Virtual Account',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'cash',
                'pt' => 'Pembayaran Tunai',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => "wallet",
                'pt' => 'Saldo Dompet',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
    }
}
