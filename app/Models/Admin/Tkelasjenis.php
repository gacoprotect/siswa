<?php

namespace App\Models\Admin;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tkelasjenis extends BaseModel
{
    use LogsChanges;
    use HasFactory;

    protected $connection = 'mai1';
    protected $table = 'tkelasjenis';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $appends = [];
    protected $visible = [];
    // protected $fillable = [
    // 'id',
    // 'tin',
    // 'nam',
    // 'tip',
    // 'lev',
    // 'ket',
    // 'sta',
    // 'createdat',
    // ];

}
