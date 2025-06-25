<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Tsalpenrut extends Model
{
    protected $connection = 'mysql2';
    protected $table = 'tsalpenrut';

    // protected $primaryKey = ['idset', 'idsis', 'bulid', 'tah', 'nmr', 'jen'];
    public $timestamps = true;
    const CREATED_AT = 'createdat';
    const UPDATED_AT = 'updatedat';
    protected $visible = [
        'id',
        'tah',
        'jen',
        'ket',
        'jumlah',
        'bulan',
        'sta'
    ];
    protected $appends = ['jumlah', 'bulan'];
    protected $hidden = [
        'bulid',
        'coapen',
        'coapiu',
        'coapendim',
        'coabelter',
        'islock',
        'idspr1',
        'idgru',
        'idpr',
        'createdby',
        'updatedby',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'idsis', 'id');
    }
    public function identitas()
    {
        return $this->belongsTo(Indentitas::class, 'idsis', 'idok');
    }
    public function getJumlahAttribute(): float
    {
        return $this->jen == 1 ? -1 * $this->jum : $this->jum;
    }
    public function getBulanAttribute()
    {
        return DB::connection('mysql')
            ->table('tbulan')
            ->where('bulid', $this->bulid)
            ->value('bul');
    }
    public function scopeSaringKetJum($query, int $idsis, int $tahun, int $maxBulan)
    {
        return $query
            ->from('tsalpenrut as tsp')
            ->join('maidatmas.tbulan as tb', 'tsp.bulid', '=', 'tb.bulid')
            ->select(
                'tsp.id',
                DB::raw("CONCAT_WS(' ', tsp.ket, tb.bul, tsp.tah) as ket"),
                DB::raw("IF(tsp.jen = 1, (0 - tsp.jum), tsp.jum) as jum"),
                'tb.bul',
                'tsp.tah'
            )
            ->where(function ($q) {
                $q->where('tsp.sta', 0)->orWhere('tsp.sta', 1);
            })
            ->where('tsp.idsis', $idsis)
            ->where(function ($q) use ($tahun, $maxBulan) {
                $q->where('tsp.tah', '<', $tahun)
                    ->orWhere(function ($q2) use ($tahun, $maxBulan) {
                        $q2->where('tsp.tah', $tahun)
                            ->where('tsp.bulid', '<=', $maxBulan);
                    });
            });
    }
}
