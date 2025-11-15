# Copy to Clipboard Documentation

## Overview

Sistem copy to clipboard yang robust dan reusable untuk aplikasi React. Mendukung berbagai browser dan environment dengan fallback methods.

## Features

- ✅ **Cross-browser support** - Bekerja di semua browser modern dan lama
- ✅ **Fallback methods** - Menggunakan `execCommand` jika Clipboard API tidak tersedia
- ✅ **TypeScript support** - Fully typed dengan interface yang jelas
- ✅ **Customizable** - Banyak opsi untuk styling dan behavior
- ✅ **Error handling** - Penanganan error yang baik
- ✅ **Accessibility** - Mendukung screen reader dan keyboard navigation

## Components & Hooks

### 1. `useCopyToClipboard` Hook

Hook utama untuk menyalin teks ke clipboard.

#### Interface

```typescript
interface UseCopyToClipboardOptions {
    onSuccess?: () => void;
    onError?: (error: string) => void;
    timeout?: number;
}

interface UseCopyToClipboardReturn {
    copied: boolean;
    copy: (text: string) => Promise<boolean>;
    reset: () => void;
    error: string | null;
}
```

#### Usage

```tsx
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

const MyComponent = () => {
    const { copied, copy, error, reset } = useCopyToClipboard({
        onSuccess: () => console.log('Berhasil disalin!'),
        onError: (error) => console.error('Gagal:', error),
        timeout: 2000,
    });

    const handleCopy = async () => {
        const success = await copy('Text to copy');
        if (success) {
            console.log('Berhasil!');
        }
    };

    return (
        <div>
            <button onClick={handleCopy}>{copied ? 'Tersalin!' : 'Salin'}</button>
            {error && <p>Error: {error}</p>}
        </div>
    );
};
```

### 2. `CopyButton` Component

Component siap pakai untuk copy to clipboard dengan berbagai variant.

#### Props

```typescript
interface CopyButtonProps {
    text: string; // Teks yang akan disalin
    onSuccess?: () => void; // Callback saat berhasil
    onError?: (error: string) => void; // Callback saat error
    className?: string; // Custom CSS classes
    size?: 'sm' | 'md' | 'lg'; // Ukuran icon
    variant?: 'icon' | 'button' | 'text'; // Tipe tampilan
    children?: React.ReactNode; // Custom content
    disabled?: boolean; // Disabled state
    timeout?: number; // Timeout untuk reset state
}
```

#### Variants

##### Icon Variant (Default)

```tsx
<CopyButton text="1234567890" variant="icon" size="md" onSuccess={() => console.log('Berhasil!')} />
```

##### Button Variant

```tsx
<CopyButton text="https://example.com" variant="button" className="bg-blue-500 text-white">
    Salin Link
</CopyButton>
```

##### Text Variant

```tsx
<CopyButton text="user@example.com" variant="text" className="text-blue-600 underline">
    Salin Email
</CopyButton>
```

## Implementation Details

### Browser Support

1. **Modern Browsers (HTTPS)**: Menggunakan `navigator.clipboard.writeText()`
2. **Older Browsers/HTTP**: Fallback ke `document.execCommand('copy')`

### Error Handling

- **Empty text**: Menampilkan error jika teks kosong
- **Clipboard API unavailable**: Otomatis fallback ke execCommand
- **execCommand failed**: Menampilkan error yang informatif
- **Network errors**: Handle berbagai jenis error

### Security Considerations

- **HTTPS required**: Clipboard API hanya bekerja di secure context
- **User permission**: Beberapa browser memerlukan user interaction
- **Fallback graceful**: Selalu ada fallback method

## Examples

### Basic Usage

```tsx
import { CopyButton } from '@/components/CopyButton';

// Simple icon copy
<CopyButton text="Hello World" />

// With custom styling
<CopyButton
    text="Hello World"
    className="text-blue-600 hover:text-blue-800"
    onSuccess={() => alert('Copied!')}
/>
```

### Advanced Usage

```tsx
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

const AdvancedCopy = () => {
    const { copied, copy, error, reset } = useCopyToClipboard({
        timeout: 5000,
        onSuccess: () => {
            // Show toast notification
            toast.success('Berhasil disalin!');
        },
        onError: (error) => {
            // Show error notification
            toast.error(`Gagal menyalin: ${error}`);
        },
    });

    const handleCopy = async () => {
        const success = await copy('Complex text with formatting');
        if (success) {
            // Additional logic after successful copy
            analytics.track('copy_success');
        }
    };

    return (
        <div>
            <button onClick={handleCopy}>{copied ? '✓ Tersalin!' : 'Salin'}</button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};
```

### Integration with Forms

```tsx
const FormWithCopy = () => {
    const [generatedCode, setGeneratedCode] = useState('');

    const generateCode = () => {
        const code = Math.random().toString(36).substr(2, 8).toUpperCase();
        setGeneratedCode(code);
    };

    return (
        <div>
            <button onClick={generateCode}>Generate Code</button>
            {generatedCode && (
                <div className="flex items-center gap-2">
                    <span>{generatedCode}</span>
                    <CopyButton
                        text={generatedCode}
                        variant="icon"
                        onSuccess={() => {
                            console.log('Code copied:', generatedCode);
                        }}
                    />
                </div>
            )}
        </div>
    );
};
```

## Best Practices

### 1. Always Provide Feedback

```tsx
// Good
<CopyButton
    text={value}
    onSuccess={() => toast.success('Berhasil disalin!')}
    onError={(error) => toast.error(`Gagal: ${error}`)}
/>

// Bad
<CopyButton text={value} />
```

### 2. Handle Empty States

```tsx
// Good
<CopyButton
    text={value || ''}
    disabled={!value}
    onError={(error) => console.error(error)}
/>

// Bad
<CopyButton text={value} />
```

### 3. Use Appropriate Variants

```tsx
// For small items (VA numbers, codes)
<CopyButton text={vaNumber} variant="icon" size="sm" />

// For important actions
<CopyButton text={importantText} variant="button">
    Salin Data Penting
</CopyButton>

// For links and references
<CopyButton text={link} variant="text">
    Salin Link
</CopyButton>
```

### 4. Custom Styling

```tsx
// Consistent with design system
<CopyButton
    text={value}
    className="text-primary hover:text-primary-dark"
    size="md"
/>

// Custom button styling
<CopyButton
    text={value}
    variant="button"
    className="bg-green-500 text-white hover:bg-green-600 rounded-lg"
>
    Salin Kode
</CopyButton>
```

## Troubleshooting

### Common Issues

1. **"Cannot read properties of undefined (reading 'writeText')"**

    - **Cause**: Clipboard API tidak tersedia
    - **Solution**: Hook sudah handle fallback otomatis

2. **Copy tidak bekerja di HTTP**

    - **Cause**: Clipboard API memerlukan HTTPS
    - **Solution**: Gunakan fallback method (sudah dihandle)

3. **Copy tidak bekerja di mobile**

    - **Cause**: Beberapa mobile browser memiliki restrictions
    - **Solution**: Hook sudah handle berbagai browser

4. **Error "execCommand is deprecated"**
    - **Cause**: Browser warning untuk deprecated API
    - **Solution**: Warning bisa diabaikan, masih berfungsi

### Debug Mode

```tsx
const { copy, error } = useCopyToClipboard({
    onError: (error) => {
        console.log('Copy error details:', {
            error,
            userAgent: navigator.userAgent,
            isSecureContext: window.isSecureContext,
            clipboardAvailable: !!navigator.clipboard,
        });
    },
});
```

## Migration Guide

### From Manual Implementation

**Before:**

```tsx
const handleCopy = async () => {
    try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
    } catch (error) {
        console.error('Copy failed:', error);
    }
};
```

**After:**

```tsx
const { copied, copy } = useCopyToClipboard();

const handleCopy = async () => {
    await copy(text);
};
```

### From Other Libraries

**Before (react-copy-to-clipboard):**

```tsx
import { CopyToClipboard } from 'react-copy-to-clipboard';

<CopyToClipboard text={text} onCopy={() => console.log('Copied!')}>
    <button>Copy</button>
</CopyToClipboard>;
```

**After:**

```tsx
import { CopyButton } from '@/components/CopyButton';

<CopyButton text={text} onSuccess={() => console.log('Copied!')}>
    Copy
</CopyButton>;
```

## Performance Considerations

- **Lazy loading**: Hook hanya diinisialisasi saat dibutuhkan
- **Memory efficient**: Tidak ada memory leaks
- **Bundle size**: Minimal impact pada bundle size
- **Re-renders**: Optimized untuk menghindari unnecessary re-renders

## Accessibility

- **Keyboard navigation**: Support untuk Tab dan Enter
- **Screen readers**: Proper ARIA labels
- **Focus management**: Focus tetap di button setelah copy
- **Error announcements**: Error diumumkan ke screen readers

## Testing

```tsx
// Unit test example
import { render, fireEvent, waitFor } from '@testing-library/react';
import { CopyButton } from '@/components/CopyButton';

test('CopyButton copies text to clipboard', async () => {
    const mockClipboard = {
        writeText: jest.fn().mockResolvedValue(undefined),
    };
    Object.assign(navigator, { clipboard: mockClipboard });

    const { getByRole } = render(<CopyButton text="test text" />);

    fireEvent.click(getByRole('button'));

    await waitFor(() => {
        expect(mockClipboard.writeText).toHaveBeenCalledWith('test text');
    });
});
```

Copy to clipboard system ini memberikan solusi yang robust dan mudah digunakan untuk kebutuhan copy text di seluruh aplikasi!
