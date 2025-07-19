<?php

namespace App\Models\Datmas;

use App\Models\BaseModel;
use App\Models\Saving\PaidBill;
use App\Models\Saving\Tregistrasi;
use App\Models\Saving\Tsignsnk;
use App\Models\Saving\Ttrx;
use App\Models\Spp\Tsalpenrut;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Indentitas extends BaseModel
{
    use LogsChanges;
    use HasFactory;

    protected $connection = 'mai2';
    protected $table = 'tindentitas';
    protected $primaryKey = ['idmen', 'idok', 'tip'];
    protected $appends = ['active'];
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
        'transactions',
        'active',
        'trx'
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
    public function signature()
    {
        return $this->belongsTo(Tsignsnk::class, 'nouid', 'nouid');
    }
    public function reg()
    {
        return $this->belongsTo(Tregistrasi::class, 'nouid', 'nouid');
    }
    public function trx()
    {
        return $this->hasMany(Ttrx::class, 'nouid', 'nouid');
    }
    public function tagihan()
    {
        return $this->hasMany(Tsalpenrut::class, 'idsis', 'idok');
    }
    public function active(): Attribute
    {
        return Attribute::get(function () {
            return $this->sta !== -1;
        });
    }
    public function getTotalTagihanAttribute()
    {
        return $this->tagihan->sum('jumlah');
    }
    public function paidBill()
    {
        return $this->hasMany(PaidBill::class, 'nouid', 'nouid');
    }

    public function summary(array $except = []): array
    {
        $summary = [
            'active' => (bool) $this->active,
            'pin' => !is_null($this->siswa->pin ?? null),
            'reg' => $this->reg->sta ?? null,
            'sign' => $this->signature->sign ?? null,
            'version' => $this->signature->snk_version ?? null,
        ];

        if (!empty($except)) {
            $summary = array_diff_key($summary, array_flip($except));
        }

        return $summary;
    }
}
