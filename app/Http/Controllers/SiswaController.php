<?php

namespace App\Http\Controllers;

use App\Helpers\MaskingHelper;
use App\Models\Indentitas;
use App\Models\Siswa;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SiswaController extends Controller
{
    public function index($nouid)
    {

        $indentitas = Indentitas::where('nouid', $nouid)->firstOrFail();
        $siswa = $indentitas->siswa()->first();

        $baseQuery = Transaction::where('nouid', $nouid)
            ->where('status', 'success');
        $totalMasuk = (float) $baseQuery
            ->whereIn('type', ['topup', 'refund'])
            ->sum('amount');
        $totalKeluar = (float) $baseQuery
            ->whereIn('type', ['payment', 'withdraw'])
            ->sum('amount');
        $saldo = $totalMasuk - $totalKeluar;
        if (!$siswa) {
            abort(404, 'Data siswa tidak ditemukan');
        }

        
        if (empty($siswa->pin)) {
            return Inertia::render('Siswa/Index', [
                'nouid' => $nouid,
                "hasPin" => false,
                'siswa' => [
                    "namlen" => MaskingHelper::maskString($siswa->namlen),
                    "nis" => MaskingHelper::maskNumber($siswa->nis),
                    "kel" => MaskingHelper::maskClass($siswa->kel),
                    "tel" => MaskingHelper::maskPhone($siswa->tel),
                ],
                'error' => session('error'),
            ]);
        }


        if (session()->has('current_nouid') && session('current_nouid') !== $nouid) {
            Auth::guard('siswa')->logout();
            session()->forget('current_nouid');
            return Inertia::render('Siswa/Index', [
                'toggle' => 'log',
                'nouid' => $nouid,
                'error' => 'Sesi sebelumnya telah berakhir, silakan login kembali'
            ]);
        }

        // Jika sudah login
        if (Auth::guard('siswa')->check()) {
            // Set session current_nouid jika belum ada
            if (!session()->has('current_nouid')) {
                session(['current_nouid' => $nouid]);
            }

            return Inertia::render('Siswa/Index', [
                'saldo' => $saldo,
                "hasPin" => true,
                'toggle' => null,
                'siswa' => $siswa,
                'nouid' => $nouid,
            ]);
        }
        session(['current_nouid' => $nouid]);
        // Jika belum login, tampilkan form PIN
        return Inertia::render('Siswa/Index', [

            'nouid' => $nouid,
            "hasPin" => true,
            'siswa' => [
                "namlen" => MaskingHelper::maskString($siswa->namlen),
                "nis" => MaskingHelper::maskNumber($siswa->nis),
                "kel" => MaskingHelper::maskClass($siswa->kel),
                "tel" => MaskingHelper::maskPhone($siswa->tel),
            ],
            'error' => session('error'),
        ]);
    }


    public function logout(Request $request, $nouid)
    {
        Auth::guard('siswa')->logout();
        return redirect()->route('siswa.index', ['nouid' => $nouid]);
    }

    public function verifnope(Request $request) {}
}
