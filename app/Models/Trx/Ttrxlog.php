<?php

namespace App\Models\Trx;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ttrxlog extends Model
{
    use HasFactory;

    protected $connection = 'mai4';
    protected $table = 'ttrxlog';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = [
        'nouid',
        'trx_id',
        'amount',
        'action',
        'description',
    ];
}
