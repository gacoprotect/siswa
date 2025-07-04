<?php

namespace App\Models\Datmas;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Excul extends Model
{
    protected $connection = 'mai2';
    protected $table = 'excul';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $appends =['coach'];
    protected $fillable = [
        'name',
        'day',
        'time',
        'quota',
        'registered',
        'icon',
    ];
    protected $hidden = [
        'pel_id',
        "created_at",
        "updated_at",

    ];
    protected $cast = [
        'registered' => 'boolean',
        'time' => 'string',
    ];

    public function pel()
    {
        return $this->belongsTo(PelExcul::class, 'pel_id', 'id');
    }

    public function coach(): Attribute
    {
        return Attribute::get(function () {
            return $this->pel ? $this->pel->name : null;
        });
    }
}
