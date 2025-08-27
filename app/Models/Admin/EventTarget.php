<?php

namespace App\Models\Admin;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventTarget extends BaseModel
{
    use SoftDeletes, LogsChanges;


    protected $connection = 'mai1';
    protected $table = 'event_targets';

    protected $fillable = [
        'event_id',
        'target_type',
        'target_id',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }

    protected function targetTypeLabel(): Attribute
    {
        return Attribute::make(
            get: fn () => match ($this->target_type) {
                0 => 'Semua',
                1 => 'Tingkatan',
                2 => 'Jurusan',
                3 => 'Kelas',
                4 => 'Siswa',
                default => 'Tidak diketahui',
            }
        );
    }
}
