<?php

namespace App\Models\Datmas;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Tsiswa1 extends BaseModel
{
    protected $connection = 'mai2';
    protected $table = 'tsiswa1';
    protected $primaryKey = 'ids'; // id model siswa
    protected $appends = ['wilayah', 'kec', 'desa'];
    protected $hidden = [];

    protected $fillable = [
        'ids', //id siswa
        'ala',
        'rt',
        'rw',
        'cam', //16.71.04
        'lur', //16.71.04.1002
        'kodpos', //30137
        'dusun', //bukit
        'buj',
        'lin',
        'temtin',
        'trans',
        'aga', //5
        'ktp', //1671026
        'goldar', //4
        'warneg', //2
        'neg',
        'bah', //Indonesia
        'anakke',    //1
        'butuh',
        'sakit',
    ];



    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'ids', 'id');
    }
    public function kec(): Attribute 
    {
        return Attribute::make(
            get: fn() => Wilayah::where('kod', $this->cam)->value('nam')
        );
    }
    public function desa(): Attribute
    {
        return Attribute::make(
            get: fn() => Wilayah::where('kod', $this->lur)->value('nam')
        );
    }
    public function wilayah(): Attribute
    {
        return Attribute::make(
            get: function () {
                $kode = $this->lur ?? $this->cam;

                if (!$kode) return null;

                $parts = explode('.', $kode);

                $prov = $parts[0] ?? null;
                $kab = isset($parts[1]) ? $prov . '.' . $parts[1] : null;
                $kec = isset($parts[2]) ? $kab . '.' . $parts[2] : null;
                $lur = count($parts) >= 4 ? $kode : null;

                return [
                    'prov' => $prov,
                    'kab' => $kab,
                    'kec' => $kec,
                    'kel' => $lur,
                ];
            }
        );
    }
}
// Undefined property: App\Models\Datmas\Tsiswa1::$lur