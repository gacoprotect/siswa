<?php

namespace App\Models\Trx;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tpt extends Model
{
    use HasFactory;

    protected $connection = 'mai4';
    protected $table = 'tpt';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = [
        'id',
        'code',
        'pt'
    ];
}
