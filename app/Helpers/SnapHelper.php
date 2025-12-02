<?php

namespace App\Helpers;

use App\Enums\SnapService;
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
     * Normalisasi path untuk signature
     * Menghapus prefix 'api/' jika ada dan memastikan path dimulai dengan '/'
     * 
     * @param string $path Path yang akan dinormalisasi
     * @return string Path yang sudah dinormalisasi (tanpa prefix 'api/', dimulai dengan '/')
     */
    public static function normalizePath(string $path): string
    {
        // Hapus prefix 'api/' jika ada (baik dengan atau tanpa leading slash)
        $path = preg_replace('#^/?api/#', '', $path);

        // Pastikan path dimulai dengan '/'
        if (!str_starts_with($path, '/')) {
            $path = '/' . $path;
        }

        return $path;
    }

    /**
     * Get SnapService enum berdasarkan route
     * 
     * @param Request $request
     * @return SnapService
     */
    public static function getService(Request $request): SnapService
    {
        $route = $request->route();
        $routeName = $route ? $route->getName() : null;

        if ($routeName) {
            $service = SnapService::fromRouteName($routeName);
            if ($service) {
                return $service;
            }
        }

        return SnapService::default();
    }

    /**
     * Get service name string (backward compatibility)
     * 
     * @param Request $request
     * @return string Service name (token, inquiry, payment, inquiryStatus, updateStatusVa)
     */
    public static function getServiceName(Request $request): string
    {
        return self::getService($request)->value;
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
        return self::getService($request)->serviceCode();
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
     * Get required headers berdasarkan service
     * 
     * @param SnapService|string $service SnapService enum atau service name string
     * @return array Required headers untuk service tersebut
     */
    public static function getRequiredHeaders(SnapService|string $service): array
    {
        // Convert string to enum if needed
        if (is_string($service)) {
            $service = SnapService::fromServiceName($service) ?? SnapService::default();
        }

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

        return $service === SnapService::TOKEN ? $tokenHeaders : $serviceHeaders;
    }

    /**
     * Get path untuk service
     * Path akan dinormalisasi (hapus prefix 'api/' jika ada) untuk konsistensi dengan middleware
     * 
     * @param SnapService|string $service SnapService enum atau service name string
     * @return string Path untuk service (tanpa prefix 'api/')
     */
    public static function getServicePath(SnapService|string $service): string
    {
        // Convert string to enum if needed
        if (is_string($service)) {
            $service = SnapService::fromServiceName($service) ?? SnapService::default();
        }

        $path = $service->path();

        // Normalisasi path menggunakan helper function untuk konsistensi
        return self::normalizePath($path);
    }

    /**
     * Validasi format timestamp ISO 8601
     * 
     * Menerima berbagai format ISO 8601 yang valid:
     * - Dengan atau tanpa milliseconds
     * - Dengan timezone (Z, +hh:mm, -hh:mm) atau tanpa timezone
     * 
     * Contoh format yang valid:
     * - 2020-12-21T14:56:11.123+07:00 (dengan milliseconds dan timezone)
     * - 2020-12-21T14:56:11+07:00 (tanpa milliseconds, dengan timezone)
     * - 2025-11-28T01:29:13.000Z (dengan milliseconds, UTC)
     * - 2025-11-28T01:29:13Z (tanpa milliseconds, UTC)
     * - 2025-11-28T01:29:13 (tanpa milliseconds dan timezone)
     * 
     * @param string|null $timestamp Timestamp string
     * @return bool True jika format ISO 8601 valid
     */
    public static function isValidTimestamp(?string $timestamp): bool
    {
        if (!$timestamp || trim($timestamp) === '') {
            return false;
        }

        // Validasi dasar: pastikan format mengandung 'T' sebagai separator
        // (karakteristik utama ISO 8601)
        if (strpos($timestamp, 'T') === false) {
            return false;
        }

        // Validasi: pastikan format tanggal valid (YYYY-MM-DD)
        $datePart = substr($timestamp, 0, 10);
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $datePart)) {
            return false;
        }

        // Gunakan DateTime untuk validasi format ISO 8601
        // DateTime constructor sangat fleksibel dalam memparse format ISO 8601
        try {
            $date = new \DateTime($timestamp);

            // Pastikan parsing berhasil dan tidak ada error
            // DateTime akan throw exception jika format tidak valid
            return $date !== false;
        } catch (\Exception $e) {
            return false;
        }
    }
}
