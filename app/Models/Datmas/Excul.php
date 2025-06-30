<?php

namespace App\Models\Datmas;

use Illuminate\Database\Eloquent\Model;

class Excul extends Model
{
    protected $connection = 'mai2';
    protected $table = 'excul';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = [
        'name',
        'day',
        'time',
        'pel_id',
        'quota',
        'registered',
        'icon',
    ];
    protected $hidden = [
        "created_at",
        "updated_at",

    ];
    protected $cast = [
        'registered' => 'boolean',
        'time' => 'string',
    ];
}
