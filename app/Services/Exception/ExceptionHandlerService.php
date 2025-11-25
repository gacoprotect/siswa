<?php

namespace App\Services\Exception;

use App\Services\Exception\Formatters\ErrorResponseFormatter;
use App\Exceptions\BaseApplicationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Throwable;

/**
 * Exception Handler Service
 * 
 * Service untuk menangani semua jenis exception dan mengembalikan response
 * yang sesuai dengan standar RFC 7807 (Problem Details for HTTP APIs)
 * 
 * @see https://tools.ietf.org/html/rfc7807
 */
class ExceptionHandlerService
{
    protected ErrorResponseFormatter $formatter;

    public function __construct(ErrorResponseFormatter $formatter)
    {
        $this->formatter = $formatter;
    }

    /**
     * Handle exception dan return response
     *
     * @param Throwable $exception
     * @param Request $request
     * @return Response
     */
    public function handle(Throwable $exception, Request $request): Response
    {
        // Log exception
        $this->logException($exception, $request);

        // Handle based on request type
        if ($request->expectsJson() || $request->is('api/*')) {
            return $this->handleJsonResponse($exception, $request);
        }

        return $this->handleWebResponse($exception, $request);
    }

    /**
     * Handle JSON/API response
     *
     * @param Throwable $exception
     * @param Request $request
     * @return Response
     */
    protected function handleJsonResponse(Throwable $exception, Request $request): Response
    {
        $statusCode = $this->getStatusCode($exception);
        $problemDetails = $this->formatter->format($exception, $request, $statusCode);

        return response()->json($problemDetails, $statusCode, [
            'Content-Type' => 'application/problem+json',
        ]);
    }

    /**
     * Handle Web response (redirect to error page)
     *
     * @param Throwable $exception
     * @param Request $request
     * @return Response
     */
    protected function handleWebResponse(Throwable $exception, Request $request): Response
    {
        $statusCode = $this->getStatusCode($exception);
        $problemDetails = $this->formatter->format($exception, $request, $statusCode);

        // Store error details in session if available
        try {
            if ($request->hasSession()) {
                $request->session()->flash('error_details', $problemDetails);
                $request->session()->flash('exception', [
                    'type' => get_class($exception),
                    'message' => $problemDetails['detail'] ?? $exception->getMessage(),
                    'status' => $statusCode,
                ]);
            }
        } catch (\Exception $e) {
            // Session not available, continue without session
        }

        // Check if this is already an error page request to avoid redirect loops
        if ($request->is('error*') || $request->is('snap/error*')) {
            // Already on error page, return JSON or simple response
            if ($request->expectsJson() || $request->wantsJson()) {
                return response()->json($problemDetails, $statusCode, [
                    'Content-Type' => 'application/problem+json',
                ]);
            }
            
            // Try to render Inertia page if available
            try {
                if ($request->header('X-Inertia')) {
                    return Inertia::render('Error/Generic', [
                        'code' => $statusCode,
                        'title' => $problemDetails['title'] ?? 'An Error Occurred',
                        'message' => $problemDetails['detail'] ?? $exception->getMessage(),
                        'description' => $problemDetails['description'] ?? null,
                        'type' => $problemDetails['type'] ?? null,
                        'instance' => $problemDetails['instance'] ?? null,
                        'exception_type' => get_class($exception),
                    ])->toResponse($request);
                }
            } catch (\Exception $e) {
                // Fall through to simple HTML response
            }
            
            // Return simple HTML error response as last resort
            $message = htmlspecialchars($problemDetails['detail'] ?? $exception->getMessage(), ENT_QUOTES, 'UTF-8');
            $title = htmlspecialchars($problemDetails['title'] ?? 'An Error Occurred', ENT_QUOTES, 'UTF-8');
            
            return response("
                <!DOCTYPE html>
                <html>
                <head>
                    <title>{$title} - {$statusCode}</title>
                    <meta charset='utf-8'>
                    <meta name='viewport' content='width=device-width, initial-scale=1'>
                    <style>
                        body { font-family: system-ui, -apple-system, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
                        .error { background: white; padding: 40px; border-radius: 8px; max-width: 600px; margin: 0 auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                        h1 { color: #e53e3e; margin: 0 0 20px; }
                        p { color: #666; line-height: 1.6; }
                    </style>
                </head>
                <body>
                    <div class='error'>
                        <h1>{$statusCode} - {$title}</h1>
                        <p>{$message}</p>
                    </div>
                </body>
                </html>
            ", $statusCode);
        }

        // For Inertia requests, try to render Inertia page directly
        if ($request->header('X-Inertia')) {
            return $this->renderInertiaError($request, $statusCode, $problemDetails, $exception);
        }

        // For regular web requests, redirect to error page
        // Pass data via query string as fallback if session not available
        $redirectUrl = route('error.show', [
            'code' => $statusCode,
        ]);

        // Add query parameters if session not available
        try {
            if (!$request->hasSession()) {
                $redirectUrl .= '?' . http_build_query([
                    'message' => $problemDetails['detail'] ?? $exception->getMessage(),
                    'title' => $problemDetails['title'] ?? 'An Error Occurred',
                ]);
            }
        } catch (\Exception $e) {
            // Session check failed, use query params
            $redirectUrl .= '?' . http_build_query([
                'message' => $problemDetails['detail'] ?? $exception->getMessage(),
                'title' => $problemDetails['title'] ?? 'An Error Occurred',
            ]);
        }

        return redirect($redirectUrl);
    }

    /**
     * Render Inertia error page
     */
    protected function renderInertiaError(
        Request $request,
        int $statusCode,
        array $problemDetails,
        Throwable $exception
    ): Response {
        try {
            $page = Inertia::render('Error/Generic', [
                'code' => $statusCode,
                'title' => $problemDetails['title'] ?? 'An Error Occurred',
                'message' => $problemDetails['detail'] ?? $exception->getMessage(),
                'description' => $problemDetails['description'] ?? null,
                'type' => $problemDetails['type'] ?? null,
                'instance' => $problemDetails['instance'] ?? null,
                'exception_type' => get_class($exception),
            ]);

            return $page instanceof InertiaResponse ? $page->toResponse($request) : $page;
        } catch (\Exception $e) {
            return response()->view('errors::minimal', [
                'code' => $statusCode,
                'message' => $problemDetails['detail'] ?? $exception->getMessage(),
            ], $statusCode);
        }
    }

    /**
     * Get HTTP status code from exception
     *
     * @param Throwable $exception
     * @return int
     */
    protected function getStatusCode(Throwable $exception): int
    {
        // If exception provides HTTP status code explicitly
        if ($exception instanceof BaseApplicationException) {
            return $exception->getStatusCode();
        }

        if ($exception instanceof HttpExceptionInterface) {
            return $exception->getStatusCode();
        }

        // If exception has getCode and it's a valid HTTP status code
        $code = $exception->getCode();
        if ($code >= 400 && $code < 600) {
            return $code;
        }

        // Default based on exception type
        return match (true) {
            $exception instanceof \Illuminate\Validation\ValidationException => 422,
            $exception instanceof \Illuminate\Auth\AuthenticationException => 401,
            $exception instanceof \Illuminate\Auth\Access\AuthorizationException => 403,
            $exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException => 404,
            $exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException => 404,
            $exception instanceof \Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException => 405,
            $exception instanceof HttpExceptionInterface => $exception->getStatusCode(),
            default => 500,
        };
    }

    /**
     * Log exception
     *
     * @param Throwable $exception
     * @param Request $request
     * @return void
     */
    protected function logException(Throwable $exception, Request $request): void
    {
        $context = [
            'exception' => get_class($exception),
            'message' => $exception->getMessage(),
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ];

        // Add user info if available
        if ($request->user()) {
            $context['user_id'] = $request->user()->id;
        }

        // Log level based on status code
        $statusCode = $this->getStatusCode($exception);
        $logLevel = match (true) {
            $statusCode >= 500 => 'error',
            $statusCode >= 400 => 'warning',
            default => 'info',
        };

        Log::{$logLevel}('Exception occurred', $context);

        // Log full trace for server errors
        if ($statusCode >= 500 && config('app.debug')) {
            Log::error('Exception trace', [
                'trace' => $exception->getTraceAsString(),
            ]);
        }
    }

    /**
     * Check if exception should be reported
     *
     * @param Throwable $exception
     * @return bool
     */
    public function shouldReport(Throwable $exception): bool
    {
        // Don't report validation exceptions
        if ($exception instanceof \Illuminate\Validation\ValidationException) {
            return false;
        }

        // Don't report 404 errors
        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
            return false;
        }

        // Report all other exceptions
        return true;
    }
}

