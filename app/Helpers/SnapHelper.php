<?php

namespace App\Helpers;

use Gaco\SnapBi\SnapBi;
use Illuminate\Http\Request;

class SnapHelper
{
    public static function getSnapBi(string $bankName): SnapBi
    {
        return SnapBi()->for($bankName);
    }

    public static function getSnapBiInstance(): SnapBi
    {
        return SnapBi();
    }

    /**
     * Get service name berdasarkan route
     * 
     * @param Request $request
     * @return string Service name (token, inquiry, payment, inquiryStatus, updateStatusVa)
     */
    public static function getService(Request $request): string
    {
        $route = $request->route();
        $routeName = $route ? $route->getName() : null;

        // Mapping route name ke service name
        $routeToService = [
            'snap.token' => 'token',
            'snap.inquiry' => 'inquiry',
            'snap.payment' => 'payment',
            'snap.status' => 'inquiryStatus',
            'snap.update-status' => 'updateStatusVa',
        ];

        if ($routeName && isset($routeToService[$routeName])) {
            return $routeToService[$routeName];
        }
        return 'token';
    }

    /**
     * Auto detect bank dari header X-Client-Key
     * 
     * @param Request $request
     * @return string|null Bank name (ocbc, bca, mandiri, cimb) atau null
     */
    public static function detectBank(Request $request): ?string
    {
        $clientKey = $request->header('X-Client-Key');

        if (!$clientKey) {
            return null;
        }

        // Cek setiap provider di config
        $providers = config('snap.provider', []);

        foreach ($providers as $bankName => $config) {
            if (isset($config['client_id']) && $config['client_id'] === $clientKey) {
                return strtolower($bankName);
            }
        }

        return null;
    }

    /**
     * Get service code dari request - untuk logging atau keperluan lain
     * 
     * @param Request $request
     * @return string Service code (2 digits)
     */
    public static function getServiceCode(Request $request): string
    {
        $route = $request->route();
        $routeName = $route ? $route->getName() : null;

        $routes = [
            'snap.token' => '73',
            'snap.inquiry' => '24',
            'snap.payment' => '25',
            'snap.status' => '26',
            'snap.update-status' => '29',
        ];

        if ($routeName && isset($routes[$routeName])) {
            return $routes[$routeName];
        }

        // Fallback: coba deteksi dari path
        $path = $request->path();
        if (str_contains($path, 'access-token/b2b')) {
            return '73'; // TOKEN
        } elseif (str_contains($path, 'transfer-va/inquiry')) {
            return '24'; // INQUIRY
        } elseif (str_contains($path, 'transfer-va/payment')) {
            return '25'; // PAYMENT
        } elseif (str_contains($path, 'transfer-va/status')) {
            return '26'; // INQUIRY_STATUS
        } elseif (str_contains($path, 'transfer-va/update-status')) {
            return '29'; // UPDATE_STATUS_VA
        }

        // Default fallback (tidak seharusnya terjadi, tapi untuk safety)
        return '73'; // TOKEN
    }
    /**
     * Cek apakah request adalah token endpoint
     */
    public static function isTokenEndpoint(Request $request): bool
    {
        $path = $request->path();
        $routeName = $request->route()?->getName();

        return str_contains($path, 'access-token/b2b') || $routeName === 'snap.token';
    }

    /**
     * Get required headers berdasarkan service name
     * 
     * @param string $serviceName Service name (token, inquiry, payment, inquiryStatus, updateStatusVa)
     * @return array Required headers untuk service tersebut
     */
    public static function getRequiredHeaders(string $serviceName): array
    {
        // B2B Access Token headers
        $tokenHeaders = [
            'X-CLIENT-KEY',
            'X-TIMESTAMP',
            'X-SIGNATURE',
        ];

        // Virtual Account headers (Inquiry, Payment, Update Status, Inquiry Status, Transfer)
        $serviceHeaders = [
            'X-CLIENT-KEY',
            'X-TIMESTAMP',
            'X-SIGNATURE',
            'X-EXTERNAL-ID',
            'CHANNEL-ID',
            'X-PARTNER-ID',
        ];

        return $serviceName === 'token' ? $tokenHeaders : $serviceHeaders;
    }

    /**
     * Validasi format timestamp sesuai spesifikasi SNAP BI
     * 
     * Format: yyyy-MM-ddTHH:mm:ss.SSSTZD
     * - yyyy: four-digit year
     * - MM: two-digit month (01-12)
     * - dd: two-digit day (01-31)
     * - T: literal 'T' separator
     * - HH: two digits of hour (00-23)
     * - mm: two digits of minute (00-59)
     * - ss: two digits of second (00-59)
     * - SSS: three digits millisecond (000-999)
     * - TZD: time zone designator (Z atau +hh:mm atau -hh:mm)
     * 
     * Contoh valid:
     * - 2025-11-28T01:29:13.000Z
     * - 2025-11-28T01:29:13.000+07:00
     * - 2025-11-28T01:29:13.000-05:00
     */
    public static function isValidTimestamp(?string $timestamp): bool
    {
        if (!$timestamp) {
            return false;
        }

        // Pattern sesuai spesifikasi: yyyy-MM-ddTHH:mm:ss.SSSTZD
        // TZD bisa berupa:
        // - Z (UTC)
        // - +hh:mm (positive offset)
        // - -hh:mm (negative offset)
        $pattern = '/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})(Z|[+-]\d{2}:\d{2})$/';

        if (!preg_match($pattern, $timestamp, $matches)) {
            return false;
        }

        // Validasi komponen tanggal dan waktu
        $year = (int) $matches[1];
        $month = (int) $matches[2];
        $day = (int) $matches[3];
        $hour = (int) $matches[4];
        $minute = (int) $matches[5];
        $second = (int) $matches[6];
        $millisecond = (int) $matches[7];

        // Validasi range
        if ($month < 1 || $month > 12) {
            return false;
        }

        if ($day < 1 || $day > 31) {
            return false;
        }

        if ($hour > 23) {
            return false;
        }

        if ($minute > 59) {
            return false;
        }

        if ($second > 59) {
            return false;
        }

        if ($millisecond > 999) {
            return false;
        }

        // Validasi tanggal valid (cek apakah tanggal benar-benar ada)
        if (!checkdate($month, $day, $year)) {
            return false;
        }

        // Cek apakah bisa di-parse sebagai DateTime (validasi tambahan)
        try {
            $date = new \DateTime($timestamp);
            return $date !== false;
        } catch (\Exception $e) {
            return false;
        }
    }
}
