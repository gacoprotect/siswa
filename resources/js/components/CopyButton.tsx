import React from 'react';
import { Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
    text: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'icon' | 'button' | 'text';
    children?: React.ReactNode;
    disabled?: boolean;
    timeout?: number;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
    text,
    onSuccess,
    onError,
    className = '',
    size = 'md',
    variant = 'icon',
    children,
    disabled = false,
    timeout = 2000,
}) => {
    const { copied, copy } = useCopyToClipboard({
        onSuccess,
        onError,
        timeout,
    });

    const handleClick = async () => {
        if (disabled || !text) return;
        await copy(text);
    };

    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
    };

    const baseClasses = 'transition-colors duration-200';
    const iconClasses = `${baseClasses} ${sizeClasses[size]} ${className}`;

    if (variant === 'icon') {
        return (
            <button
                onClick={handleClick}
                disabled={disabled}
                className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-600'}`}
                aria-label={copied ? 'Tersalin' : 'Salin teks'}
                title={copied ? 'Tersalin!' : 'Klik untuk menyalin'}
            >
                {copied ? (
                    <Check className={cn('text-green-500',iconClasses) } />
                ) : (
                    <Copy className={cn('text-gray-500',iconClasses) } />
                )}
            </button>
        );
    }

    if (variant === 'button') {
        return (
            <button
                onClick={handleClick}
                disabled={disabled}
                className={`${baseClasses} inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${copied
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            >
                {copied ? (
                    <>
                        <Check className="h-4 w-4" />
                        Tersalin
                    </>
                ) : (
                    <>
                        <Copy className="h-4 w-4" />
                        {children || 'Salin'}
                    </>
                )}
            </button>
        );
    }

    if (variant === 'text') {
        return (
            <button
                onClick={handleClick}
                disabled={disabled}
                className={`${baseClasses} text-blue-600 hover:text-blue-800 underline ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                    } ${className}`}
            >
                {copied ? 'Tersalin!' : children || 'Salin'}
            </button>
        );
    }

    return null;
};
