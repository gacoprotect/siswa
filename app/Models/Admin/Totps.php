<?php

namespace App\Models\Admin;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Totps extends BaseModel
{
    use LogsChanges;
    use HasFactory;

    protected $connection = 'mai1';
    protected $table = 'totps';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = [
        'phone',
        'attempts',
        'otp',
        'expires_at',
    ];
    protected $dates = ['expires_at'];
}
