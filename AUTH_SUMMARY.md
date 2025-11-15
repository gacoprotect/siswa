# Ringkasan Sistem Autentikasi Aplikasi Siswa

## 🎯 **Overview Sistem**

Aplikasi ini menggunakan sistem autentikasi **PIN-based** dengan **OTP verification** yang dirancang khusus untuk siswa sekolah. Sistem ini menggunakan `nouid` (Nomor UID) sebagai identifier utama dan memiliki flow yang kompleks untuk memastikan keamanan dan validasi data.

## 🔑 **Key Components**

### 1. **Authentication Guard**
- **Default Guard**: `siswa` (bukan `web`)
- **Model**: `App\Models\Datmas\Siswa` (extends `Authenticatable`)
- **Provider**: `siswas` (custom user provider)

### 2. **Core Models**
- **`Indentitas`** - Master data identitas siswa
- **`Siswa`** - Data siswa dengan PIN authentication
- **`Tregistrasi`** - Data registrasi wali siswa
- **`Totps`** - Temporary OTP storage

### 3. **Middleware System**
- **`VerifyNouid`** - Middleware utama untuk verifikasi user
- **`menu.access`** - Custom middleware untuk akses menu

## 🔄 **Authentication Flow**

### **Phase 1: Initial Access**
```
User akses /u/{nouid} → VerifyNouid Middleware
```

**Checks:**
1. ✅ `nouid` exists in database
2. ✅ Registration status (`reg` field)
3. ✅ Account active status
4. ✅ Authentication status
5. ✅ Session consistency

### **Phase 2: Registration Flow**
```
Belum registrasi → Registration Form → Setup PIN → Dashboard
```

**Steps:**
1. **Data Wali**: Nama, NIK, KK, alamat, upload KTP
2. **Phone Verification**: Input nomor HP
3. **OTP Verification**: Kirim dan verifikasi OTP
4. **PIN Setup**: Buat PIN 6 digit + konfirmasi
5. **Database Update**: Set `sta = 0` (aktif)

### **Phase 3: Login Flow**
```
Sudah registrasi → PIN Login → Dashboard
```

**Process:**
1. **PIN Input**: 6 digit numeric
2. **Rate Limiting**: Max 3 attempts, throttle 1 menit
3. **PIN Verification**: `Hash::check($pin, $siswa->pin)`
4. **Session Management**: Login + set `current_nouid`
5. **Auto OTP**: Kirim OTP jika gagal 3 kali

## 🛡️ **Security Features**

### **1. Rate Limiting**
- **Login**: 3 attempts → 1 menit throttle
- **OTP Send**: 5 attempts per phone
- **OTP Verify**: 5 attempts per phone

### **2. PIN Security**
- **Format**: 6 digit numeric only
- **Storage**: Laravel Hash (bcrypt)
- **Confirmation**: Required saat setup

### **3. OTP Security**
- **Format**: 6 digit random
- **Expiry**: 5 menit
- **One-time**: Deleted after verification
- **Delivery**: WhatsApp API

### **4. Session Security**
- **Regeneration**: After login
- **Consistency**: Check `current_nouid`
- **Auto Logout**: Invalid session

## 📊 **Database Schema**

### **Core Tables**
```sql
mai2.tindentitas    -- Master identitas (nouid, sta, idok)
mai2.tsiswa         -- Data siswa (pin, tel, nis)
mai4.tregistrasi    -- Registrasi wali (sta: 0,1,-1,-2)
totps               -- OTP temporary storage
```

### **Key Relationships**
```
Indentitas (1:1) Siswa
Indentitas (1:1) Tregistrasi  
Siswa (1:1) Tsiswa1
```

## 🎨 **Frontend Integration**

### **Dashboard States**
```typescript
// Status checking logic
if (summary.reg === 0) {
    // Belum registrasi - tampilkan form registrasi
} else if (!summary.pin) {
    // Belum ada PIN - tampilkan setup PIN
} else if (!auth.user) {
    // Belum login - tampilkan login PIN
} else {
    // Dashboard lengkap - user sudah login
}
```

### **PIN Verification**
```typescript
// Login dengan PIN
router.post(route('siswa.verify-pin', { nouid }), {
    pin: '123456',
    onSuccess: () => {
        // Login berhasil, redirect ke dashboard
    }
});
```

### **Setup PIN Flow**
```typescript
// 3-step process
const [step, setStep] = useState<'phone' | 'otp' | 'pin'>('phone');

// Step 1: Phone input
// Step 2: OTP verification
// Step 3: PIN creation + confirmation
```

## 🚨 **Error Handling**

### **Common Errors**
- **"Data siswa tidak ditemukan"** → Invalid nouid
- **"PIN yang Anda Masukkan Salah"** → Wrong PIN + remaining attempts
- **"OTP tidak ditemukan"** → OTP expired/not found
- **"Sesi tidak valid"** → Session mismatch
- **"Terlalu banyak percobaan"** → Rate limited

### **Error Recovery**
- **PIN Reset**: Via OTP verification
- **Session Reset**: Auto redirect to login
- **Rate Limit**: Wait for throttle period
- **OTP Resend**: Available after cooldown

## 🔧 **Configuration**

### **Auth Config**
```php
// config/auth.php
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
```

### **Middleware Registration**
```php
// bootstrap/app.php
'middleware' => [
    'verify.nouid' => \App\Http\Middleware\VerifyNouid::class,
    'auth.siswa' => \Illuminate\Auth\Middleware\Authenticate::class.':siswa',
],
```

## 📝 **Route Structure**

### **Authentication Routes**
```php
// routes/auth.php
Route::prefix('u/{nouid}')->group(function () {
    // Guest routes
    Route::get('/login', [SiswaController::class, 'index']);
    Route::post('/verify-pin', [AuthenticatedSessionController::class, 'store']);
    
    // Registration
    Route::resource('register', RegisteredUserController::class);
    
    // PIN Management
    Route::get('/setup-pin', [SiswaController::class, 'showSetupPinForm']);
    Route::post('/setup-pin', [RegisteredUserController::class, 'setupPin']);
    
    // OTP
    Route::post('/otp/send', [OtpController::class, 'sendOtp']);
    Route::post('/otp/verify', [OtpController::class, 'verifyOtp']);
    
    // Logout
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
});
```

## 🎯 **Best Practices**

### **Security**
- ✅ PIN hashing dengan Laravel Hash
- ✅ Rate limiting untuk semua endpoint
- ✅ Session regeneration
- ✅ Input validation
- ✅ Error logging tanpa expose sensitive data

### **User Experience**
- ✅ Clear error messages
- ✅ Progress indicators
- ✅ Auto-redirect setelah success
- ✅ Consistent UI patterns

### **Code Organization**
- ✅ Separation of concerns
- ✅ Consistent naming
- ✅ Proper error handling
- ✅ Comprehensive logging

## 🔍 **Troubleshooting Guide**

### **Common Issues & Solutions**

1. **"Data siswa tidak ditemukan"**
   ```php
   // Check: nouid exists in mai2.tindentitas
   $indentitas = Indentitas::where('nouid', $nouid)->first();
   ```

2. **"PIN yang Anda Masukkan Salah"**
   ```php
   // Check: PIN hashing in database
   $valid = Hash::check($inputPin, $siswa->pin);
   ```

3. **"OTP tidak ditemukan"**
   ```php
   // Check: OTP exists and not expired
   $otp = Totps::where('phone', $phone)
       ->where('expires_at', '>', now())
       ->first();
   ```

4. **"Sesi tidak valid"**
   ```php
   // Check: Session consistency
   if (session('current_nouid') !== $nouid) {
       // Redirect to login
   }
   ```

5. **Rate limiting issues**
   ```php
   // Clear rate limiter cache
   RateLimiter::clear($throttleKey);
   ```

## 📈 **Performance Considerations**

### **Database Optimization**
- ✅ Proper indexing on `nouid`, `phone`, `expires_at`
- ✅ Eager loading untuk menghindari N+1 queries
- ✅ Select specific fields untuk mengurangi data transfer

### **Caching Strategy**
- ✅ Rate limiter menggunakan cache
- ✅ Session data untuk user state
- ✅ OTP temporary storage dengan expiry

### **Monitoring**
- ✅ Comprehensive logging untuk semua auth events
- ✅ Error tracking dan alerting
- ✅ Performance monitoring untuk auth endpoints

---

## 🎉 **Kesimpulan**

Sistem autentikasi ini dirancang dengan prinsip **security-first** dan **user-friendly**. Menggunakan kombinasi PIN + OTP untuk memastikan keamanan yang tinggi sambil tetap mudah digunakan oleh siswa. 

**Key Strengths:**
- 🔒 **Secure**: Multiple layers of security
- 🎯 **User-friendly**: Clear flow dan error messages  
- 🔧 **Maintainable**: Well-organized code structure
- 📊 **Scalable**: Proper database design dan caching

**Perfect untuk aplikasi sekolah yang membutuhkan:**
- Autentikasi yang aman untuk siswa
- Verifikasi identitas wali
- Manajemen PIN yang mudah
- Integrasi dengan sistem pembayaran
