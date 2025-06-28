<?php

namespace App\Models\Datmas;

use App\Helpers\MaskingHelper;
use App\Models\Trx\Ttrx;
use App\Models\Spp\Tsalpenrut;
use App\Models\Trx\Tbalance;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class Siswa extends Authenticatable
{
    use HasFactory;

    protected $connection = 'mai2';
    protected $table = 'tsiswa';
    protected $primaryKey = 'nis';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = true;
    const CREATED_AT = 'createdat';
    const UPDATED_AT = 'updatedat';
    protected $appends = ['has_pin', 'balance'];
    protected $visible = [
        'balance',
        'has_pin',
        'nis',
        'namlen',
        'temlah',
        'tgllah',
        'tel',
        'kel',
    ];
    protected $fillable = [
        'nis',
        'nisn',
        'namlen',
        'nampan',
        'namman',
        'temlah',
        'tgllah',
        'jenkel',
        'tel',
        'ket',
        'sta',
        'staqd',
        'rev',
        'createdby',
        'updatedby',
        'kel',
        'ala',
        'pin',
    ];

    protected $hidden = [
        "nisn",
        "ket",
        "sta",
        "staqd",
        "rev",
        "createdat",
        "updatedat",
        "createdby",
        "updatedby",
        'pin',
        'id',
    ];
    protected $casts = [
        'tgllah' => 'date',
        'sta' => 'integer',
        'staqd' => 'integer',
        'rev' => 'integer',
        'createdby' => 'integer',
        'updatedby' => 'integer',
    ];

    public function indentitas()
    {
        return $this->belongsTo(Indentitas::class, 'idok', 'id');
    }

    public function getBalanceAttribute()
    {
        return Tbalance::where('nis', $this->nis)->first()->balance;
    }
    public function getAuthPassword()
    {
        return $this->password;
    }


    public function setPinAttribute($value)
    {
        $this->attributes['pin'] = Hash::make($value);
    }
    public function getHasPinAttribute(): bool
    {
        return !is_null($this->pin);
    }

    public function verifyPin($pin)
    {
        return Hash::check($pin, $this->pin);
    }

    public function salpenruts()
    {
        return $this->hasMany(Tsalpenrut::class, 'idsis', 'id');
    }

    public function masked(): array
    {
        if (Auth::check()) {
            return [];
        }
        return [
            'has_pin' => $this->has_pin,
            'namlen' => MaskingHelper::maskString($this->namlen),
            'nis'    => MaskingHelper::maskNumber($this->nis),
            'kel'    => MaskingHelper::maskClass($this->kel),
            'tel'    => MaskingHelper::maskPhone($this->tel),
        ];
    }
}
