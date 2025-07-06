<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Datmas\Excul;
use App\Models\Datmas\Indentitas;
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
}
