<?php

return [
    'default' => 'ocbc',

    'ocbc' => [
        'client_id' => env('OCBC_CLIENT_ID'),
        'client_secret' => env('OCBC_CLIENT_SECRET'),
        'ssh_private_key' => env('OCBC_PRIVATE_KEY'),
        'ssh_public_key' => env('OCBC_PUBLIC_KEY'),
        'partner_id' => env('OCBC_PARTNER_ID'),
        'account_id' => env('OCBC_ACCOUNT_ID'),
        'bank_card_token' => env('OCBC_BANK_CARD_TOKEN'),
        'channel_id' => env('OCBC_CHANNEL_ID'),
        'base_url' => env('OCBC_BASE_URL'),
    ],
];
