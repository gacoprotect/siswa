<?php

namespace App\Models\Admin;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends BaseModel
{
    use LogsChanges, SoftDeletes;

    protected $connection = 'mai1';

    protected $table = 'events';

    protected $fillable = [
        'judul',
        'desk',
        'start_at',
        'end_at',
        'fullday',
        'lokasi',
        'penting',
        'sifat',
        'kategori_id',
        'sta',
        'meta',
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
        'fullday' => 'boolean',
        'penting' => 'boolean',
        'sta' => 'boolean',
        'meta' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(EventCategory::class, 'kategori_id');
    }

    public function targets()
    {
        return $this->hasMany(EventTarget::class, 'event_id');
    }

    protected function sifatLabel(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->sifat == 1 ? 'Wajib' : 'Opsional'
        );
    }
}
