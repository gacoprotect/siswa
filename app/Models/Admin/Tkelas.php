<?php

namespace App\Models\Admin;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Tkelas extends BaseModel
{
    use LogsChanges;
    use HasFactory;

    protected $connection = 'mai1';
    protected $table = 'tkelas';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $appends = [];
    protected $hidden = [
        'jenis',
        "createdat",
        "updatedat",
        "createdby",
        "updatedby",
    ];
    // protected $fillable = [
    //     'id',
    //     'tin',
    //     'idta',
    //     'nam',
    //     'jen',
    //     'lev',
    //     'qty',
    //     'idk',
    //     'ket',
    //     'sta',
    //     'rev',
    //     'createdat',
    //     'updatedat',
    //     'createdby',
    //     'updatedby',
    // ];

    public function jenis()
    {
        return $this->belongsTo(Tkelasjenis::class, 'jen', 'id');
    }
}
