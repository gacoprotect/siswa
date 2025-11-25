<?php

namespace App\Http\Controllers\Snap;

use App\Http\Controllers\Controller;
use App\Services\Snap\SnapResponseCodeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SnapErrorController extends Controller
{
    protected SnapResponseCodeService $snapResponseCodeService;

    public function __construct(SnapResponseCodeService $snapResponseCodeService)
    {
        $this->snapResponseCodeService = $snapResponseCodeService;
    }

    /**
     * Display SNAP error page
     *
     * @param Request $request
     * @return Response
     */
    public function show(Request $request): Response
    {
        $errorCode = $request->query('code');
        $errorMessage = $request->query('message');
        $errorDetails = null;

        // Get error details from session if available
        try {
            if ($request->hasSession()) {
                $snapError = $request->session()->get('snap_error');
                if ($snapError) {
                    $errorCode = $errorCode ?? $snapError['response_code'] ?? null;
                    $errorMessage = $errorMessage ?? $snapError['response_message'] ?? null;
                    
                    // Get detailed information from response code service
                    if ($errorCode) {
                        $codeInfo = $this->snapResponseCodeService->getResponseCodeInfo($errorCode);
                        if ($codeInfo) {
                            $errorDetails = [
                                'category' => $codeInfo['category'],
                                'http_code' => $codeInfo['http_code'],
                                'description' => $codeInfo['description'],
                                'description_internal' => $codeInfo['description_internal'],
                                'mapping_internal' => $codeInfo['mapping_internal'],
                            ];
                        }
                    }
                }
            }
        } catch (\Exception $e) {
            // Session not available, continue with query params
        }

        // Fallback: Try to get details from response code if not from session
        if (!$errorDetails && $errorCode) {
            $codeInfo = $this->snapResponseCodeService->getResponseCodeInfo($errorCode);
            if ($codeInfo) {
                $errorDetails = [
                    'category' => $codeInfo['category'],
                    'http_code' => $codeInfo['http_code'],
                    'description' => $codeInfo['description'],
                    'description_internal' => $codeInfo['description_internal'],
                    'mapping_internal' => $codeInfo['mapping_internal'],
                ];
                
                // Use description from code info if message not provided
                if (!$errorMessage) {
                    $errorMessage = $codeInfo['response_message'];
                }
            }
        }

        return Inertia::render('Error/Snap', [
            'code' => $errorCode ?? 'UNKNOWN',
            'message' => $errorMessage ?? 'Terjadi kesalahan saat memproses transaksi.',
            'errorDetails' => $errorDetails,
        ]);
    }
}

