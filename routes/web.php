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

// Include route files
require __DIR__.'/auth.php';
require __DIR__.'/student.php';
require __DIR__.'/payment.php';
require __DIR__.'/admin.php';
require __DIR__.'/test.php';
