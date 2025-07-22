<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function create(Request $request): Response
    {
        try {
            $nouid = $request->route('nouid');

            return Inertia::render('Auth/Login', [
                'nouid' => $nouid,
                'canResetPassword' => Route::has('password.request'),
                'status' => $request->session()->get('status'),
                'errors' => $request->session()->get('errors')?->getBag('default')?->getMessages(),
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to render login page', [
                'nouid' => $nouid ?? null,
                'error' => $e->getMessage()
            ]);

            // Fallback to a simple error page if Inertia fails
            return Inertia::render('Error', [
                'status' => 500,
                'message' => 'Gagal memuat halaman login'
            ]);
        }
    }

    public function store(LoginRequest $request)
    {
        try {
            $nouid = $request->route('nouid');

            $request->authenticate();
            $request->session()->regenerate();
            session(['current_nouid' => $nouid]);

            Log::info('User authenticated successfully', ['nouid' => $nouid]);

            // Redirect based on parameter or default
            if (in_array($request->input('p'), ['riwayat', 'index'])) {
                $redirectRoute = $request->input('p') === 'riwayat'
                    ? 'transactions'
                    : 'siswa.index';

                return redirect()->route($redirectRoute, ['nouid' => $nouid]);
            }

            return back()->with([
                'success' => true,
                'message' => 'Pin terverifikasi',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Login process failed', [
                'nouid' => $nouid ?? null,
                'error' => [
                    'errors' => $e->errors(),
                    'message' => $e->getMessage()
                ],
            ]);

            // Untuk tampilan web, cukup kirim pesan error sederhana
            return back()->withErrors([
                'pin' => 'PIN yang Anda Masukkan Salah',
                'attempt_count' => $e->errors()['attempt']['attempt_count'] ?? null,
                'remaining_attempts' => $e->errors()['attempt']['remaining'] ?? null
            ])->withInput();
        } catch (\Exception $e) {
            Log::error('Login process Error', [
                'nouid' => $nouid ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors([
                'message' => 'Terjadi kesalahan saat proses login. Silakan coba lagi.',
            ])->withInput();
        }
    }

    public function destroy(Request $request, $nouid): RedirectResponse
    {
        try {
            Auth::guard('siswa')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            session()->forget('current_nouid');

            Log::info('User logged out', ['nouid' => $nouid]);

            return redirect()->route('siswa.index', ['nouid' => $nouid]);
        } catch (\Exception $e) {
            Log::error('Logout failed', [
                'nouid' => $nouid,
                'error' => $e->getMessage()
            ]);

            return redirect()->route('siswa.index', ['nouid' => $nouid])
                ->withErrors(['message' => 'Terjadi kesalahan saat logout']);
        }
    }
}
