<?php

namespace App\Services\Snap;

use App\Helpers\SnapHelper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SnapService
{

    /**
     * Generate token baru dan simpan ke database untuk tracking
     */
    public function generateToken(Request $request): JsonResponse
    {
        // Detect bank dari request
        $bank = SnapHelper::detectBank($request);
        if (!$bank) {
            return SnapBi()->token()->response()->error(401, 0, 'X-CLIENT-KEY', 'Invalid X-CLIENT-KEY. Bank not found or not registered');
        }

        try {
            $clientId = $request->header('X-CLIENT-KEY');
            $timestamp = currentTimestamp()->toIso8601String();

            // Generate access token (UUID atau random string)
            // Untuk inbound API, kita generate token sendiri (bukan dari B2B API)
            $accessToken = \Illuminate\Support\Str::uuid()->toString();
            $expiresIn = 900; // 15 menit
            $expiresAt = now()->addSeconds($expiresIn);

            // Deactivate semua token lama untuk bank dan client_id yang sama
            \App\Models\SnapToken::forBank($bank, $clientId)
                ->active()
                ->update(['is_active' => false]);

            // Simpan token baru ke database untuk tracking
            $token = \App\Models\SnapToken::create([
                'bank' => strtolower($bank),
                'client_id' => $clientId,
                'ip' => $request->ip(),
                'meta' => [
                    'user_agent' => $request->userAgent(),
                    'headers' => [
                        'X-CLIENT-KEY' => $request->header('X-CLIENT-KEY'),
                        'X-TIMESTAMP' => $request->header('X-TIMESTAMP'),
                        'X-SIGNATURE' => $request->header('X-SIGNATURE'),
                        'CHANNEL-ID' => $request->header('CHANNEL-ID'),
                        'X-PARTNER-ID' => $request->header('X-PARTNER-ID'),
                    ],
                ],
                'access_token' => $accessToken,
                'token_type' => 'bearer',
                'expires_in' => $expiresIn,
                'expires_at' => $expiresAt,
                'is_active' => true,
                'last_used_at' => now(),
            ]);

            \Illuminate\Support\Facades\Log::info('Snap B2B token generated (inbound)', [
                'bank' => $bank,
                'client_id' => $clientId,
                'access_token' => substr($accessToken, 0, 20) . '...',
                'expires_at' => $expiresAt->toIso8601String(),
            ]);

            return SnapBi($bank)->token()->response()->success([
                'accessToken' => $accessToken,
                'tokenType' => 'bearer',
                'expiresIn' => (string) $expiresIn
            ]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Failed to generate B2B token', [
                'bank' => $bank,
                'error' => $e->getMessage(),
            ]);

            return SnapBi($bank)->token()->response()->error(500, 0, null, 'Failed to generate access token: ' . $e->getMessage());
        }
    }

    /**
     * Virtual Account Inquiry
     */
    public function inquiry(): JsonResponse
    {
        return SnapBi()->inquiry()->response()->success([
            'virtualAccountData' => [
                "partnerServiceId" => config('snap.provider.OCBC.biller_id'),
                "customerNo" => "1234567890",
                "virtualAccountNo" => config('snap.provider.OCBC.biller_id') . "1234567890",
                "virtualAccountName" => "BUDHI SETIAWAN",
                "inquiryRequestId" => "99606334000179434754",
                "totalAmount" => [
                    "value" => "10000.0",
                    "currency" => "IDR"
                ],
                "billDetails" => [
                    [
                        "billAmount" => [
                            "value" => "10500.00",
                            "currency" => "IDR"
                        ]
                    ]
                ],
                "feeAmount" => [
                    "value" => "0.00",
                    "currency" => "IDR"
                ]
            ]
        ]);
    }

    /**
     * Virtual Account Payment
     */
    public function payment(): JsonResponse
    {
        return SnapBi()->payment()->response()->success([
            'virtualAccountData' => [
                "partnerServiceId" => config('snap.provider.OCBC.biller_id'),
                "customerNo" => "1234567890",
                "virtualAccountNo" => config('snap.provider.OCBC.biller_id') . "1234567890",
                "virtualAccountName" => "BUDHI SETIAWAN",
                "paymentRequestId" => "99606334000179434754",
                "paidAmount" => [
                    [
                        "value" => "10500.0",
                        "currency" => "IDR"
                    ]
                ],
                "totalAmount" => [
                    [
                        "value" => "10500.0",
                        "currency" => "IDR"
                    ]
                ],
                "billDetails" => [
                    [
                        "billAmount" => [
                            [
                                "value" => "10500.00",
                                "currency" => "IDR"
                            ]
                        ]
                    ]
                ],
                "feeAmount" => [
                    [
                        "value" => "0.00",
                        "currency" => "IDR"
                    ]
                ]
            ],
        ]);
    }

    /**
     * Inquiry Payment Status
     */
    public function inquiryStatus(): JsonResponse
    {
        return SnapBi()->inquiryStatus()->response()->success([
            'virtualAccountData' => [
                "partnerServiceId" => config('snap.provider.OCBC.biller_id'),
                "customerNo" => "1234567890",
                "virtualAccountNo" => config('snap.provider.OCBC.biller_id') . "1234567890",
                "inquiryRequestId" => "7e354c43-9b9f-4b8a-b3c6-ef0087171ca7",
                "paymentRequestId" => "7e354c43-9b9f-4b8a-b3c6-ef0087171ca7",
                "paidAmount" => [
                    "value" => "100000.00",
                    "currency" => "IDR"
                ],
                "totalAmount" => [
                    "value" => "100000.00",
                    "currency" => "IDR"
                ],
            ]
        ]);
    }

    /**
     * Update Virtual Account Status
     */
    public function updateStatusVa(): JsonResponse
    {
        return SnapBi()->updateStatus()->response()->success([
            'virtualAccountData' => [
                "partnerServiceId" => config('snap.provider.OCBC.biller_id'),
                "customerNo" => "1234567890",
                "virtualAccountNo" => config('snap.provider.OCBC.biller_id') . "1234567890",
                "virtualAccountName" => "BUDHI SETIAWAN",
                "trxId" => "18a5920b-f3b1-4a7a-b57b-dd2977844071-33168300001629442",
                "totalAmount" => [
                    "value" => "50000.00",
                    "currency" => "IDR"
                ],
                "feeAmount" => [
                    "value" => "0.00",
                    "currency" => "IDR"
                ]
            ]
        ]);
    }
}
