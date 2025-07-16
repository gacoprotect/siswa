<?php

namespace App\Models\Saving;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Timagable extends BaseModel
{
    use HasFactory;


    protected $connection = 'mai4';
    protected $table = 'timagable';
    protected $primaryKey = 'id';
    protected $appends = ['url', 'image_size'];

    protected $fillable = [
        'name',
        'path',
        'mime_type',
        'size',
        'imagable_id',
        'imagable_type',
    ];

    /**
     * Relasi morph ke model induk (misalnya: Tregistrasi, Tsiswa, dll)
     */
    public function imagable()
    {
        return $this->morphTo();
    }

    /**
     * Akses URL file (mengandalkan storage publik)
     */
    public function getUrlAttribute(): ?string
    {
        return $this->path
            ? asset('storage/' . $this->path)
            : null;
    }

    /**
     * Tampilkan ukuran file dalam format ramah (KB/MB)
     */
    public function getImageSizeAttribute(): string
    {
        $size = $this->size ?? 0;
        if ($size >= 1048576) {
            return number_format($size / 1048576, 2) . ' MB';
        } elseif ($size >= 1024) {
            return number_format($size / 1024, 2) . ' KB';
        }
        return $size . ' B';
    }
}
