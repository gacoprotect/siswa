<?php

namespace App\Models\Datmas;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Model;

class Wilayah extends Model
{
    use LogsChanges;
    protected $connection = 'mai2';
    protected $table = 'twilayah';
    protected $primaryKey = 'kod';
    protected $appends = [];
    protected $hidden = [
        'sta',
    ];
    protected $visible = [
        'kod',
        'nam',
    ];
}
