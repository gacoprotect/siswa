<?php

namespace App\Models\Admin;

use App\Models\Datmas\Indentitas;
use Illuminate\Database\Eloquent\Model;

class Loggable extends Model
{
    protected $connection ='mai1';
    protected $fillable = [
        'loggable_type',
        'loggable_id',
        'user_id',
        'action',
        'old_data',
        'new_data',
        'sta',
    ];

    protected $casts = [
        'old_data' => 'array',
        'new_data' => 'array',
    ];

    public function loggable()
    {
        return $this->morphTo();
    }

    public function identitas()
    {
        return $this->belongsTo(Indentitas::class);
    }
}
