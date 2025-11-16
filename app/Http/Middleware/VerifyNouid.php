<?php

namespace App\Http\Middleware;

use App\Models\Datmas\Indentitas;
use App\Models\Saving\Tregistrasi;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class VerifyNouid
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $nouid = $request->route('nouid');

            // 1. Skip middleware for login routes and dashboard
            if ($request->routeIs('student.dashboard') || $request->routeIs('siswa.login') || $request->routeIs('login')) {
                return $next($request);
            }

            // 2. Verify nouid exists
            $ident = Indentitas::where('nouid', $nouid)->first();
            if (! $ident) {
                Log::warning('Student data not found', ['nouid' => $nouid]);

                return redirect()->route('register.create', ['nouid' => $nouid])
                    ->withErrors(['message' => 'Data siswa tidak ditemukan']);
            }

            // 3. Check if user is registered
            if ($ident->reg === 0) {
                // Check if user has registration record in Tregistrasi table
                $reg = Tregistrasi::where('nouid', $nouid)->first();

                if ($reg && in_array($reg->sta, [-2, -1, 0, 1])) {
                    // User has registration record, redirect to dashboard
                    Log::info('User has registration record, redirecting to dashboard', [
                        'nouid' => $nouid,
                        'reg_status' => $reg->sta,
                    ]);

                    return redirect()->route('dashboard', ['nouid' => $nouid]);
                }

                // User not registered, redirect to register
                Log::info('User not registered, redirecting to register', ['nouid' => $nouid]);

                return redirect()->route('register.create', ['nouid' => $nouid])
                    ->withErrors(['message' => 'Silakan daftar terlebih dahulu']);
            }

            if (! $ident->active) {
                Auth::guard('siswa')->logout();
                Log::info('User account inactive, redirecting to login', ['nouid' => $nouid]);

                return $this->redirectToLogin($nouid);
            }
            // 4. Handle non-authenticated user
            if (! Auth::guard('siswa')->check()) {
                Log::info('User not authenticated, redirecting to login', ['nouid' => $nouid]);

                return $this->redirectToLogin($nouid);
            }

            // 5. Verify session nouid match
            if (session('current_nouid') !== $nouid) {
                Log::warning('Invalid session detected', [
                    'session_nouid' => session('current_nouid'),
                    'route_nouid' => $nouid,
                ]);
                Auth::guard('siswa')->logout();

                return $this->redirectToLogin($nouid)
                    ->withErrors(['message' => 'Sesi tidak valid']);
            }

            return $next($request);
        } catch (\Exception $e) {
            Log::error('VerifyNouid middleware failed', [
                'nouid' => $nouid ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return $this->redirectToLogin($nouid ?? '')
                ->withErrors(['message' => 'Terjadi kesalahan sistem']);
        }
    }

    protected function redirectToLogin(string $nouid)
    {
        // User registered but not authenticated, redirect to dashboard (login page)
        return redirect()->route('dashboard', ['nouid' => $nouid]);
    }
}
