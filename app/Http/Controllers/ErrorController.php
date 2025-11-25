<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ErrorController extends Controller
{
    /**
     * Display error page
     *
     * @param Request $request
     * @param string|int|null $code
     * @return Response
     */
    public function show(Request $request, string|int|null $code = null): Response
    {
        try {
            // Validate and convert code to integer
            if ($code === null) {
                $code = $request->query('code', 500);
            }
            
            // Log invalid code attempts
            if (is_string($code) && !is_numeric($code)) {
                Log::warning('Invalid error code parameter', [
                    'code' => $code,
                    'url' => $request->fullUrl(),
                    'path' => $request->path(),
                ]);
            }
            
            // Convert string to int, validate it's a valid HTTP status code
            if (is_string($code)) {
                $code = filter_var($code, FILTER_VALIDATE_INT, [
                    'options' => [
                        'min_range' => 100,
                        'max_range' => 599,
                    ]
                ]);
                if ($code === false) {
                    Log::warning('Failed to validate error code, using default 500', [
                        'original_code' => $request->route('code'),
                        'url' => $request->fullUrl(),
                    ]);
                    $code = 500; // Default to 500 if invalid
                }
            }
            
            // Ensure code is an integer
            $code = (int) $code;
            
            // Validate code range
            if ($code < 100 || $code > 599) {
                Log::warning('Error code out of range, using default 500', [
                    'code' => $code,
                    'url' => $request->fullUrl(),
                ]);
                $code = 500;
            }
        } catch (\Exception $e) {
            Log::error('Error in ErrorController::show', [
                'exception' => get_class($e),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'url' => $request->fullUrl(),
            ]);
            $code = 500;
        }
        
        // Default error information
        $errorInfo = [
            'code' => $code,
            'title' => $this->getErrorTitle($code),
            'message' => $this->getErrorMessage($code),
            'description' => $this->getErrorDescription($code),
        ];

        // Try to get error details from session if available
        try {
            if ($request->hasSession()) {
                $errorDetails = $request->session()->get('error_details');
                $exception = $request->session()->get('exception');

                if ($errorDetails) {
                    $errorInfo['title'] = $errorDetails['title'] ?? $errorInfo['title'];
                    $errorInfo['message'] = $errorDetails['detail'] ?? $errorInfo['message'];
                    $errorInfo['type'] = $errorDetails['type'] ?? null;
                    $errorInfo['instance'] = $errorDetails['instance'] ?? null;
                }

                if ($exception) {
                    $errorInfo['exception_type'] = $exception['type'] ?? null;
                    $errorInfo['message'] = $exception['message'] ?? $errorInfo['message'];
                }
            }
        } catch (\Exception $e) {
            // Session not available, continue with defaults
        }

        // Fallback to query string parameters if session not available
        if ($request->has('message')) {
            $errorInfo['message'] = urldecode($request->query('message', $errorInfo['message']));
        }
        if ($request->has('title')) {
            $errorInfo['title'] = urldecode($request->query('title', $errorInfo['title']));
        }

        return Inertia::render('Error/Generic', $errorInfo);
    }

    /**
     * Get error title
     *
     * @param int $code
     * @return string
     */
    protected function getErrorTitle(int $code): string
    {
        return match ($code) {
            400 => 'Bad Request',
            401 => 'Unauthorized',
            403 => 'Forbidden',
            404 => 'Page Not Found',
            405 => 'Method Not Allowed',
            419 => 'Page Expired',
            422 => 'Validation Error',
            429 => 'Too Many Requests',
            500 => 'Internal Server Error',
            503 => 'Service Unavailable',
            default => 'An Error Occurred',
        };
    }

    /**
     * Get error message
     *
     * @param int $code
     * @return string
     */
    protected function getErrorMessage(int $code): string
    {
        return match ($code) {
            400 => 'The request was invalid or cannot be processed.',
            401 => 'You must be authenticated to access this resource.',
            403 => 'You do not have permission to access this resource.',
            404 => 'The page you are looking for could not be found.',
            405 => 'The requested method is not allowed for this resource.',
            419 => 'Your session has expired. Please refresh the page and try again.',
            422 => 'The given data was invalid.',
            429 => 'Too many requests. Please try again later.',
            500 => 'An internal server error occurred. Please try again later.',
            503 => 'The service is temporarily unavailable. Please try again later.',
            default => 'An unexpected error occurred.',
        };
    }

    /**
     * Get error description
     *
     * @param int $code
     * @return string
     */
    protected function getErrorDescription(int $code): string
    {
        return match ($code) {
            400 => 'The server cannot process the request due to invalid syntax or parameters.',
            401 => 'Authentication is required to access this resource.',
            403 => 'You do not have the necessary permissions to perform this action.',
            404 => 'The requested URL was not found on this server.',
            405 => 'The HTTP method used is not supported for this endpoint.',
            419 => 'Your session has expired due to inactivity. Please refresh and try again.',
            422 => 'The request contains invalid or missing data.',
            429 => 'You have exceeded the rate limit. Please wait before making another request.',
            500 => 'An unexpected error occurred on the server. Our team has been notified.',
            503 => 'The service is currently unavailable due to maintenance or high load.',
            default => 'An unexpected error occurred. Please try again later.',
        };
    }
}

