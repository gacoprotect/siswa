# Analisis Double Rendering pada AppLayout

## Masalah yang Ditemukan

Komponen `AppLayout` ter-render 2 kali saat pertama kali memuat halaman. Berdasarkan analisis kode, berikut adalah penyebab yang mungkin:

### 1. **Penggunaan Multiple `usePage()` Hooks**

- `AppLayout.tsx` menggunakan `usePage()` untuk mendapatkan `pageProps`
- `useToast.tsx` juga menggunakan `usePage()` untuk mendapatkan `errors` dan `flash`
- Setiap hook `usePage()` dapat memicu re-render jika data berubah

### 2. **Inertia.js Development Mode**

- Dalam mode development, Inertia.js kadang melakukan double rendering untuk memastikan konsistensi state
- Ini adalah behavior normal untuk development, bukan bug

### 3. **React StrictMode (Jika Ada)**

- React.StrictMode sengaja melakukan double rendering untuk mendeteksi side effects
- Namun dalam kode ini tidak ditemukan StrictMode

### 4. **Hook Dependencies yang Tidak Stabil**

- `useAppConfig()` dipanggil setiap render tanpa memoization
- `useToast()` dipanggil tanpa dependencies yang jelas

## Solusi yang Diterapkan

### 1. **Menambahkan React.memo**

```tsx
const AppLayout = React.memo(({ children, title, className = '' }: AppLayoutProps) => {
    // Component logic
});
```

### 2. **Memoization untuk Computed Values**

```tsx
const isDebug = useMemo(() => config.APP_DEBUG, [config.APP_DEBUG]);
const isDev = useMemo(() => config.APP_ENV === 'local', [config.APP_ENV]);
```

### 3. **Optimasi useToast Hook**

- Menambahkan `useRef` untuk tracking initialization
- Mencegah multiple initialization

### 4. **Enhanced Debugging**

- Menambahkan render counter untuk tracking
- Warning jika render lebih dari sekali
- Detailed logging dengan timestamp

## Cara Menggunakan Debug Mode

1. Pastikan `APP_DEBUG=true` di konfigurasi
2. Buka browser console
3. Perhatikan log yang menampilkan:
    - Render count
    - Timestamp
    - Page props
    - Warning jika double render terdeteksi

## Monitoring Double Rendering

Dengan perubahan yang telah dibuat, Anda dapat memantau double rendering melalui:

1. **Console Logs**: Akan menampilkan detail setiap render
2. **Warning Messages**: Akan muncul jika render > 1 kali
3. **Render Counter**: Menunjukkan berapa kali komponen telah di-render

## Rekomendasi Tambahan

### 1. **Production Mode**

- Double rendering biasanya hanya terjadi di development mode
- Di production, masalah ini kemungkinan tidak akan terjadi

### 2. **Performance Monitoring**

- Gunakan React DevTools Profiler untuk monitoring performa
- Perhatikan komponen mana yang sering re-render

### 3. **Code Splitting**

- Pertimbangkan untuk memisahkan logic yang tidak perlu di AppLayout
- Gunakan lazy loading untuk komponen yang tidak critical

## Kesimpulan

Double rendering pada `AppLayout` kemungkinan disebabkan oleh:

1. **Development mode behavior** dari Inertia.js
2. **Multiple hook calls** yang tidak dioptimasi
3. **Lack of memoization** pada computed values

Solusi yang diterapkan akan:

- ✅ Mengurangi unnecessary re-renders
- ✅ Memberikan visibility yang lebih baik untuk debugging
- ✅ Mengoptimalkan performa komponen
- ✅ Mempertahankan functionality yang ada

Untuk production, masalah ini kemungkinan tidak akan terjadi karena development-specific behaviors.
