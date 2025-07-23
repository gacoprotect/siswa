<?php

namespace App\Http\Controllers;

use App\Helpers\MaskingHelper;
use App\Models\Datmas\Indentitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Carbon;
use App\Models\Admin\Totps;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class OtpController extends Controller
{
    protected $maxAttempts = 3;
    protected $decayMinutes = 5;
    protected $WAPI_URL;
    protected $WAPI_DEVICE_ID;
    protected $WAPI_USER;
    protected $WAPI_SK;

    public function __construct()
    {
        $this->WAPI_URL = config('wapi.url');
        $this->WAPI_DEVICE_ID = config('wapi.device');
        $this->WAPI_USER = config('wapi.user');
        $this->WAPI_SK = config('wapi.secret');
    }

    public function forgotRequestOtp(Request $request, $nouid)
    {
        $v = $request->validate([
            'phone' => 'sometimes|string|regex:/^[0-9]+$/|min:10|max:15'
        ]);
        $ident = Indentitas::with('siswa')->with(['registrasi' => function ($q) {
            $q->where('sta', 1);
        }])->where('nouid', $nouid)->firstOrFail();
        $phone = ($v['phone'] ?? $ident->siswa->tel ?? $ident->registrasi->tel);
        if (!$phone) {
            abort(404, "Data tidak ditemukan");
        }


        try {
            $siswa = $ident->siswa()->firstOrFail();
            $phone = formatPhoneNumber($phone);

            if ($siswa->tel !== $phone) {
                Log::warning('Nomor telepon tidak sesuai', [
                    'nouid' => $nouid,
                    'phone_input' => $phone,
                    'phone_database' => $siswa->tel
                ]);

                return back()->withErrors([
                    'phone' => 'Nomor telepon tidak sesuai',
                ])->withInput()->with([
                    'success' => false,
                    'message' => 'Nomor telepon tidak sesuai'
                ]);
            }

            // Panggil sendOtp langsung dengan membuat request baru
            $otpRequest = new Request([
                'phone' => $phone
            ]);

            $response = $this->sendOtp($otpRequest, $nouid);

            // Handle response JSON dari sendOtp
            if ($response) {
                Log::info('OTP berhasil diminta', [
                    'nouid' => $nouid,
                    'phone' => MaskingHelper::maskPhone($phone)
                ]);

                return back()->with([
                    'success' => true,
                    'message' => 'Kode OTP telah dikirim ke nomor Anda',
                    'phone' => MaskingHelper::maskPhone($phone)
                ]);
            }

            throw new \Exception('Gagal mengirim OTP: ' . $response->getData()->message);
        } catch (ModelNotFoundException $e) {
            Log::error('Data tidak ditemukan', [
                'nouid' => $nouid,
                'error' => $e->getMessage()
            ]);

            return back()->withErrors([
                'message' => 'Data siswa tidak ditemukan'
            ])->withInput()->with([
                'success' => false,
                'message' => 'Data siswa tidak ditemukan',
            ]);
        } catch (\Exception $e) {
            Log::error('Gagal memproses permintaan OTP', [
                'nouid' => $nouid,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors([
                'message' => 'Terjadi kesalahan saat mengirim OTP: ' . $e->getMessage()
            ])->withInput()->with([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mengirim OTP',
            ]);
        }
    }

    public function sendOtp(Request $request, $nouid)
    {
        try {

            $v = $request->validate([
                'phone' => 'sometimes|string|regex:/^[0-9]+$/|min:10|max:15'
            ]);
            $ident = Indentitas::with('siswa')->with(['registrasi' => function ($q) {
                $q->where('sta', 1);
            }])->where('nouid', $nouid)->firstOrFail();
            $phone = ($v['phone'] ?? $ident->siswa->tel ?? $ident->registrasi->tel);
            if (!$phone) {
                abort(404, "Data tidak ditemukan");
            }
            $phone = formatPhoneNumber($phone);
            $sistel = $ident->siswa->tel
                ? formatPhoneNumber($ident->siswa->tel)
                : null;
            if ($ident->siswa->pin !== null && $sistel !== $phone) {
                throw ValidationException::withMessages([
                    'phone' => ['Nomor Telepon yang anda masukkan salah'] //muncul pesan ini terus
                ]);
            }

            if (RateLimiter::tooManyAttempts('send-otp:' . $phone, $this->maxAttempts)) {
                throw ValidationException::withMessages([
                    'phone' => ['Terlalu banyak permintaan OTP. Silakan coba lagi nanti.']
                ]);
            }

            $otp = rand(100000, 999999);
            $expiresAt = now()->addMinutes(5);

            try {
                Totps::updateOrCreate(
                    ['phone' => $phone],
                    ['otp' => $otp, 'expires_at' => $expiresAt]
                );
            } catch (\Exception $e) {
                Log::error('Gagal menyimpan OTP', ['error' => $e->getMessage()]);
                return back()->withErrors(['message' => 'Gagal menghasilkan OTP'])->withInput()->with([
                    'success' => false,
                    'message' => 'Terjadi kesalahan server',
                ]);;
            }

            $message = "Kode OTP Anda: $otp, berlaku 5 menit.";
            $payload = [
                "user_code" => $this->WAPI_USER,
                "device_id" => $this->WAPI_DEVICE_ID,
                "receiver" => $phone,
                "message" => $message,
                "secret" => $this->WAPI_SK,

            ];
            try {
                $response = Http::timeout(30)->post($this->WAPI_URL, $payload);
                if (!$response) {
                    return back()->withErrors(['message' => 'Gagal mengirim OTP Request Timeout. Silahkan Coba lagi'])->withInput()->with([
                        'success' => false,
                        'message' => 'Request Timeout. Silakan coba lagi',
                    ]);;
                }
                RateLimiter::hit('send-otp:' . $phone, $this->decayMinutes * 60);
                // Logging yang lebih baik
                logger('WhatsApp API Response', [
                    'status' => $response->status(),
                    'response' => $response->json(),
                    'payload' => $payload,
                    'phone' => $phone
                ]);            // Return Inertia response with flash message
                return back()->with([
                    'success' => true,
                    'message' => 'OTP berhasil dikirim',
                    'expiresAt' => $expiresAt->toDateTimeString()
                ]);
            } catch (\Exception $e) {
                logger()->error('WhatsApp API Error', [
                    'error' => $e->getMessage(),
                    'payload' => $payload,
                    'phone' => $phone,
                    'trace' => $e->getTraceAsString()
                ]);
                return back()->withErrors(['message' => 'Gagal mengirim OTP'])->withInput()->with([
                    'success' => false,
                    'message' => 'Gagal Mengirim Otp',
                ]);;
            }
        } catch (\Exception $e) {
            logger()->error('OtpController Error', [
                'message' => $e->getMessage(),
                'data' => $request->except(['password', 'otp']),
                'trace' => $e->getTraceAsString()
            ]);

            return back()
                ->withErrors(['message' => 'Gagal mengirim OTP. Silakan coba kembali.'])
                ->withInput()
                ->with(['success' => false, 'message' => 'Gagal mengirim OTP. Silakan coba kembali.']);
        }
    }

    public function verifyOtp(Request $request, $nouid)
    {
        $request->validate([
            'phone' => 'sometimes|string',
            'otp' => 'required|string|digits:6'
        ]);

        $phone = $request->phone;
        if (!$phone) {
            $ident = Indentitas::where('nouid', $nouid)->with('siswa')->with('registrasi')->firstOrFail();
            $phone = $ident->siswa->tel ?? $ident->registrasi->tel ?? null;
        }
        if (!$phone) {
            abort(404, "Data tidak ditemukan");
        }
        $phone = formatPhoneNumber($phone);
        if (RateLimiter::tooManyAttempts('verify-otp:' . $phone, $this->maxAttempts)) {
            throw ValidationException::withMessages([
                'otp' => ['Terlalu banyak percobaan. Silakan coba lagi nanti.']
            ]);
        }

        $record = Totps::where('phone', $phone)->first();

        if (!$record) {
            RateLimiter::hit('verify-otp:' . $phone, $this->decayMinutes * 60);
            throw ValidationException::withMessages([
                'otp' => ['OTP tidak ditemukan']
            ]);
        }

        if (Carbon::now()->gt($record->expires_at)) {
            throw ValidationException::withMessages([
                'otp' => ['OTP telah kadaluarsa']
            ]);
        }

        if ($record->otp !== $request->otp) {
            $record->increment('attempts');
            $remainingAttempts = $this->maxAttempts - $record->attempts;

            RateLimiter::hit('verify-otp:' . $phone, $this->decayMinutes * 60);

            throw ValidationException::withMessages([
                'otp' => ["OTP salah. Sisa percobaan: $remainingAttempts"]
            ]);
        }

        try {
            $record->update(['verified_at' => now()]);
            RateLimiter::clear('verify-otp:' . $phone);
            Totps::where('expires_at', '<', now())->delete();
            $record->delete();

            return back()->with([
                'success' => true,
                'message' => 'OTP berhasil diverifikasi',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Gagal verifikasi OTP', [
                'nouid' => $nouid ?? null,
                'message' => $e->getMessage(),
                'errors' => $e->errors(),

            ]);

            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            Log::error('Gagal verifikasi OTP', ['error' => $e->getMessage()]);
            return back()->withErrors(['message' => 'Gagal verifikasi OTP'])->withInput()->with([
                'success' => false,
                'message' => 'Gagal Verifikasi OTP',
            ]);;
        }
    }
}
