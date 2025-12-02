<?php

use App\Http\Controllers\Api\Snap\SnapController;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;

Route::middleware(['snap'])->prefix('v1')->name('snap.')->group(function () {
    Route::post('access-token/b2b', [SnapController::class, 'token'])->name('token');

    Route::prefix('transfer-va')->group(function () {
        Route::post('inquiry', [SnapController::class, 'inquiry'])->name('inquiry');
        Route::post('payment', [SnapController::class, 'payment'])->name('payment');
        Route::post('status', [SnapController::class, 'inquiryStatus'])->name('status');
        Route::put('update-status', [SnapController::class, 'updateStatusVa'])->name('update-status');
    });
});

Route::prefix('v1/utilities')->group(function () {
    Route::post('signature-auth', function () {
        $timestamp = currentTimestamp()->toIso8601String();
        $signatureAuth = SnapBi('ocbc')->signature()->auth()->create($timestamp);
        $response = response()->json([
            'signature' => $signatureAuth
        ])->header('X-TIMESTAMP', $timestamp);
        return $response;
    })->name('signature-auth');

    Route::post('signature-service/{service}', function ($service) {
        // Gunakan timestamp dari header X-TIMESTAMP jika ada (sama dengan yang digunakan client)
        // Jika tidak ada, buat timestamp baru
        $timestamp = request()->header('X-TIMESTAMP');
        if (!$timestamp || !\App\Helpers\SnapHelper::isValidTimestamp($timestamp)) {
            $timestamp = currentTimestamp()->toIso8601String();
        }

        // Detect bank dari X-CLIENT-KEY header (sama seperti middleware)
        $bank = \App\Helpers\SnapHelper::detectBank(request());
        if (!$bank) {
            return response()->json([
                'error' => 'Invalid X-CLIENT-KEY. Bank not found or not registered'
            ], 401);
        }

        // Gunakan SnapHelper untuk mendapatkan path dari service name
        // Path akan diambil dari route definition menggunakan enum SnapService
        $path = \App\Helpers\SnapHelper::getServicePath($service);

        // Get body dari raw content untuk konsistensi
        $rawBody = request()->getContent();
        $body = !empty($rawBody) ? json_decode($rawBody, true) : [];

        // Jika decode gagal, gunakan empty array
        if (json_last_error() !== JSON_ERROR_NONE) {
            $body = [];
        }

        // Get access token dari header 'AccessToken', 'accesstoken', atau 'Authorization'
        // Support untuk Postman collection yang menggunakan 'AccessToken' (capital A dan T)
        $accessToken = request()->header('AccessToken')
            ?? request()->header('accesstoken')
            ?? null;

        if ($accessToken) {
            // Hapus prefix 'Bearer ' jika ada
            $accessToken = preg_replace('/^Bearer\s+/', '', $accessToken);
        } else {
            // Fallback ke Authorization header
            $accessToken = request()->bearerToken() ?? '';
        }

        // Gunakan bank yang terdeteksi, bukan hardcode 'ocbc'
        $signatureService = SnapBi($bank)->signature()->service()->create(
            'POST',
            $path,
            $body,
            $timestamp,
            $accessToken
        );

        // Debug: Calculate body hash untuk melihat apakah sama dengan yang digunakan di middleware
        $bodyMinified = json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $bodyHash = strtolower(bin2hex(hash('sha256', $bodyMinified, true)));

        // Debug: Build stringToSign untuk melihat apakah sama dengan yang digunakan di middleware
        $stringToSign = implode(':', [
            'POST',
            $path,
            $accessToken,
            $bodyHash,
            $timestamp
        ]);

        $response = response()->json([
            'signature' => $signatureService,
            'debug' => config('app.debug') ? [
                'method' => 'POST',
                'path' => $path,
                'body' => $body,
                'body_raw' => $rawBody,
                'body_minified' => $bodyMinified,
                'body_hash' => $bodyHash,
                'timestamp' => $timestamp,
                'access_token' => $accessToken,
                'access_token_length' => strlen($accessToken),
                'string_to_sign' => $stringToSign,
            ] : null
        ]);

        // Log response untuk debugging
        if (config('app.debug')) {
            \Illuminate\Support\Facades\Log::debug('Utilities signature-service response', [
                'bank' => $bank,
                'signature' => $signatureService,
                'method' => 'POST',
                'path' => $path,
                'body_hash' => $bodyHash,
                'timestamp' => $timestamp,
                'access_token_length' => strlen($accessToken),
                'string_to_sign' => $stringToSign,
            ]);
        }

        return $response;
    })->name('signature-service');
});




Route::get('test/snap', function () {
    // Test Auth Signature (B2B Access Token - Asymmetric RSA SHA256)
    $timestamp = currentTimestamp()->toIso8601String();
    $clientId = env('OCBC_CLIENT_ID');

    // Create signature (clientId is taken from config, only timestamp needed)
    $signatureAuth = SnapBi('ocbc')->signature()->auth()->create($timestamp);

    // Verify signature using payload (not Request object)
    $verifyAuth = SnapBi('ocbc')->signature()->auth()->verify(
        $clientId,
        $timestamp,
        $signatureAuth
    );

    // Test Service Signature (Virtual Account - Symmetric HMAC SHA512)
    $method = 'POST';
    // EndpointUrl adalah relative path (bukan full URL)
    // Contoh: "/v1/transfer-va/inquiry" atau "/v1.0/transfer-va/inquiry"
    $path = request()->path(); // Relative path seperti "/v1/transfer-va/inquiry"
    $body = [
        'virtualAccountData' => [
            'virtualAccountNo' => '123456789',
            'virtualAccountName' => 'Test Account'
        ]
    ];
    $accessToken = 'test-access-token';

    // Create service signature
    $signatureService = SnapBi('ocbc')->signature()->service()->create(
        $method,
        $path,
        $body,
        $timestamp,
        $accessToken
    );

    // Verify service signature using payload
    $verifyService = SnapBi('ocbc')->signature()->service()->verify(
        $method,
        $path,
        $body,
        $timestamp,
        $accessToken,
        $signatureService
    );

    return response()->json([
        'auth' => [
            'signature' => $signatureAuth,
            'timestamp' => $timestamp,
            'client_id' => $clientId,
            'verify' => $verifyAuth ? 'valid' : 'invalid',
        ],
        'service' => [
            'signature' => $signatureService,
            'method' => $method,
            'path' => $path,
            'body' => $body,
            'timestamp' => $timestamp,
            'access_token' => $accessToken,
            'verify' => $verifyService ? 'valid' : 'invalid',
        ]
    ]);
});
