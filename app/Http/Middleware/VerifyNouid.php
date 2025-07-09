<?php

namespace App\Http\Middleware;

use App\Models\Datmas\Indentitas;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class VerifyNouid
{
    public function handle(Request $request, Closure $next): Response
    {
        $nouid = $request->route('nouid');
        
        // 1. Skip middleware untuk route login
        if ($request->routeIs('siswa.index') || $request->routeIs('siswa.login')) {
            return $next($request);
        }

        // 2. Verifikasi nouid
        if (!Indentitas::where('nouid', $nouid)->exists()) {
            abort(404, 'Data siswa tidak ditemukan');
        }

        // 3. Handle untuk non-authenticated user
        if (!Auth::guard('siswa')->check()) {
            return $this->redirectToLogin($nouid);
        }

        // 4. Verifikasi kesesuaian nouid session
        if (session('current_nouid') !== $nouid) {
            Auth::guard('siswa')->logout();
            return $this->redirectToLogin($nouid)
                ->withErrors(['message'=>'Sesi tidak valid']);
        }

        return $next($request);
    }

    protected function redirectToLogin(string $nouid)
    {
        // Gunakan redirect biasa untuk menghindari 409 pada Inertia
        return redirect()->route('siswa.index', ['nouid' => $nouid]);
    }
}