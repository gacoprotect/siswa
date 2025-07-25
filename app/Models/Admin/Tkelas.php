<?php

namespace App\Models\Admin;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tkelas extends BaseModel
{
    use LogsChanges;
    use HasFactory;

    protected $connection = 'mai1';
    protected $table = 'tkelas';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = [
        'id',
        'tin',
        'idta',
        'nam',
        'jen',
        'lev',
        'qty',
        'idk',
        'ket',
        'sta',
        'rev',
        'createdat',
        'updatedat',
        'createdby',
        'updatedby',
    ];
}
