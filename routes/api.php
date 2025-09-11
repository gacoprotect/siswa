<?php

use App\Http\Controllers\Api\ApiDatmas;
use App\Http\Controllers\Api\ApiTransactions;
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
});
