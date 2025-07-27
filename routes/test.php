<?php

use App\Http\Controllers\Auth\TestRegistrasiUser;
use App\Http\Controllers\ExculController;
use App\Http\Controllers\Test\TestController;
use Illuminate\Support\Facades\Route;


Route::prefix('/test')->group(function () {
    if (config('app.debug')) {
        Route::get('/excul', [ExculController::class, 'listExcul'])->name('test');
        Route::get('/dashboard', [TestController::class, 'index'])->name('test.dashboard');
        Route::get('/home', [TestController::class, 'home'])->name('test.home');
        Route::get('/filter', [TestController::class, 'filterRiwayat'])->name('test.filter');
        Route::get('/{nouid}/register', [TestRegistrasiUser::class, 'create'])->name('test.register');
        Route::post('/{nouid}/register', [TestRegistrasiUser::class, 'create'])->name('test.register');

        Route::prefix('/simulasi')->group(function () {
            Route::prefix('/excul')->group(function () {
                Route::get('/{simulasi}', [ExculController::class, 'simulasi'])->name('simulasi.excul');
            });
            Route::prefix('/registrasi')->group(function () {
                Route::get('/{sim}', [TestRegistrasiUser::class, 'simulasi'])->name('simulasi.reg');
            });
        });
    }
});
