<?php

namespace App\Models\Datmas;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Model;

class Wilayah extends BaseModel
{
    use LogsChanges;
    protected $connection = 'mai2';
    protected $table = 'twilayah';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $primaryKey = 'kod';
    protected $appends = [];
    protected $hidden = [
        'sta',
    ];
}
