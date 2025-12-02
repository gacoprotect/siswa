<?php

namespace App\Http\Middleware\Snap;

use App\Enums\SnapService;
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
        $service = SnapHelper::getService($request);
        return $this->validateHeaders($request, $next, $service);
    }



    /**
     * Validasi headers
     */
    protected function validateHeaders(Request $request, Closure $next, SnapService $service): Response
    {
        // 1. Validasi Content-Type
        if (!$request->isJson() && $request->header('Content-Type') !== 'application/json') {
            return $this->errorResponse($request, 401, 0, null, 'Signature', 'Invalid Content-Type header. Must be application/json');
        }
        // 2. Validasi required headers berdasarkan service
        $requiredHeaders = SnapHelper::getRequiredHeaders($service);
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
            return $this->errorResponse($request, 401, 0, null, 'Signature', 'Invalid X-TIMESTAMP: ' . $timestamp . '. Must be valid ISO 8601 format (e.g., 2020-12-21T14:56:11.123+07:00 or 2020-12-21T14:56:11+07:00).');
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
            if ($service === SnapService::TOKEN) {
                // Extract payload untuk auth signature verification
                $clientId = $request->header('X-CLIENT-KEY');
                $timestamp = $request->header('X-TIMESTAMP');

                $isValid = $snapBi->signature()->auth()->verify(
                    $clientId,
                    $timestamp,
                    $signature
                );
            } else {
                $method = $request->method();
                $requestPath = $request->path();
                // Gunakan $service (enum) bukan $serviceName, dan normalisasi path dari request
                $path = \App\Helpers\SnapHelper::normalizePath($requestPath);
                $rawBody = $request->getContent();
                $body = !empty($rawBody) ? json_decode($rawBody, true) : [];

                // Jika decode gagal, fallback ke request->all()
                if (json_last_error() !== JSON_ERROR_NONE) {
                    $body = $request->all();
                }

                $accessToken = $request->bearerToken() ?? '';

                $isValid = $snapBi->signature()->service()->verify(
                    $method,
                    $path,
                    $body,
                    $timestamp,
                    $accessToken,
                    $signature
                );

                // Debug logging jika verification gagal (hanya di development)
                if (!$isValid && config('app.debug')) {
                    // Recreate signature untuk debug comparison
                    $expectedSignature = $snapBi->signature()->service()->create(
                        $method,
                        $path,
                        $body,
                        $timestamp,
                        $accessToken
                    );

                    // Debug: Calculate body hash untuk melihat apakah sama dengan yang digunakan di utilities
                    $bodyMinified = json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
                    $bodyHash = strtolower(bin2hex(hash('sha256', $bodyMinified, true)));

                    // Debug: Build stringToSign untuk melihat apakah sama dengan yang digunakan di utilities
                    $stringToSign = implode(':', [
                        $method,
                        $path,
                        $accessToken,
                        $bodyHash,
                        $timestamp
                    ]);

                    Log::debug('Service signature verification failed', [
                        'method' => $method,
                        'path_used' => $path,
                        'path_from_request' => $requestPath,
                        'body' => $body,
                        'body_raw' => $rawBody,
                        'body_minified' => $bodyMinified,
                        'body_hash' => $bodyHash,
                        'timestamp' => $timestamp,
                        'access_token' => $accessToken,
                        'access_token_length' => strlen($accessToken),
                        'string_to_sign' => $stringToSign,
                        'provided_signature' => $signature,
                        'expected_signature' => $expectedSignature,
                        'signatures_match' => hash_equals($expectedSignature, $signature),
                    ]);
                }
            }

            if (!$isValid) {
                return $this->errorResponse($request, 401, 0, null, 'Signature', 'Invalid X-SIGNATURE');
            }
        } catch (\Exception $e) {
            Log::error('Signature verification failed', [
                'bank' => $bank,
                'service' => $service->value,
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
        $service = SnapHelper::getService($request);
        $isDebug = config('app.debug');

        // Untuk keamanan: fieldName dan reason hanya digunakan di debug mode
        // Di production, response message tetap generic tanpa detail spesifik
        $responseFieldName = $isDebug ? ($fieldName ?: null) : null;
        $responseReason = $isDebug ? ($reason ?: null) : null;

        // Menggunakan cara baru yang lebih mudah: error(httpCode, caseCode, fieldName, reason)
        $serviceName = $service->value;
        $response = SnapBi()->$serviceName()->response()->error($httpCode, $caseCode, $responseFieldName, $responseReason);

        // Log semua detail error dalam 1 log (termasuk detail yang tidak ditampilkan di response)
        $responseData = $response->getData(true);
        debugLog('SNAP Validation Failed', [
            'info' => $info,
            'path' => $request->path(),
            'method' => $request->method(),
            'service' => $service->value,
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
