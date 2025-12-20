<?php

namespace App\Http\Middleware\Snap;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class RateLimitTokenEndpoint
{
    /**
     * Handle an incoming request.
     * 
     * Rate limit untuk endpoint /api/v1/access-token/b2b
     * Membatasi jumlah request yang bisa dilakukan bank ke endpoint ini
     */
    public function handle(Request $request, Closure $next): Response
    {
        $maxAttempts = config('snap.token.endpoint_rate_limit.max_attempts', 10);
        $decayMinutes = config('snap.token.endpoint_rate_limit.decay_minutes', 1);
        $limitPerClient = config('snap.token.limit_per_client', true);

        // Generate throttle key berdasarkan client_id atau IP
        if ($limitPerClient) {
            $clientId = $request->header('X-CLIENT-KEY');
            $key = 'snap_token_endpoint:' . ($clientId ?? $request->ip());
        } else {
            $key = 'snap_token_endpoint:' . $request->ip();
        }

        // Cek rate limit
        if (RateLimiter::tooManyAttempts($key, $maxAttempts)) {
            $seconds = RateLimiter::availableIn($key);
            $attempts = RateLimiter::attempts($key);

            Log::warning('Snap token endpoint rate limited', [
                'key' => $key,
                'ip' => $request->ip(),
                'client_id' => $request->header('X-CLIENT-KEY'),
                'attempts' => $attempts,
                'max_attempts' => $maxAttempts,
                'retry_after_seconds' => $seconds,
            ]);

            return response()->json([
                'responseCode' => '4292400',
                'responseMessage' => 'Too Many Requests',
                'additionalInfo' => [
                    'retryAfter' => $seconds,
                    'message' => "Too many requests. Please try again in {$seconds} seconds."
                ]
            ], 429);
        }

        // Hit rate limiter
        RateLimiter::hit($key, $decayMinutes * 60);

        return $next($request);
    }
}
