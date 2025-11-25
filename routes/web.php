<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Welcome page for guests
Route::middleware(['guest'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome');
    });
});

// Error Pages - Must be accessible without authentication to avoid redirect loops
// Route without parameter first (more specific)
Route::get('/error', [\App\Http\Controllers\ErrorController::class, 'show'])->name('error');

// Route with numeric code parameter only - this will NOT match non-numeric strings like "istory.back()"
Route::get('/error/{code}', [\App\Http\Controllers\ErrorController::class, 'show'])
    ->where('code', '[0-9]+')
    ->name('error.show');

// SNAP Error Page (kept for backward compatibility)
Route::get('/snap/error', [\App\Http\Controllers\Snap\SnapErrorController::class, 'show'])->name('snap.error');

// Include route files
require __DIR__.'/auth.php';
require __DIR__.'/student.php';
require __DIR__.'/payment.php';
require __DIR__.'/admin.php';
require __DIR__.'/test.php';
