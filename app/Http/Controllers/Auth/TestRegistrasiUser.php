<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Saving\SignatureController;
use App\Models\Datmas\Indentitas;
use App\Models\Saving\Tregistrasi;
use App\Models\Saving\Tsnk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrasiUser extends Controller
{
    public function create(Request $req, $nouid)
    {
        $redirect = $this->registered($nouid);
        if ($redirect) return $redirect;

        $data = [];

        if ($req->isMethod('POST')) {
            $data = $req->validate([
                'nouid' => 'required|string|exists:mai2.tindentitas,nouid',
                'warneg' => 'required|string',
                'nama' => 'required|string',
                'nik' => 'required_if:warneg,ID|nullable|digits:16|numeric',
                'paspor' => 'required_if:warneg,!ID|nullable|string',
                'kabName' => 'required|string',
            ]);
        }

        $props = ['nouid' => $nouid];

        if ($req->query('q') === 'agreement') {
            try {
                if (empty($data)) {
                    return back()->withErrors(['data' => 'Data belum lengkap untuk memproses perjanjian.']);
                }
                $props = array_merge($props, self::agreement($data));
            } catch (\Exception $e) {
                logger()->error('Gagal membuat agreement: ' . $e->getMessage(), [
                    'data' => $data,
                    'exception' => $e,
                ]);
                return back()->withErrors(['agreement' => 'Terjadi kesalahan saat membuat agreement.']);
            }
        }

        return Inertia::render('test/register', $props);
    }


    private function agreement(array $data)
    {
        // Validasi manual minimum data
        if (
            empty($data['nouid']) ||
            empty($data['nama']) ||
            empty($data['warneg']) ||
            ($data['warneg'] === 'ID' && empty($data['nik'])) ||
            ($data['warneg'] !== 'ID' && empty($data['paspor'])) ||
            empty($data['kabName'])
        ) {
            throw new \InvalidArgumentException('Data tidak lengkap untuk memproses agreement.');
        }

        $snk = Tsnk::with(['points' => fn($q) => $q->orderBy('nmr')])
            ->where('is_active', true)
            ->latest('version')
            ->firstOrFail();

        $siswa = Indentitas::where('nouid', $data['nouid'])->with('siswa')->firstOrFail()->siswa;

        $signatureData = [
            'nouid' => $data['nouid'],
            'snk_version' => $snk->version,
            'nama' => $data['nama'],
            'id' => $data['warneg'] === 'ID' ? $data['nik'] : $data['paspor'],
            'waktu' => now()->toISOString(),
        ];

        $signature = SignatureController::getSign($signatureData, $data['nouid']);

        if (!$signature || !isset($signature['sign'])) {
            throw new \RuntimeException('Gagal menghasilkan tanda tangan digital.');
        }

        return [
            'agreement' => [
                'payload' => encrypt($signatureData),
                'sign' => $signature['sign'],
                'qr_code_svg' => $signature['qr_code_svg'] ?? null,
                'ortu' => $data['nama'],
                'siswa' => $siswa->namlen,
                'kota' => $data['kabName'] . ', ' . now()->translatedFormat('d F Y'),
                'snk' => [
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
            ],
        ];
    }


    private function registered($nouid)
    {
        $reg = Tregistrasi::where('nouid', $nouid)->first();

        if (!$reg || in_array($reg->sta, [-2, 0, 1])) {
            return Inertia::location(route('siswa.index', [
                'nouid' => $nouid,
                'sta' => $reg->sta ?? null,
            ]));
        }

        return null;
    }
}
