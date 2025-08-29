import { useLogger } from '@/contexts/logger-context';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useMemo, useRef } from 'react';
import { toast } from 'react-toastify';

export const useToast = () => {
    const { errors, flash } = usePage<SharedData>().props;
    const { error: logError, log } = useLogger();
    const initializedRef = useRef(false);
    const shownFlashRef = useRef<Set<string>>(new Set());

    // Memoize errors untuk optimasi performa
    const processedErrors = useMemo(() => {
        if (!errors) return [];

        return Object.values(errors)
            .flat()
            .filter((err): err is string => typeof err === 'string' && err.length > 0);
    }, [errors]);

    // Handle errors
    useEffect(() => {
        if (processedErrors.length === 0) return;

        processedErrors.forEach((err) => {
            const toastId = `err-${err}`;

            if (!toast.isActive(toastId)) {
                toast.error("Terjadi Kesalahan", { toastId });
                logError(err, { toastId });
            }
        });
    }, [processedErrors, logError]);

    // Handle flash messages
    useEffect(() => {
        if (!flash?.message) return;

        const { message, success, timestamp } = flash;
        const currentTime = Math.floor(Date.now() / 1000);
        if (timestamp < currentTime) {
            return;
        }

        const flashKey = `${message}-${timestamp}`;
        const toastId = `flash-${flashKey}`;

        // Cek apakah flash message ini sudah ditampilkan sebelumnya
        if (shownFlashRef.current.has(flashKey)) return;
        if (toast.isActive(toastId)) return;

        if (success === true) {
            toast.success(message, {
                toastId
            });
            log(message);
        } else {
            toast.error(message, { toastId });
            logError(message);
        }

        shownFlashRef.current.add(flashKey);
    }, [flash, log, logError]);

    // Initialize toast hanya sekali
    useEffect(() => {
        if (!initializedRef.current) {
            initializedRef.current = true;
        }
    }, []);

    return {
        toast,
        dismissAllToasts: toast.dismiss
    };
};