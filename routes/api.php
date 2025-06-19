<?php

use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

Route::prefix('/api')->group(function () {

    Route::post('/midtrans/callback', [TransactionController::class, 'handleCallback']);
});
