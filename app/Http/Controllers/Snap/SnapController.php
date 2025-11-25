<?php

namespace App\Http\Controllers\Snap;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Concerns\HandlesSnapResponse;
use App\Services\Snap\SnapService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class SnapController extends Controller
{
    use HandlesSnapResponse;

    protected SnapService $snapService;

    public function __construct(SnapService $snapService)
    {
        $this->snapService = $snapService;
    }

    /**
     * Get access token
     *
     * @param Request $request
     * @param string|null $bank
     * @return JsonResponse
     */
    public function getAccessToken(Request $request): JsonResponse
    {
        try {
            // Get bank from query parameter or use default from config
            $bank = $request->input('bank', config('snap.default', ''));
            $this->snapService->setBank($bank);

            $response = $this->snapService->getAccessToken();

            Log::debug("{$bank} Access Token Response", [
                'bank' => strtoupper($bank),
                'status' => $response->status(),
                'failed' => $response->failed()
            ]);

            // Use trait method to handle response - will throw SnapException if error
            $data = $this->handleSnapResponse($response, 'token');

            return response()->json([
                'success' => true,
                'bank' => strtoupper($bank),
                'data' => $data,
            ]);
        } catch (\App\Exceptions\Snap\SnapException $e) {
            // Exception handler will automatically catch this and redirect/return JSON
            // But we can also handle it manually if needed
            return $this->handleSnapException($e, $request);
        } catch (\Exception $e) {
            $bank = $request->input('bank', config('snap.default', ''));
            Log::error("{$bank} Access Token Error", [
                'bank' => strtoupper($bank),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal mendapatkan access token',
                'bank' => strtoupper($bank),
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get signature auth
     *
     * @param Request $request
     * @param string|null $bank
     * @return JsonResponse
     */
    public function getSignatureAuth(Request $request, ?string $bank = null): JsonResponse
    {
        try {
            // Get bank from parameter or use default from config
            $bank = $bank ?? $request->input('bank', config('snap.default', ''));
            $this->snapService->setBank($bank);
            $response = $this->snapService->getSignatureAuth($request->header('X-TIMESTAMP'));
            
            Log::info("{$bank} Signature Auth Response", [
                'bank' => strtoupper($bank),
                'timestamp' => $request->header('X-TIMESTAMP'),
            ]);
            
            return response()->json([
                'signature' => $response,
            ])->header('X-TIMESTAMP', $request->header('X-TIMESTAMP'));
        } catch (\Exception $e) {
            $bank = $bank ?? $request->input('bank', config('snap.default', ''));
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
}
