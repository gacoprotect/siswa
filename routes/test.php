<?php

use App\Http\Controllers\Auth\RegistrasiUser;
use App\Http\Controllers\Test\TestController;
use Illuminate\Support\Facades\Route;


Route::prefix('/test')->group(function(){
    Route::get('/dashboard', [TestController::class, 'index'])->name('test.dashboard');
    Route::get('/home', [TestController::class, 'home'])->name('test.home');
    Route::get('/filter', [TestController::class, 'filterRiwayat'])->name('test.filter');
    Route::get('/{nouid}/register', [RegistrasiUser::class, 'create'])->name('test.register');
    Route::post('/{nouid}/register', [RegistrasiUser::class, 'create'])->name('test.register');
});