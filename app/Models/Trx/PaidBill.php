<?php

namespace App\Models\Trx;

use Illuminate\Database\Eloquent\Model;
use App\Models\Datmas\Indentitas;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaidBill extends Model
{
    protected $connection = 'mai4';
    protected $table = 'paidbill';
    protected $primaryKey = 'id';
    protected $appends = [];
    public $timestamps = true;
    protected $fillable = [
        'trx_id',
        'nouid',
        'spr_id',
        'jen1',
        'amount',
        'paid_at',
        'note',    
    ];
    protected $hidden = [
        'created_by',
        'created_at',    
        'updated_at',
    ];
    protected $casts = [
        'jen1' => 'array',
        'amount' => 'decimal:2',
        'paid_at' => 'datetime',
    ];
}
