<?php

namespace App\Exceptions;

use Illuminate\Http\Request;
use Throwable;

class ApiExceptionHandler
{
    /**
     * Handle exception untuk API routes
     * 
     * @param Throwable $e
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|null
     */
    public static function handle(Throwable $e, Request $request): ?\Illuminate\Http\JsonResponse
    {
        // Jika request adalah API route, return JSON response
        if ($request->is('api/*') || $request->expectsJson()) {
            // Get HTTP code dari exception
            $httpCode = self::getHttpCode($e);

            // Get message berdasarkan HTTP code dan exception type
            $message = self::getErrorMessage($e, $httpCode);

            $response = [
                'success' => false,
                'message' => $message,
            ];

            // Tambahkan detail error jika dalam debug mode
            if (config('app.debug')) {
                $response['error'] = [
                    'path' => $request->path(),
                    'type' => get_class($e),
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                ];

                // Tambahkan validation errors jika ada
                if ($e instanceof \Illuminate\Validation\ValidationException) {
                    $response['errors'] = $e->errors();
                }
            }

            return response()->json($response, $httpCode);
        }

        return null;
    }

    /**
     * Get HTTP code dari exception
     */
    protected static function getHttpCode(Throwable $e): int
    {
        // Check untuk HttpException
        if ($e instanceof \Symfony\Component\HttpKernel\Exception\HttpException) {
            return $e->getStatusCode();
        }

        // Check untuk HttpResponseException
        if ($e instanceof \Illuminate\Http\Exceptions\HttpResponseException) {
            return $e->getResponse()->getStatusCode();
        }

        // Jika exception memiliki method getCode() dan return valid HTTP code
        if (method_exists($e, 'getCode')) {
            $code = $e->getCode();
            if ($code >= 400 && $code < 600) {
                return $code;
            }
        }

        // Default untuk runtime errors
        return 500;
    }

    /**
     * Get error message berdasarkan exception dan HTTP code
     */
    protected static function getErrorMessage(Throwable $e, int $httpCode): string
    {
        return match ($httpCode) {
            404 => 'Resource not found',
            403 => 'Forbidden',
            401 => 'Unauthorized',
            422 => ($e instanceof \Illuminate\Validation\ValidationException) ? 'Validation failed' : 'Unprocessable entity',
            500 => config('app.debug') ? $e->getMessage() : 'Internal server error',
            default => config('app.debug') ? $e->getMessage() : 'An error occurred',
        };
    }
}
