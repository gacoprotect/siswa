<?php

use App\Http\Controllers\Admin\IzinController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExculController;
use App\Http\Controllers\Saving\SignatureController;
use App\Http\Controllers\Saving\SnkController;
use App\Http\Controllers\SiswaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Student Routes
|--------------------------------------------------------------------------
|
| Here is where you can register student-related routes for your application.
| These routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group.
|
*/

Route::middleware(['web', 'verify.nouid'])->group(function () {
    Route::prefix('u/{nouid}')->name('student.')->group(function () {
        // Dashboard
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        // Student profile and settings
        Route::post('/update', [SiswaController::class, 'update'])->name('update');
        Route::post('/blocked', [SiswaController::class, 'blocked'])->name('blocked');

        // SNK (Syarat dan Ketentuan) routes
        Route::post('/snk', [SnkController::class, 'show'])->name('snk.show');
        Route::get('/snk/sign', [SignatureController::class, 'verify'])->name('snk.sign');

        // Extracurricular routes
        Route::post('/excul/subs', [ExculController::class, 'subs'])->name('excul.subs');
        Route::post('/excul/unsubs', [ExculController::class, 'unsubs'])->name('excul.unsubs');

        // Permission (Izin) routes
        Route::post('/izin', [IzinController::class, 'store'])->name('izin.store');
        Route::post('/izin/cancel', [IzinController::class, 'cancel'])->name('izin.cancel');

        // Calendar
        Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar.index');
    });
});
