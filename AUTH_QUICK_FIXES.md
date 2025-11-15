# Quick Security Fixes - Implementasi Langsung

## 🚀 **1. Enhanced PIN Security (Priority: HIGH)**

### **A. PIN Complexity Requirements**

```php
// app/Http/Requests/Auth/LoginRequest.php
public function rules(): array
{
    return [
        'nouid' => 'required|string|exists:mai2.tindentitas,nouid',
        'pin' => [
            'required',
            'digits:6',
            'numeric',
            'not_in:123456,111111,000000,123123,654321,888888,999999,121212,131313,141414,151515,161616,171717,181818,191919,202020',
            'different:previous_pins',
        ],
    ];
}

// app/Http/Requests/Auth/SetupPinRequest.php (NEW)
class SetupPinRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'pin' => [
                'required',
                'digits:6',
                'numeric',
                'not_in:123456,111111,000000,123123,654321,888888,999999,121212,131313,141414,151515,161616,171717,181818,191919,202020',
                'different:previous_pins',
            ],
            'pin_confirmation' => 'required|same:pin',
        ];
    }

    public function messages(): array
    {
        return [
            'pin.not_in' => 'PIN yang Anda pilih terlalu umum dan tidak aman.',
            'pin.different' => 'PIN baru harus berbeda dengan PIN sebelumnya.',
        ];
    }
}
```

### **B. PIN History Tracking**

```php
// app/Models/Saving/PinHistory.php (NEW)
class PinHistory extends Model
{
    protected $connection = 'mai2';
    protected $table = 'pin_history';

    protected $fillable = [
        'nouid',
        'pin_hash',
        'created_at',
    ];

    public $timestamps = false;

    public static function addPin($nouid, $pinHash)
    {
        // Keep only last 5 PINs
        self::where('nouid', $nouid)
            ->orderBy('created_at', 'desc')
            ->skip(4)
            ->delete();

        self::create([
            'nouid' => $nouid,
            'pin_hash' => $pinHash,
            'created_at' => now(),
        ]);
    }

    public static function isRecentPin($nouid, $pinHash)
    {
        return self::where('nouid', $nouid)
            ->where('pin_hash', $pinHash)
            ->where('created_at', '>', now()->subMonths(6))
            ->exists();
    }
}

// Migration: create_pin_history_table.php
Schema::create('pin_history', function (Blueprint $table) {
    $table->id();
    $table->string('nouid', 255);
    $table->string('pin_hash', 255);
    $table->timestamp('created_at');

    $table->index('nouid');
    $table->index('created_at');
});
```

## 🚀 **2. Progressive Rate Limiting (Priority: HIGH)**

### **A. Enhanced Rate Limiting**

```php
// app/Services/ProgressiveRateLimiter.php (NEW)
class ProgressiveRateLimiter
{
    const LEVELS = [
        1 => ['attempts' => 3, 'delay' => 1],   // 3 attempts, 1 minute delay
        2 => ['attempts' => 5, 'delay' => 5],   // 5 attempts, 5 minutes delay
        3 => ['attempts' => 8, 'delay' => 15],  // 8 attempts, 15 minutes delay
        4 => ['attempts' => 10, 'delay' => 60], // 10 attempts, 1 hour delay
    ];

    public function getLevel($key)
    {
        $attempts = RateLimiter::attempts($key);

        foreach (self::LEVELS as $level => $config) {
            if ($attempts <= $config['attempts']) {
                return $level;
            }
        }

        return 4; // Max level
    }

    public function getDelay($key)
    {
        $level = $this->getLevel($key);
        return self::LEVELS[$level]['delay'];
    }

    public function shouldLockout($key)
    {
        $attempts = RateLimiter::attempts($key);
        return $attempts >= 10; // Lockout after 10 attempts
    }

    public function getLockoutDuration($key)
    {
        $attempts = RateLimiter::attempts($key);

        if ($attempts >= 20) return 24 * 60; // 24 hours
        if ($attempts >= 15) return 12 * 60; // 12 hours
        if ($attempts >= 10) return 6 * 60;  // 6 hours

        return 1 * 60; // 1 hour
    }
}

// app/Http/Requests/Auth/LoginRequest.php (UPDATED)
class LoginRequest extends FormRequest
{
    protected $rateLimiter;

    public function __construct()
    {
        $this->rateLimiter = new ProgressiveRateLimiter();
    }

    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        try {
            $nouid = $this->validated('nouid');
            $indentitas = Indentitas::where('nouid', $nouid)
                ->with('siswa')
                ->firstOrFail();

            if (!$this->verifyPin($indentitas->siswa, $this->validated('pin'))) {
                $this->handleFailedAttempt($nouid);
                return;
            }

            // Success - clear rate limiter
            RateLimiter::clear($this->throttleKey());

            Auth::guard('siswa')->login($indentitas->siswa);
            session(['current_nouid' => $nouid]);

            Log::info('User logged in successfully', ['nouid' => $nouid]);
        } catch (\Exception $e) {
            Log::error('Login error', [
                'error' => $e->getMessage(),
                'nouid' => $this->validated('nouid'),
            ]);
            throw ValidationException::withMessages([
                'nouid' => 'Terjadi kesalahan saat proses login.',
            ]);
        }
    }

    protected function handleFailedAttempt($nouid)
    {
        $key = $this->throttleKey();
        $attempts = RateLimiter::attempts($key);

        // Progressive delay
        $delay = $this->rateLimiter->getDelay($key);
        RateLimiter::hit($key, $delay * 60);

        $remainingAttempts = $this->getRemainingAttempts($key);

        // Log failed attempt
        Log::warning('Failed login attempt', [
            'nouid' => $nouid,
            'ip' => request()->ip(),
            'attempt' => $attempts + 1,
            'remaining' => $remainingAttempts,
            'delay_minutes' => $delay,
        ]);

        // Check for lockout
        if ($this->rateLimiter->shouldLockout($key)) {
            $lockoutDuration = $this->rateLimiter->getLockoutDuration($key);
            RateLimiter::hit($key, $lockoutDuration * 60);

            throw ValidationException::withMessages([
                'message' => "Akun terkunci karena terlalu banyak percobaan login. Coba lagi dalam {$lockoutDuration} jam.",
            ]);
        }

        // Auto-send OTP after 3 failed attempts
        if ($attempts >= 2) {
            $this->sendOtpForRecovery($nouid);
        }

        throw ValidationException::withMessages([
            'message' => $remainingAttempts > 0
                ? "PIN salah. Sisa percobaan: {$remainingAttempts}. Tunggu {$delay} menit sebelum mencoba lagi."
                : 'Terlalu banyak percobaan login.',
        ]);
    }

    protected function getRemainingAttempts($key)
    {
        $attempts = RateLimiter::attempts($key);
        $level = $this->rateLimiter->getLevel($key);
        $maxAttempts = ProgressiveRateLimiter::LEVELS[$level]['attempts'];

        return max(0, $maxAttempts - $attempts);
    }
}
```

## 🚀 **3. Session Security (Priority: HIGH)**

### **A. Enhanced Session Management**

```php
// app/Http/Middleware/EnhancedSessionSecurity.php (NEW)
class EnhancedSessionSecurity
{
    public function handle(Request $request, Closure $next)
    {
        // Check session timeout
        if ($this->isSessionExpired($request)) {
            Auth::guard('siswa')->logout();
            return redirect()->route('login', ['nouid' => $request->route('nouid')])
                ->withErrors(['message' => 'Sesi telah berakhir. Silakan login kembali.']);
        }

        // Check device fingerprint
        if ($this->isDeviceChanged($request)) {
            Auth::guard('siswa')->logout();
            return redirect()->route('login', ['nouid' => $request->route('nouid')])
                ->withErrors(['message' => 'Perangkat tidak dikenali. Silakan login kembali.']);
        }

        // Update last activity
        $this->updateLastActivity($request);

        return $next($request);
    }

    protected function isSessionExpired($request)
    {
        $lastActivity = session('last_activity');
        if (!$lastActivity) return true;

        $timeout = config('auth.session_timeout', 30); // 30 minutes
        return now()->diffInMinutes($lastActivity) > $timeout;
    }

    protected function isDeviceChanged($request)
    {
        $storedFingerprint = session('device_fingerprint');
        $currentFingerprint = $this->getDeviceFingerprint($request);

        return $storedFingerprint && $storedFingerprint !== $currentFingerprint;
    }

    protected function getDeviceFingerprint($request)
    {
        return hash('sha256', implode('|', [
            $request->userAgent(),
            $request->header('Accept-Language'),
            $request->header('Accept-Encoding'),
            $request->ip(),
        ]));
    }

    protected function updateLastActivity($request)
    {
        session(['last_activity' => now()]);
    }
}

// app/Http/Controllers/Auth/AuthenticatedSessionController.php (UPDATED)
public function store(LoginRequest $loginRequest, string $nouid)
{
    try {
        $loginRequest->authenticate();
        request()->session()->regenerate();

        // Enhanced session data
        session([
            'current_nouid' => $nouid,
            'device_fingerprint' => $this->getDeviceFingerprint(request()),
            'session_created_at' => now(),
            'last_activity' => now(),
            'login_ip' => request()->ip(),
        ]);

        Log::info('User authenticated successfully', [
            'nouid' => $nouid,
            'ip' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);

        return back()->withMessage([
            'success' => true,
            'message' => 'Login berhasil',
        ]);
    } catch (ValidationException $e) {
        return back()->withErrors($e->errors())->withInput();
    }
}
```

## 🚀 **4. Audit Logging (Priority: HIGH)**

### **A. Comprehensive Audit Trail**

```php
// app/Models/AuditLog.php (NEW)
class AuditLog extends Model
{
    protected $connection = 'mai2';
    protected $table = 'audit_logs';

    protected $fillable = [
        'nouid',
        'action',
        'ip_address',
        'user_agent',
        'device_fingerprint',
        'success',
        'failure_reason',
        'metadata',
        'created_at',
    ];

    public $timestamps = false;

    protected $casts = [
        'metadata' => 'array',
        'success' => 'boolean',
    ];

    public static function log($nouid, $action, $success = true, $metadata = [], $failureReason = null)
    {
        self::create([
            'nouid' => $nouid,
            'action' => $action,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'device_fingerprint' => session('device_fingerprint'),
            'success' => $success,
            'failure_reason' => $failureReason,
            'metadata' => $metadata,
            'created_at' => now(),
        ]);
    }
}

// Migration: create_audit_logs_table.php
Schema::create('audit_logs', function (Blueprint $table) {
    $table->id();
    $table->string('nouid', 255);
    $table->string('action', 50);
    $table->string('ip_address', 45);
    $table->text('user_agent');
    $table->string('device_fingerprint', 64)->nullable();
    $table->boolean('success');
    $table->string('failure_reason', 255)->nullable();
    $table->json('metadata')->nullable();
    $table->timestamp('created_at');

    $table->index('nouid');
    $table->index('action');
    $table->index('created_at');
    $table->index('ip_address');
});

// app/Services/AuditService.php (NEW)
class AuditService
{
    public static function logLogin($nouid, $success, $metadata = [], $failureReason = null)
    {
        AuditLog::log($nouid, 'login', $success, $metadata, $failureReason);
    }

    public static function logPinChange($nouid, $success, $metadata = [], $failureReason = null)
    {
        AuditLog::log($nouid, 'pin_change', $success, $metadata, $failureReason);
    }

    public static function logOtpSend($nouid, $success, $metadata = [], $failureReason = null)
    {
        AuditLog::log($nouid, 'otp_send', $success, $metadata, $failureReason);
    }

    public static function logOtpVerify($nouid, $success, $metadata = [], $failureReason = null)
    {
        AuditLog::log($nouid, 'otp_verify', $success, $metadata, $failureReason);
    }

    public static function logLogout($nouid, $success, $metadata = [], $failureReason = null)
    {
        AuditLog::log($nouid, 'logout', $success, $metadata, $failureReason);
    }
}
```

## 🚀 **5. Security Notifications (Priority: MEDIUM)**

### **A. Smart Security Alerts**

```php
// app/Services/SecurityNotificationService.php (NEW)
class SecurityNotificationService
{
    public static function sendLoginAlert($nouid, $request)
    {
        $user = Indentitas::where('nouid', $nouid)->with('siswa')->first();
        if (!$user || !$user->siswa->tel) return;

        $location = self::getLocation($request->ip());
        $device = self::getDeviceInfo($request);

        $message = "🔐 Login Baru Terdeteksi\n\n";
        $message .= "Waktu: " . now()->format('d/m/Y H:i') . "\n";
        $message .= "Lokasi: " . $location . "\n";
        $message .= "Perangkat: " . $device . "\n\n";
        $message .= "Jika ini bukan Anda, segera ubah PIN Anda.";

        self::sendWhatsApp($user->siswa->tel, $message);
    }

    public static function sendSuspiciousActivityAlert($nouid, $reason)
    {
        $user = Indentitas::where('nouid', $nouid)->with('siswa')->first();
        if (!$user || !$user->siswa->tel) return;

        $message = "⚠️ Aktivitas Mencurigakan Terdeteksi\n\n";
        $message .= "Alasan: " . $reason . "\n";
        $message .= "Waktu: " . now()->format('d/m/Y H:i') . "\n\n";
        $message .= "Jika ini bukan Anda, segera hubungi admin.";

        self::sendWhatsApp($user->siswa->tel, $message);
    }

    public static function sendPinChangeAlert($nouid)
    {
        $user = Indentitas::where('nouid', $nouid)->with('siswa')->first();
        if (!$user || !$user->siswa->tel) return;

        $message = "🔑 PIN Berhasil Diubah\n\n";
        $message .= "Waktu: " . now()->format('d/m/Y H:i') . "\n";
        $message .= "Lokasi: " . self::getLocation(request()->ip()) . "\n\n";
        $message .= "Jika ini bukan Anda, segera hubungi admin.";

        self::sendWhatsApp($user->siswa->tel, $message);
    }

    protected static function getLocation($ip)
    {
        // Simple IP geolocation (implement with your preferred service)
        try {
            $response = Http::get("http://ip-api.com/json/{$ip}");
            $data = $response->json();

            if ($data['status'] === 'success') {
                return $data['city'] . ', ' . $data['country'];
            }
        } catch (\Exception $e) {
            // Fallback
        }

        return 'Lokasi tidak diketahui';
    }

    protected static function getDeviceInfo($request)
    {
        $userAgent = $request->userAgent();

        // Simple device detection
        if (strpos($userAgent, 'Mobile') !== false) {
            return 'Mobile Device';
        } elseif (strpos($userAgent, 'Tablet') !== false) {
            return 'Tablet';
        } else {
            return 'Desktop';
        }
    }

    protected static function sendWhatsApp($phone, $message)
    {
        // Implement your WhatsApp API here
        // This is just a placeholder
        try {
            // Your WhatsApp API implementation
            Log::info('Security notification sent', [
                'phone' => $phone,
                'message' => $message,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to send security notification', [
                'phone' => $phone,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
```

## 🚀 **6. Configuration Updates**

### **A. Auth Configuration**

```php
// config/auth.php (UPDATED)
return [
    'defaults' => [
        'guard' => 'siswa',
        'passwords' => 'users',
    ],

    'guards' => [
        'siswa' => [
            'driver' => 'session',
            'provider' => 'siswas',
        ],
    ],

    'providers' => [
        'siswas' => [
            'driver' => 'eloquent',
            'model' => App\Models\Datmas\Siswa::class,
        ],
    ],

    // New security settings
    'session_timeout' => env('AUTH_SESSION_TIMEOUT', 30), // minutes
    'max_concurrent_sessions' => env('AUTH_MAX_SESSIONS', 3),
    'pin_history_limit' => env('AUTH_PIN_HISTORY', 5),
    'rate_limit_enabled' => env('AUTH_RATE_LIMIT', true),
];
```

### **B. Middleware Registration**

```php
// bootstrap/app.php (UPDATED)
->withMiddleware(function (Middleware $middleware) {
    $middleware->web(append: [
        HandleAppearance::class,
        HandleInertiaRequests::class,
        AddLinkHeadersForPreloadedAssets::class,
    ]);

    $middleware->alias([
        'verify.nouid' => \App\Http\Middleware\VerifyNouid::class,
        'auth.siswa' => \Illuminate\Auth\Middleware\Authenticate::class.':siswa',
        'session.security' => \App\Http\Middleware\EnhancedSessionSecurity::class,
    ]);
})
```

## 🚀 **7. Frontend Updates**

### **A. Enhanced PIN Input**

```typescript
// resources/js/components/EnhancedPinInput.tsx (NEW)
interface EnhancedPinInputProps {
    onComplete: (pin: string) => void;
    onError: (error: string) => void;
    maxAttempts?: number;
    showStrength?: boolean;
}

export const EnhancedPinInput: React.FC<EnhancedPinInputProps> = ({
    onComplete,
    onError,
    maxAttempts = 3,
    showStrength = true
}) => {
    const [pin, setPin] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [strength, setStrength] = useState(0);

    const calculateStrength = (pin: string) => {
        let score = 0;

        // Check for patterns
        if (/(\d)\1{2,}/.test(pin)) score -= 30; // Repeating digits
        if (/123|234|345|456|567|678|789|890/.test(pin)) score -= 25; // Sequential
        if (/012|123|234|345|456|567|678|789/.test(pin)) score -= 25; // Sequential

        // Check for common PINs
        const commonPins = ['123456', '111111', '000000', '123123', '654321'];
        if (commonPins.includes(pin)) score -= 50;

        return Math.max(0, 100 + score);
    };

    const handlePinChange = (newPin: string) => {
        setPin(newPin);

        if (showStrength && newPin.length === 6) {
            setStrength(calculateStrength(newPin));
        }

        if (newPin.length === 6) {
            if (strength < 50) {
                onError('PIN terlalu mudah ditebak. Pilih PIN yang lebih aman.');
                return;
            }

            onComplete(newPin);
        }
    };

    return (
        <div className="pin-input-container">
            <div className="pin-input">
                {/* PIN input fields */}
            </div>

            {showStrength && pin.length === 6 && (
                <div className="pin-strength">
                    <div className="strength-bar">
                        <div
                            className={`strength-fill ${strength < 30 ? 'weak' : strength < 70 ? 'medium' : 'strong'}`}
                            style={{ width: `${strength}%` }}
                        />
                    </div>
                    <span className="strength-text">
                        {strength < 30 ? 'Lemah' : strength < 70 ? 'Sedang' : 'Kuat'}
                    </span>
                </div>
            )}

            {attempts > 0 && (
                <div className="attempts-warning">
                    Sisa percobaan: {maxAttempts - attempts}
                </div>
            )}
        </div>
    );
};
```

## 🚀 **8. Implementation Checklist**

### **Immediate (This Week):**

- [ ] ✅ Create PIN history table and model
- [ ] ✅ Update PIN validation rules
- [ ] ✅ Implement progressive rate limiting
- [ ] ✅ Add session timeout middleware
- [ ] ✅ Create audit logging system

### **Next Week:**

- [ ] ✅ Implement security notifications
- [ ] ✅ Add device fingerprinting
- [ ] ✅ Update frontend PIN input
- [ ] ✅ Add comprehensive logging
- [ ] ✅ Test all security features

### **Testing:**

- [ ] ✅ Test PIN complexity requirements
- [ ] ✅ Test progressive rate limiting
- [ ] ✅ Test session timeout
- [ ] ✅ Test audit logging
- [ ] ✅ Test security notifications

Implementasi ini akan secara signifikan meningkatkan keamanan sistem autentikasi dengan biaya implementasi yang minimal dan dampak yang besar.
