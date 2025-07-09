<?php

namespace App\Models\Trx;

use Illuminate\Database\Eloquent\Model;
use App\Models\Datmas\Indentitas;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaidBill extends Model
{
    protected $connection = 'mai4';
    protected $table = 'tpaidbill';
    protected $primaryKey = 'id';
    protected $appends = [];
    public $timestamps = true;
    protected $fillable = [
        'trx_id',
        'nouid',
        'spr_id',
        'nmr',
        'jum',
        'paid_at',
        'ket',
        'created_by',
        'sta',
    ];
    protected $hidden = [
        'created_by',
        'created_at',
        'updated_at',
    ];
    protected $casts = [
        'jum' => 'decimal:2',
        'paid_at' => 'datetime',
    ];
}
