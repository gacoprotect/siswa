import { SharedData } from '@/types';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useToast = ({ errors, flash }: SharedData) => {
    useEffect(() => {
        const allErrors = Object.values(errors || {});
        allErrors.forEach((err) => {
            if (err) {
                toast.error(err, { toastId: `err-${err}` });
            }
        });
    }, [errors]);

    useEffect(() => {
        if (flash?.message) {
            if (flash.success === true) {
                toast.success(flash.message, { toastId: `flash-${flash.message}` });
            } else if (flash.success === false) {
                toast.error(flash.message, { toastId: `flash-${flash.message}` });
            }
        }
    }, [flash]);
};
