# Panduan State Management di Tagihan Index

## Cara Mengatur State

Sekarang Anda memiliki beberapa cara untuk mengatur state di `Index.tsx`:

### 1. **Menggunakan `handleStateChange` (Direkomendasikan)**

```tsx
// Set nilai spesifik
handleStateChange('riwayat', true);
handleStateChange('tambahTagihan', false);
handleStateChange('tagihan', newTagihanArray);

// Toggle boolean (tanpa parameter kedua)
handleStateChange('riwayat'); // akan toggle dari true ke false atau sebaliknya
```

### 2. **Menggunakan `setState` Langsung**

```tsx
// Set nilai spesifik
setState((prev) => ({ ...prev, riwayat: true }));
setState((prev) => ({ ...prev, tambahTagihan: false }));
setState((prev) => ({ ...prev, tagihan: newTagihanArray }));
```

### 3. **Contoh Penggunaan di Komponen**

```tsx
// Di TagihanActionButton
<button onClick={() => setState('riwayat', false)}>
    Tutup Riwayat
</button>

<button onClick={() => setState('tambahTagihan', true)}>
    Buka Modal Tambah
</button>

// Toggle sederhana
<button onClick={() => setState('riwayat')}>
    Toggle Riwayat
</button>
```

## Struktur State

```tsx
interface TagihanPageState {
    riwayat: boolean; // Menampilkan riwayat atau tabel
    tambahTagihan: boolean; // Menampilkan modal tambah tagihan
    tagihan: BillTagihan[]; // Array data tagihan
}
```

## Best Practices

1. **Gunakan `handleStateChange`** untuk konsistensi interface
2. **Set nilai spesifik** ketika Anda tahu nilai yang diinginkan
3. **Gunakan toggle** untuk boolean values yang hanya perlu dibalik
4. **Jangan lupa import types** yang diperlukan

## Contoh Lengkap

```tsx
const TagihanPage = () => {
    const [state, setState] = useState<TagihanPageState>({
        riwayat: false,
        tambahTagihan: false,
        tagihan: data.tagihan ?? [],
    });

    // Wrapper function yang fleksibel
    const handleStateChange = (key: keyof TagihanPageState, value?: boolean | BillTagihan[]) => {
        if (value !== undefined) {
            // Set specific value
            setState((prev) => ({ ...prev, [key]: value }));
        } else {
            // Toggle boolean value
            setState((prev) => ({ ...prev, [key]: !prev[key] }));
        }
    };

    // Contoh penggunaan
    const openRiwayat = () => handleStateChange('riwayat', true);
    const closeRiwayat = () => handleStateChange('riwayat', false);
    const toggleRiwayat = () => handleStateChange('riwayat');
    const updateTagihan = (newTagihan: BillTagihan[]) => handleStateChange('tagihan', newTagihan);

    return (
        <div>
            <TagihanHeader state={state} setState={handleStateChange} summary={summary} />
            {/* ... rest of component */}
        </div>
    );
};
```
