<?php

namespace App\Models\Saving;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Carbon;

class Tsnk extends BaseModel
{
    use LogsChanges;
    use HasFactory;

    protected $connection = 'mai4';
    protected $table = 'tsnk';
    protected $appends = ['effective'];

    protected $fillable = [
        'version',
        'title',
        'summary',
        'is_active',
        'is_required',
        'published_at',
        'effective_at'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_required' => 'boolean',
        'published_at' => 'datetime',
        'effective_at' => 'datetime',
    ];

    public function points()
    {
        return $this->hasMany(TsnkPoint::class, 'tsnk_id');
    }

    public static function active(): ?self
    {
        return self::where('is_active', true)->latest('published_at')->first();
    }
    public function getEffectiveAttribute()
    {
        return Carbon::parse($this->effective_at)
            ->translatedFormat('l, d F Y'); // Hasil: "Selasa, 12 Januari 2025"
    }
}
