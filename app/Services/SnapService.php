<?php

namespace App\Services;

use App\Exceptions\GeneralJsonException;
use Gaco\SnapBi\SnapBi;
use Illuminate\Http\JsonResponse;

class SnapService
{
    /**
     * Generate B2B Access Token
     */
    public function generateToken(): JsonResponse
    {
        return SnapBi()->token()->response()->success([
            'accessToken' => '0b1be4d0-7b8c-4206-966d-e202ca43ed35',
            'tokenType' => 'bearer',
            'expiresIn' => '900'
        ]);
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
