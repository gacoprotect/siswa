<?php

namespace App\Http\Controllers\Api\Snap;

use App\Services\SnapService;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class SnapController extends Controller
{
    protected $snapService;

    public function __construct(SnapService $snapService)
    {
        $this->snapService = $snapService;
    }

    /**
     * Generate B2B Access Token
     */
    public function token(): JsonResponse
    {
        return $this->snapService->generateToken();
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
