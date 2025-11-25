<?php

use App\Http\Controllers\Api\ApiDatmas;
use App\Http\Controllers\Api\ApiTransactions;
use App\Http\Controllers\Snap\SnapController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['api'])->group(function () {
    // Transaction API routes
    Route::prefix('transactions')->name('api.transactions.')->group(function () {
        Route::get('topup/{nouid}/va', [ApiTransactions::class, 'reqVA'])->name('topup.va');
        Route::post('bills/{nouid}/page', [ApiTransactions::class, 'tagihan'])->name('bills.page');
        Route::get('bills/{nouid}/current', [ApiTransactions::class, 'getTambahTagihan'])->name('bills.current');
        Route::get('bills/{nouid}/exists', [ApiTransactions::class, 'getExistTagihan'])->name('bills.exists');
    });

    // Student data API routes
    Route::prefix('students')->name('api.students.')->group(function () {
        Route::get('{nouid}/index', [ApiDatmas::class, 'siswa'])->name('index');
        Route::get('{nouid}/excul', [ApiDatmas::class, 'getExcul'])->name('excul');
    });

    // General data API routes
    Route::prefix('data')->name('api.data.')->group(function () {
        Route::get('wilayah/{kod?}', [ApiDatmas::class, 'getWilayah'])->name('wilayah');
    });

    // // Generic Snap BI API routes
    // Route::prefix('v1.0')->name('api.snap.')->group(function () {
    //     Route::get('access-token', [SnapController::class, 'getAccessToken'])->name('bank.access-token');
    //     Route::get('signature-auth', [SnapController::class, 'getSignatureAuth'])->name('bank.signature-auth');
    // });



    // OCBC NISP API Simulation Route (Mock Server)
    Route::prefix('v1.0')->name('api.ocbc.mock.')->group(function () {
        Route::prefix('utilities')->name('utilites.')->group(function () {
            Route::post('signature-auth', [\App\Http\Controllers\Test\SnapTestController::class, 'signatureAuth'])->name('signature-auth');
            Route::post('signature-service', [\App\Http\Controllers\Test\SnapTestController::class, 'signatureService'])->name('signature-service');
        });
        Route::prefix('transfer-va')->name('va.')->group(function () {
            Route::post('inquiry', [\App\Http\Controllers\Test\SnapTestController::class, 'inquiry'])->name('inquiry');
            Route::post('payment', [\App\Http\Controllers\Test\SnapTestController::class, 'payment'])->name('payment');
            Route::post('update-status', [\App\Http\Controllers\Test\SnapTestController::class, 'update-status'])->name('update-status');
            Route::post('status', [\App\Http\Controllers\Test\SnapTestController::class, 'status'])->name('status');
        });
        Route::post('/access-token/b2b', [\App\Http\Controllers\Test\SnapTestController::class, 'token'])->name('access-token.b2b');
    });
});
