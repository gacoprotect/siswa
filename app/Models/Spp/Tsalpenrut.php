<?php

namespace App\Models\Spp;

use App\Models\BaseModel;
use App\Models\Datmas\Indentitas;
use App\Models\Datmas\Siswa;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Tsalpenrut extends BaseModel
{
    use LogsChanges;
    use HasFactory;

    protected $connection = 'mai3';
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
        return DB::connection('mai2')
            ->table('tbulan')
            ->where('bulid', $this->bulid)
            ->value('bul');
    }
    public function getNoprAttribute()
    {
        $tahun = date('Y'); // Tahun sekarang (2024)
        $idLength = 4; // Panjang digit ID (contoh: 0013)
        $paddedId = str_pad($this->id, $idLength, '0', STR_PAD_LEFT);

        return "PR{$tahun}.{$paddedId}";
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
