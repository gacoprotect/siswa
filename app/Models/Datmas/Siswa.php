<?php

namespace App\Models\Datmas;

use App\Helpers\MaskingHelper;
use App\Models\Admin\Tkelsis;
use App\Models\Saving\Ttrx;
use App\Models\Spp\Tsalpenrut;
use App\Models\Saving\Ttrxlog;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class Siswa extends Authenticatable
{
    use LogsChanges;
    use HasFactory;

    protected static function boot()
    {
        parent::boot();

        static::created(function ($model) {
            $model->logCreation();
        });

        static::updated(function ($model) {
            $model->logChange($model->getChanges(), 'update');
        });

        static::deleted(function ($model) {
            $model->logDeletion();
        });

        // static::restored(function ($model) {
        //     $model->logRestoration();
        // });
    }
    protected $connection = 'mai2';
    protected $table = 'tsiswa';
    protected $primaryKey = 'nis';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = true;
    const CREATED_AT = 'createdat';
    const UPDATED_AT = 'updatedat';
    protected $appends = ['has_pin', 'balance', 'ttl', 'tin', 'kel'];
    protected $visible = [
        'balance',
        'nis',
        'namlen',
        'ttl',
        'tel',
        'kel',
        'tin',
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
        'excul',
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
        'excul' => 'array',
        'tgllah' => 'date',
        'sta' => 'integer',
        'staqd' => 'integer',
        'rev' => 'integer',
        'createdby' => 'integer',
        'updatedby' => 'integer',
    ];
    public function loggable()
    {
        return $this->morphTo();
    }
    public function indentitas()
    {
        return $this->belongsTo(Indentitas::class, 'id', 'idok');
    }
    public function kelsis()
    {
        return $this->belongsTo(Tkelsis::class, 'id', 'ids');
    }
    public function kel(): Attribute
    {
        return Attribute::get(function () {
            return $this->kelsis->kel;
        });
    }
    public function safe()
    {
        return $this->hasOne(Tsiswa1::class, 'ids', 'id');
    }
    public function trxlogs()
    {
        return $this->hasMany(Ttrxlog::class, 'nis', 'nis');
    }
    public function ttl(): Attribute
    {
        return Attribute::get(function () {
            // Pastikan kolom tanggal lahir bisa di-parse
            $tgl = $this->tgllah ? Carbon::parse($this->tgllah)->translatedFormat('j F Y') : null;

            return $this->temlah && $tgl
                ? "{$this->temlah}, {$tgl}"
                : null;
        });
    }
    
    public function tin(): Attribute
    {
        return Attribute::get(function () {
            return $this->kelsis->tin;
        });
    }
    public function balance(): Attribute
    {
        return Attribute::get(function () {
            $latestLog = $this->trxlogs()
                ->orderByDesc('id')
                ->first(['ab', 'created_at']);

            return $latestLog ? $latestLog->ab : 0;
        });
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
            // 'has_pin' => $this->has_pin,
            'namlen' => MaskingHelper::maskString($this->namlen),
            'nis'    => MaskingHelper::maskNumber($this->nis),
            'kel'    => MaskingHelper::maskClass($this->kel),
            'tel'    => MaskingHelper::maskPhone($this->tel),
        ];
    }

    public function getBalanceTrx()
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
