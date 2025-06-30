<?php

namespace App\Models\Datmas;

use Illuminate\Database\Eloquent\Model;

class PelExcul extends Model
{
    protected $connection = 'mai2';
    protected $table = 'tpel_excul';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = [
        'name',
        'telepon',
    ];
    protected $hidden = [
        "id",
        "created_at",
        "updated_at",
    ];
    protected $cast = [];
}
