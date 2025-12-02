<?php

namespace App\Enums;

enum SnapService: string
{
    case TOKEN = 'token';
    case INQUIRY = 'inquiry';
    case PAYMENT = 'payment';
    case INQUIRY_STATUS = 'inquiryStatus';
    case UPDATE_STATUS = 'updateStatusVa';

    /**
     * Get route name untuk service ini
     */
    public function routeName(): string
    {
        return match ($this) {
            self::TOKEN => 'snap.token',
            self::INQUIRY => 'snap.inquiry',
            self::PAYMENT => 'snap.payment',
            self::INQUIRY_STATUS => 'snap.status',
            self::UPDATE_STATUS => 'snap.update-status',
        };
    }

    /**
     * Get service code (2 digits) untuk service ini
     */
    public function serviceCode(): string
    {
        return match ($this) {
            self::TOKEN => '73',
            self::INQUIRY => '24',
            self::PAYMENT => '25',
            self::INQUIRY_STATUS => '26',
            self::UPDATE_STATUS => '29',
        };
    }

    /**
     * Get path dari route definition
     * Path akan dinormalisasi (hapus prefix 'api/' jika ada) untuk konsistensi dengan middleware
     */
    public function path(): ?string
    {
        try {
            $route = \Illuminate\Support\Facades\Route::getRoutes()->getByName($this->routeName());
            if ($route) {
                $uri = $route->uri();
                $path = '/' . ltrim($uri, '/');

                // Normalisasi path menggunakan helper function untuk konsistensi
                return \App\Helpers\SnapHelper::normalizePath($path);
            }
        } catch (\Exception $e) {
            // Route tidak ditemukan
        }

        // Fallback ke mapping manual (sudah tanpa prefix 'api/')
        return match ($this) {
            self::TOKEN => '/v1/access-token/b2b',
            self::INQUIRY => '/v1/transfer-va/inquiry',
            self::PAYMENT => '/v1/transfer-va/payment',
            self::INQUIRY_STATUS => '/v1/transfer-va/status',
            self::UPDATE_STATUS => '/v1/transfer-va/update-status',
        };
    }

    /**
     * Get SnapService dari route name
     */
    public static function fromRouteName(string $routeName): ?self
    {
        return match ($routeName) {
            'snap.token' => self::TOKEN,
            'snap.inquiry' => self::INQUIRY,
            'snap.payment' => self::PAYMENT,
            'snap.status' => self::INQUIRY_STATUS,
            'snap.update-status' => self::UPDATE_STATUS,
            default => null,
        };
    }

    /**
     * Get SnapService dari service name string
     * Support untuk berbagai variasi service name (token, inquiry, payment, status, inquiryStatus, update-status, updateStatusVa)
     */
    public static function fromServiceName(string $serviceName): ?self
    {
        // Coba langsung dari value
        $service = self::tryFrom($serviceName);
        if ($service) {
            return $service;
        }

        // Mapping untuk variasi service name
        return match (strtolower($serviceName)) {
            'token' => self::TOKEN,
            'inquiry' => self::INQUIRY,
            'payment' => self::PAYMENT,
            'status', 'inquirystatus' => self::INQUIRY_STATUS,
            'update-status', 'updatestatusva' => self::UPDATE_STATUS,
            default => null,
        };
    }

    /**
     * Get default service (TOKEN)
     */
    public static function default(): self
    {
        return self::TOKEN;
    }
}
