<?php

namespace App\Exceptions;

use App\Helpers\SnapHelper;
use Exception;
use Gaco\SnapBi\SnapBi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GeneralJsonException extends Exception
{

    /**
     * Report the exception.
     */
    public function report(): void
    {
        //
    }

    /**
     * Render the exception as an HTTP response.
     * 
     * Catatan: Untuk error response, tidak perlu bank-specific config.
     * Service code sudah bisa dideteksi dari route, jadi menggunakan SnapBi() tanpa bank.
     */
    public function render(Request $request): JsonResponse
    {
        $httpCode = $this->getCode() ?: 500;
        $caseCode = 0;

        $serviceName = SnapHelper::getService($request);

        $snapBi = SnapBi();

        $service = call_user_func([$snapBi, $serviceName]);

        return $service->response()->error([
            'httpCode' => $httpCode,
            'caseCode' => $caseCode,
        ]);
    }
}
