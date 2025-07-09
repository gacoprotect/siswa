<?php

namespace App\Http\Requests\Auth;

use App\Models\Datmas\Indentitas;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
       return [
            'nouid' => 'required|string|exists:mai2.tindentitas,nouid',
            'pin' => 'required|digits:6|numeric',
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

        $nouid = $this->input('nouid');
        $indentitas = Indentitas::where('nouid', $nouid)
            ->with('siswa')
            ->firstOrFail();

        if (!$this->verifyPin($indentitas->siswa, $this->input('pin'))) {
            RateLimiter::hit($this->throttleKey());
            throw ValidationException::withMessages([
                'pin' => "PIN yang Anda Masukkan Salah",
            ]);
        }

        Auth::guard('siswa')->login($indentitas->siswa);
        session(['current_nouid' => $nouid]);
        RateLimiter::clear($this->throttleKey());
    }

    protected function verifyPin($siswa, $pin): bool
    {
        return Hash::check($pin, $siswa->pin);
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'pin' => __('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->input('nouid')) . '|' . $this->ip());
    }
}
