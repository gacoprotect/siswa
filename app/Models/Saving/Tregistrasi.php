<?php

namespace App\Models\Saving;

use App\Models\BaseModel;
use App\Saving\Models\Timagable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tregistrasi extends BaseModel
{
    use HasFactory;


    protected $connection = 'mai4';
    protected $table = 'tregistrasi';
    protected $primaryKey = 'id';
    protected $appends = ['hubungan'];

    protected $fillable = [
        'nouid',
        'nama',
        'warneg',
        'warneg_name',
        'nik',
        'kk',
        'paspor',
        'alamat1',
        'alamat2',
        'temtin',
        'hub',
        'tel',
        'email',
        'sta',
        'updated_by',
        'reject_reason'
    ];

    protected $casts = [
        'alamat1' => 'array',
        'alamat2' => 'array',
        'temtin' => 'boolean',
    ];

    /**
     * Konstanta status pendaftaran
     */
    public const STATUS_PENDING  = 0;
    public const STATUS_ACCEPTED = 1;
    public const STATUS_REJECTED = -1;
    public const STATUS_BLOCKED  = -2;

    /**
     * Mapping enum hubungan
     */
    public const HUBUNGAN = [
        '0' => 'Ayah',
        '1' => 'Ibu',
        '2' => 'Wali',
    ];

    /**
     * Akses nama hubungan dalam bentuk teks
     */
    public function getHubunganAttribute(): string
    {
        return self::HUBUNGAN[$this->hub] ?? '-';
    }

    /**
     * Relasi ke gambar/file (polymorphic)
     */
    public function images()
    {
        return $this->morphMany(Timagable::class, 'imagable');
    }

    /**
     * Shortcut relasi khusus KTP
     */
    public function ktp()
    {
        return $this->images()->where('name', 'ktp')->first();
    }

    /**
     * Shortcut relasi khusus paspor
     */
    public function pasporImage()
    {
        return $this->images()->where('name', 'paspor')->first();
    }

    public function signsnk()
    {
        return $this->hasOne(Tsignsnk::class, 'nouid', 'nouid');
    }
}
