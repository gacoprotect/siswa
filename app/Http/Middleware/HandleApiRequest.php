<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HandleApiRequest
{
    /**
     * Handle an incoming request.
     * 
     * Memastikan semua response API mengembalikan JSON, termasuk:
     * - Non-JSON error responses (4xx, 5xx)
     * 
     * Catatan: Exception handling utama dilakukan di ApiExceptionHandler
     * Middleware ini hanya menangani konversi response non-JSON ke JSON
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Jika response bukan JSON dan status code adalah error (4xx, 5xx), convert ke JSON
        if (!$response instanceof JsonResponse && $response->getStatusCode() >= 400) {
            return $this->convertToJsonError($request, $response->getStatusCode());
        }

        return $response;
    }


    /**
     * Convert non-JSON error response to JSON
     */
    protected function convertToJsonError(Request $request, int $statusCode): JsonResponse
    {
        $message = match ($statusCode) {
            404 => 'Resource not found',
            403 => 'Forbidden',
            401 => 'Unauthorized',
            500 => 'Internal server error',
            default => 'An error occurred',
        };

        return response()->json([
            'success' => false,
            'message' => $message,
        ], $statusCode);
    }
}
