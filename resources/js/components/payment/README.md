# PaymentMethod Component

Komponen `PaymentMethod` yang dapat digunakan kembali (reusable) untuk menangani pemilihan metode pembayaran dengan prinsip DRY (Don't Repeat Yourself).

## Fitur

- ✅ Mendukung dua metode pembayaran: Wallet dan Virtual Account
- ✅ Validasi saldo otomatis untuk pembayaran wallet
- ✅ Penanganan transaksi yang belum selesai
- ✅ Loading state dan error handling
- ✅ Fully typed dengan TypeScript
- ✅ Responsive design dengan Tailwind CSS
- ✅ Mengikuti prinsip DRY untuk efisiensi kode

## Props Interface

```typescript
interface PaymentMethodProps {
    selectedMethod: (method: 'wallet' | 'va') => void;
    siswa?: {
        balance?: number;
    };
    totalAmount?: number;
    existingTransaction?: {
        exist: boolean;
        uri?: string;
    };
    onSubmit?: (method: 'wallet' | 'va') => void;
    processing?: boolean;
    errors?: Record<string, string>;
}
```

## Cara Penggunaan

### 1. Import Component

```typescript
import PaymentMethod from './components/payment/payment-method';
```

### 2. Basic Usage

```typescript
const MyPaymentPage = () => {
    const [selectedMethod, setSelectedMethod] = useState<'wallet' | 'va'>('wallet');

    const handleMethodSelection = (method: 'wallet' | 'va') => {
        setSelectedMethod(method);
    };

    const handlePaymentSubmit = (method: 'wallet' | 'va') => {
        // Handle payment logic here
        console.log('Processing payment with method:', method);
    };

    return (
        <PaymentMethod
            selectedMethod={handleMethodSelection}
            siswa={{ balance: 1000000 }}
            totalAmount={500000}
            onSubmit={handlePaymentSubmit}
        />
    );
};
```

### 3. Advanced Usage dengan Error Handling

```typescript
const AdvancedPaymentPage = () => {
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handlePaymentSubmit = async (method: 'wallet' | 'va') => {
        setProcessing(true);
        setErrors({});

        try {
            // API call logic here
            await processPayment(method);
        } catch (error) {
            setErrors({ payment_method: 'Terjadi kesalahan' });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <PaymentMethod
            selectedMethod={setSelectedMethod}
            siswa={{ balance: 1000000 }}
            totalAmount={500000}
            existingTransaction={{ exist: false }}
            onSubmit={handlePaymentSubmit}
            processing={processing}
            errors={errors}
        />
    );
};
```

## Prinsip DRY yang Diterapkan

### 1. Konfigurasi Terpusat

```typescript
import { LucideIcon, Wallet, Building2, CreditCard, Banknote } from 'lucide-react';

const PAYMENT_METHODS_CONFIG: PaymentMethodConfig[] = [
    {
        id: 'wallet',
        label: 'Saldo Tabungan',
        description: 'Saldo Tersedia',
        type: 'wallet',
        icon: Wallet,
    },
    {
        id: 'va',
        label: 'Virtual Account',
        description: 'Transfer melalui bank partner',
        type: 'va',
        icon: Building2,
    },
] as const;
```

### 2. Utility Function Reusable

```typescript
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};
```

### 3. Dynamic Rendering

```typescript
{PAYMENT_METHODS.map((paymentMethod) => (
    <div key={paymentMethod.id}>
        {/* Render payment method dynamically */}
    </div>
))}
```

### 4. Memoized Calculations

```typescript
const isSaldoInsufficient = React.useMemo(() => {
    if (state.method !== 'wallet' || !siswa?.balance) return false;
    return siswa.balance < totalAmount;
}, [state.method, siswa?.balance, totalAmount]);
```

## Keuntungan Menggunakan Prinsip DRY

1. **Maintainability**: Perubahan pada satu tempat akan otomatis diterapkan di semua tempat
2. **Consistency**: Tampilan dan behavior yang konsisten di seluruh aplikasi
3. **Scalability**: Mudah menambah metode pembayaran baru
4. **Testing**: Lebih mudah untuk unit testing
5. **Performance**: Menggunakan memoization untuk optimasi performa

## Contoh Menambah Metode Pembayaran Baru

Untuk menambah metode pembayaran baru, cukup update array `PAYMENT_METHODS`:

```typescript
const PAYMENT_METHODS = [
    // ... existing methods
    {
        id: 'credit_card',
        label: 'Kartu Kredit',
        description: 'Pembayaran dengan kartu kredit',
        type: 'credit_card' as const,
    },
] as const;
```

## Error Handling

Komponen ini mendukung error handling yang fleksibel:

- Validation errors untuk saldo tidak cukup
- API errors dari server
- Network errors
- Custom error messages

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Focus management

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (dengan polyfills)
- Mobile browsers
