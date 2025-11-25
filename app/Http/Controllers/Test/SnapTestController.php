<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use App\Services\Snap\SnapService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Otnansirk\SnapBI\Support\Signature;
use Otnansirk\SnapBI\Services\OCBC\OcbcConfig;
use Otnansirk\SnapBI\Exception\SignatureException;

// OCBC NISP API Simulation (Mock Server)
class SnapTestController extends Controller
{
    private const ACCESS_TOKEN_CACHE_PREFIX = 'snap_mock_access_token:';
    private const ACCESS_TOKEN_TTL_SECONDS = 900;
    private const INQUIRY_PATH = '/v1.0/transfer-va/inquiry';

    protected SnapService $snapService;
    private array $virtualAccountProfiles = [
        '882718359232' => [
            'name' => 'YUSUF OCBC',
            'amount' => '10500.00',
            'billDetails' => [
                [
                    'billAmount' => [
                        'value' => '10500.00',
                        'currency' => 'IDR',
                    ],
                ],
            ],
            'additionalInfo' => [
                'bill_number' => 'INV-123123123123',
                'bill_period' => '01 Agustus 2023',
                'phone_number' => '085123123123',
                'email' => 'email@contoh.com',
                'bill_description_1' => '',
                'bill_description_2' => '',
                'bill_description_3' => '',
                'bill_description_4' => '',
                'bill_description_5' => '',
                'bill_description_6' => '',
                'bill_description_7' => '',
                'bill_description_8' => '',
                'bill_description_9' => '',
                'bill_description_10' => '',
                'voucher_id' => 'VOUCHER1',
                'is_from_intrabank' => true,
            ],
        ],
    ];

    public function __construct(SnapService $snapService)
    {
        $this->snapService = $snapService;
    }
    /**
     * Simulasi endpoint access token B2B OCBC NISP
     * 
     * Endpoint: POST /api/v1/access-token/b2b
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function token(Request $request): JsonResponse
    {
        // Log request untuk debugging
        Log::info('OCBC NISP Simulasi - Access Token Request', [
            'method' => $request->method(),
            'url' => $request->fullUrl(),
            'headers' => [
                'X-TIMESTAMP' => $request->header('X-TIMESTAMP'),
                'X-CLIENT-KEY' => $request->header('X-CLIENT-KEY'),
                'X-SIGNATURE' => $request->header('X-SIGNATURE') ? '***' : null,
            ],
            'body' => $request->all(),
        ]);

        // Validasi headers yang diperlukan
        $timestamp = $request->header('X-TIMESTAMP');
        $clientKey = $request->header('X-CLIENT-KEY');
        $signature = $request->header('X-SIGNATURE');

        // Validasi request body
        $grantType = $request->input('grantType');

        // Response timestamp untuk error responses
        $responseTimestamp = Carbon::now()->format('Y-m-d\TH:i:s.vP');

        if (!$timestamp || !$clientKey || !$signature) {
            return response()->json([
                'responseCode' => '4007300',
                'responseMessage' => 'Bad Request. Missing required headers.',
            ], 400)
                ->header('X-TIMESTAMP', $responseTimestamp)
                ->header('X-CLIENT-KEY', $clientKey ?? '');
        }

        if ($grantType !== 'client_credentials') {
            return response()->json([
                'responseCode' => '4007300',
                'responseMessage' => 'Bad Request. Invalid grantType.',
            ], 400)
                ->header('X-TIMESTAMP', $responseTimestamp)
                ->header('X-CLIENT-KEY', $clientKey);
        }

        // Verifikasi signature
        try {
            $publicKey = OcbcConfig::get('ssh_public_key');
            $configClientId = OcbcConfig::get('client_id');

            if (!$publicKey) {
                Log::warning('OCBC NISP Simulasi - Public key not found in config');
                return response()->json([
                    'responseCode' => '5007300',
                    'responseMessage' => 'Internal Server Error. Public key not configured.',
                ], 500)
                    ->header('X-TIMESTAMP', $responseTimestamp)
                    ->header('X-CLIENT-KEY', $clientKey);
            }

            // Validasi: X-CLIENT-KEY harus sama dengan client_id di config
            if ($clientKey !== $configClientId) {
                Log::warning('OCBC NISP Simulasi - Client ID mismatch', [
                    'x_client_key' => $clientKey,
                    'config_client_id' => $configClientId,
                ]);

                return response()->json([
                    'responseCode' => '4007300',
                    'responseMessage' => 'Bad Request. X-CLIENT-KEY tidak sesuai dengan konfigurasi.',
                ], 400)
                    ->header('X-TIMESTAMP', $responseTimestamp)
                    ->header('X-CLIENT-KEY', $clientKey);
            }

            // Verifikasi signature menggunakan Signature::verifyAsymmetricOcbcNisp
            // PENTING: Gunakan client_id dari config (bukan dari header) karena signature
            // di-generate menggunakan client_id dari config
            $isValid = Signature::verifyAsymmetricOcbcNisp(
                $publicKey,
                $configClientId, // Gunakan client_id dari config, bukan dari header
                $timestamp,
                $signature
            );

            if (!$isValid) {
                Log::warning('OCBC NISP Simulasi - Signature verification failed', [
                    'clientKey' => $clientKey,
                    'timestamp' => $timestamp,
                ]);

                return response()->json([
                    'responseCode' => '4017300',
                    'responseMessage' => 'Unauthorized. [Signature]',
                ], 401)
                    ->header('X-TIMESTAMP', $responseTimestamp)
                    ->header('X-CLIENT-KEY', $clientKey);
            }

            Log::info('OCBC NISP Simulasi - Signature verified successfully', [
                'clientKey' => $clientKey,
                'timestamp' => $timestamp,
            ]);
        } catch (SignatureException $e) {
            Log::error('OCBC NISP Simulasi - Signature verification error', [
                'error' => $e->getMessage(),
                'clientKey' => $clientKey,
                'timestamp' => $timestamp,
            ]);

            return response()->json([
                'responseCode' => '5007300',
                'responseMessage' => 'Internal Server Error. Signature verification failed: ' . $e->getMessage(),
            ], 500)
                ->header('X-TIMESTAMP', $responseTimestamp)
                ->header('X-CLIENT-KEY', $clientKey);
        } catch (\Exception $e) {
            Log::error('OCBC NISP Simulasi - Unexpected error during signature verification', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'responseCode' => '5007300',
                'responseMessage' => 'Internal Server Error. ' . $e->getMessage(),
            ], 500)
                ->header('X-TIMESTAMP', $responseTimestamp)
                ->header('X-CLIENT-KEY', $clientKey);
        }

        // Generate access token simulasi (dalam real API, ini di-generate oleh OCBC)
        // Format: UUID atau string panjang (max 2048 chars)
        $accessToken = $this->generateMockAccessToken();

        // Response sesuai format OCBC NISP API Documentation
        $response = [
            'responseCode' => '2007300',
            'responseMessage' => 'Successful',
            'accessToken' => $accessToken,
            'tokenType' => 'bearer', // lowercase sesuai dokumentasi
            'expiresIn' => '900', // 15 menit (900 detik) dalam format string
            'additionalInfo' => (object)[], // Optional, bisa dikosongkan atau diisi sesuai kebutuhan
        ];

        $this->rememberAccessToken($accessToken, $clientKey, self::ACCESS_TOKEN_TTL_SECONDS);

        Log::info('OCBC NISP Simulasi - Access Token Response', [
            'responseCode' => $response['responseCode'],
            'responseMessage' => $response['responseMessage'],
            'accessToken' => substr($accessToken, 0, 20) . '...',
            'tokenType' => $response['tokenType'],
            'expiresIn' => $response['expiresIn'],
        ]);

        // Set response headers sesuai dokumentasi
        // Format: yyyy-MM-ddTHH:mm:ss.SSSTZD (contoh: 2020-12-21T14:56:11.123+07:00)
        $responseTimestamp = Carbon::now()->format('Y-m-d\TH:i:s.vP');

        return $this->applyHeaders(
            response()->json($response, 200),
            [
                'X-TIMESTAMP' => $responseTimestamp,
                'X-CLIENT-KEY' => $clientKey,
            ]
        );
    }

    /**
     * Generate mock access token untuk simulasi
     * Sesuai dokumentasi: String dengan max length 2048
     * Format contoh: UUID (1f48caeb-b09f-4b59-9c31-2f6dd80dc11d)
     * 
     * @return string
     */
    private function generateMockAccessToken(): string
    {
        // Generate UUID format sesuai contoh dokumentasi
        // Format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10

        $uuid = vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));

        return $uuid;
    }

    public function signatureAuth(Request $request, ?string $bank = null): JsonResponse
    {
        try {
            // Get bank from parameter or use default from config
            $bank = $bank ?? $request->input('bank', config('snap.default', ''));
            $this->snapService->setBank($bank);
            $response = $this->snapService->getSignatureAuth($request->header('X-TIMESTAMP'));
            Log::info("{$bank} Signature Auth Response", [
                'bank' => strtoupper($bank),
                'timestamp' => $request->header('X-TIMESTAMP'),
                'signature' => $response,
            ]);
            return response()->json([
                'signature' => $response,
            ])->header('X-TIMESTAMP', $request->header('X-TIMESTAMP'));
        } catch (\Exception $e) {
            Log::error("{$bank} Signature Auth Error", [
                'bank' => strtoupper($bank),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal mendapatkan signature auth',
                'bank' => strtoupper($bank),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function inquiry(Request $request): JsonResponse
    {
        $responseHeaders = [
            'X-PARTNER-ID' => $request->header('X-PARTNER-ID'),
            'X-EXTERNAL-ID' => $request->header('X-EXTERNAL-ID'),
            'CHANNEL-ID' => $request->header('CHANNEL-ID'),
        ];

        $contentType = $request->header('Content-Type');
        $authorization = $request->header('Authorization');
        $headerTimestamp = $request->header('X-TIMESTAMP');
        $signatureHeader = $request->header('X-SIGNATURE');

        $missingHeaders = [];
        foreach (
            [
                'Content-Type' => $contentType,
                'Authorization' => $authorization,
                'X-TIMESTAMP' => $headerTimestamp,
                'X-SIGNATURE' => $signatureHeader,
                'X-PARTNER-ID' => $responseHeaders['X-PARTNER-ID'],
                'X-EXTERNAL-ID' => $responseHeaders['X-EXTERNAL-ID'],
                'CHANNEL-ID' => $responseHeaders['CHANNEL-ID'],
            ] as $key => $value
        ) {
            if (empty($value)) {
                $missingHeaders[] = $key;
            }
        }

        if ($missingHeaders) {
            return $this->buildErrorResponse(
                'Bad Request. Missing headers: ' . implode(', ', $missingHeaders),
                '4002401',
                400,
                $responseHeaders
            );
        }

        if (stripos($contentType, 'application/json') === false) {
            return $this->buildErrorResponse(
                'Bad Request. Content-Type must be application/json.',
                '4002402',
                400,
                $responseHeaders
            );
        }

        if (!preg_match('/^Bearer\s+(.+)$/i', $authorization, $matches)) {
            return $this->buildErrorResponse(
                'Unauthorized. Invalid Authorization header.',
                '4012401',
                401,
                $responseHeaders
            );
        }

        $accessToken = trim($matches[1]);
        $tokenMeta = $this->resolveAccessToken($accessToken);
        if (!$tokenMeta) {
            return $this->buildErrorResponse(
                'Unauthorized. Access token not recognized or expired.',
                '4012402',
                401,
                $responseHeaders
            );
        }

        if ($responseHeaders['X-PARTNER-ID'] !== OcbcConfig::get('partner_id')) {
            return $this->buildErrorResponse(
                'Unauthorized. X-PARTNER-ID does not match configuration.',
                '4012403',
                401,
                $responseHeaders
            );
        }

        if ($responseHeaders['CHANNEL-ID'] !== OcbcConfig::get('channel_id')) {
            return $this->buildErrorResponse(
                'Unauthorized. CHANNEL-ID does not match configuration.',
                '4012404',
                401,
                $responseHeaders
            );
        }

        if (!ctype_digit($responseHeaders['X-EXTERNAL-ID'])) {
            return $this->buildErrorResponse(
                'Bad Request. X-EXTERNAL-ID must be numeric.',
                '4002403',
                400,
                $responseHeaders
            );
        }

        $validator = Validator::make(
            $request->all(),
            [
                'partnerServiceId' => 'required|string|max:20',
                'inquiryRequestId' => 'required|string|max:32',
                'customerNo' => 'required|string|max:23',
                'virtualAccountNo' => 'required|string|max:32',
                'channelCode' => 'required|string|max:10',
            ]
        );

        if ($validator->fails()) {
            return $this->buildErrorResponse(
                'Bad Request. ' . $validator->errors()->first(),
                '4002404',
                400,
                $responseHeaders
            );
        }

        $payload = [
            'partnerServiceId' => $validator->validated()['partnerServiceId'],
            'inquiryRequestId' => $validator->validated()['inquiryRequestId'],
            'customerNo' => $validator->validated()['customerNo'],
            'virtualAccountNo' => $validator->validated()['virtualAccountNo'],
            'channelCode' => $validator->validated()['channelCode'],
        ];

        if ($payload['channelCode'] !== $responseHeaders['CHANNEL-ID']) {
            return $this->buildErrorResponse(
                'Bad Request. channelCode must match CHANNEL-ID header.',
                '4002405',
                400,
                $responseHeaders
            );
        }

        try {
            $expectedSignature = Signature::symmetric(
                OcbcConfig::class,
                'POST',
                self::INQUIRY_PATH,
                $payload,
                $headerTimestamp,
                $accessToken
            );
        } catch (\Exception $exception) {
            Log::error('OCBC NISP Simulasi - Failed to generate symmetric signature', [
                'error' => $exception->getMessage(),
            ]);

            return $this->buildErrorResponse(
                'Internal Server Error. Unable to validate signature.',
                '5002401',
                500,
                $responseHeaders
            );
        }

        if (!hash_equals($expectedSignature, $signatureHeader)) {
            Log::warning('OCBC NISP Simulasi - Signature mismatch', [
                'expected' => $expectedSignature,
                'provided' => $signatureHeader,
            ]);

            return $this->buildErrorResponse(
                'Unauthorized. Invalid signature.',
                '4012405',
                401,
                $responseHeaders
            );
        }

        $vaResponse = $this->buildVirtualAccountResponse($payload);

        Log::info('OCBC NISP Simulasi - Inquiry success', [
            'partnerServiceId' => $payload['partnerServiceId'],
            'customerNo' => $payload['customerNo'],
            'virtualAccountNo' => $payload['virtualAccountNo'],
            'inquiryRequestId' => $payload['inquiryRequestId'],
        ]);

        return $this->applyHeaders(
            response()->json(
                [
                    'responseCode' => '2002400',
                    'responseMessage' => 'Successful',
                    'virtualAccountData' => $vaResponse['virtualAccountData'],
                    'additionalInfo' => $vaResponse['additionalInfo'],
                ],
                200
            ),
            array_merge($responseHeaders, [
                'X-TIMESTAMP' => Carbon::now()->format('Y-m-d\TH:i:s.vP'),
            ])
        );
    }

    private function rememberAccessToken(string $token, string $clientKey, int $ttl): void
    {
        Cache::put(
            $this->tokenCacheKey($token),
            [
                'client_id' => $clientKey,
                'issued_at' => Carbon::now(),
            ],
            $ttl
        );
    }

    private function resolveAccessToken(string $token): ?array
    {
        return Cache::get($this->tokenCacheKey($token));
    }

    private function tokenCacheKey(string $token): string
    {
        return self::ACCESS_TOKEN_CACHE_PREFIX . $token;
    }

    private function buildVirtualAccountResponse(array $payload): array
    {
        $profile = $this->virtualAccountProfiles[$payload['customerNo']] ?? [
            'name' => 'SNAP MOCK CUSTOMER',
            'amount' => '50000.00',
            'billDetails' => [
                [
                    'billAmount' => [
                        'value' => '50000.00',
                        'currency' => 'IDR',
                    ],
                ],
            ],
            'additionalInfo' => [],
        ];

        $virtualAccountData = [
            'partnerServiceId' => $payload['partnerServiceId'],
            'customerNo' => $payload['customerNo'],
            'virtualAccountNo' => $payload['virtualAccountNo'],
            'virtualAccountName' => $profile['name'],
            'inquiryRequestId' => $payload['inquiryRequestId'],
            'totalAmount' => [
                'value' => $profile['amount'],
                'currency' => 'IDR',
            ],
            'billDetails' => $profile['billDetails'],
            'feeAmount' => [
                'value' => '0.00',
                'currency' => 'IDR',
            ],
        ];

        return [
            'virtualAccountData' => $virtualAccountData,
            'additionalInfo' => $profile['additionalInfo'],
        ];
    }

    private function buildErrorResponse(string $message, string $code, int $status, array $headers = []): JsonResponse
    {
        return $this->applyHeaders(
            response()->json(
                [
                    'responseCode' => $code,
                    'responseMessage' => $message,
                ],
                $status
            ),
            array_merge($headers, [
                'X-TIMESTAMP' => Carbon::now()->format('Y-m-d\TH:i:s.vP'),
            ])
        );
    }

    private function applyHeaders(JsonResponse $response, array $headers = []): JsonResponse
    {
        foreach ($headers as $header => $value) {
            if ($value !== null && $value !== '') {
                $response->header($header, $value);
            }
        }

        return $response;
    }
}
