# Payment System Documentation

Sistem pembayaran yang terintegrasi dengan layout menu untuk aplikasi sekolah.

## 📁 Struktur File

```
resources/js/pages/Payment/
├── Index.tsx              # Halaman utama pembayaran
├── Invoice.tsx            # Halaman invoice pembayaran
├── History.tsx            # Halaman riwayat pembayaran
├── Methods.tsx            # Halaman metode pembayaran
├── index.ts               # File ekspor komponen
└── README.md              # Dokumentasi ini

resources/js/components/payment/
├── payment-invoice.tsx    # Komponen invoice
└── payment-method.tsx     # Komponen metode pembayaran
```

## 🎯 Komponen Utama

### 1. PaymentInvoice Component

Komponen untuk menampilkan detail invoice pembayaran dengan fitur:

- Header invoice dengan status badge
- Informasi siswa dan invoice
- Tabel item tagihan
- Ringkasan pembayaran
- Informasi pembayaran (jika ada)
- Aksi download, print, dan view

### 2. PaymentMethod Component

Komponen untuk memilih metode pembayaran dengan fitur:

- Pilihan metode pembayaran (wallet, VA, dll)
- Validasi saldo
- Status transaksi yang ada
- Form submission dengan loading state

## 📄 Halaman

### 1. PaymentIndex (`/payment`)

Halaman utama yang menampilkan:

- Ringkasan saldo dan tagihan
- Aksi pembayaran (Lihat Invoice, Metode Pembayaran, Riwayat)
- Informasi cepat siswa
- Bantuan pembayaran

### 2. Invoice (`/payment/invoice`)

Halaman detail invoice dengan:

- Komponen PaymentInvoice
- Aksi tambahan (download, print, view)
- Status pembayaran
- Bantuan

### 3. PaymentHistory (`/payment/history`)

Halaman riwayat transaksi dengan:

- Ringkasan statistik transaksi
- Daftar transaksi dengan filter
- Modal detail transaksi
- Download receipt

### 4. PaymentMethods (`/payment/methods`)

Halaman pemilihan metode pembayaran dengan:

- Ringkasan pembayaran
- Komponen PaymentMethod
- Informasi keamanan
- Error handling

## 🔧 Fitur Utama

### ✅ Integrasi Layout

- Menggunakan `MenuLayout` untuk konsistensi UI
- Header dengan tombol kembali
- Responsive design

### ✅ State Management

- Loading states
- Processing states
- Error handling
- Form validation

### ✅ Logging

- Integrasi dengan logger context
- Tracking user actions
- Debug information

### ✅ TypeScript

- Fully typed interfaces
- Type safety untuk props
- Proper error handling

### ✅ Responsive Design

- Mobile-first approach
- Grid layouts
- Flexible components

## 🎨 UI/UX Features

### Design System

- Konsisten dengan aplikasi utama
- Color-coded status badges
- Icon integration (React Icons)
- Loading spinners

### User Experience

- Clear navigation flow
- Intuitive button placement
- Helpful error messages
- Progress indicators

### Accessibility

- Proper ARIA labels
- Keyboard navigation
- Screen reader friendly
- High contrast support

## 🔗 Integrasi

### Data Flow

1. **Props**: Menerima data dari Inertia.js page props
2. **State**: Local state untuk UI interactions
3. **API**: Simulasi API calls (dalam implementasi nyata)
4. **Navigation**: Router integration untuk page transitions

### Dependencies

- `@inertiajs/react`: Navigation dan form handling
- `react-icons/fa`: Icon library
- `@/utils/payment-utils`: Utility functions
- `@/types`: TypeScript interfaces
- `@/contexts/logger-context`: Logging system

## 🚀 Penggunaan

### Import Komponen

```typescript
import { PaymentIndex, Invoice, PaymentHistory, PaymentMethods } from '@/pages/Payment';
```

### Routing

```typescript
// Dalam router Laravel/Inertia
Route::get('/payment', [PaymentController::class, 'index']);
Route::get('/payment/invoice', [PaymentController::class, 'invoice']);
Route::get('/payment/history', [PaymentController::class, 'history']);
Route::get('/payment/methods', [PaymentController::class, 'methods']);
```

### Props yang Diperlukan

```typescript
interface PaymentPageProps {
    auth: Auth;
    data: DataSiswa;
    invoiceId?: string; // untuk halaman invoice
}
```

## 🔄 Workflow

### Flow Pembayaran

1. **PaymentIndex** → User melihat ringkasan
2. **PaymentMethods** → User memilih metode
3. **Invoice** → User melihat detail invoice
4. **PaymentHistory** → User melihat riwayat

### Error Handling

- Network errors
- Validation errors
- Processing errors
- User feedback

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Future Enhancements

### Planned Features

- [ ] Real-time payment status updates
- [ ] Push notifications
- [ ] Offline support
- [ ] Multi-language support
- [ ] Advanced filtering
- [ ] Export functionality
- [ ] Payment analytics

### Technical Improvements

- [ ] Performance optimization
- [ ] Caching strategies
- [ ] Error boundary implementation
- [ ] Unit testing
- [ ] E2E testing

## 📞 Support

Untuk pertanyaan atau masalah terkait sistem pembayaran, silakan hubungi tim development atau buat issue di repository.
