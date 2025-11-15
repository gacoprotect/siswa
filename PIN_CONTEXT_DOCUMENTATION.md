# PIN Context Documentation

## Overview

PIN Context adalah sistem yang memungkinkan Anda menggunakan verifikasi PIN di mana pun dalam aplikasi, mirip dengan `useLoading`. Sistem ini menggunakan React Context untuk mengelola state PIN dan menangani aksi setelah verifikasi berhasil.

## Features

- ✅ **Global Access**: Dapat digunakan di komponen manapun
- ✅ **Multiple Actions**: Support redirect, execute callback, dan custom actions
- ✅ **Type-safe**: Full TypeScript support
- ✅ **Flexible**: Dapat dikustomisasi untuk berbagai kebutuhan
- ✅ **Consistent**: UI yang konsisten di seluruh aplikasi

## Setup

### 1. Wrap dengan PinProvider

```tsx
import { PinProvider } from '@/contexts/pin-context';

const App: React.FC = () => {
    const { auth, data } = usePage<{ auth: Auth; data: DataSiswa }>().props;
    const nouid = data.nouid ?? auth?.user?.nouid ?? '';

    return (
        <PinProvider nouid={nouid}>
            <YourApp />
        </PinProvider>
    );
};
```

### 2. Tambahkan PinModal di Parent

```tsx
import { PinModal } from '@/components/PinModal';

const YourApp: React.FC = () => {
    return (
        <div>
            {/* Your app content */}
            <PinModal /> {/* Modal akan muncul otomatis saat diperlukan */}
        </div>
    );
};
```

## API Reference

### usePinContext Hook

```tsx
const { isPinModalOpen, currentAction, verifyPinForRedirect, verifyPinForExecute, verifyPinForAction, openPinModal, closePinModal } = usePinContext();
```

### Methods

#### 1. verifyPinForRedirect(url, description?)

```tsx
const { verifyPinForRedirect } = usePinContext();

// Redirect ke halaman riwayat setelah PIN berhasil
verifyPinForRedirect(route('siswa.riwayat', { nouid: 'a7095648' }), 'Masukkan PIN untuk mengakses riwayat transaksi');
```

#### 2. verifyPinForExecute(callback, description?)

```tsx
const { verifyPinForExecute } = usePinContext();

// Eksekusi callback setelah PIN berhasil
verifyPinForExecute(() => {
    console.log('PIN berhasil!');
    // Lakukan aksi lain
    processPayment();
}, 'Masukkan PIN untuk mengkonfirmasi pembayaran');
```

#### 3. verifyPinForAction(action)

```tsx
const { verifyPinForAction } = usePinContext();

// Aksi kustom
verifyPinForAction({
    id: 'custom-action-1',
    action: 'execute',
    payload: {
        callback: () => {
            console.log('Aksi kustom berhasil!');
        },
    },
    description: 'Masukkan PIN untuk melakukan aksi kustom',
});
```

## Use Cases

### 1. Redirect ke Halaman Tertentu

```tsx
const RiwayatButton: React.FC = () => {
    const { verifyPinForRedirect } = usePinContext();

    return <button onClick={() => verifyPinForRedirect(route('siswa.riwayat'), 'Masukkan PIN untuk mengakses riwayat')}>Lihat Riwayat</button>;
};
```

### 2. Konfirmasi Pembayaran

```tsx
const PaymentButton: React.FC<{ amount: number }> = ({ amount }) => {
    const { verifyPinForExecute } = usePinContext();

    const handlePayment = () => {
        verifyPinForExecute(() => {
            // Proses pembayaran setelah PIN berhasil
            processPayment(amount);
        }, `Masukkan PIN untuk mengkonfirmasi pembayaran Rp ${amount.toLocaleString()}`);
    };

    return <button onClick={handlePayment}>Bayar Sekarang</button>;
};
```

### 3. Update Settings

```tsx
const SettingsForm: React.FC = () => {
    const { verifyPinForExecute } = usePinContext();
    const [settings, setSettings] = useState({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        verifyPinForExecute(() => {
            // Update settings setelah PIN berhasil
            updateSettings(settings);
        }, 'Masukkan PIN untuk mengupdate pengaturan');
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <button type="submit">Update Settings</button>
        </form>
    );
};
```

### 4. Multiple Actions dalam Satu Komponen

```tsx
const DashboardActions: React.FC = () => {
    const { verifyPinForRedirect, verifyPinForExecute } = usePinContext();

    return (
        <div className="space-y-4">
            <button onClick={() => verifyPinForRedirect(route('siswa.profile'), 'Masukkan PIN untuk melihat profil')}>Lihat Profil</button>

            <button onClick={() => verifyPinForExecute(() => console.log('Logout berhasil'), 'Masukkan PIN untuk logout')}>Logout</button>
        </div>
    );
};
```

## Integration dengan Dashboard

### Update Dashboard/Index.tsx

```tsx
import { PinProvider } from '@/contexts/pin-context';
import { PinModal } from '@/components/PinModal';

const DashboardContent: React.FC = () => {
    const { verifyPinForExecute } = usePinContext();

    const openPinModal = useCallback(() => {
        verifyPinForExecute(() => {
            window.location.reload();
        }, 'Masukkan PIN untuk login');
    }, [verifyPinForExecute]);

    return (
        <AppLayout>
            {/* Dashboard content */}
            <PinModal />
        </AppLayout>
    );
};

const Index: React.FC = () => {
    const { auth, data } = usePage<{ auth: Auth; data: DataSiswa }>().props;
    const nouid = data.nouid ?? auth?.user?.nouid ?? '';

    return (
        <PinProvider nouid={nouid}>
            <DashboardContent />
        </PinProvider>
    );
};
```

## Action Types

### 1. Redirect Action

```tsx
{
    id: 'redirect-1',
    action: 'redirect',
    payload: {
        url: 'https://example.com'
    },
    description: 'Masukkan PIN untuk melanjutkan'
}
```

### 2. Execute Action

```tsx
{
    id: 'execute-1',
    action: 'execute',
    payload: {
        callback: () => {
            console.log('Callback executed!');
        }
    },
    description: 'Masukkan PIN untuk melanjutkan'
}
```

### 3. Custom Action

```tsx
{
    id: 'custom-1',
    action: 'callback',
    payload: {
        callback: () => {
            // Custom logic
        },
        data: { /* additional data */ }
    },
    description: 'Masukkan PIN untuk melanjutkan'
}
```

## Error Handling

Context secara otomatis menangani error:

```tsx
const { verifyPinForExecute } = usePinContext();

verifyPinForExecute(() => {
    // Success callback
    console.log('Berhasil!');
}, 'Masukkan PIN');
// Error handling otomatis di context
```

## Best Practices

1. **Selalu wrap dengan PinProvider**: Pastikan komponen yang menggunakan PIN context berada dalam PinProvider
2. **Tambahkan PinModal**: Selalu tambahkan `<PinModal />` di parent component
3. **Gunakan description yang jelas**: Berikan deskripsi yang informatif untuk user
4. **Handle errors**: Context menangani error secara otomatis
5. **Type safety**: Gunakan TypeScript untuk type safety yang lebih baik

## Migration dari usePin Hook

### Sebelum (usePin Hook)

```tsx
const pinHook = usePin({
    nouid: 'a7095648',
    onSuccess: () => {
        // Handle success
    },
    onError: (errors) => {
        // Handle error
    },
});

// Manual trigger
pinHook.openPinModal();
```

### Sesudah (PIN Context)

```tsx
const { verifyPinForExecute } = usePinContext();

// Automatic trigger dengan action
verifyPinForExecute(() => {
    // Handle success
}, 'Masukkan PIN untuk melanjutkan');
```

## Troubleshooting

### Modal tidak muncul

- Pastikan `<PinModal />` ada di parent component
- Pastikan komponen berada dalam `<PinProvider>`

### Action tidak dieksekusi

- Periksa apakah callback function valid
- Periksa console untuk error

### Type errors

- Pastikan menggunakan TypeScript
- Periksa import statements

PIN Context memberikan solusi yang fleksibel dan mudah digunakan untuk implementasi verifikasi PIN di seluruh aplikasi!
