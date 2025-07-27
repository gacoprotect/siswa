import { OtpStep } from '@/components/OtpStep';
import { PinStep } from '@/components/PinStep';
import { Modal } from '@/components/ui/Modal';
import { useLogger } from '@/contexts/logger-context';
import { DataSiswa } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import { FaKey } from 'react-icons/fa';
import SetupPinPage from './SetupPin';
import { SetupPinStep } from '@/components/SetupPinStep';

interface PinFormData {
    pin: string;
    nouid: string;
    otp: string;
    [key: string]: string;
}

interface PinPageProps {
    setPage: (value: 'index' | 'topup' | 'riwayat') => void;
    hasPin: boolean;
    open: boolean;
    onClose: (v: boolean) => void;
    handle?: string;
    setOpenSetupPin?: () => void

}

const PinPage: React.FC<PinPageProps> = ({ setOpenSetupPin, handle, setPage, hasPin, open, onClose }) => {
    const { errors, data: pageData } = usePage<{ errors: Record<string, string>; data: DataSiswa }>().props;
    const { error, log } = useLogger();
    const { data, setData, post, processing, reset } = useForm({
        pin: '',
        nouid: pageData.nouid ?? '',
        otp: '',
    });
    const [inputType, setInputType] = useState<'password' | 'text'>('password');
    const [countdown, setCountdown] = useState(0);
    const [step, setStep] = useState<'pin' | 'setup' | 'otp'>('pin');

    // const pinRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));
    const pinRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));
    const otpRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));
    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    // Focus first input when modal opens
    useEffect(() => {
        if (open && pinRefs.current[0]) {
            pinRefs.current[0]?.focus();
        }

        if (open && otpRefs.current[0]) {
            otpRefs.current[0]?.focus();
        }
    }, [open]);

    const handlePinSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!/^\d{6}$/.test(data.pin)) return;

        post(route('siswa.verify-pin', { nouid: pageData.nouid, p: handle ?? 'auth' }), {
            preserveState: true,
            onSuccess: () => {
                setPage('index');
                reset();
                onClose(false)
            },
            onError: () => {
                setData('pin', '');
                if (pinRefs.current[0]) {
                    pinRefs.current[0]?.focus();
                }
                error(errors);
            },
            onFinish: () => { },
        });
    };

    const handlePinChange = (value: string, index: number) => {
        const newPin = data.pin.split('');
        newPin[index] = value.charAt(value.length - 1) || '';
        setData('pin', newPin.join(''));
    };

    const register = () => {
        router.get(route('register', data.nouid));
    };

    const handlePinKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !data.pin[index] && index > 0 && pinRefs.current[index - 1]) {
            pinRefs.current[index - 1]?.focus();
        }
    };
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, field: 'pin' | 'otp') => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, 6);

        if (pasteData.length > 0) {
            setData(field, pasteData);
            const focusIndex = Math.min(pasteData.length - 1, 5);
            const refs = field === 'pin' ? pinRefs : otpRefs;
            if (refs?.current[focusIndex]) {
                refs.current[focusIndex]?.focus();
            }
        }
    };
    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('otp.verif', pageData.nouid), {
            onSuccess: () => {
                log('OTP SUKSES');
                setStep('setup');
            },
            onError: () => {
                log('OTP GAGAL');
            },
        });
    };

    const resendOtp = () => {
        post(route('otp.send', pageData.nouid), {
            onSuccess: () => {
                setCountdown(60);
            },
        });
    };

    const handleDigitChange = (value: string, field: 'pin' | 'otp', index: number) => {
        const newValue = data[field].split('');
        newValue[index] = value.charAt(value.length - 1) || '';
        setData(field, newValue.join(''));
    };

    const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !data.otp[index] && index > 0 && otpRefs.current[index - 1]) {
            otpRefs.current[index - 1]?.focus();
        }
    };
    useEffect(() => {
        log('STEP : ', step)
        if (errors.pin && (parseInt(errors.remaining) === 0)) {
            setStep('otp')
        }
    }, [errors.pin])

    return (
        <Modal title={hasPin ? '' : 'Anda Belum Terverifikasi'} isOpen={open} onClose={() => { onClose(false); reset() }} header={false}>
            {hasPin ? (
                <div className="flex items-center justify-center p-2">
                    <Head title="Masukkan PIN" />
                    <div className="w-full max-w-md space-y-8">
                        {step === 'pin' && (
                            <PinStep
                                pin={data.pin}
                                errors={errors}
                                inputType={inputType}
                                processing={processing}
                                onPinChange={(e, index) => handlePinChange(e.target.value, index)}
                                onKeyDown={handlePinKeyDown}
                                onPaste={(e) => handlePaste(e, 'pin')}
                                onToggleInputType={() => setInputType(inputType === 'password' ? 'text' : 'password')}
                                onSubmit={handlePinSubmit}
                                setInputRef={(el, index) => {
                                    pinRefs.current[index] = el;
                                }}
                                inputRefs={pinRefs}
                            />
                        )}

                        {
                            // (parseInt(errors.remaining) === 0) && 
                            (step === 'otp') && (
                                <OtpStep
                                    otp={data.otp}
                                    errors={errors}
                                    processing={processing}
                                    countdown={countdown}
                                    onOtpChange={(value, index) => handleDigitChange(value, 'otp', index)}
                                    onKeyDown={handleOtpKeyDown}
                                    onBack={() => onClose(false)}
                                    onResendOtp={resendOtp}
                                    onSubmit={handleOtpSubmit}
                                    inputRefs={otpRefs}
                                />
                            )}
                        {step === 'setup' && (
                            <SetupPinStep
                                errors={errors}
                                inputType={inputType}
                                onToggleInputType={() => setInputType(inputType === 'password' ? 'text' : 'password')}
                                onSukses={() => onClose(false)}
                            />
                        )}
                    </div>
                </div>
            ) : (pageData.summary?.reg === 1 && pageData.summary?.pin === false) ? (
                <div className="flex flex-col items-center justify-center space-y-4 rounded-xl p-6 text-center">
                    <p className="max-w-md text-sm">Untuk melanjutkan silahkan buat PIN Anda terlebih dahulu</p>
                    <button
                        onClick={setOpenSetupPin}
                        className="flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50"
                    >
                        <FaKey className="text-lg" />
                        <span>Buat Sekarang</span>
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center space-y-4 rounded-xl p-6 text-center">
                    <p className="max-w-md text-sm">Untuk melanjutkan silahkan verifikasi identitas diri Anda terlebih dahulu</p>
                    <button
                        onClick={register}
                        className="flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50"
                    >
                        <FaKey className="text-lg" />
                        <span>Verifikasi Sekarang</span>
                    </button>
                </div>
            )}
        </Modal>
    );
};

export default PinPage;
