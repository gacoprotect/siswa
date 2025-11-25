<?php

use App\Http\Middleware\CustomHeader;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        // Add timestamp header to all requests and responses
        $middleware->append(CustomHeader::class);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'verify.nouid' => \App\Http\Middleware\VerifyNouid::class,
            'auth.siswa' => \Illuminate\Auth\Middleware\Authenticate::class . ':siswa',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Use ExceptionHandlerService for all exceptions
        $exceptions->render(function (\Throwable $e, \Illuminate\Http\Request $request) {
            $handler = app(\App\Services\Exception\ExceptionHandlerService::class);
            return $handler->handle($e, $request);
        });

        // Report exceptions that should be reported
        $exceptions->report(function (\Throwable $e) {
            $handler = app(\App\Services\Exception\ExceptionHandlerService::class);
            if ($handler->shouldReport($e)) {
                // Exception will be logged by the handler
            }
        });
    })->create();
