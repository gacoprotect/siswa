# SNAP Error Handling Documentation

Sistem ini menyediakan handler terstruktur untuk menangani response code SNAP yang terintegrasi dengan dokumentasi SNAP Response Code.

## Komponen yang Dibuat

### 1. SnapResponseCodeService

**Lokasi:** `app/Services/Snap/SnapResponseCodeService.php`

Service untuk parsing dan mapping response codes dari CSV file `SNAP_RESPONSE_CODE.csv`.

**Fitur:**

- Parse CSV file dan cache hasilnya
- Mapping response code ke informasi lengkap (category, HTTP code, description, dll)
- Support untuk berbagai service type (token, inquiry, payment, dll)
- Helper methods untuk check success/business/system error

**Penggunaan:**

```php
$service = app(\App\Services\Snap\SnapResponseCodeService::class);

// Get response code info
$info = $service->getResponseCodeInfo('4002401', 'inquiry');

// Check if success
if ($service->isSuccess('2002400')) {
    // Handle success
}

// Check error type
if ($service->isBusinessError('4032402')) {
    // Handle business error
}
```

### 2. Custom Exceptions

**Lokasi:** `app/Exceptions/Snap/`

- **SnapException** - Base exception class
- **SnapBusinessException** - Untuk business errors (403, 404)
- **SnapSystemException** - Untuk system errors (400, 401, 500)

**Fitur:**

- Menyimpan response code, message, dan data
- Convert ke array untuk JSON response
- Category dan HTTP code terintegrasi

### 3. HandlesSnapResponse Trait

**Lokasi:** `app/Http/Controllers/Concerns/HandlesSnapResponse.php`

Trait yang dapat digunakan di controller untuk menangani SNAP responses secara otomatis.

**Methods:**

- `handleSnapResponse()` - Handle response dan throw exception jika error
- `handleSnapException()` - Handle exception dan return response
- `isSnapResponseSuccessful()` - Check jika response successful
- `throwSnapException()` - Throw appropriate exception berdasarkan response code

**Penggunaan:**

```php
use App\Http\Controllers\Concerns\HandlesSnapResponse;

class YourController extends Controller
{
    use HandlesSnapResponse;

    public function someMethod(Request $request)
    {
        try {
            $response = $this->snapService->someMethod();

            // Automatically handle response and throw exception if error
            $data = $this->handleSnapResponse($response, 'inquiry');

            return response()->json(['success' => true, 'data' => $data]);
        } catch (\App\Exceptions\Snap\SnapException $e) {
            // Exception handler will automatically catch this
            throw $e;
        }
    }
}
```

### 4. Error View

**Lokasi:** `resources/views/errors/snap.blade.php`

Halaman error yang menampilkan informasi error SNAP dengan UI yang user-friendly.

**Fitur:**

- Menampilkan response code dan message
- Detail error (category, HTTP code, description)
- Badge untuk kategori error
- Responsive design

### 5. SnapErrorController

**Lokasi:** `app/Http/Controllers/Snap/SnapErrorController.php`

Controller untuk menampilkan halaman error SNAP.

**Route:** `/snap/error`

### 6. Exception Handler

**Lokasi:** `bootstrap/app.php`

Exception handler yang otomatis menangani `SnapException`:

- API requests → Return JSON response
- Web requests → Redirect ke error page

## Cara Penggunaan

### Di Controller

1. **Gunakan trait di controller:**

```php
use App\Http\Controllers\Concerns\HandlesSnapResponse;

class YourController extends Controller
{
    use HandlesSnapResponse;

    // ... methods
}
```

2. **Handle response:**

```php
public function someMethod(Request $request)
{
    try {
        $response = $this->snapService->virtualAccountInquiry($body);

        // Automatically checks response and throws exception if error
        $data = $this->handleSnapResponse($response, 'inquiry');

        return response()->json(['success' => true, 'data' => $data]);
    } catch (\App\Exceptions\Snap\SnapException $e) {
        // Exception handler will automatically handle this
        throw $e;
    }
}
```

### Manual Error Handling

Jika ingin handle error secara manual:

```php
$response = $this->snapService->getAccessToken();

if ($this->isSnapResponseSuccessful($response, 'token')) {
    // Success
    $data = $response->array();
} else {
    // Error - handle manually
    $data = $response->array();
    $responseCode = $data['responseCode'] ?? 'UNKNOWN';
    // ... handle error
}
```

## Response Code Mapping

Response codes di-mapping dari CSV file berdasarkan:

- HTTP Code (400, 401, 403, 404, 500, dll)
- Service Code (73=Token, 24=Inquiry, 25=Payment, dll)
- Case Code (00, 01, 02, dll)

Format: `HTTP_CODE + SERVICE_CODE + CASE_CODE`
Contoh: `4002401` = 400 (HTTP) + 24 (Inquiry) + 01 (Case)

## Error Categories

1. **Success** - Response code 200xxx
2. **Business** - Business logic errors (403, 404)
3. **System** - System errors (400, 401, 500)
4. **Message** - Message/format errors (400)

## Cache

Response codes di-cache selama 24 jam untuk performa. Untuk clear cache:

```php
$service = app(\App\Services\Snap\SnapResponseCodeService::class);
$service->clearCache();
```

## Testing

Lihat contoh penggunaan di:

- `app/Http/Controllers/Snap/SnapControllerExample.php`

## Catatan

- File CSV harus ada di `storage/app/public/SNAP_RESPONSE_CODE.csv`
- Exception handler otomatis menangani semua `SnapException`
- Untuk API requests, response akan berupa JSON
- Untuk web requests, akan redirect ke halaman error
