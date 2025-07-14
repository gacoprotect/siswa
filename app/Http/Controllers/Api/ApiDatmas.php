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

            $ident = Indentitas::with(['siswa.safe' => function ($qu) {
                $qu->select('ids', 'ala', 'rt', 'rw', 'cam', 'lur', 'kodpos', 'dusun', 'temtin', 'sakit');
            }])->where('nouid', $v['nouid'])->firstOrFail();

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

    public function getWilayah(Request $req, $kod = null)
    {
        try {
            $levelNames = ['provinsi', 'kabupaten', 'kecamatan', 'desa'];
            $maxLevel = count($levelNames) - 1;

            // Handle case ketika kode null (ambil semua provinsi)
            if ($kod === null) {
                $wilayah = Wilayah::whereRaw("kod NOT LIKE '%.%'")
                    ->orderBy('kod')
                    ->get(['kod as id', 'nam as nama']);

                return response()->json([
                    'success' => true,
                    'level' => $levelNames[0],
                    'data' => $wilayah->map(function ($item) use ($levelNames) {
                        return [
                            'id' => $item->id,
                            'nama' => $item->nama,
                            'level' => $levelNames[0]
                        ];
                    })
                ]);
            }

            // Validasi dan normalisasi input
            $kod = trim($kod);
            if (!preg_match('/^(\d+)(\.\d+)*$/', $kod)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Format kode wilayah tidak valid.',
                ], 400);
            }

            $currentLevel = substr_count($kod, '.');

            // Jika ini kode level terakhir (desa), kembalikan data lengkap
            if ($currentLevel === $maxLevel) {
                return $this->getFullHierarchy($kod);
            }

            // Validasi level
            if ($currentLevel >= $maxLevel) {
                return response()->json([
                    'success' => false,
                    'message' => 'Level wilayah tidak tersedia.',
                ], 400);
            }

            $nextLevel = $currentLevel + 1;

            // Query untuk level berikutnya
            $wilayah = Wilayah::where('kod', 'REGEXP', '^' . preg_quote($kod) . '\.\d+$')
                ->orderBy('kod')
                ->get(['kod as id', 'nam as nama']);

            $code = $req->route('kod'); //33.06.07
            $cLevel = substr_count($code, '.');
            $wil = Wilayah::where('kod', $code)
                ->select('kod as id', 'nam as nama')
                ->firstOrFail();

            $d = array_merge(
                $wil->toArray(),
                ['level' => $levelNames[$cLevel] ?? 'unknown']
            );

            return response()->json([
                'success' => true,
                'wilayah' => $d,
                'level' => $levelNames[$nextLevel] ?? 'unknown',
                'data' => $wilayah->map(function ($item) use ($levelNames, $nextLevel) {
                    return [
                        'id' => $item->id,
                        'nama' => $item->nama,
                        'level' => $levelNames[$nextLevel] ?? 'unknown'
                    ];
                })
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server.',
                'error' => env('APP_DEBUG') ? $th->getMessage() : null
            ], 500);
        }
    }

    // Fungsi baru untuk mendapatkan hierarki lengkap
    protected function getFullHierarchy($kod)
    {
        $levels = explode('.', $kod);
        $hierarchy = [];
        $currentCode = '';

        foreach ($levels as $index => $part) {
            $currentCode = $index === 0 ? $part : $currentCode . '.' . $part;
            $wilayah = Wilayah::where('kod', $currentCode)
                ->first(['kod as id', 'nam as nama']);

            if (!$wilayah) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data wilayah tidak lengkap',
                ], 404);
            }

            $hierarchy[] = [
                'id' => $wilayah->id,
                'nama' => $wilayah->nama,
                'level' => ['provinsi', 'kabupaten', 'kecamatan', 'desa'][$index] ?? 'unknown'
            ];
        }

        return response()->json([
            'success' => true,
            'level' => 'desa',
            'data' => [
                'detail' => end($hierarchy), // Data desa
                'hierarchy' => $hierarchy   // Seluruh hierarki
            ]
        ]);
    }
}
