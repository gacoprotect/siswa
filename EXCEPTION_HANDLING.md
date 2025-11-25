# Exception Handling System Documentation

Sistem exception handling yang terstruktur dan mengikuti standar **RFC 7807 (Problem Details for HTTP APIs)** dan best practices Laravel.

## Standar yang Digunakan

- **RFC 7807**: Problem Details for HTTP APIs
- **ISO/IEC 27001**: Information security management
- **HTTP Status Codes**: Standard HTTP status codes (ISO/IEC 29155)

## Komponen Sistem

### 1. ExceptionHandlerService
**Lokasi:** `app/Services/Exception/ExceptionHandlerService.php`

Service utama untuk menangani semua jenis exception.

**Fitur:**
- Auto-detect request type (API/Web)
- Format response sesuai RFC 7807
- Logging otomatis dengan context
- Redirect ke error page untuk web requests
- Return JSON untuk API requests

**Penggunaan:**
```php
$handler = app(\App\Services\Exception\ExceptionHandlerService::class);
$response = $handler->handle($exception, $request);
```

### 2. ErrorResponseFormatter
**Lokasi:** `app/Services/Exception/Formatters/ErrorResponseFormatter.php`

Formatter untuk mengubah exception menjadi format RFC 7807.

**Format Response (RFC 7807):**
```json
{
    "type": "https://example.com/errors/validation-error",
    "title": "Validation Error",
    "status": 422,
    "detail": "The given data was invalid.",
    "instance": "https://example.com/api/users",
    "errors": {
        "email": ["The email field is required."]
    }
}
```

### 3. BaseApplicationException
**Lokasi:** `app/Exceptions/BaseApplicationException.php`

Base exception class yang mengikuti standar RFC 7807.

**Penggunaan:**
```php
use App\Exceptions\BaseApplicationException;

class CustomException extends BaseApplicationException
{
    public function __construct(string $message = '', array $context = null)
    {
        parent::__construct($message, 400, $context);
    }
}
```

### 4. HandlesExceptions Trait
**Lokasi:** `app/Http/Controllers/Concerns/HandlesExceptions.php`

Trait untuk memudahkan error handling di controller.

**Methods:**
- `handleException()` - Handle exception dan return response
- `executeWithExceptionHandling()` - Execute callback dengan exception handling
- `errorResponse()` - Return error response untuk API
- `successResponse()` - Return success response untuk API
- `logException()` - Log exception dengan context

**Penggunaan:**
```php
use App\Http\Controllers\Concerns\HandlesExceptions;

class YourController extends Controller
{
    use HandlesExceptions;

    public function someMethod(Request $request)
    {
        return $this->executeWithExceptionHandling(function() use ($request) {
            // Your code here
            return $this->successResponse($data);
        }, $request);
    }
}
```

### 5. ErrorController
**Lokasi:** `app/Http/Controllers/ErrorController.php`

Controller untuk menampilkan halaman error.

**Route:** `/error/{code?}`

### 6. Error Views
**Lokasi:** `resources/views/errors/generic.blade.php`

Halaman error yang user-friendly dengan informasi lengkap.

## Cara Penggunaan

### Di Controller

#### Menggunakan Trait
```php
use App\Http\Controllers\Concerns\HandlesExceptions;

class YourController extends Controller
{
    use HandlesExceptions;

    public function index(Request $request)
    {
        try {
            // Your code
            return $this->successResponse($data);
        } catch (\Exception $e) {
            return $this->handleException($e, $request);
        }
    }
}
```

#### Manual Exception Handling
```php
public function store(Request $request)
{
    try {
        // Your code
    } catch (\Illuminate\Validation\ValidationException $e) {
        return $this->errorResponse(
            'Validation failed',
            422,
            $e->errors()
        );
    } catch (\Exception $e) {
        return $this->handleException($e, $request);
    }
}
```

### Membuat Custom Exception

```php
use App\Exceptions\BaseApplicationException;

class PaymentException extends BaseApplicationException
{
    public function __construct(string $message = '', array $context = null)
    {
        parent::__construct($message, 400, $context);
    }
}

// Usage
throw new PaymentException('Payment failed', [
    'payment_id' => $paymentId,
    'reason' => 'Insufficient funds'
]);
```

## Response Format

### API Response (JSON)
```json
{
    "type": "https://example.com/errors/validation-error",
    "title": "Validation Error",
    "status": 422,
    "detail": "The given data was invalid.",
    "instance": "https://example.com/api/users",
    "errors": {
        "email": ["The email field is required."]
    }
}
```

### Web Response
- Redirect ke `/error/{code}` dengan error details di session
- Menampilkan halaman error yang user-friendly

## Error Codes

| Code | Title | Description |
|------|-------|-------------|
| 400 | Bad Request | Invalid request syntax |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Resource not found |
| 405 | Method Not Allowed | HTTP method not supported |
| 419 | Page Expired | CSRF token expired |
| 422 | Validation Error | Validation failed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Service temporarily unavailable |

## Logging

Exception otomatis di-log dengan context:
- Exception type
- Message
- File dan line
- URL dan method
- IP address
- User agent
- User ID (jika authenticated)

**Log Level:**
- `error`: Status code >= 500
- `warning`: Status code >= 400
- `info`: Other exceptions

## Security

- Error details tidak ditampilkan di production (kecuali debug mode)
- Sensitive information tidak di-expose
- Trace hanya ditampilkan di debug mode

## Testing

```php
// Test exception handling
$response = $this->get('/api/test');
$response->assertStatus(500);
$response->assertJsonStructure([
    'type',
    'title',
    'status',
    'detail',
    'instance'
]);
```

## Best Practices

1. **Gunakan BaseApplicationException** untuk custom exceptions
2. **Gunakan HandlesExceptions trait** di controller
3. **Jangan expose sensitive information** di error messages
4. **Log semua exceptions** untuk debugging
5. **Gunakan appropriate HTTP status codes**
6. **Follow RFC 7807 format** untuk API responses

## Integration dengan SNAP

Sistem ini terintegrasi dengan SNAP exception handling:
- `SnapException` extends dari `BaseApplicationException`
- Menggunakan `ExceptionHandlerService` untuk handling
- Redirect ke `/snap/error` untuk SNAP-specific errors

## Troubleshooting

### Error tidak redirect ke error page
- Pastikan route `/error` sudah terdaftar
- Check exception handler di `bootstrap/app.php`

### API response tidak sesuai format
- Pastikan request header `Accept: application/json`
- Check `ErrorResponseFormatter` format

### Error tidak di-log
- Check log configuration di `config/logging.php`
- Pastikan `shouldReport()` return true

## Referensi

- [RFC 7807 - Problem Details for HTTP APIs](https://tools.ietf.org/html/rfc7807)
- [Laravel Exception Handling](https://laravel.com/docs/errors)
- [HTTP Status Codes](https://httpstatuses.com/)

