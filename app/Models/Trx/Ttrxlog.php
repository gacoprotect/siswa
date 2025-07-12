<?php

namespace App\Models\Trx;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ttrxlog extends Model
{
    use LogsChanges;
    use HasFactory;

    protected $connection = 'mai4';
    protected $table = 'ttrxlog';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = [
        'nouid',
        'nis',
        'bb',
        'ab',
        'trx_id',
        'amount',
        'action',
        'description',
        'created_by',
    ];
}
