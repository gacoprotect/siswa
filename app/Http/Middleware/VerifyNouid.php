<?php

namespace App\Http\Middleware;

use App\Models\Datmas\Indentitas;
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

            // 1. Skip middleware for login routes
            if ($request->routeIs('siswa.index') || $request->routeIs('siswa.login')) {
                return $next($request);
            }

            // 2. Verify nouid exists
            $ident = Indentitas::where('nouid', $nouid)->firstOrFail();
            if (!$ident) {
                Log::warning('Student data not found', ['nouid' => $nouid]);
                abort(404, 'Data siswa tidak ditemukan');
            }
            if (!$ident->active) {
                Auth::guard('siswa')->logout();
                Log::info('Redirecting to login - unauthenticated', ['nouid' => $nouid]);
                return $this->redirectToLogin($nouid);
            }
            // 3. Handle non-authenticated user
            if (!Auth::guard('siswa')->check()) {
                Log::info('Redirecting to login - unauthenticated', ['nouid' => $nouid]);
                return $this->redirectToLogin($nouid);
            }

            // 4. Verify session nouid match
            if (session('current_nouid') !== $nouid) {
                Log::warning('Invalid session detected', [
                    'session_nouid' => session('current_nouid'),
                    'route_nouid' => $nouid
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
                'trace' => $e->getTraceAsString()
            ]);

            return $this->redirectToLogin($nouid ?? '')
                ->withErrors(['message' => 'Terjadi kesalahan sistem']);
        }
    }

    protected function redirectToLogin(string $nouid)
    {
        return redirect()->route('siswa.index', ['nouid' => $nouid]);
    }
}
