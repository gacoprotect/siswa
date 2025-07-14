<?php

namespace App\Http\Controllers;

use App\Helpers\MaskingHelper;
use App\Models\Datmas\Indentitas;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class SiswaController extends Controller
{
    public function index(Request $request)
    {
        $nouid = $request->route('nouid');

        $ident = Indentitas::with('siswa')->where('nouid', $nouid)->firstOrFail();
        if (!$ident) {
            abort(404, 'Data siswa tidak ditemukan');
        }

        if (session()->has('current_nouid') && session('current_nouid') !== $nouid) {
            Auth::guard('siswa')->logout();
            session()->forget('current_nouid');
            return Inertia::render('Siswa/Index', [
                'data' => $ident
            ]);
        }

        // Jika sudah login
        if (Auth::guard('siswa')->check()) {
            // Set session current_nouid jika belum ada
            if (!session()->has('current_nouid')) {
                session(['current_nouid' => $nouid]);
            }

            return Inertia::render('Siswa/Index', [
                'data' => $ident
            ]);
        }
        session(['current_nouid' => $nouid]);
        // Jika belum login, tampilkan form PIN
        return Inertia::render('Siswa/Index', [
            'data' => [
                ...$ident->toArray(),
                'siswa' => $ident->siswa->masked(), // timpa siswa asli dengan versi masked
            ]
        ]);
    }


    public function logout(Request $request, $nouid)
    {
        Auth::guard('siswa')->logout();
        return redirect()->route('siswa.index', ['nouid' => $nouid]);
    }

    public function blocked(Request $request, $nouid): RedirectResponse
    {
        try {
            $identitas = Indentitas::where('nouid', $nouid)->update(['sta' => -1]);

            return redirect()->intended(route('siswa.index', ['nouid' => $nouid]));
        } catch (\Throwable $th) {

            return back()->withErrors(['message' => 'Failed to block the user'])->with([
                'success' => false,
                'message' => 'Gagal Blokir Kartu'
            ]);
        }
    }

    public function test(Request $request, $nouid)
    {
        $test = Indentitas::with(['siswa.safe'])->where('nouid', $nouid)->firstOrFail();
        $siswa = Indentitas::with(['siswa.safe' => function ($qu) {
            $qu->select('ids', 'ala as alamat', 'rt', 'rw', 'cam as kec', 'lur', 'kodpos', 'dusun', 'temtin', 'sakit');
        }])->where('nouid', $nouid)->firstOrFail();
        return response()->json([
            'success' => true,
            'data' => $test
        ]);
    }
}
