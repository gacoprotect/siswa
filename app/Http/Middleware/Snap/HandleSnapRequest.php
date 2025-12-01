<?php

namespace App\Http\Middleware\Snap;

use App\Helpers\SnapHelper;
use Closure;
use Gaco\SnapBi\SnapBi;
use Gaco\SnapBi\Traits\BuildResponseCode;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

if (!function_exists('debugLog')) {
    require_once app_path('Helpers/DataHelpers.php');
}

class HandleSnapRequest
{
    use BuildResponseCode;

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Validasi headers untuk semua snap endpoints
        $serviceName = SnapHelper::getService($request);
        return $this->validateHeaders($request, $next, $serviceName);
    }



    /**
     * Validasi headers
     */
    protected function validateHeaders(Request $request, Closure $next, string $serviceName): Response
    {
        // 1. Validasi Content-Type
        if (!$request->isJson() && $request->header('Content-Type') !== 'application/json') {
            return $this->errorResponse($request, 401, 0, null, 'Signature', 'Invalid Content-Type header. Must be application/json');
        }
        // 2. Validasi required headers berdasarkan service
        $requiredHeaders = SnapHelper::getRequiredHeaders($serviceName);
        $missingHeaders = [];

        foreach ($requiredHeaders as $header) {
            if (!$request->hasHeader($header)) {
                $missingHeaders[] = $header;
            }
        }

        if (!empty($missingHeaders)) {
            return $this->errorResponse($request, 401, 0, null, 'Signature', 'Missing required headers: ' . implode(', ', $missingHeaders));
        }

        // 3. Validasi format X-TIMESTAMP (ISO 8601)
        $timestamp = $request->header('X-TIMESTAMP');
        if (!SnapHelper::isValidTimestamp($timestamp)) {
            return $this->errorResponse($request, 401, 0, null, 'Signature', 'Invalid X-TIMESTAMP format. Must be ISO 8601 format (yyyy-MM-ddTHH:mm:ss.SSSTZD)');
        }

        // 5. Detect bank dari X-CLIENT-KEY
        $bank = SnapHelper::detectBank($request);
        if (!$bank) {
            return $this->errorResponse($request, 401, 0, null, 'Signature', 'Invalid X-CLIENT-KEY. Bank not found or not registered');
        }

        // 6. Validasi X-SIGNATURE tidak kosong
        $signature = $request->header('X-SIGNATURE');
        if (empty($signature) || trim($signature) === '') {
            return $this->errorResponse($request, 401, 0, null, 'Signature', 'X-SIGNATURE header is empty or missing');
        }

        // 7. Verify signature berdasarkan service type
        try {
            $snapBi = SnapBi($bank);

            // Token endpoint menggunakan auth signature, service endpoint menggunakan service signature
            if ($serviceName === 'token') {
                $isValid = $snapBi->signature()->auth()->verify($request, $signature);
            } else {
                // Untuk service endpoints, perlu access token dari Authorization header
                $isValid = $snapBi->signature()->service()->verify($request);
            }

            if (!$isValid) {
                return $this->errorResponse($request, 401, 0, null, 'Signature', 'Invalid X-SIGNATURE');
            }
        } catch (\Exception $e) {
            Log::error('Signature verification failed', [
                'bank' => $bank,
                'service' => $serviceName,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return $this->errorResponse($request, 401, 0, null, 'Signature', 'Signature verification failed: ' . $e->getMessage());
        }

        // Semua validasi berhasil, lanjutkan ke controller
        return $next($request);
    }


    /**
     * Return error response dengan format snap-bi
     * 
     * error(httpCode, caseCode, fieldName, reason)
     * 
     * Untuk alasan keamanan, fieldName dan reason hanya digunakan di debug mode.
     * Di production, response message tetap generic tanpa detail spesifik.
     * 
     * @param Request $request HTTP request
     * @param int $httpCode HTTP status code
     * @param int $caseCode Case code
     * @param string|null $fieldName Field name untuk replace {field_name} placeholder (opsional, hanya di debug mode)
     * @param string|null $reason Reason untuk replace [reason] placeholder (opsional, hanya di debug mode)
     * @param string|null $info Info tambahan untuk logging (opsional)
     * @return JsonResponse
     */
    protected function errorResponse(
        Request $request,
        int $httpCode,
        int $caseCode,
        ?string $fieldName = '',
        ?string $reason = '',
        ?string $info = ''
    ): JsonResponse {
        $serviceName = SnapHelper::getService($request);
        $isDebug = config('app.debug');

        // Untuk keamanan: fieldName dan reason hanya digunakan di debug mode
        // Di production, response message tetap generic tanpa detail spesifik
        $responseFieldName = $isDebug ? ($fieldName ?: null) : null;
        $responseReason = $isDebug ? ($reason ?: null) : null;

        // Menggunakan cara baru yang lebih mudah: error(httpCode, caseCode, fieldName, reason)
        $response = SnapBi()->$serviceName()->response()->error($httpCode, $caseCode, $responseFieldName, $responseReason);

        // Log semua detail error dalam 1 log (termasuk detail yang tidak ditampilkan di response)
        $responseData = $response->getData(true);
        debugLog('SNAP Validation Failed', [
            'info' => $info,
            'path' => $request->path(),
            'method' => $request->method(),
            'service' => $serviceName,
            'http_code' => $httpCode,
            'case_code' => $caseCode,
            'response_code' => $responseData['responseCode'] ?? null,
            'response_message' => $responseData['responseMessage'] ?? null,
            'headers' => [
                'X-CLIENT-KEY' => $request->header('X-CLIENT-KEY'),
                'X-TIMESTAMP' => $request->header('X-TIMESTAMP'),
                'X-SIGNATURE' => $request->header('X-SIGNATURE') ? substr($request->header('X-SIGNATURE'), 0, 20) . '...' : null,
                'Content-Type' => $request->header('Content-Type'),
                'Authorization' => $request->header('Authorization') ? 'Bearer ***' : null,
                'X-EXTERNAL-ID' => $request->header('X-EXTERNAL-ID'),
                'CHANNEL-ID' => $request->header('CHANNEL-ID'),
                'X-PARTNER-ID' => $request->header('X-PARTNER-ID'),
            ],
            'request_body' => $request->all(),
            'bank_detected' => SnapHelper::detectBank($request),
            'available_providers' => array_keys(config('snap.provider', [])),
        ]);

        // Tambahkan debug info jika dalam development mode
        if ($isDebug) {
            $responseData['debug'] = [
                'message' => $info,
                'path' => $request->path(),
                'method' => $request->method(),
            ];
            $response->setData($responseData);
        }

        return $response;
    }
}
