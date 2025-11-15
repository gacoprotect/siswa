# Dashboard Flow Documentation

## Alur Dashboard/Index.tsx

### 1. Akses Dashboard

- User mengakses route `route('dashboard', nouid)` atau `http://siswa.gaco/u/a7095648`
- Halaman menampilkan `Dashboard/Index.tsx`

### 2. Pengecekan Status Registrasi

- **Model**: `App\Models\Datmas\Indentitas` dengan `nouid`
- **Pengecekan**: `summary().reg` - apakah user sudah teregistrasi?
- **Kondisi**:
    - `reg === 0`: Belum teregistrasi → tampilkan status registrasi
    - `reg === 1`: Sudah teregistrasi → lanjut ke pengecekan login

### 3. Pengecekan Login Status

- **Auth Guard**: `siswa` (menggunakan model `App\Models\Datmas\Siswa`)
- **Kondisi**:
    - `auth.user === null`: Belum login → tampilkan tombol login/setup PIN
    - `auth.user !== null`: Sudah login → tampilkan dashboard lengkap

### 4. Pengecekan PIN Status

- **Model**: `App\Models\Datmas\Siswa` (field `pin`)
- **Pengecekan**: `summary().pin` - apakah user sudah memiliki PIN?
- **Kondisi**:
    - `pin === false`: Belum ada PIN → tampilkan tombol "Buat PIN"
    - `pin === true`: Sudah ada PIN → tampilkan tombol "Login"

### 5. Alur Login dengan PIN

- User klik tombol "Login" → buka modal `PinPage`
- Input PIN 6 digit → verifikasi ke backend
- Jika berhasil → login dan tampilkan dashboard lengkap
- Jika gagal → tampilkan error dan minta input ulang

### 6. Alur Setup PIN

- User klik tombol "Buat PIN" → buka modal `SetupPinPage`
- Proses 3 tahap:
    1. **Phone**: Input nomor HP
    2. **OTP**: Verifikasi OTP yang dikirim
    3. **PIN**: Buat PIN 6 digit + konfirmasi
- Jika berhasil → refresh halaman dan update status PIN

### 7. Verifikasi PIN untuk Akses Tertentu

Setelah login, user masih perlu verifikasi PIN untuk:

- **Riwayat Transaksi**: Akses halaman riwayat
- **Pembayaran**: Menggunakan saldo untuk pembayaran
- **Fitur Sensitif**: Operasi yang memerlukan keamanan tambahan

### 8. Komponen yang Ditampilkan

#### Belum Teregistrasi (`reg === 0`):

```tsx
<StudentInfo />
<RegistrationStatus />
```

#### Sudah Teregistrasi, Belum Login (`reg === 1`, `auth.user === null`):

```tsx
<StudentInfo />
<ActionButtons /> // Tombol Login/Buat PIN
<RegistrationStatus />
```

#### Sudah Login (`reg === 1`, `auth.user !== null`):

```tsx
<StudentInfo />
<ActionButtons />
<BalanceSection /> // Saldo
<MenuItems /> // Menu navigasi
<RegistrationStatus />
```

### 9. Type Safety

#### Type Guard untuk Summary:

```tsx
const isSiswaSummary = (summary: unknown): summary is SiswaSummary => {
    return summary && typeof summary === 'object' && 'reg' in summary && 'pin' in summary;
};
```

#### Type-Safe Access:

```tsx
const siswaSummary = useMemo(() => {
    if (data.summary && isSiswaSummary(data.summary)) {
        return data.summary;
    }
    return null;
}, [data.summary]);

const isRegistered = siswaSummary?.reg === 1;
const hasPin = siswaSummary?.pin === true;
```

### 10. State Management

#### Modal States:

- `openModal`: `'pin' | 'setupPin' | null`
- `currentPage`: `'index' | 'topup' | 'riwayat'`

#### Callback Functions:

- `openPinModal()`: Buka modal PIN untuk login/verifikasi
- `openSetupPinModal()`: Buka modal setup PIN
- `closeModal(success?)`: Tutup modal dengan optional refresh
- `handlePinSuccess()`: Handle sukses verifikasi PIN

### 11. Debug Menu (Development Only)

- Hanya muncul jika `APP_DEBUG === true` dan `reg === 0`
- Tombol simulasi: Terima, Tolak, Block
- Untuk testing alur registrasi

### 12. Error Handling

- Type-safe access ke properties summary
- Fallback untuk data yang tidak valid
- Loading states untuk operasi async
- Error handling di modal PIN dan setup PIN

## Kesimpulan

Alur dashboard sekarang memiliki:

1. **Type Safety**: Semua akses data menggunakan type guard
2. **Clear Flow**: Alur yang jelas dari registrasi → login → dashboard
3. **Modular**: Komponen terpisah untuk setiap state
4. **User Experience**: Feedback yang jelas untuk setiap aksi
5. **Security**: Verifikasi PIN untuk akses sensitif
