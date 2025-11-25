<?php

namespace App\Http\Controllers\Concerns;

use App\Services\Exception\ExceptionHandlerService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * HandlesExceptions Trait
 * 
 * Trait untuk menangani exception di controller dengan standar yang konsisten
 */
trait HandlesExceptions
{
    protected ?ExceptionHandlerService $exceptionHandlerService = null;

    /**
     * Get or initialize ExceptionHandlerService
     *
     * @return ExceptionHandlerService
     */
    protected function getExceptionHandlerService(): ExceptionHandlerService
    {
        if ($this->exceptionHandlerService === null) {
            $this->exceptionHandlerService = app(ExceptionHandlerService::class);
        }
        return $this->exceptionHandlerService;
    }

    /**
     * Handle exception and return appropriate response
     *
     * @param Throwable $exception
     * @param Request $request
     * @return Response
     */
    protected function handleException(Throwable $exception, Request $request): Response
    {
        return $this->getExceptionHandlerService()->handle($exception, $request);
    }

    /**
     * Execute callback and handle any exceptions
     *
     * @param callable $callback
     * @param Request $request
     * @param mixed ...$args
     * @return mixed
     */
    protected function executeWithExceptionHandling(callable $callback, Request $request, ...$args)
    {
        try {
            return $callback(...$args);
        } catch (Throwable $exception) {
            return $this->handleException($exception, $request);
        }
    }

    /**
     * Log exception with context
     *
     * @param Throwable $exception
     * @param array $context
     * @param string $level
     * @return void
     */
    protected function logException(
        Throwable $exception,
        array $context = [],
        string $level = 'error'
    ): void {
        $logContext = array_merge([
            'exception' => get_class($exception),
            'message' => $exception->getMessage(),
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
        ], $context);

        Log::{$level}('Exception in controller', $logContext);
    }

    /**
     * Return error response for API
     *
     * @param string $message
     * @param int $statusCode
     * @param array $errors
     * @return JsonResponse
     */
    protected function errorResponse(
        string $message,
        int $statusCode = 400,
        array $errors = []
    ): JsonResponse {
        $response = [
            'type' => $this->getErrorTypeUri($statusCode),
            'title' => $this->getErrorTitle($statusCode),
            'status' => $statusCode,
            'detail' => $message,
        ];

        if (!empty($errors)) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $statusCode, [
            'Content-Type' => 'application/problem+json',
        ]);
    }

    /**
     * Return success response for API
     *
     * @param mixed $data
     * @param string $message
     * @param int $statusCode
     * @return JsonResponse
     */
    protected function successResponse(
        $data = null,
        string $message = 'Success',
        int $statusCode = 200
    ): JsonResponse {
        $response = [
            'success' => true,
            'message' => $message,
        ];

        if ($data !== null) {
            $response['data'] = $data;
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Get error type URI
     *
     * @param int $statusCode
     * @return string
     */
    protected function getErrorTypeUri(int $statusCode): string
    {
        $baseUrl = config('app.url', 'http://localhost');
        $type = match (true) {
            $statusCode >= 500 => 'server-error',
            $statusCode === 404 => 'not-found',
            $statusCode === 403 => 'forbidden',
            $statusCode === 401 => 'unauthorized',
            $statusCode === 422 => 'validation-error',
            default => 'client-error',
        };

        return "{$baseUrl}/errors/{$type}";
    }

    /**
     * Get error title
     *
     * @param int $statusCode
     * @return string
     */
    protected function getErrorTitle(int $statusCode): string
    {
        return match ($statusCode) {
            400 => 'Bad Request',
            401 => 'Unauthorized',
            403 => 'Forbidden',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            422 => 'Validation Error',
            429 => 'Too Many Requests',
            500 => 'Internal Server Error',
            503 => 'Service Unavailable',
            default => 'An Error Occurred',
        };
    }
}

