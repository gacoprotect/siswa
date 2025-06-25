<?php

use App\Http\Controllers\Api\ApiTransactions;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;


Route::get('topup/{nouid}/va', [ApiTransactions::class, 'reqVA'])->name('api.reqVA');
