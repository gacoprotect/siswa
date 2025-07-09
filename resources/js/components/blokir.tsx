import { Modal } from '@/components/ui/Modal';
import { maskPhoneNumber } from '@/lib/utils';
import { DataSiswa } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import { OtpStep } from './OtpStep';
import { PhoneStep } from './PhoneStep';
import { PinStep } from './PinStep';

interface PinFormData {
    pin: string;
    phone: string;
    otp: string;
    nouid: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
    setLoading?: (loading: boolean) => void;
}

export const Blokir: React.FC<Props> = ({ open, onClose, setLoading }) => {
    const [step, setStep] = useState<'pin' | 'phone' | 'otp'>('pin');
    const { errors, data: pageData } = usePage<{ errors: Record<string, string>; data: DataSiswa }>().props;
    const [countdown, setCountdown] = useState(0);
    const [inputType, setInputType] = useState<'password' | 'text'>('password');

    const { data, setData, post, processing, reset } = useForm({
        phone: '',
        otp: '',
        pin: '',
        nouid: pageData.nouid ?? '',
    });

    const otpRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));
    const pinRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

    // Countdown timer effect
    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    // Get nouid from URL path
    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        const nouidFromUrl = pathParts[1];
        setData('nouid', nouidFromUrl);
    }, [setData]);

    // Focus first input when modal opens
    useEffect(() => {
        if (open && step === 'pin' && pinRefs.current[0]) {
            pinRefs.current[0]?.focus();
        }
        if (open && step === 'otp' && otpRefs.current[0]) {
            otpRefs.current[0]?.focus();
        }
    }, [open, step]);
    const handlePinChange = (value: string, index: number) => {
        const newPin = data.pin.split('');
        newPin[index] = value.charAt(value.length - 1) || '';
        setData('pin', newPin.join(''));
    };
    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = route('otp.send', pageData.nouid);
        post(url, {
            onSuccess: () => {
                setStep('otp');
                setCountdown(60);
            },
        });
    };
    const redirect = () => {
        router.post(
            route('siswa.blocked', pageData.nouid),
            {},
            {
                onFinish: () => {
                    onClose();
                    setTimeout(() => {
                        setLoading?.(false);
                    }, 5000);
                },
            },
        );
    };
    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('otp.verif', pageData.nouid), {
            onSuccess: () => {
                setLoading?.(true);
                console.log('KARTU DIBLOKIR');
                redirect();
            },
        });
    };

    const handlePinSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!/^\d{6}$/.test(data.pin)) return;

        post(route('siswa.verify-pin', { nouid: pageData.nouid, p: 'auth' }), {
            preserveState: true,
            onSuccess: () => {
                setStep('phone');
                reset();
            },
            onError: () => {
                setData('pin', '');
                if (pinRefs.current[0]) {
                    pinRefs.current[0]?.focus();
                }
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
            if (refs.current[focusIndex]) {
                refs.current[focusIndex]?.focus();
            }
        }
    };

    return (
        <Modal title="Verifikasi PIN" isOpen={open} onClose={onClose}>
            <div className="flex items-center justify-center">
                <Head title={step === 'pin' ? 'Verifikasi PIN' : step === 'otp' ? 'Verifikasi OTP' : 'Verifikasi Nomor Telepon'} />

                <div className="w-full max-w-md rounded-lg">
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

                    {step === 'phone' && (
                        <PhoneStep
                            phone={data.phone}
                            errors={errors}
                            processing={processing}
                            registeredPhone={maskPhoneNumber(pageData.siswa.tel ?? '')}
                            onPhoneChange={(value) => setData('phone', value)}
                            onSubmit={handlePhoneSubmit}
                        />
                    )}

                    {step === 'otp' && (
                        <OtpStep
                            otp={data.otp}
                            phone={data.phone}
                            errors={errors}
                            processing={processing}
                            countdown={countdown}
                            onOtpChange={(value, index) => handleDigitChange(value, 'otp', index)}
                            onKeyDown={handleOtpKeyDown}
                            onBack={() => setStep('phone')}
                            onResendOtp={resendOtp}
                            onSubmit={handleOtpSubmit}
                            inputRefs={otpRefs}
                        />
                    )}
                </div>
            </div>
        </Modal>
    );
};
