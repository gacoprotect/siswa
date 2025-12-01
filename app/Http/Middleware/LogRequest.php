<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class LogRequest
{
    /**
     * Handle an incoming request dan log URL yang diakses.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Log request incoming dengan URL yang jelas
        $url = $request->fullUrl() ?: ($request->url() ?: 'N/A');
        Log::info('Request Incoming - URL: ' . $url, [
            'url' => $url,
            'method' => $request->method(),
            'path' => $request->path(),
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'route' => $request->route()?->getName(),
            'query' => $request->query(),
            'headers' => $request->headers->all(),
        ]);

        try {
            $response = $next($request);

            // Log response status - khusus untuk 404
            $statusCode = $response->getStatusCode();
            if ($statusCode === 404) {
                Log::warning('404 Not Found - URL: ' . $request->fullUrl(), [
                    'url' => $request->fullUrl(),
                    'method' => $request->method(),
                    'path' => $request->path(),
                    'ip' => $request->ip(),
                    'status' => $statusCode,
                ]);
            } else {
                Log::info('Request Completed - URL: ' . $request->fullUrl() . ' - Status: ' . $statusCode, [
                    'url' => $request->fullUrl(),
                    'method' => $request->method(),
                    'status' => $statusCode,
                ]);
            }

            return $response;
        } catch (\Throwable $e) {
            // Log runtime error
            Log::error('Runtime Error - URL: ' . $request->fullUrl(), [
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'path' => $request->path(),
                'exception' => get_class($e),
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            
            // Re-throw exception agar Exception Handler bisa menanganinya
            throw $e;
        }
    }
}

