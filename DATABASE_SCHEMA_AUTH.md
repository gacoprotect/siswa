# Database Schema untuk Sistem Autentikasi

## Tabel Utama

### 1. `mai2.tindentitas` - Master Identitas Siswa
```sql
CREATE TABLE tindentitas (
    id INT PRIMARY KEY,
    idmen INT,
    idok INT,                    -- Foreign key ke tsiswa.id
    tip INT,
    nouid VARCHAR(255) UNIQUE,   -- Nomor UID (identifier utama)
    sta INT,                     -- Status: 0=aktif, -1=nonaktif
    rev INT,
    createdby INT,
    updatedby INT,
    createdat TIMESTAMP,
    updatedat TIMESTAMP
);
```

**Relasi:**
- `idok` → `tsiswa.id` (1:1)
- `nouid` → `tregistrasi.nouid` (1:1)

### 2. `mai2.tsiswa` - Data Siswa (Authenticatable)
```sql
CREATE TABLE tsiswa (
    id INT PRIMARY KEY,
    nis VARCHAR(255) UNIQUE,     -- Nomor Induk Siswa
    nisn VARCHAR(255),
    namlen VARCHAR(255),         -- Nama lengkap
    nampan VARCHAR(255),         -- Nama panggilan
    namman VARCHAR(255),         -- Nama mandarin
    temlah VARCHAR(255),         -- Tempat lahir
    tgllah DATE,                 -- Tanggal lahir
    jenkel ENUM('L','P'),        -- Jenis kelamin
    tel VARCHAR(20),             -- Nomor telepon
    ket TEXT,
    sta INT,                     -- Status siswa
    staqd INT,
    rev INT,
    createdby INT,
    updatedby INT,
    createdat TIMESTAMP,
    updatedat TIMESTAMP,
    kel VARCHAR(255),            -- Kelas
    ala TEXT,                    -- Alamat
    pin VARCHAR(255),            -- PIN hashed (6 digit)
    excul JSON                   -- Data ekstrakurikuler
);
```

**Field Penting untuk Auth:**
- `pin`: PIN hashed dengan Laravel Hash
- `tel`: Nomor telepon untuk OTP
- `sta`: Status aktif/nonaktif

### 3. `mai4.tregistrasi` - Data Registrasi Wali
```sql
CREATE TABLE tregistrasi (
    id INT PRIMARY KEY,
    nouid VARCHAR(255),          -- Foreign key ke tindentitas.nouid
    nama VARCHAR(255),           -- Nama wali
    warneg INT,                  -- Kewarganegaraan
    warneg_name VARCHAR(255),
    nik VARCHAR(255),            -- NIK wali
    kk VARCHAR(255),             -- Nomor KK
    paspor VARCHAR(255),         -- Nomor paspor (jika WNA)
    alamat1 JSON,                -- Alamat 1
    alamat2 JSON,                -- Alamat 2
    temtin BOOLEAN,              -- Tempat tinggal
    hub INT,                     -- Hubungan (0=Ayah, 1=Ibu, 2=Wali)
    tel VARCHAR(20),             -- Nomor telepon wali
    email VARCHAR(255),
    sta INT,                     -- Status: 0=pending, 1=accepted, -1=rejected, -2=blocked
    updated_by INT,
    reject_reason TEXT,
    createdat TIMESTAMP,
    updatedat TIMESTAMP
);
```

**Status Registrasi:**
- `0`: Pending (menunggu approval)
- `1`: Accepted (disetujui)
- `-1`: Rejected (ditolak)
- `-2`: Blocked (diblokir)

### 4. `totps` - Tabel OTP
```sql
CREATE TABLE totps (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(20),           -- Nomor telepon
    otp VARCHAR(6),              -- Kode OTP
    expires_at TIMESTAMP,        -- Waktu kadaluarsa
    attempts INT DEFAULT 0,      -- Jumlah percobaan
    verified_at TIMESTAMP NULL,  -- Waktu verifikasi
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### 5. `mai2.tsiswa1` - Data Tambahan Siswa
```sql
CREATE TABLE tsiswa1 (
    ids INT PRIMARY KEY,         -- Foreign key ke tsiswa.id
    ala TEXT,                    -- Alamat lengkap
    rt VARCHAR(10),
    rw VARCHAR(10),
    cam VARCHAR(20),             -- Kode kecamatan
    lur VARCHAR(20),             -- Kode kelurahan
    kodpos VARCHAR(10),          -- Kode pos
    dusun VARCHAR(255),
    buj VARCHAR(255),
    lin VARCHAR(255),
    temtin VARCHAR(255),
    trans VARCHAR(255),
    aga INT,                     -- Agama
    ktp VARCHAR(255),            -- Nomor KTP
    goldar INT,                  -- Golongan darah
    warneg INT,                  -- Kewarganegaraan
    neg VARCHAR(255),            -- Negara
    bah VARCHAR(255),            -- Bahasa
    anakke INT,                  -- Anak ke-
    butuh TEXT,
    sakit TEXT
);
```

## Relasi Database

### 1. Relasi Utama
```
tindentitas (1) ←→ (1) tsiswa
    ↓
tindentitas (1) ←→ (1) tregistrasi
    ↓
tsiswa (1) ←→ (1) tsiswa1
```

### 2. Relasi dalam Model Laravel

#### Indentitas Model
```php
public function siswa()
{
    return $this->belongsTo(Siswa::class, 'idok', 'id');
}

public function registrasi()
{
    return $this->belongsTo(Tregistrasi::class, 'nouid', 'nouid');
}
```

#### Siswa Model
```php
public function indentitas()
{
    return $this->belongsTo(Indentitas::class, 'id', 'idok');
}

public function safe()
{
    return $this->hasOne(Tsiswa1::class, 'ids', 'id');
}
```

## Status dan Flow Data

### 1. Status Indentitas (`tindentitas.sta`)
- `0`: Aktif (default setelah registrasi)
- `-1`: Nonaktif (diblokir)

### 2. Status Registrasi (`tregistrasi.sta`)
- `0`: Pending (menunggu approval)
- `1`: Accepted (disetujui)
- `-1`: Rejected (ditolak)
- `-2`: Blocked (diblokir)

### 3. Status PIN (`tsiswa.pin`)
- `NULL`: Belum ada PIN
- `Hashed String`: PIN sudah dibuat

## Query Penting

### 1. Cek Status User
```php
$indentitas = Indentitas::with(['siswa', 'registrasi'])
    ->where('nouid', $nouid)
    ->first();

$summary = [
    'active' => $indentitas->active,           // sta !== -1
    'pin' => !is_null($indentitas->siswa->pin), // PIN exists
    'reg' => $indentitas->registrasi->sta,     // Registration status
];
```

### 2. Login Query
```php
$indentitas = Indentitas::where('nouid', $nouid)
    ->with('siswa')
    ->firstOrFail();

$siswa = $indentitas->siswa;
$pinValid = Hash::check($pin, $siswa->pin);
```

### 3. OTP Query
```php
$otp = Totps::where('phone', $phone)
    ->where('expires_at', '>', now())
    ->first();
```

## Index dan Performance

### 1. Index yang Diperlukan
```sql
-- Primary keys (sudah ada)
ALTER TABLE tindentitas ADD PRIMARY KEY (id);
ALTER TABLE tsiswa ADD PRIMARY KEY (id);
ALTER TABLE tregistrasi ADD PRIMARY KEY (id);

-- Unique indexes
ALTER TABLE tindentitas ADD UNIQUE INDEX idx_nouid (nouid);
ALTER TABLE tsiswa ADD UNIQUE INDEX idx_nis (nis);

-- Foreign key indexes
ALTER TABLE tindentitas ADD INDEX idx_idok (idok);
ALTER TABLE tregistrasi ADD INDEX idx_nouid (nouid);
ALTER TABLE tsiswa1 ADD INDEX idx_ids (ids);

-- OTP indexes
ALTER TABLE totps ADD INDEX idx_phone (phone);
ALTER TABLE totps ADD INDEX idx_expires_at (expires_at);
```

### 2. Query Optimization
```php
// Gunakan eager loading untuk menghindari N+1
$indentitas = Indentitas::with(['siswa', 'registrasi', 'signature'])
    ->where('nouid', $nouid)
    ->first();

// Gunakan select specific untuk mengurangi data transfer
$siswa = Siswa::select(['id', 'nis', 'namlen', 'pin', 'tel'])
    ->where('id', $id)
    ->first();
```

## Data Migration dan Seeding

### 1. Migration untuk OTP Table
```php
Schema::create('totps', function (Blueprint $table) {
    $table->id();
    $table->string('phone', 20);
    $table->string('otp', 6);
    $table->timestamp('expires_at');
    $table->integer('attempts')->default(0);
    $table->timestamp('verified_at')->nullable();
    $table->timestamps();
    
    $table->index('phone');
    $table->index('expires_at');
});
```

### 2. Seeding untuk Testing
```php
// Test user dengan PIN
$siswa = Siswa::create([
    'nis' => 'TEST001',
    'namlen' => 'Test User',
    'pin' => Hash::make('123456'),
    'tel' => '081234567890',
    'sta' => 1,
]);

$indentitas = Indentitas::create([
    'idok' => $siswa->id,
    'nouid' => 'TEST001',
    'sta' => 0,
]);
```

## Backup dan Recovery

### 1. Critical Tables untuk Backup
- `mai2.tindentitas` - Master data
- `mai2.tsiswa` - User data + PIN
- `mai4.tregistrasi` - Registration data
- `totps` - OTP data (temporary)

### 2. Data yang Sensitive
- `tsiswa.pin` - PIN hashed (tidak bisa di-recover)
- `tregistrasi.nik` - NIK wali
- `totps.otp` - OTP codes

### 3. Recovery Strategy
```php
// Reset PIN user
$siswa = Siswa::where('nis', $nis)->first();
$siswa->update(['pin' => null]); // Force PIN reset

// Clear expired OTP
Totps::where('expires_at', '<', now())->delete();

// Reset registration status
Tregistrasi::where('nouid', $nouid)->update(['sta' => 0]);
```

