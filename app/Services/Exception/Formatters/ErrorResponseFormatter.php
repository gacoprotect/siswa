<?php

namespace App\Services\Exception\Formatters;

use Illuminate\Http\Request;
use Throwable;

/**
 * Error Response Formatter
 * 
 * Format error response sesuai standar RFC 7807 (Problem Details for HTTP APIs)
 * 
 * @see https://tools.ietf.org/html/rfc7807
 */
class ErrorResponseFormatter
{
    /**
     * Format exception to RFC 7807 Problem Details format
     *
     * @param Throwable $exception
     * @param Request $request
     * @param int $statusCode
     * @return array
     */
    public function format(Throwable $exception, Request $request, int $statusCode): array
    {
        $problem = [
            'type' => $this->getTypeUri($exception, $statusCode),
            'title' => $this->getTitle($statusCode),
            'status' => $statusCode,
            'detail' => $this->getDetail($exception, $request),
            'instance' => $request->fullUrl(),
        ];

        // Hide stack trace for API / JSON responses even when debug is true
        if ($this->shouldIncludeTrace($request)) {
            $problem['trace'] = $this->getTrace($exception);
        }

        // Add additional context if exception supports it
        if ($exception instanceof \App\Exceptions\BaseApplicationException && $exception->getContext() !== null) {
            $problem['context'] = $exception->getContext();
        }

        // Add validation errors if validation exception
        if ($exception instanceof \Illuminate\Validation\ValidationException) {
            $problem['errors'] = $exception->errors();
        }

        return $problem;
    }

    /**
     * Get type URI for the exception
     *
     * @param Throwable $exception
     * @param int $statusCode
     * @return string
     */
    protected function getTypeUri(Throwable $exception, int $statusCode): string
    {
        // If exception has custom type URI
        if ($exception instanceof \App\Exceptions\BaseApplicationException) {
            return $exception->getTypeUri();
        }

        // Default type URI based on status code
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
     * Get title based on status code
     *
     * @param int $statusCode
     * @return string
     */
    protected function getTitle(int $statusCode): string
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

    /**
     * Get detail message
     *
     * @param Throwable $exception
     * @return string
     */
    protected function getDetail(Throwable $exception, Request $request): string
    {
        // Use exception message if available
        $message = $exception->getMessage();

        // If no message, use default based on exception type
        if (empty($message)) {
            $message = match (true) {
                $exception instanceof \Illuminate\Validation\ValidationException => 'The given data was invalid.',
                $exception instanceof \Illuminate\Auth\AuthenticationException => 'Unauthenticated.',
                $exception instanceof \Illuminate\Auth\Access\AuthorizationException => 'This action is unauthorized.',
                $exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException => 'The requested resource was not found.',
                $exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException => 'The requested page was not found.',
                default => 'An unexpected error occurred.',
            };
        }

        // In production, don't expose sensitive error details
        if ((!config('app.debug') || $this->isApiRequest($request)) && $exception->getCode() >= 500) {
            return 'An internal server error occurred. Please try again later.';
        }

        return $message;
    }

    /**
     * Determine if trace should be shown
     */
    protected function shouldIncludeTrace(Request $request): bool
    {
        if ($this->isApiRequest($request)) {
            return false;
        }

        return config('app.debug');
    }

    /**
     * Determine if request is API / JSON
     */
    protected function isApiRequest(Request $request): bool
    {
        return $request->expectsJson() || $request->is('api/*');
    }

    /**
     * Get exception trace
     *
     * @param Throwable $exception
     * @return array
     */
    protected function getTrace(Throwable $exception): array
    {
        $trace = [];
        foreach ($exception->getTrace() as $index => $frame) {
            $trace[] = [
                'file' => $frame['file'] ?? null,
                'line' => $frame['line'] ?? null,
                'function' => $frame['function'] ?? null,
                'class' => $frame['class'] ?? null,
            ];
        }
        return $trace;
    }
}

