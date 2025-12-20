<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class SnapToken extends Model
{
    use HasFactory;

    protected $connection = 'mai4';
    protected $table = 'snap_tokens';

    protected $fillable = [
        'bank',
        'client_id',
        'ip',
        'meta',
        'access_token',
        'token_type',
        'expires_in',
        'expires_at',
        'is_active',
        'last_used_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'last_used_at' => 'datetime',
        'is_active' => 'boolean',
        'expires_in' => 'integer',
        'meta' => 'array',
    ];

    /**
     * Cek apakah token masih valid (belum expired dan masih aktif)
     */
    public function isValid(): bool
    {
        return $this->is_active && $this->expires_at->isFuture();
    }

    /**
     * Cek apakah token sudah expired
     */
    public function isExpired(): bool
    {
        return !$this->is_active || $this->expires_at->isPast();
    }

    /**
     * Scope untuk mendapatkan token aktif
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope untuk mendapatkan token yang masih valid
     */
    public function scopeValid($query)
    {
        return $query->where('is_active', true)
            ->where('expires_at', '>', now());
    }

    /**
     * Scope untuk mendapatkan token berdasarkan bank dan client_id
     */
    public function scopeForBank($query, string $bank, string $clientId)
    {
        return $query->where('bank', $bank)
            ->where('client_id', $clientId);
    }
}
