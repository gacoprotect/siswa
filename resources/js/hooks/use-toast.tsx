import { useLogger } from '@/contexts/logger-context';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useMemo, useRef } from 'react';
import { toast } from 'react-toastify';

export const useToast = () => {
    const { errors, flash } = usePage<SharedData>().props;
    const { error: logError, log } = useLogger();
    const initializedRef = useRef(false);

    // // Memoize errors untuk optimasi performa
    // const processedErrors = useMemo(() => {
    //     if (!errors) return [];

    //     return Object.values(errors)
    //         .flat()
    //         .filter((err): err is string => typeof err === 'string' && err.length > 0);
    // }, [errors]);

    // Handle errors
    useEffect(() => {
        if (Object.keys(errors).length > 0) {

            const toastId = `err-${errors.message}`;

            if (!toast.isActive(toastId)) {
                toast.error(errors.message, { toastId });
            }
            logError(errors, { toastId });
        }
    }, [errors, logError]);

    // Handle flash messages
    useEffect(() => {
        if (!flash?.message) return;

        const { message, success } = flash;
        const toastId = `flash-${message}`;

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