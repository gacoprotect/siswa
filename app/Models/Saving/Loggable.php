<?php

namespace App\Models\Saving;

use App\Models\Datmas\Indentitas;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Loggable extends Model
{
    use SoftDeletes;
    protected $connection = 'mai4';
    protected $table = 'tloggable'; // Pastikan ini ada

    // Tambahkan ini untuk memastikan Laravel tidak menebak nama tabel
    public $incrementing = true;
    protected $primaryKey = 'id';

    protected $fillable = [
        'loggable_type',
        'loggable_id',
        'user_id',
        'action',
        'old_data',
        'new_data',
        'sta',
        'ip',
        'ua',
        'url',
        'method',
        'meta',
        'log_date',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'old_data' => 'array',
        'new_data' => 'array',
        'log_date' => 'date',
        'meta' => 'array',
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
