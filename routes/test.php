<?php

use App\Http\Controllers\Auth\TestRegistrasiUser;
use App\Http\Controllers\ExculController;
use App\Http\Controllers\Test\SnapTestController;
use App\Http\Controllers\Test\TestController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Test Routes
|--------------------------------------------------------------------------
|
| Here is where you can register test routes for your application.
| These routes are only available in debug mode.
|
*/

Route::prefix('/test')->group(function () {
    if (config('app.debug')) {
        // Test dashboard and general routes
        Route::get('/excul', [ExculController::class, 'listExcul'])->name('test.excul');
        Route::get('/dashboard', [TestController::class, 'index'])->name('test.dashboard');
        Route::get('/home', [TestController::class, 'home'])->name('test.home');
        Route::get('/filter', [TestController::class, 'filterRiwayat'])->name('test.filter');

        // Test registration routes
        Route::prefix('/{nouid}/register')->name('test.register.')->group(function () {
            Route::get('/', [TestRegistrasiUser::class, 'create'])->name('create');
            Route::post('/', [TestRegistrasiUser::class, 'create'])->name('store');
        });

        // Test service routes
        Route::prefix('/{nouid}/service')->name('test.service.')->group(function () {
            Route::get('/', [TestController::class, 'service'])->name('index');
            Route::post('/', [TestController::class, 'service'])->name('store');
        });

        // Simulation routes
        Route::prefix('/simulasi')->name('test.simulasi.')->group(function () {
            Route::prefix('/excul')->name('excul.')->group(function () {
                Route::get('/{simulasi}', [ExculController::class, 'simulasi'])->name('show');
            });
            Route::prefix('/registrasi')->name('registrasi.')->group(function () {
                Route::get('/{sim}', [TestRegistrasiUser::class, 'simulasi'])->name('show');
            });
        });
    }
});
