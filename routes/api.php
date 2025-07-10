<?php

use App\Http\Controllers\Api\ApiDatmas;
use App\Http\Controllers\Api\ApiTransactions;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;


Route::get('topup/{nouid}/va', [ApiTransactions::class, 'reqVA'])->name('api.reqVA');
Route::post('bills/{nouid}/page', [ApiTransactions::class, 'tagihan'])->name('api.tagihan');
Route::get('bills/{nouid}/current', [ApiTransactions::class, 'getTambahTagihan'])->name('api.tagihan.add');
Route::get('bills/{nouid}/exists', [ApiTransactions::class, 'getExistTagihan'])->name('api.tagihan.exists');
Route::get('siswa/{nouid}/index', [ApiDatmas::class, 'siswa'])->name('api.siswa');
Route::get('siswa/{nouid}/excul', [ApiDatmas::class, 'getExcul'])->name('api.excul');
