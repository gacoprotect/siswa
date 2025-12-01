<?php

use App\Http\Controllers\Api\Snap\SnapController;
use Illuminate\Support\Facades\Route;

Route::middleware(['snap'])->prefix('v1.0')->name('snap.')->group(function () {
    Route::post('access-token/b2b', [SnapController::class, 'token'])->name('token');

    Route::prefix('transfer-va')->group(function () {
        Route::post('inquiry', [SnapController::class, 'inquiry'])->name('inquiry');
        Route::post('payment', [SnapController::class, 'payment'])->name('payment');
        Route::post('status', [SnapController::class, 'inquiryStatus'])->name('status');
        Route::put('update-status', [SnapController::class, 'updateStatusVa'])->name('update-status');
    });
});
