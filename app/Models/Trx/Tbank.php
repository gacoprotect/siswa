<?php

namespace App\Models\Trx;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tbank extends Model
{
    use LogsChanges;
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
