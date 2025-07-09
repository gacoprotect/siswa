// components/OtpStep.tsx
import { ArrowLeftIcon } from 'lucide-react';
import React from 'react';
import { DigitInput } from './DigitInput';

interface OtpStepProps {
    otp: string;
    phone: string;
    errors: Record<string, string>;
    processing: boolean;
    countdown: number;
    onOtpChange: (value: string, index: number) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
    onBack: () => void;
    onResendOtp: () => void;
    onSubmit: (e: React.FormEvent) => void;
    inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

export const OtpStep: React.FC<OtpStepProps> = ({
    otp,
    phone,
    errors,
    processing,
    countdown,
    onOtpChange,
    onKeyDown,
    onBack,
    onResendOtp,
    onSubmit,
    inputRefs,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/\D/g, '');
        onOtpChange(value, index);

        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    return (
        <div className="space-y-6">
            <button onClick={onBack} className="flex items-center text-sm text-gray-600 hover:text-gray-800" type="button">
                <ArrowLeftIcon className="mr-1 h-4 w-4" />
                Kembali
            </button>

            <div>
                <h2 className="text-center text-2xl font-bold text-gray-900">Verifikasi OTP</h2>
                <p className="mt-2 text-center text-sm text-gray-600">Masukkan 6 digit kode OTP yang dikirim ke +62{phone}</p>
            </div>

            {errors.message && <div className="text-center text-sm text-red-500">{errors.message}</div>}

            <form onSubmit={onSubmit} className="space-y-6">
                <div className="flex justify-center space-x-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <DigitInput
                            key={index}
                            ref={(el) => {
                                // Hanya set ref tanpa mengembalikan nilai
                                inputRefs.current[index] = el;
                            }}
                            value={otp[index] || ''}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => onKeyDown(e, index)}
                            error={!!errors.message}
                            autoFocus={index === 0}
                        />
                    ))}
                </div>

                <div className="text-center">
                    {countdown > 0 ? (
                        <p className="text-sm text-gray-500">Kirim ulang OTP dalam {countdown} detik</p>
                    ) : (
                        <button type="button" onClick={onResendOtp} className="text-sm text-blue-600 hover:text-blue-800">
                            Kirim Ulang OTP
                        </button>
                    )}
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={processing || otp.length !== 6}
                        className={`flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${
                            otp.length === 6 ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'cursor-not-allowed bg-gray-400'
                        } focus:ring-2 focus:ring-offset-2 focus:outline-none`}
                    >
                        {processing ? 'Memverifikasi...' : 'Verifikasi'}
                    </button>
                </div>
            </form>
        </div>
    );
};
