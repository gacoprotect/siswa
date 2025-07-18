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

    public function show(Request $req, $nouid = null, $version = null)
    {
        if (env("APP_DEBUG")) {
            logger("SNK REQUEST", ['data' => $req->all()]);
        }
        $v = $req->validate([
            'nouid' => 'sometimes|string|exists:mai2.tindentitas,nouid',
            'warneg'    => 'required_if:nouid,!null|string',
            'nama'    => 'required_if:nouid,!null|string',
            'nik'     => 'required_if:warneg,ID|numeric|digits:16',
            'paspor'     => 'required_if:warneg,!ID|string',
            'kabName' => 'required_if:nouid,!null|string',
        ]);
        $requiredFields = ['warneg', 'nama', 'kabName'];
        $missing = array_filter($requiredFields, fn($f) => empty($v[$f] ?? null));

        if (!empty($v['nouid']) && !empty($missing)) {
            if (($v['warneg'] ?? '') === 'ID') {
                if (empty($v['nik'])) abort(404, 'NIK wajib diisi');
            } else {
                if (empty($v['paspor'])) abort(404, 'Paspor wajib diisi');
            }
        }
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
                'id' => $v['warneg'] === 'ID' ? $v['nik'] : $v['paspor'] ?? '',
                'waktu' => now()->toISOString()
            ];
            $signature = SignatureController::getSign($signatureData, $v['nouid']);
            logger(['sign' => $signature]);
            return back()->with([
                'data' => [
                    'payload' => encrypt($signatureData),
                    'qr_code_svg' => $signature['qr_code_svg'] ?? null,
                    'sign' => $signature['sign'] ?? null,
                    'ortu' => isset($v['nama']) ? $v['nama'] : '',
                    'siswa' => isset($v['nouid']) ? $siswa->namlen : '',
                    'kota' => isset($v['kabName']) ? $v['kabName'] . ', ' . now()->translatedFormat('d F Y') : '',
                ],
            ])->withInput();
        }
        return Inertia::render('Snk/Show', [
            'data' => [
                'version' => $snk->version,
                'effective' => $snk->effective,
                'title' => $snk->title,
                'summary' => $snk->summary,
                'points' => $snk->points->map(fn($point) => [
                    'nmr' => $point->nmr,
                    'title' => $point->title,
                    'content' => $point->content,
                ]),
            ],
        ]);
    }
}
