<?php

namespace App\Http\Controllers\Concerns;

use App\Exceptions\Snap\SnapBusinessException;
use App\Exceptions\Snap\SnapException;
use App\Exceptions\Snap\SnapSystemException;
use App\Services\Snap\SnapResponseCodeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Otnansirk\SnapBI\Interfaces\HttpResponseInterface;

trait HandlesSnapResponse
{
    protected ?SnapResponseCodeService $snapResponseCodeService = null;

    /**
     * Get or initialize SnapResponseCodeService
     */
    protected function getSnapResponseCodeService(): SnapResponseCodeService
    {
        if ($this->snapResponseCodeService === null) {
            $this->snapResponseCodeService = app(SnapResponseCodeService::class);
        }
        return $this->snapResponseCodeService;
    }

    /**
     * Handle SNAP response and throw exception if error
     *
     * @param HttpResponseInterface $response
     * @param string|null $serviceType Service type (token, inquiry, payment, etc.)
     * @return array Response data
     * @throws SnapException
     */
    protected function handleSnapResponse(HttpResponseInterface $response, ?string $serviceType = null): array
    {
        // Check HTTP status first
        if ($response->failed()) {
            $this->handleFailedHttpResponse($response, $serviceType);
        }

        $data = $response->array();
        
        // Check for responseCode in body
        $responseCode = $data['responseCode'] ?? null;
        $responseMessage = $data['responseMessage'] ?? 'Unknown error';

        if ($responseCode && !$this->getSnapResponseCodeService()->isSuccess($responseCode)) {
            $this->throwSnapException($responseCode, $responseMessage, $data, $serviceType);
        }

        return $data;
    }

    /**
     * Handle failed HTTP response
     *
     * @param HttpResponseInterface $response
     * @param string|null $serviceType
     * @throws SnapException
     */
    protected function handleFailedHttpResponse(HttpResponseInterface $response, ?string $serviceType = null): void
    {
        $status = $response->status();
        $body = $response->body();
        $data = [];

        // Try to parse response body
        if (!empty($body)) {
            $decoded = json_decode($body, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $data = $decoded;
            }
        }

        $responseCode = $data['responseCode'] ?? (string)$status . '0000';
        $responseMessage = $data['responseMessage'] ?? "HTTP Error {$status}";

        $this->throwSnapException($responseCode, $responseMessage, $data, $serviceType);
    }

    /**
     * Throw appropriate SNAP exception based on response code
     *
     * @param string $responseCode
     * @param string $responseMessage
     * @param array|null $responseData
     * @param string|null $serviceType
     * @throws SnapException
     */
    protected function throwSnapException(
        string $responseCode,
        string $responseMessage,
        ?array $responseData = null,
        ?string $serviceType = null
    ): void {
        $codeInfo = $this->getSnapResponseCodeService()->getResponseCodeInfo($responseCode, $serviceType);
        
        $category = $codeInfo['category'] ?? 'System';
        $httpCode = $codeInfo['http_code'] ?? 500;
        $description = $codeInfo['description'] ?? $responseMessage;

        // Enhance response message with description if available
        $enhancedMessage = $codeInfo ? $codeInfo['response_message'] : $responseMessage;
        if ($codeInfo && $codeInfo['description'] && $codeInfo['description'] !== $enhancedMessage) {
            $enhancedMessage .= ' - ' . $codeInfo['description'];
        }

        Log::warning('SNAP API Error', [
            'response_code' => $responseCode,
            'response_message' => $responseMessage,
            'category' => $category,
            'http_code' => $httpCode,
            'service_type' => $serviceType,
            'code_info' => $codeInfo,
        ]);

        if ($category === 'Business') {
            throw new SnapBusinessException($responseCode, $enhancedMessage, $responseData, $httpCode);
        } else {
            throw new SnapSystemException($responseCode, $enhancedMessage, $responseData, $httpCode);
        }
    }

    /**
     * Handle SNAP exception and return appropriate response
     *
     * @param SnapException $exception
     * @param Request $request
     * @return JsonResponse|RedirectResponse|\Illuminate\View\View
     */
    protected function handleSnapException(SnapException $exception, Request $request)
    {
        // Log the exception
        Log::error('SNAP Exception', [
            'response_code' => $exception->getResponseCode(),
            'response_message' => $exception->getResponseMessage(),
            'category' => $exception->getCategory(),
            'http_code' => $exception->getHttpCode(),
            'data' => $exception->getResponseData(),
        ]);

        // If API request, return JSON
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json($exception->toArray(), $exception->getHttpCode());
        }

        // Otherwise, redirect to error page or show error view
        return redirect()->route('snap.error', [
            'code' => $exception->getResponseCode(),
            'message' => $exception->getResponseMessage(),
        ])->with('snap_error', $exception->toArray());
    }

    /**
     * Check if response is successful
     *
     * @param HttpResponseInterface $response
     * @param string|null $serviceType
     * @return bool
     */
    protected function isSnapResponseSuccessful(HttpResponseInterface $response, ?string $serviceType = null): bool
    {
        if ($response->failed()) {
            return false;
        }

        $data = $response->array();
        $responseCode = $data['responseCode'] ?? null;

        if (!$responseCode) {
            return true; // Assume success if no response code
        }

        return $this->getSnapResponseCodeService()->isSuccess($responseCode);
    }
}

