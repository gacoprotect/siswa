<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CustomHeader
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Generate timestamp (ISO 8601 format)
        $timestamp = function_exists('currentTimestamp')
            ? currentTimestamp()->toIso8601String()
            : now()->toIso8601String();

        if (!$request->hasHeader('X-TIMESTAMP')) {
            $request->headers->set('X-TIMESTAMP', $timestamp);
        } else {
            $timestamp = $request->header('X-TIMESTAMP');
        }

        $response = $next($request);
        $response->headers->set('X-TIMESTAMP', $timestamp);

        return $response;
    }
}
