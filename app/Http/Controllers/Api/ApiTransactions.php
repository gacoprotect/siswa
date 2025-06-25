<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class ApiTransactions extends Controller
{
    public function reqVA()
    {
        $va = generateVaNumber();
        return response()->json([
            'success' => true,
            'va_number' => $va
        ]);
    }
}
