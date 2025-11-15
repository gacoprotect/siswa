import React, { useState } from 'react';
import { CopyButton } from '@/components/CopyButton';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

// Contoh 1: Menggunakan CopyButton component
export const CopyButtonExamples: React.FC = () => {
    return (
        <div className="space-y-4 p-4">
            <h2 className="text-lg font-semibold">CopyButton Examples</h2>

            {/* Icon variant */}
            <div className="flex items-center gap-2">
                <span>Nomor VA: 1234567890</span>
                <CopyButton
                    text="1234567890"
                    variant="icon"
                    size="sm"
                    onSuccess={() => console.log('VA berhasil disalin!')}
                />
            </div>

            {/* Button variant */}
            <div className="flex items-center gap-2">
                <span>Link: https://example.com</span>
                <CopyButton
                    text="https://example.com"
                    variant="button"
                    onSuccess={() => console.log('Link berhasil disalin!')}
                >
                    Salin Link
                </CopyButton>
            </div>

            {/* Text variant */}
            <div className="flex items-center gap-2">
                <span>Email: user@example.com</span>
                <CopyButton
                    text="user@example.com"
                    variant="text"
                    onSuccess={() => console.log('Email berhasil disalin!')}
                >
                    Salin Email
                </CopyButton>
            </div>

            {/* Disabled state */}
            <div className="flex items-center gap-2">
                <span>Loading...</span>
                <CopyButton
                    text=""
                    variant="icon"
                    disabled={true}
                />
            </div>
        </div>
    );
};

// Contoh 2: Menggunakan useCopyToClipboard hook secara langsung
export const UseCopyToClipboardExample: React.FC = () => {
    const [text, setText] = useState('');
    const { copied, copy, error, reset } = useCopyToClipboard({
        onSuccess: () => console.log('Berhasil disalin!'),
        onError: (error) => console.error('Gagal menyalin:', error),
        timeout: 3000,
    });

    const handleCopy = async () => {
        if (text) {
            const success = await copy(text);
            if (success) {
                console.log('Teks berhasil disalin ke clipboard');
            }
        }
    };

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-lg font-semibold">useCopyToClipboard Hook Example</h2>

            <div className="space-y-2">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Masukkan teks untuk disalin"
                    className="w-full rounded border p-2"
                />

                <div className="flex gap-2">
                    <button
                        onClick={handleCopy}
                        disabled={!text}
                        className="rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
                    >
                        {copied ? 'Tersalin!' : 'Salin Teks'}
                    </button>

                    <button
                        onClick={reset}
                        className="rounded bg-gray-500 px-4 py-2 text-white"
                    >
                        Reset
                    </button>
                </div>

                {error && (
                    <p className="text-red-500 text-sm">Error: {error}</p>
                )}

                {copied && (
                    <p className="text-green-500 text-sm">✓ Teks berhasil disalin!</p>
                )}
            </div>
        </div>
    );
};

// Contoh 3: Copy dengan custom styling
export const CustomCopyExample: React.FC = () => {
    const [customText] = useState('Custom text to copy');

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-lg font-semibold">Custom Styling Example</h2>

            <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium">Nomor Rekening</h3>
                        <p className="text-sm text-gray-600">1234-5678-9012-3456</p>
                    </div>
                    <CopyButton
                        text="1234-5678-9012-3456"
                        variant="icon"
                        size="lg"
                        className="text-blue-600 hover:text-blue-800"
                        onSuccess={() => {
                            // Bisa menambahkan toast notification di sini
                            console.log('Nomor rekening berhasil disalin!');
                        }}
                    />
                </div>
            </div>

            <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium">Kode Referral</h3>
                        <p className="text-sm text-gray-600">REF123456</p>
                    </div>
                    <CopyButton
                        text="REF123456"
                        variant="button"
                        className="bg-green-500 text-white hover:bg-green-600"
                        onSuccess={() => {
                            console.log('Kode referral berhasil disalin!');
                        }}
                    >
                        Salin Kode
                    </CopyButton>
                </div>
            </div>
        </div>
    );
};

// Contoh 4: Copy dengan error handling yang lebih baik
export const ErrorHandlingExample: React.FC = () => {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCopyError = (error: string) => {
        setErrorMessage(error);
        setShowError(true);

        // Auto hide error after 5 seconds
        setTimeout(() => {
            setShowError(false);
        }, 5000);
    };

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-lg font-semibold">Error Handling Example</h2>

            <div className="flex items-center gap-2">
                <span>Text to copy: Hello World</span>
                <CopyButton
                    text="Hello World"
                    variant="icon"
                    onError={handleCopyError}
                />
            </div>

            {showError && (
                <div className="rounded-lg bg-red-100 border border-red-400 p-3">
                    <p className="text-red-700 text-sm">
                        <strong>Error:</strong> {errorMessage}
                    </p>
                    <p className="text-red-600 text-xs mt-1">
                        Silakan salin manual atau coba lagi.
                    </p>
                </div>
            )}
        </div>
    );
};
