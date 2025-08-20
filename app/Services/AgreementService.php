<?php

namespace App\Services;

use App\Http\Controllers\Saving\SignatureController;
use App\Models\Datmas\Indentitas;
use App\Models\Saving\Tsnk;

class AgreementService
{
    protected DataValidatorService $validator;
    protected TimagableService $imageService;

    public function __construct(DataValidatorService $validator, TimagableService $imageService)
    {
        $this->validator = $validator;
        $this->imageService = $imageService;
    }

    public function agreement(array $data): array
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
}
