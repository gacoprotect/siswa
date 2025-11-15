<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\SiswaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
|
| Here is where you can register authentication routes for your application.
| These routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group.
|
*/

Route::middleware(['web'])->group(function () {
    Route::prefix('u/{nouid}')->group(function () {
        // Guest routes (unauthenticated users)
        Route::middleware(['guest'])->group(function () {
            Route::get('/login', [SiswaController::class, 'index'])->name('login');
            Route::post('/verify-pin', [AuthenticatedSessionController::class, 'store'])->name('siswa.verify-pin');

            // Registration routes
            Route::resource('register', RegisteredUserController::class)->only(['index', 'create', 'store']);
            Route::post('/auth/register', [RegisteredUserController::class, 'store'])->name('auth.register');
            Route::post('/register-phone', [RegisteredUserController::class, 'verifphone'])->name('siswa.verify-nope');

            // PIN setup and recovery
            Route::get('/setup-pin', [SiswaController::class, 'showSetupPinForm'])->name('siswa.show-setup-pin');
            Route::post('/setup-pin', [RegisteredUserController::class, 'setupPin'])->name('siswa.process-setup-pin');
            Route::get('/lupa-pin', [PasswordResetLinkController::class, 'create'])->name('siswa.show-lupa-pin');
            Route::post('/lupa-pin', [OtpController::class, 'forgotRequestOtp'])->name('siswa.forgot-pin');

            // OTP routes
            Route::post('/otp/send', [OtpController::class, 'sendOtp'])->name('otp.send');
            Route::post('/otp/verify', [OtpController::class, 'verifyOtp'])->name('otp.verif');
        });

        // Authenticated routes
        Route::middleware(['verify.nouid'])->group(function () {
            Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('siswa.logout');
        });
    });
});
