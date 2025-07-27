<?php

namespace App\Models\Admin;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Model;

class Tstopexcul extends BaseModel
{
    use LogsChanges;

    protected $connection = 'mai1';
    protected $table = 'tstopexcul';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $appends = [];
    protected $hidden = [
        "createdat",
        "updatedat",
        "createdby",
        "updatedby",
    ];
    protected $fillable = [
        'nose',
        'tin',
        'idta',
        'tgl',
        'idsis',
        'idks1',
        'idkel',
        'tglex',
        'ala',
        'sta',
        'rev',
        'createdby',
        'updatedby',
        'createdat',
        'updatedat',
    ];
}
