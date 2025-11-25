<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Otnansirk\SnapBI\Services\Config;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Track if configurations have been registered
     *
     * @var bool
     */
    protected static $configsRegistered = false;

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
        // Prevent multiple registrations in the same request
        if (self::$configsRegistered) {
            return;
        }

        // Register all bank configurations automatically
        $bankConfigs = [
            // 'aspi' => fn($config) => Config::aspi($config),
            // 'bca' => fn($config) => Config::bca($config),
            // 'mandiri' => fn($config) => Config::mandiri($config),
            // 'dana' => fn($config) => Config::dana($config),
            'ocbc' => fn($config) => Config::ocbc($config),
        ];

        foreach ($bankConfigs as $bank => $registerFn) {
            $config = config("snap.{$bank}");
            if ($config && !empty($config['client_id'])) {
                try {
                    $registerFn($config);
                } catch (\InvalidArgumentException $e) {
                    // Only log warnings, not debug messages to reduce log spam
                    if (!self::$configsRegistered) {
                        logger()->warning("{$bank} configuration registration failed: " . $e->getMessage());
                    }
                } catch (\Exception $e) {
                    // Silently handle other exceptions to prevent log spam
                }
            }
        }

        self::$configsRegistered = true;
    }
}
