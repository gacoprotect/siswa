<?php

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\TagihanController;
use App\Http\Controllers\TopupController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Payment & Transaction Routes
|--------------------------------------------------------------------------
|
| Here is where you can register payment and transaction related routes for your application.
| These routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group.
|
*/

Route::middleware(['web', 'verify.nouid'])->group(function () {
    Route::prefix('u/{nouid}')->name('payment.')->group(function () {
        // Topup routes
        Route::prefix('/topup')->name('topup.')->group(function () {
            Route::get('/', [TopupController::class, 'index'])->name('index');
            Route::post('/charge', [TopupController::class, 'charge'])->name('charge');
        });

        // Transaction routes
        Route::prefix('/transactions')->name('transactions.')->group(function () {
            Route::get('/', [TransactionController::class, 'index'])->name('index');
            Route::get('/{orderId}', [TransactionController::class, 'show'])->name('show');
            Route::get('/{orderId}/status', [TransactionController::class, 'checkStatus'])->name('status');
        });

        // Payment system routes
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

        // Bill/Tagihan routes
        Route::prefix('/tagihan')->name('tagihan.')->group(function () {
            Route::get('/', [TagihanController::class, 'index'])->name('index');
            Route::get('/pay', [TagihanController::class, 'show'])->name('show');
            Route::post('/pay', [TagihanController::class, 'handlePay'])->name('pay');
            Route::get('/history', [TagihanController::class, 'history'])->name('history');
        });

        // Transaction history
        Route::get('/riwayat', [TopupController::class, 'index'])->name('riwayat.index');
    });
});

