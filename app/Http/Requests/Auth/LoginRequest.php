<?php

namespace App\Http\Requests\Auth;

use App\Http\Controllers\OtpController;
use App\Models\Datmas\Indentitas;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class LoginRequest extends FormRequest
{
    /**
     * Maximum number of login attempts allowed.
     */
    protected const MAX_ATTEMPTS = 3;

    /**
     * The number of minutes to throttle after max attempts reached.
     */
    protected const THROTTLE_DECAY_MINUTES = 1;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'nouid' => 'required|string|exists:mai2.tindentitas,nouid',
            'pin' => 'required|digits:6|numeric',
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'nouid.exists' => 'Nomor identitas tidak valid.',
            'pin.digits' => 'PIN harus terdiri dari 6 digit angka.',
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        try {
            $nouid = $this->input('nouid');
            $indentitas = Indentitas::where('nouid', $nouid)
                ->with('siswa')
                ->firstOrFail();

            if (!$this->verifyPin($indentitas->siswa, $this->input('pin'))) {
                $attempts = RateLimiter::attempts($this->throttleKey());
                $remainingAttempts = self::MAX_ATTEMPTS - $attempts - 1;
                RateLimiter::hit(
                    $this->throttleKey(),
                    self::THROTTLE_DECAY_MINUTES * 60 * 10
                );
                if ($remainingAttempts <= 0) {                    
                    $phone = $indentitas->siswa->tel ?? null;
                    logger($phone);
                    if ($phone) {
                        $request = new Request(['phone' => $phone]);
                        app(OtpController::class)->sendOtp($request, $nouid);
                    }
                    $this->ensureIsNotRateLimited();
                }
                $errorData = [

                    // 'pin' => 'PIN yang Anda Masukkan Salah',
                    // 'tel' => $indentitas->siswa->tel,
                    // 'attempt_count' => $attempts + 1,
                    // 'remaining' => max(0, $remainingAttempts),
                    // 'max_attempts' => self::MAX_ATTEMPTS,
                    'message' => $remainingAttempts > 0
                        ? "PIN yang Anda Masukkan Salah. Sisa percobaan: {$remainingAttempts}"
                        : "Terlalu banyak percobaan login"
                ];

                Log::warning('Failed login attempt', [
                    'nouid' => $nouid,
                    'ip' => $this->ip(),
                    'attempt' => $attempts + 1, // Menunjukkan attempt saat ini
                    'remaining' => self::MAX_ATTEMPTS - ($attempts + 1)
                ]);
                throw ValidationException::withMessages($errorData);
            }

            Auth::guard('siswa')->login($indentitas->siswa);
            session(['current_nouid' => $nouid]);
            RateLimiter::clear($this->throttleKey());

            Log::info('User logged in successfully', ['nouid' => $nouid]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            throw ValidationException::withMessages([
                'nouid' => 'Data siswa tidak ditemukan.',
            ]);
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            Log::error('Login error', [
                'error' => $e->getMessage(),
                'nouid' => $this->input('nouid'),
                'trace' => $e->getTraceAsString()
            ]);
            throw ValidationException::withMessages([
                'nouid' => 'Terjadi kesalahan saat proses login.',
            ]);
        }
    }

    protected function verifyPin($siswa, $pin): bool
    {
        try {
            return Hash::check($pin, $siswa->pin);
        } catch (\Exception $e) {
            Log::error('PIN verification failed', [
                'error' => $e->getMessage(),
                'nouid' => $this->input('nouid')
            ]);
            return false;
        }
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (!RateLimiter::tooManyAttempts($this->throttleKey(), self::MAX_ATTEMPTS)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());
        $attempts = RateLimiter::attempts($this->throttleKey());

        $errorData = [

            // 'pin' => 'Terlalu banyak percobaan login',
            // 'attempt_count' => self::MAX_ATTEMPTS,
            // 'remaining' => 0,
            // 'max_attempts' => self::MAX_ATTEMPTS,
            // 'retry_after' => $seconds,
            'message' => "Terlalu banyak percobaan login. Silakan coba lagi dalam {$seconds} detik."
        ];
        Log::warning('Login rate limited', [
            'key' => $this->throttleKey(),
            'total_attempts' => $attempts,
            'ip' => $this->ip(),
            'nouid' => $this->input('nouid'),
            'retry_after_seconds' => $seconds,
            'max_attempts' => self::MAX_ATTEMPTS
        ]);

        throw ValidationException::withMessages($errorData);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->input('nouid')) . '|' . $this->ip());
    }
}
