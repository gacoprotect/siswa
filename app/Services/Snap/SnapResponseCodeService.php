<?php

namespace App\Services\Snap;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class SnapResponseCodeService
{
    private const CACHE_KEY = 'snap_response_codes';
    private const CACHE_TTL = 86400; // 24 hours

    /**
     * Service code mapping untuk menentukan kolom yang tepat
     */
    private const SERVICE_CODE_MAP = [
        'token' => 73,
        'inquiry' => 24,
        'payment' => 25,
        'transfer_inquiry' => 32,
        'transfer_commit' => 33,
        'update_status_va' => 29,
        'notif_payment_intrabank' => 34,
        'inquiry_status' => 26,
    ];

    /**
     * Get response code information
     *
     * @param string $responseCode Response code dari SNAP (e.g., "2002400", "4002401")
     * @param string|null $serviceType Service type (token, inquiry, payment, etc.)
     * @return array|null
     */
    public function getResponseCodeInfo(string $responseCode, ?string $serviceType = null): ?array
    {
        $codes = $this->loadResponseCodes();

        // Try exact match first
        if (isset($codes[$responseCode])) {
            return $codes[$responseCode];
        }

        // If service type provided, try to find by service code
        if ($serviceType && isset(self::SERVICE_CODE_MAP[$serviceType])) {
            $serviceCode = self::SERVICE_CODE_MAP[$serviceType];
            $pattern = $this->extractPatternFromCode($responseCode, $serviceCode);
            
            if ($pattern && isset($codes[$pattern])) {
                return $codes[$pattern];
            }
        }

        // Try to find by HTTP code and case code pattern
        $pattern = $this->extractPatternFromCode($responseCode);
        if ($pattern && isset($codes[$pattern])) {
            return $codes[$pattern];
        }

        return null;
    }

    /**
     * Extract pattern from response code
     * Example: "4002401" -> "4002401" or "40024XX" pattern
     */
    private function extractPatternFromCode(string $responseCode, ?int $serviceCode = null): ?string
    {
        // Response code format: HTTP_CODE + SERVICE_CODE + CASE_CODE
        // Example: 4002401 = 400 (HTTP) + 24 (Service) + 01 (Case)
        
        if (strlen($responseCode) < 5) {
            return null;
        }

        $httpCode = substr($responseCode, 0, 3);
        $remaining = substr($responseCode, 3);

        // If service code provided, use it
        if ($serviceCode !== null) {
            $serviceCodeStr = str_pad((string)$serviceCode, 2, '0', STR_PAD_LEFT);
            $caseCode = substr($remaining, 2);
            return $httpCode . $serviceCodeStr . $caseCode;
        }

        // Try to match with any service code
        if (strlen($remaining) >= 2) {
            $caseCode = substr($remaining, -2);
            // Try common patterns
            foreach (self::SERVICE_CODE_MAP as $code) {
                $pattern = $httpCode . str_pad((string)$code, 2, '0', STR_PAD_LEFT) . $caseCode;
                return $pattern;
            }
        }

        return null;
    }

    /**
     * Load response codes from CSV file
     *
     * @return array
     */
    private function loadResponseCodes(): array
    {
        return Cache::remember(self::CACHE_KEY, self::CACHE_TTL, function () {
            $codes = [];
            $csvPath = storage_path('app/public/SNAP_RESPONSE_CODE.csv');

            if (!file_exists($csvPath)) {
                Log::warning('SNAP Response Code CSV file not found', ['path' => $csvPath]);
                return $codes;
            }

            $handle = fopen($csvPath, 'r');
            if (!$handle) {
                Log::error('Failed to open SNAP Response Code CSV file', ['path' => $csvPath]);
                return $codes;
            }

            // Skip header
            $header = fgetcsv($handle, 0, ';');
            if (!$header) {
                fclose($handle);
                return $codes;
            }

            // Map header columns
            $headerMap = array_flip($header);
            $categoryIndex = $headerMap['Category'] ?? 0;
            $httpCodeIndex = $headerMap['HTTP Code'] ?? 1;
            $serviceCodeIndex = $headerMap['Service Code'] ?? 2;
            $caseCodeIndex = $headerMap['Case Code'] ?? 3;
            $responseMessageIndex = $headerMap['Response Message'] ?? 4;
            $descriptionIndex = $headerMap['Description'] ?? 5;
            $mappingInternalIndex = $headerMap['Mapping Internal'] ?? 6;
            $descriptionInternalIndex = $headerMap['Description Internal'] ?? 7;

            // Service code columns (Token, Inquiry, Payment, etc.)
            $serviceColumns = [];
            foreach (self::SERVICE_CODE_MAP as $key => $code) {
                // Find column index for each service - try multiple name variations
                $columnNames = $this->getServiceColumnName($key);
                foreach ($columnNames as $columnName) {
                    if (isset($headerMap[$columnName])) {
                        $serviceColumns[$key] = $headerMap[$columnName];
                        break;
                    }
                }
            }

            while (($row = fgetcsv($handle, 0, ';')) !== false) {
                if (count($row) < 8) {
                    continue;
                }

                $category = trim($row[$categoryIndex] ?? '');
                $httpCode = trim($row[$httpCodeIndex] ?? '');
                $caseCode = trim($row[$caseCodeIndex] ?? '00');
                $responseMessage = trim($row[$responseMessageIndex] ?? '');
                $description = trim($row[$descriptionIndex] ?? '');
                $mappingInternal = trim($row[$mappingInternalIndex] ?? '');
                $descriptionInternal = trim($row[$descriptionInternalIndex] ?? '');

                // Process each service code
                foreach ($serviceColumns as $serviceType => $columnIndex) {
                    $responseCode = trim($row[$columnIndex] ?? '');
                    if (empty($responseCode)) {
                        continue;
                    }

                    $codes[$responseCode] = [
                        'response_code' => $responseCode,
                        'category' => $category,
                        'http_code' => (int)$httpCode,
                        'case_code' => $caseCode,
                        'response_message' => $responseMessage,
                        'description' => $description,
                        'mapping_internal' => $mappingInternal,
                        'description_internal' => $descriptionInternal,
                        'service_type' => $serviceType,
                    ];
                }
            }

            fclose($handle);
            return $codes;
        });
    }

    /**
     * Get service column name from CSV header
     * Try multiple variations to match CSV header format
     */
    private function getServiceColumnName(string $serviceType): array
    {
        $map = [
            'token' => ['Token (73)', 'Token(73)'],
            'inquiry' => ['Inquiry(24)', 'Inquiry (24)'],
            'payment' => ['Payment (25)', 'Payment(25)'],
            'transfer_inquiry' => ['Transfer Inquiry (32)', 'Transfer Inquiry(32)'],
            'transfer_commit' => ['Transfer Commit (33)', 'Transfer Commit(33)'],
            'update_status_va' => ['Update Status VA (29)', 'Update Status VA(29)'],
            'notif_payment_intrabank' => ['Notif Payment Intrabank (34)', 'Notif Payment Intrabank(34)'],
            'inquiry_status' => ['Inquiry Status (26)', 'Inquiry Status(26)'],
        ];

        return $map[$serviceType] ?? [];
    }

    /**
     * Check if response code indicates success
     *
     * @param string $responseCode
     * @return bool
     */
    public function isSuccess(string $responseCode): bool
    {
        $info = $this->getResponseCodeInfo($responseCode);
        return $info && $info['category'] === 'Success';
    }

    /**
     * Check if response code indicates business error
     *
     * @param string $responseCode
     * @return bool
     */
    public function isBusinessError(string $responseCode): bool
    {
        $info = $this->getResponseCodeInfo($responseCode);
        return $info && $info['category'] === 'Business';
    }

    /**
     * Check if response code indicates system error
     *
     * @param string $responseCode
     * @return bool
     */
    public function isSystemError(string $responseCode): bool
    {
        $info = $this->getResponseCodeInfo($responseCode);
        return $info && $info['category'] === 'System';
    }

    /**
     * Get HTTP status code from response code
     *
     * @param string $responseCode
     * @return int
     */
    public function getHttpCode(string $responseCode): int
    {
        $info = $this->getResponseCodeInfo($responseCode);
        return $info['http_code'] ?? 500;
    }

    /**
     * Clear cache
     */
    public function clearCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }
}

