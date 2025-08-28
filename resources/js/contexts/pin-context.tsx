import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { usePin } from '@/hooks/use-pin';

export interface PinAction {
    id: string;
    action: 'redirect' | 'execute' | 'callback';
    payload: {
        url?: string;
        callback?: () => void;
        data?: unknown;
    };
    description?: string;
}

interface PinContextType {
    // State
    isPinModalOpen: boolean;
    currentAction: PinAction | null;

    // Actions
    openPinModal: (action: PinAction) => void;
    closePinModal: () => void;

    // PIN Hook
    pinHook: ReturnType<typeof usePin> | null;

    // Utility
    verifyPinForRedirect: (url: string, description?: string) => void;
    verifyPinForExecute: (callback: () => void, description?: string) => void;
    verifyPinForAction: (action: PinAction) => void;
}

const PinContext = createContext<PinContextType | undefined>(undefined);

interface PinProviderProps {
    children: ReactNode;
    nouid: string;
}

export const PinProvider: React.FC<PinProviderProps> = ({ children, nouid }) => {
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<PinAction | null>(null);

    // Create PIN hook
    const pinHook = usePin({
        nouid,
        purpose: 'verification',
        onSuccess: () => {
            if (currentAction) {
                switch (currentAction.action) {
                    case 'redirect':
                        if (currentAction.payload.url) {
                            window.location.href = currentAction.payload.url;
                        }
                        break;
                    case 'execute':
                        if (currentAction.payload.callback) {
                            currentAction.payload.callback();
                        }
                        break;
                    case 'callback':
                        if (currentAction.payload.callback) {
                            currentAction.payload.callback();
                        }
                        break;
                }
            }
            // Don't call closePinModal here to avoid infinite loop
            setIsPinModalOpen(false);
            setCurrentAction(null);
        },
        onError: (errors) => {
            console.error('PIN verification failed:', errors);
        },
        onClose: () => {
            // Don't call closePinModal here to avoid infinite loop
            setIsPinModalOpen(false);
            setCurrentAction(null);
        },
    });

    const openPinModal = useCallback((action: PinAction) => {
        setCurrentAction(action);
        setIsPinModalOpen(true);
        pinHook.openPinModal();
    }, [pinHook]);

    const closePinModal = useCallback(() => {
        setIsPinModalOpen(false);
        setCurrentAction(null);
        pinHook.closePinModal();
    }, [pinHook]);

    const verifyPinForRedirect = useCallback((url: string, description?: string) => {
        openPinModal({
            id: `redirect-${Date.now()}`,
            action: 'redirect',
            payload: { url },
            description: description || 'Masukkan PIN untuk melanjutkan',
        });
    }, [openPinModal]);

    const verifyPinForExecute = useCallback((callback: () => void, description?: string) => {
        openPinModal({
            id: `execute-${Date.now()}`,
            action: 'execute',
            payload: { callback },
            description: description || 'Masukkan PIN untuk melanjutkan',
        });
    }, [openPinModal]);

    const verifyPinForAction = useCallback((action: PinAction) => {
        openPinModal(action);
    }, [openPinModal]);

    const value: PinContextType = {
        isPinModalOpen,
        currentAction,
        openPinModal,
        closePinModal,
        pinHook,
        verifyPinForRedirect,
        verifyPinForExecute,
        verifyPinForAction,
    };

    return (
        <PinContext.Provider value={value}>
            {children}
        </PinContext.Provider>
    );
};

export const usePinContext = (): PinContextType => {
    const context = useContext(PinContext);
    if (context === undefined) {
        throw new Error('usePinContext must be used within a PinProvider');
    }
    return context;
};
