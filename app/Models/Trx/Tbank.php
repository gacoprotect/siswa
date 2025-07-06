<?php

namespace App\Models\Trx;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tbank extends Model
{
    use HasFactory;

    protected $connection = 'mai4';
    protected $table = 'tbank';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = [
        'id',
        'code',
        'bank'
    ];
}
