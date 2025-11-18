<?php

namespace App\Http\Controllers;

use App\Helpers\MaskingHelper;
use App\Models\Datmas\Indentitas;
use App\Models\Admin\Totps;
use App\Services\OtpService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Exception;

class OtpController extends Controller
{
    protected $maxAttempts = 3;
    protected $decayMinutes = 5;
    protected $otpExpiryMinutes = 5;

    private $wapiDeviceId;
    private $wapiUser;
    private $wapiSecret;

    public function __construct()
    {
        $this->wapiDeviceId = config('wapi.device');
        $this->wapiUser = config('wapi.user');
        $this->wapiSecret = config('wapi.secret');
    }

    /**
     * Request OTP for forgot password flow
     */
    public function forgotRequestOtp(Request $request, $nouid)
    {
        try {
            $request->validate([
                'phone' => 'sometimes|string|regex:/^[0-9]+$/|min:10|max:15'
            ]);

            $ident = $this->getIdentitas($nouid);
            $phone = $this->resolvePhone($request, $ident);

            if (!$phone) {
                abort(404, "Data tidak ditemukan");
            }

            $phone = formatPhoneNumber($phone);
            $siswa = $ident->siswa;

            // Validate phone number match if PIN exists
            if ($siswa->pin !== null) {
                $dbPhone = formatPhoneNumber($siswa->tel);
                if ($dbPhone !== $phone) {
                    Log::warning('Nomor telepon tidak sesuai', [
                        'nouid' => $nouid,
                        'phone_input' => MaskingHelper::maskPhone($phone),
                    ]);

                    return $this->errorResponse('Nomor telepon tidak sesuai', 'phone');
                }
            }

            return $this->sendOtp($request, $nouid);

        } catch (ValidationException $e) {
            return $this->validationErrorResponse($e);
        } catch (Exception $e) {
            Log::error('Forgot request OTP error', [
                'nouid' => $nouid,
                'error' => $e->getMessage()
            ]);
            return $this->errorResponse('Terjadi kesalahan saat mengirim OTP');
        }
    }

    /**
     * Send OTP to phone number
     */
    public function sendOtp(Request $request, $nouid)
    {
        try {
            $request->validate([
                'phone' => 'sometimes|string|regex:/^[0-9]+$/|min:10|max:15'
            ]);

            $ident = $this->getIdentitas($nouid);
            $phone = $this->resolvePhone($request, $ident);

            if (!$phone) {
                abort(404, "Data tidak ditemukan");
            }

            $phone = formatPhoneNumber($phone);

            // Validate phone if PIN exists
            if ($ident->siswa->pin !== null) {
                $dbPhone = formatPhoneNumber($ident->siswa->tel);
                if ($dbPhone !== $phone) {
                    throw ValidationException::withMessages([
                        'phone' => ['Nomor Telepon yang anda masukkan salah']
                    ]);
                }
            }

            // Rate limiting
            $rateLimitKey = 'send-otp:' . $phone;
            if (RateLimiter::tooManyAttempts($rateLimitKey, $this->maxAttempts)) {
                throw ValidationException::withMessages([
                    'phone' => ['Terlalu banyak permintaan OTP. Silakan coba lagi nanti.']
                ]);
            }

            // Generate and store OTP
            $otp = $this->generateOtp();
            $expiresAt = now()->addMinutes($this->otpExpiryMinutes);

            Totps::updateOrCreate(
                ['phone' => $phone],
                ['otp' => $otp, 'expires_at' => $expiresAt, 'attempts' => 0]
            );

            // Send OTP via WhatsApp
            $message = "Kode OTP Anda: $otp, berlaku {$this->otpExpiryMinutes} menit.";
            if (!$this->sendWhatsAppMessage($message, $phone)) {
                Log::error('Failed to send WhatsApp message', ['phone' => MaskingHelper::maskPhone($phone)]);
                return $this->errorResponse('Gagal mengirim OTP. Silakan coba lagi.');
            }

            // Record rate limit hit
            RateLimiter::hit($rateLimitKey, $this->decayMinutes * 60);

            Log::info('OTP sent successfully', [
                'nouid' => $nouid,
                'phone' => MaskingHelper::maskPhone($phone)
            ]);

            return back()->with([
                'success' => true,
                'message' => 'Kode OTP telah dikirim ke nomor Anda',
                'phone' => MaskingHelper::maskPhone($phone),
                'expiresAt' => $expiresAt->toDateTimeString()
            ]);

        } catch (ValidationException $e) {
            return $this->validationErrorResponse($e);
        } catch (Exception $e) {
            Log::error('Send OTP error', [
                'nouid' => $nouid,
                'error' => $e->getMessage()
            ]);
            return $this->errorResponse('Gagal mengirim OTP. Silakan coba kembali.');
        }
    }

    /**
     * Verify OTP code
     */
    public function verifyOtp(Request $request, $nouid)
    {
        try {
            $request->validate([
                'phone' => 'sometimes|string',
                'otp' => 'required|string|digits:6'
            ]);

            $phone = $this->resolvePhoneForVerification($request, $nouid);
            if (!$phone) {
                abort(404, "Data tidak ditemukan");
            }

            $phone = formatPhoneNumber($phone);

            // Rate limiting
            $rateLimitKey = 'verify-otp:' . $phone;
            if (RateLimiter::tooManyAttempts($rateLimitKey, $this->maxAttempts)) {
                throw ValidationException::withMessages([
                    'otp' => ['Terlalu banyak percobaan. Silakan coba lagi nanti.']
                ]);
            }

            $record = Totps::where('phone', $phone)->first();

            if (!$record) {
                RateLimiter::hit($rateLimitKey, $this->decayMinutes * 60);
                throw ValidationException::withMessages([
                    'otp' => ['OTP tidak ditemukan']
                ]);
            }

            // Check expiry
            if (Carbon::now()->gt($record->expires_at)) {
                throw ValidationException::withMessages([
                    'otp' => ['OTP telah kadaluarsa']
                ]);
            }

            // Verify OTP
            if ($record->otp !== $request->otp) {
                $record->increment('attempts');
                $remainingAttempts = max(0, $this->maxAttempts - $record->attempts);
                RateLimiter::hit($rateLimitKey, $this->decayMinutes * 60);

                throw ValidationException::withMessages([
                    'otp' => ["OTP salah. Sisa percobaan: $remainingAttempts"]
                ]);
            }

            // Mark as verified and cleanup
            $record->update(['verified_at' => now()]);
            RateLimiter::clear($rateLimitKey);
            
            // Cleanup expired OTPs
            Totps::where('expires_at', '<', now())->delete();
            $record->delete();

            Log::info('OTP verified successfully', [
                'nouid' => $nouid,
                'phone' => MaskingHelper::maskPhone($phone)
            ]);

            return back()->with([
                'success' => true,
                'message' => 'OTP berhasil diverifikasi',
            ]);

        } catch (ValidationException $e) {
            return $this->validationErrorResponse($e);
        } catch (Exception $e) {
            Log::error('Verify OTP error', [
                'nouid' => $nouid,
                'error' => $e->getMessage()
            ]);
            return $this->errorResponse('Gagal verifikasi OTP');
        }
    }

    /**
     * Get identitas with related data
     */
    private function getIdentitas($nouid)
    {
        return Indentitas::with(['siswa', 'registrasi' => function ($q) {
            $q->where('sta', 1);
        }])->where('nouid', $nouid)->firstOrFail();
    }

    /**
     * Resolve phone number from request or database
     */
    private function resolvePhone(Request $request, $ident)
    {
        return $request->input('phone') 
            ?? $ident->siswa->tel 
            ?? $ident->registrasi->tel 
            ?? null;
    }

    /**
     * Resolve phone number for verification
     */
    private function resolvePhoneForVerification(Request $request, $nouid)
    {
        if ($request->phone) {
            return $request->phone;
        }

        $ident = Indentitas::with(['siswa', 'registrasi'])
            ->where('nouid', $nouid)
            ->firstOrFail();

        return $ident->siswa->tel ?? $ident->registrasi->tel ?? null;
    }

    /**
     * Generate secure random OTP
     */
    private function generateOtp(): string
    {
        return str_pad((string) random_int(100000, 999999), 6, '0', STR_PAD_LEFT);
    }

    /**
     * Send WhatsApp message via OtpService
     */
    private function sendWhatsAppMessage(string $message, string $phone): bool
    {
        try {
            $otpService = new OtpService($this->wapiUser, $this->wapiSecret);
            $result = $otpService->sendMessage(
                $this->wapiDeviceId,
                $phone,
                $message,
                ['enableTypingEffect' => false]
            );

            return isset($result['success']) && $result['success'] === true;
        } catch (Exception $e) {
            Log::error('WhatsApp API error', [
                'error' => $e->getMessage(),
                'phone' => MaskingHelper::maskPhone($phone)
            ]);
            return false;
        }
    }

    /**
     * Return standardized error response
     */
    private function errorResponse(string $message, ?string $field = 'message')
    {
        return back()
            ->withErrors([$field => $message])
            ->withInput()
            ->with([
                'success' => false,
                'message' => $message
            ]);
    }

    /**
     * Return standardized validation error response
     */
    private function validationErrorResponse(ValidationException $e)
    {
        Log::warning('Validation error', [
            'errors' => $e->errors(),
            'message' => $e->getMessage()
        ]);

        $firstError = collect($e->errors())->first()[0] ?? 'Validasi gagal';

        return back()
            ->withErrors($e->errors())
            ->withInput()
            ->with([
                'success' => false,
                'message' => $firstError
            ]);
    }
}
