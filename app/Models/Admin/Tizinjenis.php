<?php

namespace App\Models\Admin;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Model;

class Tizinjenis extends BaseModel
{
    use LogsChanges;

    protected $connection = 'mai1';
    protected $table = 'tizinjenis';
    protected $primaryKey = 'id';
    protected $appends = [];
    protected $hidden = [
        "created_at",
        "updated_at",
        "deleted_at",
        "sta",
    ];
    protected $fillable = [
        'name',
        'title',
        'sta',
    ];
}
