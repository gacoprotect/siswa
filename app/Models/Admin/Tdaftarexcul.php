<?php

namespace App\Models\Admin;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Model;

class Tdaftarexcul extends BaseModel
{
    use LogsChanges;

    protected $connection = 'mai1';
    protected $table = 'tdaftarexcul';
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
        'tin',
        'idta',
        'tgl',
        'idsis',
        'idkel',
        'ket',
        'jum',
        'sta',
        'rev',
        'createdby',
        'updatedby',
        'createdat',
        'updatedat',
    ];
}
