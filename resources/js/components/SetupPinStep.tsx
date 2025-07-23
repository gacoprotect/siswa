import React, { useEffect, useState } from 'react';
import { DigitInput } from './DigitInput';
import { useForm, usePage } from '@inertiajs/react';
import { DataSiswa } from '@/types';

interface PinStepProps {
    errors: Record<string, string>;
    inputType: 'password' | 'text';
    onToggleInputType: () => void;
    onSukses?: () => void;
}

export const SetupPinStep: React.FC<PinStepProps> = ({
    errors,
    inputType,
    onToggleInputType,
    onSukses,
}) => {
    const { data: pageData } = usePage<{ data: DataSiswa }>().props;
    const [isError, setIsError] = useState(Boolean(Object.keys(errors).length > 0));
    const { data, setData, post, processing, reset } = useForm({
        pin: '',
        pin_confirmation: '',
    });
    const pinRefs = React.useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));
    const pinConfirmationRefs = React.useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('siswa.process-setup-pin', pageData.nouid), {
            onSuccess: () => {
                onSukses?.();
                reset();
            },
        });
    };

    const handlePinChange = (value: string, index: number, field: 'pin' | 'pin_confirmation') => {
        const newValue = data[field].split('');
        newValue[index] = value.charAt(value.length - 1) || '';
        setData(field, newValue.join(''));

        // Auto focus next input if there's a value
        if (value && index < 5) {
            const refs = field === 'pin' ? pinRefs : pinConfirmationRefs;
            refs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number, field: 'pin' | 'pin_confirmation') => {
        if (e.key === 'Backspace' && !data[field][index] && index > 0) {
            const refs = field === 'pin' ? pinRefs : pinConfirmationRefs;
            refs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, field: 'pin' | 'pin_confirmation') => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, 6);

        if (pasteData.length > 0) {
            setData(field, pasteData);
            const focusIndex = Math.min(pasteData.length - 1, 5);
            const refs = field === 'pin' ? pinRefs : pinConfirmationRefs;
            refs.current[focusIndex]?.focus();
        }
    };

    useEffect(() => {
        setIsError(Boolean(Object.keys(errors).length > 0));
    }, [errors]);

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="text-center text-2xl font-bold text-gray-900">Buat PIN 6 Digit Baru</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">Untuk keamanan akun Anda</p>
                </div>

                {(errors.pin || errors.pin_confirmation) && (
                    <div className="text-center text-sm text-red-500">{errors.pin || errors.pin_confirmation}</div>
                )}

                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="flex flex-col gap-2 justify-center space-x-4">
                        <div>
                            <label htmlFor="pin" className="mb-2 block text-center text-sm font-medium text-gray-700">
                                Masukkan PIN Baru
                            </label>
                            <div className="flex space-x-2">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <DigitInput
                                        key={`pin-${index}`}
                                        ref={(el) => { pinRefs.current[index] = el; }}
                                        type={inputType}
                                        value={data.pin[index] || ''}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            handlePinChange(value, index, 'pin');
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, index, 'pin')}
                                        onPaste={(e) => handlePaste(e, 'pin')}
                                        autoFocus={index === 0 && data.pin.length === 0}
                                        error={isError}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="pin_confirmation" className="mb-2 block text-center text-sm font-medium text-gray-700">
                                Konfirmasi PIN Baru
                            </label>
                            <div className="flex space-x-2">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <DigitInput
                                        key={`pin-confirm-${index}`}
                                        ref={(el) => { pinConfirmationRefs.current[index] = el; }}
                                        type={inputType}
                                        value={data.pin_confirmation[index] || ''}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            handlePinChange(value, index, 'pin_confirmation');
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e, index, 'pin_confirmation')}
                                        onPaste={(e) => handlePaste(e, 'pin_confirmation')}
                                        autoFocus={index === 0 && data.pin.length === 6 && data.pin_confirmation.length === 0}
                                        error={isError}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {isError && (
                        (errors.pin || errors.message) && (
                            <div className="mb-4 flex flex-col text-center text-sm text-red-500">
                                <span>{errors.pin ?? errors.message}</span>
                                {errors.remaining && parseInt(errors.remaining) < 3 && (
                                    <span>{`Sisa percobaan ${errors.remaining}`}</span>
                                )}
                            </div>
                        )
                    )}

                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="text-sm text-gray-600 hover:text-gray-800"
                            onClick={onToggleInputType}
                        >
                            {inputType === 'password' ? 'Tampilkan PIN' : 'Sembunyikan PIN'}
                        </button>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <button
                            type="submit"
                            disabled={processing || data.pin.length !== 6 || data.pin_confirmation.length !== 6}
                            className={`group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white ${data.pin.length === 6 && data.pin_confirmation.length === 6
                                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                                : 'cursor-not-allowed bg-gray-400'
                                }`}
                        >
                            {processing ? 'Memproses...' : 'Simpan PIN'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};