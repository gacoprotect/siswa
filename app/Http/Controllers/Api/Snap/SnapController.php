<?php

namespace App\Http\Controllers\Api\Snap;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Snap\SnapService;

class SnapController extends Controller
{


    protected $snapService;

    public function __construct(SnapService $snapService)
    {
        $this->snapService = $snapService;
    }

    /**
     * Generate B2B Access Token dengan token management dan rate limiting
     */
    public function token(Request $request): JsonResponse
    {
        return $this->snapService->generateToken($request);
    }

    /**
     * Virtual Account Inquiry
     */
    public function inquiry(): JsonResponse
    {
        return $this->snapService->inquiry();
    }

    /**
     * Virtual Account Payment
     */
    public function payment(): JsonResponse
    {
        return $this->snapService->payment();
    }

    /**
     * Inquiry Payment Status
     */
    public function inquiryStatus(): JsonResponse
    {
        return $this->snapService->inquiryStatus();
    }

    /**
     * Update Virtual Account Status
     */
    public function updateStatusVa(): JsonResponse
    {
        return $this->snapService->updateStatusVa();
    }
}
