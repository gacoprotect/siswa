<?php

use App\Http\Controllers\Admin\BillController;
use App\Http\Controllers\Admin\IzinController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\ExculController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Saving\SignatureController;
use App\Http\Controllers\Saving\SnkController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\TagihanController;
use App\Http\Controllers\TopupController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EncryptionController;

Route::middleware(['guest'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome');
    });
});


// Route::prefix('/snk')->group(function () {
//     // Route::get('/', [SnkController::class, 'index']) ->name('snk.index');          // SNK aktif
//     // Route::get('/{version}', [SnkController::class, 'show'])->name('snk.getshow');
//     // Route::get('/snk/sign', [SignatureController::class, 'verify'])->name('snk.sign');
// });
Route::middleware(['web'])->group(function () {
    Route::prefix('u/{nouid}')->group(function () {

        Route::resource('register', RegisteredUserController::class)->only(['index', 'create', 'store']);
        Route::post('/auth/register', [RegisteredUserController::class, 'store'])->name('auth.register');

        Route::post('/snk', [SnkController::class, 'show'])->name('snk.show');
        Route::get('/snk/sign', [SignatureController::class, 'verify'])->name('snk.sign');

        Route::get('/login', [SiswaController::class, 'index'])->name('login');
        Route::get('/', [SiswaController::class, 'index'])->name('siswa.index');
        Route::post('/verify-pin', [AuthenticatedSessionController::class, 'store'])->name('siswa.verify-pin');
        Route::post('/register-phone', [RegisteredUserController::class, 'verifphone'])->name('siswa.verify-nope');
        Route::get('/setup-pin', [SiswaController::class, 'showSetupPinForm'])->name('siswa.show-setup-pin');
        Route::post('/setup-pin', [RegisteredUserController::class, 'setupPin'])->name('siswa.process-setup-pin');
        Route::get('/lupa-pin', [PasswordResetLinkController::class, 'create'])->name('siswa.show-lupa-pin');
        Route::post('/lupa-pin', [OtpController::class, 'forgotRequestOtp'])->name('siswa.forgot-pin');
        Route::post('/otp/send', [OtpController::class, 'sendOtp'])->name('otp.send');
        Route::post('/otp/verify', [OtpController::class, 'verifyOtp'])->name('otp.verif');

        Route::middleware(['verify.nouid'])->group(function () {
            Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('siswa.logout');
            Route::post('/update', [SiswaController::class, 'update'])->name('siswa.update');
            Route::post('/blocked', [SiswaController::class, 'blocked'])->name('siswa.blocked');
            Route::get('/topup', [TopupController::class, 'index'])->name('topup');
            Route::post('/topup/charge', [TopupController::class, 'charge'])->name('topup.charge');

            // Payment System Routes
            Route::prefix('/payment')->name('payment.')->group(function () {
                Route::get('/', [PaymentController::class, 'index'])->name('index');
                Route::get('/invoice', [PaymentController::class, 'invoice'])->name('invoice');
                Route::get('/invoice/{invoiceId}', [PaymentController::class, 'invoiceDetail'])->name('invoice.detail');
                Route::get('/history', [PaymentController::class, 'history'])->name('history');
                Route::get('/methods', [PaymentController::class, 'methods'])->name('methods');
                Route::get('/success', [PaymentController::class, 'success'])->name('success');
                Route::get('/va-payment', [PaymentController::class, 'vaPayment'])->name('va-payment');

                // API endpoints for payment actions
                Route::post('/invoice/{invoiceId}/download', [PaymentController::class, 'downloadInvoice'])->name('invoice.download');
                Route::post('/invoice/{invoiceId}/print', [PaymentController::class, 'printInvoice'])->name('invoice.print');
                Route::post('/invoice/{invoiceId}/view', [PaymentController::class, 'viewInvoice'])->name('invoice.view');
                Route::post('/process', [PaymentController::class, 'processPayment'])->name('process');
            });

            // Transaction history
            // Route::get('/payment/inv', function () {
            //     return Inertia::render('Payment/Invoice', [
            //         'data' => ['tagihan' => []],
            //     ]);
            // });
            // Route::get('/payment/{orderId}', [TransactionController::class, 'paymentInstruction'])->name('payment.instruction');
            // Route::post('/payment/{orderId}/simulate', [TransactionController::class, 'simulateVa'])->name('payment.simulate');
            // Route::post('/payment/{orderId}/cancel-order', [TransactionController::class, 'cancel'])->name('transactions.cancel');
            Route::get('/transactions/{orderId}/status', [TransactionController::class, 'checkStatus'])->name('transactions.status');
            Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions');
            Route::get('/transactions/{orderId}', [TransactionController::class, 'show'])->name('transactions.show');

            Route::get('/tagihan', [TagihanController::class, 'index'])->name('tagihan.index');
            Route::get('/tagihan/pay', [TagihanController::class, 'show'])->name('tagihan.show');
            Route::post('/tagihan/pay', [TagihanController::class, 'handlePay'])->name('tagihan.pay');
            Route::get('/tagihan/history', [TagihanController::class, 'history'])->name('tagihan.history');

            Route::resource('bill', BillController::class);

            Route::post('/excul/subs', [ExculController::class, 'subs'])->name('subs.excul');
            Route::post('/excul/unsubs', [ExculController::class, 'unsubs'])->name('unsubs.excul');
            Route::post('/izin', [IzinController::class, 'store'])->name('izin.store');
            Route::post('/izin/cancel', [IzinController::class, 'cancel'])->name('izin.cancel');

            // Calendar
            Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar.index');
        });
    });
});

require __DIR__.'/test.php';
// require __DIR__ . '/auth.php';
