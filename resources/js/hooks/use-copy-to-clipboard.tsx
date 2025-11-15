import { useCallback, useState } from 'react';

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

export const useCopyToClipboard = (options: UseCopyToClipboardOptions = {}): UseCopyToClipboardReturn => {
    const { onSuccess, onError, timeout = 2000 } = options;
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const reset = useCallback(() => {
        setCopied(false);
        setError(null);
    }, []);

    const copy = useCallback(async (text: string): Promise<boolean> => {
        if (!text) {
            const errorMsg = 'Tidak ada teks untuk disalin';
            setError(errorMsg);
            onError?.(errorMsg);
            return false;
        }

        try {
            // Method 1: Modern Clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                setError(null);
                onSuccess?.();

                setTimeout(() => {
                    setCopied(false);
                }, timeout);

                return true;
            }

            // Method 2: Fallback for older browsers or non-secure contexts
            const textArea = document.createElement('textarea');
            textArea.value = text;

            // Make the textarea invisible
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            textArea.style.opacity = '0';
            textArea.style.pointerEvents = 'none';
            textArea.style.zIndex = '-1';

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
                setCopied(true);
                setError(null);
                onSuccess?.();

                setTimeout(() => {
                    setCopied(false);
                }, timeout);

                return true;
            } else {
                throw new Error('Gagal menyalin menggunakan execCommand');
            }

        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Gagal menyalin teks';
            setError(errorMsg);
            onError?.(errorMsg);
            console.error('Copy to clipboard failed:', err);
            return false;
        }
    }, [onSuccess, onError, timeout]);

    return {
        copied,
        copy,
        reset,
        error,
    };
};
