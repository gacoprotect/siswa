<?php

namespace App\Services\Snap;

use App\Models\SnapToken;
use Illuminate\Support\Facades\Log;

/**
 * SnapTokenService
 * 
 * Service untuk management token B2B (inbound API)
 * Hanya untuk cleanup dan statistics, karena generate token sudah ditangani di SnapService
 */
class SnapTokenService
{

    /**
     * Cleanup expired tokens
     * 
     * @return int Jumlah token yang dihapus
     */
    public function cleanupExpiredTokens(): int
    {
        if (!config('snap.token.auto_cleanup', true)) {
            return 0;
        }

        $cleanupAfterDays = config('snap.token.cleanup_after_days', 7);
        $cutoffDate = now()->subDays($cleanupAfterDays);

        $deleted = SnapToken::where('expires_at', '<', $cutoffDate)
            ->where('is_active', false)
            ->delete();

        Log::info('Snap tokens cleaned up', [
            'deleted_count' => $deleted,
            'cutoff_date' => $cutoffDate->toIso8601String(),
        ]);

        return $deleted;
    }

    /**
     * Get token statistics
     * 
     * @param string|null $bank Bank name (optional)
     * @return array Statistics
     */
    public function getStatistics(?string $bank = null): array
    {
        $query = SnapToken::query();

        if ($bank) {
            $query->where('bank', strtolower($bank));
        }

        return [
            'total' => $query->count(),
            'active' => (clone $query)->where('is_active', true)->count(),
            'expired' => (clone $query)->where('expires_at', '<', now())->count(),
        ];
    }
}
