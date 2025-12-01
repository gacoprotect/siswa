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




Route::get('test/snap', function () {
    // Test Auth Signature (B2B Access Token - Asymmetric RSA SHA256)
    $timestamp = Carbon::now()->toISO8601String();
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
