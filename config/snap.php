<?php

return [
    'provider' => [
        'OCBC' => [
            'client_id' => env('OCBC_CLIENT_ID'),
            'client_secret' => env('OCBC_CLIENT_SECRET'),
            'public_key' => env('OCBC_PUBLIC_KEY'),
            'private_key' => env('OCBC_PRIVATE_KEY'),
            'biller_id' => env('OCBC_BILLER_ID'),
            'company_code' => env('OCBC_COMPANY_CODE'),
            'debug' => env('SNAP_BI_DEBUG', false),
            'log_signature' => env('SNAP_BI_LOG_SIGNATURE', false),
        ],
    ],

    /**
     * Token Management Configuration
     * Konfigurasi untuk manajemen token B2B (inbound API - bank yang call API kita)
     */
    'token' => [
        /**
         * Rate limit untuk endpoint /api/v1/access-token/b2b
         * Jumlah maksimal request per menit yang bisa dilakukan bank ke endpoint ini
         * Format: 'max_attempts' => jumlah request, 'decay_minutes' => waktu window (menit)
         */
        'endpoint_rate_limit' => [
            'max_attempts' => env('SNAP_TOKEN_ENDPOINT_RATE_LIMIT', 3),
            'decay_minutes' => env('SNAP_TOKEN_ENDPOINT_DECAY_MINUTES', 1),
        ],

        /**
         * Rate limit per client_id (X-CLIENT-KEY)
         * Jika true, rate limit akan dihitung per client_id, bukan per IP
         */
        'limit_per_client' => env('SNAP_TOKEN_LIMIT_PER_CLIENT', true),

        /**
         * Auto cleanup expired tokens
         * Jika true, token yang sudah expired akan otomatis dihapus dari database
         */
        'auto_cleanup' => env('SNAP_TOKEN_AUTO_CLEANUP', true),

        /**
         * Cleanup interval (dalam hari)
         * Token yang expired lebih dari X hari akan dihapus
         */
        'cleanup_after_days' => env('SNAP_TOKEN_CLEANUP_AFTER_DAYS', 7),
    ],
];
