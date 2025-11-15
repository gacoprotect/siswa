# Perbaikan Flash Message Error

## Masalah yang Ditemukan

Error "Cannot access offset of type string on string" terjadi di middleware `HandleInertiaRequests.php` pada baris 48. Masalah ini terjadi karena:

1. **Inkonsistensi Format Flash Message**:

    - Beberapa tempat menggunakan `with('message', 'string')`
    - Tempat lain menggunakan `withErrors(['message' => 'string'])`
    - Middleware mencoba mengakses `$flash['timestamp']` pada string

2. **Konflik Tipe Data**:
    - Flash message bisa berupa string atau array
    - Middleware tidak menangani kedua tipe data dengan benar

## Solusi yang Diterapkan

### 1. Perbaikan Middleware HandleInertiaRequests

```php
'flash' => function () use ($request) {
    $flash = $request->session()->get('message');
    if ($flash) {
        // Handle both string and array flash messages
        if (is_string($flash)) {
            $flash = [
                'message' => $flash,
                'type' => 'success',
                'timestamp' => time() + 5,
            ];
        } elseif (is_array($flash)) {
            $flash['timestamp'] = time() + 5;
        }
        $request->session()->forget('message');
    }

    return $flash;
},
'errors' => function () use ($request) {
    $errors = $request->session()->get('errors');
    if ($errors) {
        return $errors->getBag('default')->getMessages();
    }
    return [];
},
```

### 2. Konsistensi Format Flash Message di TopupController

Semua flash message sekarang menggunakan format yang konsisten:

```php
// Untuk error messages
return back()->withErrors([
    'message' => 'Pesan error',
])->withInput()->with('message', 'Pesan error');

// Untuk success messages
return redirect()->with('message', 'Pesan sukses');
```

### 3. Error Handling yang Lebih Baik

- **String Flash Messages**: Dikonversi ke array dengan format standar
- **Array Flash Messages**: Ditambahkan timestamp
- **Error Messages**: Ditangani secara terpisah dari flash messages

## Format Flash Message yang Konsisten

### Struktur Array Flash Message

```php
[
    'message' => 'Pesan untuk ditampilkan',
    'type' => 'success|error|warning|info',
    'timestamp' => time() + 5, // Auto-expire dalam 5 detik
]
```

### Tipe Flash Message

- **success**: Untuk pesan sukses (hijau)
- **error**: Untuk pesan error (merah)
- **warning**: Untuk pesan peringatan (kuning)
- **info**: Untuk pesan informasi (biru)

## Frontend Integration

### Vue.js Component Example

```vue
<template>
    <div v-if="flash" :class="`alert alert-${flash.type}`">
        {{ flash.message }}
    </div>

    <div v-if="errors.message" class="alert alert-error">
        {{ errors.message[0] }}
    </div>
</template>

<script>
export default {
    props: {
        flash: Object,
        errors: Object,
    },
};
</script>
```

## Testing

### Unit Test untuk Flash Message

```php
public function test_flash_message_handling()
{
    $response = $this->post('/topup', [
        'amount' => 'invalid',
        'va_number' => '12345678901234567890'
    ]);

    $response->assertSessionHas('message');
    $response->assertSessionHasErrors(['message']);
}
```

## Best Practices

### 1. Konsistensi Format

- Selalu gunakan format yang sama untuk flash message
- Pisahkan error messages dari flash messages

### 2. Error Handling

- Tangani semua tipe data flash message
- Berikan fallback untuk data yang tidak valid

### 3. User Experience

- Berikan pesan yang jelas dan informatif
- Gunakan tipe yang sesuai untuk konteks pesan

### 4. Performance

- Hapus flash message setelah digunakan
- Gunakan timestamp untuk auto-expire

## Monitoring

### Log Flash Message Errors

```php
Log::warning('Flash message format error', [
    'flash' => $flash,
    'type' => gettype($flash)
]);
```

### Debug Flash Messages

```php
// Di development
if (config('app.debug')) {
    Log::info('Flash message', ['flash' => $flash]);
}
```

## Deployment Checklist

- [ ] Test flash message dengan berbagai tipe data
- [ ] Verifikasi error handling berfungsi
- [ ] Test frontend integration
- [ ] Monitor error logs setelah deployment
- [ ] Backup session configuration

## Troubleshooting

### Common Issues

1. **Flash message tidak muncul**

    - Cek session configuration
    - Verifikasi middleware berjalan

2. **Error "Cannot access offset"**

    - Pastikan middleware menangani string dan array
    - Cek tipe data flash message

3. **Flash message tidak hilang**
    - Pastikan `session()->forget('message')` dipanggil
    - Cek frontend tidak menyimpan flash message

### Debug Commands

```bash
# Cek session configuration
php artisan config:show session

# Test flash message
php artisan tinker
>>> session()->flash('message', 'test')
>>> session()->get('message')
```
