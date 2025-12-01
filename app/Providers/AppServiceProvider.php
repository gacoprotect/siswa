<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Gaco\SnapBi\Services\Config;

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
        // Register SNAP BI bank configurations
        $this->registerSnapBiConfigs();
    }

    /**
     * Register SNAP BI bank configurations from config/snap.php
     */
    protected function registerSnapBiConfigs(): void
    {
        $providers = config('snap.provider', []);

        if (empty($providers)) {
            return;
        }

        // Map provider names to bank names (case-insensitive)
        $bankNameMap = [
            'ocbc' => 'ocbc',
            'bca' => 'bca',
            'mandiri' => 'mandiri',
            'cimb' => 'cimb',
        ];

        foreach ($providers as $providerName => $providerConfig) {
            $bankName = strtolower($providerName);

            // Skip if bank not supported
            if (!isset($bankNameMap[$bankName])) {
                continue;
            }

            // Skip if config is empty or missing required fields
            if (empty($providerConfig) || !isset($providerConfig['client_id'])) {
                continue;
            }

            try {
                // Register config to library using Config::for() and register()
                $bankName = $bankNameMap[$bankName];
                $config = Config::for($bankName);
                $config->register($providerConfig);
            } catch (\Exception $e) {
                // Log error but don't fail silently in development
                if (config('app.debug')) {
                    logger()->warning("Failed to register SNAP BI config for bank '{$bankName}': " . $e->getMessage());
                }
            }
        }
    }
}
