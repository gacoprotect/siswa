// components/ConfirmDialog.tsx
import { cn } from '@/lib/utils';
import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode, useCallback } from 'react';

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string | null;
    onConfirm: () => void;
    closeOnConfirm?: boolean;
    children?: ReactNode;
    variant?: 'danger' | 'primary';
}

export function ConfirmDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmText = 'Ya',
    cancelText = 'Batal',
    onConfirm,
    closeOnConfirm = true,
    children,
    variant = 'danger',
}: ConfirmDialogProps) {
    const handleConfirm = useCallback(() => {
        onConfirm();
        if (closeOnConfirm) onOpenChange(false);
    }, [onConfirm, onOpenChange, closeOnConfirm]);

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            {children && children}
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
                    <Dialog.Title className="mb-2 text-xl font-bold text-gray-800">{title}</Dialog.Title>
                    <Dialog.Description className="mb-4 text-sm text-gray-600">{description}</Dialog.Description>

                    <div className="flex justify-end space-x-3">
                        {cancelText !== null && (
                            <button onClick={() => onOpenChange(false)} className="rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
                                {cancelText}
                            </button>)}
                        <button
                            onClick={handleConfirm}
                            className={cn(
                                `rounded-md px-4 py-2 text-sm text-white`,
                                variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700',
                            )}
                        >
                            {confirmText}
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
