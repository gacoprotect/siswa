<?php

use App\Http\Controllers\Admin\BillController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register admin-related routes for your application.
| These routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group.
|
*/

Route::middleware(['web', 'verify.nouid', 'menu.access'])->group(function () {
    Route::prefix('u/{nouid}')->name('admin.')->group(function () {
        // Bill management routes
        Route::resource('bill', BillController::class);
    });
});
