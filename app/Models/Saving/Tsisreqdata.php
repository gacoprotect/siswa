<?php

namespace App\Models\Saving;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Model;

class Tsisreqdata extends BaseModel
{
    use LogsChanges;

    protected $connection = 'mai4';
    protected $table = 'tsisreqdata';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = [
        'idsis',
        'old_data',
        'new_data',
        'status',
        'rejection_reason',
        'updated_by',
        'approved_at',
    ];

    protected $casts =[
        'old_data' => 'array',
        'new_data' => 'array',
    ];
}
