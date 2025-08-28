import { useState, useCallback, useRef, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { useLogger } from '@/contexts/logger-context';
import { DataSiswa } from '@/types';
import { route } from 'ziggy-js';

export interface UsePinOptions {
    nouid: string;
    onSuccess?: () => void;
    onError?: (errors: Record<string, string>) => void;
    onClose?: () => void;
    purpose?: 'login' | 'verification' | 'auth';
    hasPin?: boolean;
}

export interface UsePinReturn {
    isOpen: boolean;
    openPinModal: () => void;
    closePinModal: () => void;
    step: 'pin' | 'setup' | 'otp';
    inputType: 'password' | 'text';
    countdown: number;
    processing: boolean;
    errors: Record<string, string>;
    data: {
        pin: string;
        nouid: string;
        otp: string;
    };
    pinRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
    otpRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
    handlePinSubmit: (e: React.FormEvent) => void;
    handlePinChange: (value: string, index: number) => void;
    handlePinKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
    handlePaste: (e: React.ClipboardEvent<HTMLInputElement>, field: 'pin' | 'otp') => void;
    handleOtpSubmit: (e: React.FormEvent) => void;
    handleOtpKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
    handleDigitChange: (value: string, field: 'pin' | 'otp', index: number) => void;
    resendOtp: () => void;
    toggleInputType: () => void;
    resetPin: () => void;
    hasPin: boolean;
}

export const usePin = (options: UsePinOptions): UsePinReturn => {
    const {
        nouid,
        onSuccess,
        onError,
        onClose,
        purpose = 'auth',
        hasPin = true
    } = options;

    const { errors, data: pageData } = usePage<{ errors: Record<string, string>; data: DataSiswa }>().props;
    const { error, log } = useLogger();

    const [isOpen, setIsOpen] = useState(false);
    const [inputType, setInputType] = useState<'password' | 'text'>('password');
    const [countdown, setCountdown] = useState(0);
    const [step, setStep] = useState<'pin' | 'setup' | 'otp'>('pin');

    const pinRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));
    const otpRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

    const { data, setData, post, processing, reset } = useForm({
        pin: '',
        nouid: nouid,
        otp: '',
    });

    // Countdown timer
    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    // Focus first input when modal opens
    useEffect(() => {
        if (isOpen && pinRefs.current[0]) {
            pinRefs.current[0]?.focus();
        }

        if (isOpen && otpRefs.current[0]) {
            otpRefs.current[0]?.focus();
        }
    }, [isOpen]);

    // Handle step changes based on errors
    useEffect(() => {
        log('STEP : ', step);
        if (errors.pin && errors.remaining && (parseInt(errors.remaining) === 0)) {
            setStep('otp');
        }
    }, [errors.pin, errors.remaining, log, step]);

    const openPinModal = useCallback(() => {
        setIsOpen(true);
        setStep('pin');
        reset();
    }, [reset]);

    const closePinModal = useCallback(() => {
        setIsOpen(false);
        setStep('pin');
        reset();
        onClose?.();
    }, [reset, onClose]);

    const resetPin = useCallback(() => {
        setData('pin', '');
        setData('otp', '');
        reset();
    }, [setData, reset]);

    const toggleInputType = useCallback(() => {
        setInputType(inputType === 'password' ? 'text' : 'password');
    }, [inputType]);

    const handlePinSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        if (!/^\d{6}$/.test(data.pin)) return;

        post(route('siswa.verify-pin', { nouid: pageData.nouid, p: purpose }), {
            preserveState: true,
            onSuccess: () => {
                reset();
                closePinModal();
                onSuccess?.();
            },
            onError: () => {
                setData('pin', '');
                if (pinRefs.current[0]) {
                    pinRefs.current[0]?.focus();
                }
                error(errors);
                onError?.(errors);
            },
            onFinish: () => { },
        });
    }, [data.pin, post, pageData.nouid, purpose, reset, onSuccess, setData, error, errors, onError]);

    const handlePinChange = useCallback((value: string, index: number) => {
        const newPin = data.pin.split('');
        newPin[index] = value.charAt(value.length - 1) || '';
        setData('pin', newPin.join(''));
    }, [data.pin, setData]);

    const handlePinKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !data.pin[index] && index > 0 && pinRefs.current[index - 1]) {
            pinRefs.current[index - 1]?.focus();
        }
    }, [data.pin]);

    const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>, field: 'pin' | 'otp') => {
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
    }, [setData]);

    const handleOtpSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        post(route('otp.verif', pageData.nouid), {
            onSuccess: () => {
                log('OTP SUKSES');
                setStep('setup');
            },
            onError: () => {
                log('OTP GAGAL');
                onError?.(errors);
            },
        });
    }, [post, pageData.nouid, log, onError, errors]);

    const resendOtp = useCallback(() => {
        post(route('otp.send', pageData.nouid), {
            onSuccess: () => {
                setCountdown(60);
            },
        });
    }, [post, pageData.nouid]);

    const handleDigitChange = useCallback((value: string, field: 'pin' | 'otp', index: number) => {
        const newValue = data[field].split('');
        newValue[index] = value.charAt(value.length - 1) || '';
        setData(field, newValue.join(''));
    }, [data, setData]);

    const handleOtpKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !data.otp[index] && index > 0 && otpRefs.current[index - 1]) {
            otpRefs.current[index - 1]?.focus();
        }
    }, [data.otp]);

    return {
        isOpen,
        openPinModal,
        closePinModal,
        step,
        inputType,
        countdown,
        processing,
        errors,
        data,
        pinRefs,
        otpRefs,
        handlePinSubmit,
        handlePinChange,
        handlePinKeyDown,
        handlePaste,
        handleOtpSubmit,
        handleOtpKeyDown,
        handleDigitChange,
        resendOtp,
        toggleInputType,
        resetPin,
        hasPin,
    };
};
