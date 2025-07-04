<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ExculController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\TagihanController;
use App\Http\Controllers\TopupController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

Route::middleware(['web', 'verify.nouid'])->group(function () {
    Route::prefix('/{nouid}')->group(function () {
        Route::get('/', [SiswaController::class, 'index'])->name('siswa.index');
        Route::get('/update', [SiswaController::class, 'update'])->name('siswa.update');
        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('siswa.logout');
        Route::post('/verify-pin', [AuthenticatedSessionController::class, 'store'])->name('siswa.verify-pin');
        Route::post('/register-phone', [RegisteredUserController::class, 'verifphone'])->name('siswa.verify-nope');
        Route::get('/setup-pin', [SiswaController::class, 'showSetupPinForm'])->name('siswa.show-setup-pin');
        Route::post('/setup-pin', [RegisteredUserController::class, 'store'])->name('siswa.process-setup-pin');
        Route::get('/lupa-pin', [PasswordResetLinkController::class, 'create'])->name('siswa.show-lupa-pin');
        Route::post('/lupa-pin', [OtpController::class, 'forgotRequestOtp'])->name('siswa.forgot-pin');
        Route::post('/otp/send', [OtpController::class, 'sendOtp'])->name('otp.send');
        Route::post('/otp/verify', [OtpController::class, 'verifyOtp'])->name('otp.verif');


        Route::get('/topup', [TopupController::class, 'index'])->name('topup');
        Route::post('/topup/charge', [TopupController::class, 'charge'])->name('topup.charge');
        
        // Transaction history        
        Route::get('/payment/{orderId}', [TransactionController::class, 'paymentInstruction'])->name('payment.instruction');
        Route::post('/payment/{orderId}/simulate', [TransactionController::class, 'simulateVa'])->name('payment.simulate');
        Route::post('/payment/{orderId}/cancel-order', [TransactionController::class, 'cancel'])->name('transactions.cancel');
        Route::get('/transactions/{orderId}/status', [TransactionController::class, 'checkStatus'])->name('transactions.status');
        Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions');
        Route::get('/transactions/{orderId}', [TransactionController::class, 'show'])->name('transactions.show');
        
        Route::get('/tagihan', [TagihanController::class, 'index'])->name('tagihan.index');
        Route::get('/tagihan/pay', [TagihanController::class, 'show'])->name('tagihan.show');
        Route::post('/tagihan/pay', [TagihanController::class, 'handlePay'])->name('tagihan.pay');
        Route::post('/bills/new', [TagihanController::class, 'newTagihan'])->name('api.tagihan.new');



        Route::post('/excul/subs', [ExculController::class, 'subs'])->name('subs.excul');
        Route::post('/excul/unsubs', [ExculController::class, 'unsubs'])->name('unsubs.excul');
    });
});


// require __DIR__ . '/auth.php';
