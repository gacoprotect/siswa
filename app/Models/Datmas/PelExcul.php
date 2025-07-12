<?php

namespace App\Models\Datmas;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Model;

class PelExcul extends BaseModel
{
    use LogsChanges;
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
