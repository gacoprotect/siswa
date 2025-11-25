# Snap Service - Multi Bank Support

Sistem ini memungkinkan Anda dengan mudah berpindah antar bank tanpa perlu mengubah kode.

## Cara Penggunaan

### 1. Via API Routes

#### Menggunakan Query Parameter

```bash
# Get access token untuk bank tertentu
GET /api/snap/access-token?bank=aspi
GET /api/snap/access-token?bank=ocbc
GET /api/snap/access-token?bank=bca

# Get balance
GET /api/snap/balance?bank=aspi

# Get bank statement
GET /api/snap/bank-statement?bank=aspi&start_date=2024-01-01&end_date=2024-01-31
```

#### Menggunakan Route Parameter

```bash
# Get access token
GET /api/snap/aspi/access-token
GET /api/snap/ocbc/access-token
GET /api/snap/bca/access-token

# Get balance
GET /api/snap/aspi/balance

# Get bank statement
GET /api/snap/aspi/bank-statement?start_date=2024-01-01&end_date=2024-01-31
```

#### List Available Banks

```bash
GET /api/snap/banks
```

### 2. Via Code (Service)

```php
use App\Services\Snap\SnapService;

// Default bank (dari config('snap.default'))
$service = new SnapService();
$response = $service->getAccessToken();

// Specific bank
$service = new SnapService('aspi');
$response = $service->getAccessToken();

// Atau set bank setelah instantiate
$service = new SnapService();
$service->setBank('ocbc');
$response = $service->getAccessToken();

// Get available banks
$banks = SnapService::getAvailableBanks();
```

## Konfigurasi

Semua konfigurasi bank ada di `config/snap.php`. Pastikan environment variables sudah di-set:

```env
# ASPI
ASPI_CLIENT_ID=your_client_id
ASPI_CLIENT_SECRET=your_client_secret
ASPI_PRIVATE_KEY=your_private_key
ASPI_PUBLIC_KEY=your_public_key
ASPI_BASE_URL=https://apidevportal.aspi-indonesia.or.id:44310
# ... dll

# OCBC
OCBC_CLIENT_ID=your_client_id
# ... dll

# BCA
BCA_CLIENT_ID=your_client_id
# ... dll
```

## Bank yang Didukung

- ASPI
- OCBC
- BCA
- Mandiri
- DANA

## Default Bank

Default bank bisa di-set di `config/snap.php`:

```php
'default' => 'aspi', // atau 'ocbc', 'bca', dll
```

Jika tidak ada parameter `bank` yang diberikan, sistem akan menggunakan default bank.
