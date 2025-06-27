<?php

namespace App\Models\Trx;

use App\Models\Datmas\Indentitas;
use App\Models\Datmas\Siswa;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tbalance extends Model
{
    use HasFactory;

    protected $connection = 'mai4';
    protected $table = 'tbalance';
    protected $primaryKey = 'nouid';
    public $incrementing = false;
    public $timestamps = true;

    protected $fillable = [
        'nouid',
        'nis',
        'balance',
    ];

    protected $visible = ['balance','nouid', 'siswa', 'identitas'];

    public function identitas()
    {
        return $this->belongsTo(Indentitas::class, 'nouid', 'nouid');
    }

    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'nis', 'nis');
    }

    /** Hitung saldo secara dinamis dari transaksi */
    public function getBalanceAttribute()
    {
        // Ambil semua nouid relasi (kalau banyak entitas)
        $nouids = $this->identitas()->pluck('nouid')->toArray();

        // Jika kosong, fallback ke nouid utama
        if (empty($nouids)) {
            $nouids = [$this->nouid];
        }

        // Total pemasukan
        $totalMasuk = (float) Ttrx::whereIn('nouid', $nouids)
            ->where('status', 'success')
            ->whereIn('type', ['topup', 'refund'])
            ->sum('amount');

        // Total pengeluaran (hanya dari saldo)
        $totalKeluar = (float) Ttrx::whereIn('nouid', $nouids)
            ->where('status', 'success')
            ->where(function ($query) {
                $query->whereIn('type', ['payment', 'withdraw'])
                      ->where('pt_id', 3);
            })
            ->sum('amount');

        return $totalMasuk - $totalKeluar;
    }
}
