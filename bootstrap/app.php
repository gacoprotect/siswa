<?php

use App\Exceptions\Handler;
use App\Http\Middleware\HandleApiRequest;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\LogRequest;
use App\Http\Middleware\Snap\HandleSnapRequest;
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
        $middleware->append(LogRequest::class);
        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->api(append: [
            HandleApiRequest::class,
        ]);
        $middleware->appendToGroup('snap', [
            HandleSnapRequest::class
        ]);
        $middleware->alias([
            'verify.nouid' => \App\Http\Middleware\VerifyNouid::class,
            'auth.siswa' => \Illuminate\Auth\Middleware\Authenticate::class . ':siswa',
        ]);
    })
    ->withSingletons([])
    ->withExceptions(function (Exceptions $exceptions) {
        // Render exception untuk API routes sebagai JSON
        $exceptions->render(function (Throwable $e, $request) {
            return \App\Exceptions\ApiExceptionHandler::handle($e, $request);
        });
    })->create();
