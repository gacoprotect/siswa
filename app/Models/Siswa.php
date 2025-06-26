<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Hash;

class Siswa extends Authenticatable
{
    use HasFactory;
    protected $connection = 'mysql';
    protected $table = 'tsiswa';
    protected $primaryKey = 'nis';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = true;
    const CREATED_AT = 'createdat';
    const UPDATED_AT = 'updatedat';
    protected $appends =['saldo'];
    protected $visible = [
        'nis',
        'namlen',
        'temlah',
        'tgllah',
        'tel',
        'kel',
        'saldo',
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
        return $this->hasMany(Indentitas::class, 'idok', 'id');
    }
    public function getSaldoAttribute()
    {
        $nouids = $this->indentitas()->pluck('nouid');
        $baseQuery = Transaction::whereIn('nouid', $nouids)
            ->where('status', 'success');
        $totalMasuk = (float) $baseQuery
            ->whereIn('type', ['topup', 'refund'])
            ->sum('amount');
        $totalKeluar = (float) Transaction::whereIn('nouid', $nouids)
        ->where('status', 'success')
        ->where(function($query) {
            $query->whereIn('type', ['payment', 'withdraw'])
                  ->where('payment_type', 'saldo');
        })
        ->sum('amount');
        $saldo = $totalMasuk - $totalKeluar;

        return $saldo;
    }

    public function getAuthPassword()
    {
        return $this->password;
    }


    public function setPinAttribute($value)
    {
        $this->attributes['pin'] = Hash::make($value);
    }

    public function verifyPin($pin)
    {
        return Hash::check($pin, $this->pin);
    }

    public function salpenruts()
    {
        return $this->hasMany(Tsalpenrut::class, 'idsis', 'id');
    }
}
