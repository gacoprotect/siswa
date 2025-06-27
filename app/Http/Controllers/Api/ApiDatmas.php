<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Datmas\Indentitas;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class ApiDatmas extends Controller
{
    public function siswa(Request $req)
    {
        $v = $req->validate([
            'nouid' => 'required|string|exists:mai2.tindentitas,nouid'
        ]);
        $ident = Indentitas::with('siswa.balance')->where('nouid', $v['nouid'])->firstOrFail();
        return response()->json([
            'success' => true,
            'data' => $ident,
        ]);
    }
}
