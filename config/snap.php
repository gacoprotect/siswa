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
];
