<?php

namespace App\Http\Controllers;

use App\Models\Datmas\Excul;
use App\Models\Datmas\Indentitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExculController extends Controller
{
    public function subs(Request $req, $nouid)
    {
        $v = $req->validate([
            'excul' => 'required|integer|exists:mai2.texcul,id'
        ]);

        try {
            $siswa = Indentitas::with('siswa')->where('nouid', $nouid)->firstOrFail()->siswa;
            $subs = $siswa->excul ?? [];

            if (in_array($v['excul'], $subs)) {
                return back()->with([
                    'success' => false,
                    'message' => "Ekskul sudah pernah didaftarkan.",
                ]);
            }

            $subs[] = $v['excul'];
            DB::transaction(function () use ($siswa, $subs, $v) {
                $siswa->update(['excul' => $subs]);
                Excul::where('id', $v['excul'])->increment('registered');
            });

            return back()->with([
                "success" => true,
                "message" => "Berhasil Mendaftar Ekstrakulikuler"
            ]);
        } catch (\Exception $e) {
            logger("Error Menambahkan Excul", ['error' => $e->getMessage()]);
            return back()->with([
                'success' => false,
                'message' => "Terjadi kesalahan"
            ])->withErrors([
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function unsubs(Request $req, $nouid)
    {
        $v = $req->validate([
            'excul' => 'required|integer|exists:mai2.texcul,id'
        ]);

        try {
            $siswa = Indentitas::with('siswa')->where('nouid', $nouid)->firstOrFail()->siswa;
            $subs = $siswa->excul ?? [];

            // Jika ekskul belum terdaftar, kembalikan 409
            if (!in_array($v['excul'], $subs)) {
                return back()->with([
                    'success' => false,
                    'message' => 'Anda belum terdaftar.',
                ], 409);
            }

            // Hapus ekskul
            $subs = array_filter($subs, fn($item) => $item != $v['excul']);
            DB::transaction(function () use ($siswa, $subs, $v) {
                $siswa->update(['excul' => array_values($subs)]);
                Excul::where('id', $v['excul'])->decrement('registered');
            });
            return back()->with([
                'success' => true,
                'message' => 'Berhasil membatalkan pendaftaran ekskul.',
            ]);
        } catch (\Exception $e) {
            logger("Error Membatalkan Excul", ['error' => $e->getMessage()]);
            return back()->with([
                'success' => false,
                'message' => 'Terjadi kesalahan',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
