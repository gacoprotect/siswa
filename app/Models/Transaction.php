<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'identitas_id',
        'siswa_id',
        'nouid',
        'order_id',
        'amount',
        'bank',
        'phone',
        'va_number',
        'payment_type',
        'status',
        'payment_data',
        'failure_message',
        'expiry_time'
    ];

    protected $casts = [
        'payment_data' => 'array',
        'amount' => 'decimal:2',
        'expiry_time' => 'datetime',
    ];

    public function identitas()
    {
        return $this->belongsTo(Indentitas::class);
    }

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }
}