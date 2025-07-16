<?php

namespace App\Http\Controllers\Saving;

use App\Http\Controllers\Controller;
use App\Models\Datmas\Indentitas;
use App\Models\Saving\Tsnk;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Saving\Models\TsnkPoint;

class SnkController extends Controller
{
    public function index()
    {
        // Ambil versi SNK aktif
        $snk = Tsnk::where('is_active', true)->with('points')->first();

        if (!$snk) {
            return response()->json(['message' => 'SNK belum tersedia'], 404);
        }

        return response()->json([
            'version' => $snk->version,
            'title' => $snk->title,
            'summary' => $snk->summary,
            'points' => $snk->points->map(function ($point) {
                return [
                    'nmr' => $point->nmr,
                    'title' => $point->title,
                    'content' => $point->content,
                ];
            }),
        ]);
    }

    public function show(Request $req, $version = null)
    {
        $v = $req->validate([
            'nouid' => 'sometimes|string|exists:mai2.tindentitas,nouid',
            'nama'    => 'required_if:nouid,!null|string',
            'nik'     => 'required_if:nouid,!null|numeric|digits:16',
            'kabName' => 'required_if:nouid,!null|string',
        ]);

        $query = Tsnk::with(['points' => fn($q) => $q->orderBy('nmr')])
            ->where('is_active', true);

        if ($version !== null) {
            $query->where('version', $version);
        }

        $snk = $query->firstOrFail();
        if (isset($v['nouid'])) {
            $siswa = Indentitas::where('nouid', $v['nouid'])->with('siswa')->firstOrFail()->siswa;

            $signatureData = [
                'nouid' => $v['nouid'] ?? '',
                'snk_version' => $snk->version,
                'nama' => $v['nama'] ?? '',
                'nik' => $v['nik'] ?? '',
                'waktu' => now()->toISOString()
            ];
            $signature = SignatureController::getSign($signatureData);
            logger(['sign' =>$signature]);
            
        }
        return Inertia::render('Snk/Show', [
            'version' => $snk->version,
            'effective' => $snk->effective,
            'title' => $snk->title,
            'summary' => $snk->summary,
            'points' => $snk->points->map(fn($point) => [
                'nmr' => $point->nmr,
                'title' => $point->title,
                'content' => $point->content,
            ]),
            'qr_code_svg' => $signature['qr_code_svg'] ?? null,
            'sign' => $signature['sign'] ?? null,
            'ortu' => isset($v['nama']) ? $v['nama'] : '',
            'siswa' => isset($v['nouid']) ? $siswa->namlen : '',
            'kota' => isset($v['kabName']) ? $v['kabName'] . ', ' . now()->translatedFormat('d F Y') : '',
        ]);
    }
}
