<?php

namespace App\Models\Admin;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Model;

class Tkelsis1 extends BaseModel

{
    use LogsChanges;
    
    protected $connection = 'mai1';
    protected $table = 'tkelsis1';
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
        'ids',
        'idkel',
        'sta',
        'idmen',
        'idtra',
        'createdat',
        'updatedat',
        'createdby',
        'updatedby',
    ];
}
