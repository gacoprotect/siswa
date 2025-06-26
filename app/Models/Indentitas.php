<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Indentitas extends Model
{
    use HasFactory;
    protected $table = 'tindentitas';
    protected $primaryKey = ['idmen', 'idok', 'tip'];
    public $incrementing = false;
    protected $fillable = [
        'idmen',
        'idok',
        'tip',
        'nouid',
        'sta',
        'rev',
        'createdby',
        'updatedby',
    ];
    protected $visible = [
        'idok',
        'nouid',
        'spr_tagihan',
        'total_tagihan',
        'tah_tagihan',
        'bulan_tagihan',
        'tagihan',
        'siswa',
        'transactions'
    ];
    protected $casts = [
        'idmen' => 'integer',
        'idok' => 'integer',
        'tip' => 'integer',
        'sta' => 'integer',
        'rev' => 'integer',
        'createdby' => 'integer',
        'updatedby' => 'integer',
    ];

    public $timestamps = true;
    const CREATED_AT = 'createdat';
    const UPDATED_AT = 'updatedat';

    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'idok', 'id');
    }
    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'nouid', 'nouid');
    }
    public function tagihan()
    {
        return $this->hasMany(Tsalpenrut::class, 'idsis', 'idok');
    }

    public function getTotalTagihanAttribute()
    {
        return $this->tagihan->sum('jumlah');
    }
}
