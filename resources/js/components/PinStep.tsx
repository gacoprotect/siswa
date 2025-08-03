// components/PinStep.tsx
import React, { useEffect, useState } from 'react';
import { DigitInput } from './DigitInput';
import { AlertCircle } from 'lucide-react';

interface PinStepProps {
    pin: string;
    errors: Record<string, string>;
    inputType: 'password' | 'text';
    processing: boolean;
    onPinChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
    onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
    onToggleInputType: () => void;
    onSubmit: (e: React.FormEvent) => void;
    setInputRef?: (el: HTMLInputElement | null, index: number) => void;
    inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

export const PinStep: React.FC<PinStepProps> = ({
    pin,
    errors,
    inputType,
    processing,
    onPinChange,
    onKeyDown,
    onPaste,
    onToggleInputType,
    onSubmit,
    // setInputRef,
    inputRefs,
}) => {
    const [isError, setIsError] = useState(Boolean(Object.keys(errors).length > 0))
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setIsError(false)
        const value = e.target.value.replace(/\D/g, '');
        onPinChange(e, index);

        // Auto focus next input if there's a value
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    useEffect(() => {
        if (errors) {
            setIsError(Boolean(Object.keys(errors).length > 0))
        }
    }, [errors])
    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Masukkan PIN</h2>
                </div>


                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <DigitInput
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type={inputType}
                                value={pin[index] || ''}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => onKeyDown(e, index)}
                                onPaste={onPaste}
                                autoFocus={index === 0}
                                error={isError}
                            />
                        ))}
                    </div>
                    {isError && (
                        (errors.pin || errors.message) ? (
                            <div className="mb-4 flex flex-col text-center text-sm text-red-500">
                                <span>{errors.pin ?? errors.message}</span>
                                {parseInt(errors.remaining) < 3 && <span>{errors.remaining ? `sisa percobaan ${errors.remaining}` : ''}</span>}
                            </div>) : (
                            <div className="mb-4 flex flex-col text-center text-sm text-red-500">
                                <span><AlertCircle className="text-red-500 w-5 h-5" /> Terjadi Kesalahan</span>
                            </div>
                        )
                    )}
                    <div className="flex justify-center">
                        <button type="button" className="text-sm text-gray-600 hover:text-gray-800" onClick={onToggleInputType}>
                            {inputType === 'password' ? 'Tampilkan PIN' : 'Sembunyikan PIN'}
                        </button>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <button
                            type="submit"
                            disabled={processing || pin.length !== 6}
                            className={`group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white ${pin.length === 6
                                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                                : 'cursor-not-allowed bg-gray-400'
                                }`}
                        >
                            {processing ? 'Memverifikasi...' : 'Masuk'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
