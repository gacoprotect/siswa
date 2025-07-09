<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function create(Request $request): Response
    {
        $nouid = $request->route('nouid');

        return Inertia::render('Auth/Login', [
            'nouid' => $nouid,
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    public function store(LoginRequest $request)
    {
        $nouid = $request->route('nouid');

        $request->authenticate();

        $request->session()->regenerate();
        session(['current_nouid' => $nouid]);

        // Redirect berdasarkan parameter atau default
        if (in_array($request->input('p'),['riwayat', 'index'])) {
            $redirectRoute = $request->input('p') === 'riwayat'
                ? 'transactions'
                : 'siswa.index';

            return redirect()->route($redirectRoute, ['nouid' => $nouid]);
        }

        return back()->with([
            'success' => true,
            'message' => 'Pin terverifikasi',
        ]);
    }

    public function destroy(Request $request, $nouid): RedirectResponse
    {
        Auth::guard('siswa')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        session()->forget('current_nouid');

        return redirect()->route('siswa.index', ['nouid' => $nouid]);
    }
}
