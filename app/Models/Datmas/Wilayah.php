<?php

namespace App\Models\Datmas;

use Illuminate\Database\Eloquent\Model;

class Wilayah extends Model
{
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
