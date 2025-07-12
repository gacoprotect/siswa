<?php

namespace App\Models\Trx;

use App\Models\BaseModel;
use App\Models\Datmas\Indentitas;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ttrx extends Model
{
    use LogsChanges;
    use HasFactory;

    protected $connection = 'mai4';
    protected $table = 'ttrx';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $appends = [
        'payment_type',
        'bank',
    ];
    protected $fillable = [
        'nouid',
        'order_id',
        'amount',
        'bank_id',
        'pt_id',
        'phone',
        'va_number',
        'status',
        'type',
        'spr_id',
        'jen1',
        'note',
        'pay_data',
        'failure_message',
        'expiry_time',
        'paid_at',
        'created_by',
    ];
    protected $hidden = [
        'bank_id',
        'pt_id',
        'id'
    ];
    protected $casts = [
        'spr_id' => 'array',
        'jen1' => 'array',
        'pay_data' => 'array',
        'expiry_time' => 'datetime',
        'amount' => 'decimal:2',
        'type' => 'string',
        'note' => 'string',
    ];

    public function indentitas(): BelongsTo
    {
        return $this->belongsTo(Indentitas::class, 'nouid', 'nouid');
    }
    public function getAmountAttribute($value): float
    {
        return in_array($this->type, ['payment', 'withdraw'])
            ? -1 * abs($value)
            : abs($value);
    }
    public function getPaymentTypeAttribute(): ?string
    {
        return Tpt::where('id', $this->pt_id)->value('pt');
    }

    public function getBankAttribute(): BelongsTo
    {
        return $this->belongsTo(Tbank::class, 'bank_id', 'id');
    }
}
