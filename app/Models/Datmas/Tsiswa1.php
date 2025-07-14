<?php

namespace App\Models\Datmas;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Tsiswa1 extends BaseModel
{
    protected $connection = 'mai2';
    protected $table = 'tsiswa1';
    protected $primaryKey = 'ids'; // id model siswa
    protected $appends = [];
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
}
