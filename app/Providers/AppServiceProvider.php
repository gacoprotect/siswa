<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $publicApi = public_path('api');
        $realApi = base_path('wilayah/static/api');

        // Buat symlink hanya jika belum ada
        if (!file_exists($publicApi)) {
            symlink($realApi, $publicApi);
        }
    }
}
