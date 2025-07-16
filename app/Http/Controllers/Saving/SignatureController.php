<?php

namespace App\Http\Controllers\Saving;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class SignatureController extends Controller
{
    public static function getSign(array $signatureData): array
    {
        $sign = hash('sha256', json_encode($signatureData));
        $qrCodeUrl = route('snk.sign', ['sign' => $sign]);

        $qrCodeSvg = (string) QrCode::format('svg')->size(80)->generate($qrCodeUrl);

        return [
            'sign' => $sign,
            'qr_code_svg' => $qrCodeSvg,
        ];

    }
}
