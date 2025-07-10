<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Datmas\Excul;
use App\Models\Datmas\Indentitas;
use App\Models\Datmas\Wilayah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ApiDatmas extends Controller
{
    public function siswa(Request $req)
    {
        try {
            $v = $req->validate([
                'nouid' => 'required|string|exists:mai2.tindentitas,nouid'
            ]);

            logger()->debug('Mencari identitas siswa', ['nouid' => $v['nouid']]);

            $ident = Indentitas::with('siswa')->where('nouid', $v['nouid'])->firstOrFail();

            return response()->json([
                'success' => true,
                'data' => $ident,
            ]);
        } catch (\Throwable $e) {
            logger()->error('Gagal mendapatkan data siswa', [
                'error' => $e->getMessage(),
                'request' => $req->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat memuat data siswa.',
            ], 500);
        }
    }

    public function getExcul(Request $req)
    {
        try {
            $v = $req->validate([
                'nouid' => 'required|string|exists:mai2.tindentitas,nouid'
            ]);

            logger()->debug('Memuat data ekstrakurikuler untuk siswa', ['nouid' => $v['nouid']]);

            $ident = Indentitas::with('siswa')->where('nouid', $v['nouid'])->firstOrFail();
            $sub = $ident->siswa->excul ?? [];

            $excul = Excul::all();

            return response()->json([
                'success' => true,
                'data' => [
                    'sub' => $sub,
                    'excul' => $excul,
                ],
            ]);
        } catch (\Throwable $e) {
            logger()->error('Gagal memuat data ekstrakurikuler', [
                'error' => $e->getMessage(),
                'request' => $req->all(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat memuat data ekstrakurikuler.',
            ], 500);
        }
    }

    public function getWilayah(Request $req, $kod = '')
    {
        try {
            $level = substr_count($kod, '.');
            $nextLevel = $level + 1;

            $levelNames = ['provinsi', 'kabupaten', 'kecamatan', 'desa'];
            $currentLevelName = $levelNames[$nextLevel] ?? 'unknown';

            if ($kod === '') {
                // Ambil data provinsi (kod tanpa titik)
                $wil = Wilayah::whereRaw("kod NOT LIKE '%.%'")
                    ->orderBy('kod')
                    ->get(['kod', 'nam']);
            } else {
                $wil = Wilayah::where('kod', 'like', $kod . '.%')
                    ->whereRaw("LENGTH(kod) - LENGTH(REPLACE(kod, '.', '')) = ?", [$nextLevel])
                    ->orderBy('kod')
                    ->get(['kod', 'nam']);
            }

            // Tambah level ke setiap data
            $wilayah = $wil->map(function ($item) use ($currentLevelName) {
                return [
                    'kod' => $item->kod,
                    'nama' => $item->nam,
                    'level' => $currentLevelName,
                ];
            });

            return response()->json([
                'success' => true,
                'level' => $currentLevelName,
                'data' => $wilayah,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data wilayah.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
