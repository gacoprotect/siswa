/**
 * Payment utility functions following DRY principles
 */



// Currency formatting utility
export const formatCurrency = (amount: number, currency: string = 'IDR'): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

// Payment method types
export type PaymentMethodType = 'wallet' | 'va' | 'credit_card' | 'bank_transfer';

// Payment method configuration
import { LucideIcon, Wallet, Building2, CreditCard, Banknote } from 'lucide-react';

export interface PaymentMethodConfig {
    id: string;
    label: string;
    description: string;
    type: PaymentMethodType;
    icon?: LucideIcon;
    disabled?: boolean;
}

// Centralized payment methods configuration
export const PAYMENT_METHODS_CONFIG: PaymentMethodConfig[] = [
    {
        id: 'wallet',
        label: 'Saldo Tabungan',
        description: 'Saldo Tersedia',
        type: 'wallet',
        icon: Wallet,
    },
    {
        id: 'va',
        label: 'Virtual Account',
        description: 'Transfer melalui bank partner',
        type: 'va',
        icon: Building2,
    },
    {
        id: 'credit_card',
        label: 'Kartu Kredit',
        description: 'Pembayaran dengan kartu kredit',
        type: 'credit_card',
        icon: CreditCard,
        disabled: true, // Disabled for now
    },
    {
        id: 'bank_transfer',
        label: 'Transfer Bank',
        description: 'Transfer manual ke rekening',
        type: 'bank_transfer',
        icon: Banknote,
        disabled: true, // Disabled for now
    },
];

// Validation utilities
export const validateWalletBalance = (
    balance: number,
    amount: number
): { isValid: boolean; message?: string } => {
    if (balance < amount) {
        return {
            isValid: false,
            message: 'Saldo tidak mencukupi untuk melakukan transaksi ini'
        };
    }
    return { isValid: true };
};

export const validatePaymentAmount = (
    amount: number,
    minAmount: number = 1000,
    maxAmount: number = 10000000
): { isValid: boolean; message?: string } => {
    if (amount < minAmount) {
        return {
            isValid: false,
            message: `Jumlah minimum pembayaran adalah ${formatCurrency(minAmount)}`
        };
    }

    if (amount > maxAmount) {
        return {
            isValid: false,
            message: `Jumlah maksimum pembayaran adalah ${formatCurrency(maxAmount)}`
        };
    }

    return { isValid: true };
};

// Payment status utilities
export type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed' | 'cancelled';

export const getPaymentStatusColor = (status: PaymentStatus): string => {
    const statusColors = {
        pending: 'text-yellow-600 bg-yellow-100',
        processing: 'text-blue-600 bg-blue-100',
        success: 'text-green-600 bg-green-100',
        failed: 'text-red-600 bg-red-100',
        cancelled: 'text-gray-600 bg-gray-100',
    };

    return statusColors[status] || statusColors.pending;
};

export const getPaymentStatusText = (status: PaymentStatus): string => {
    const statusTexts = {
        pending: 'Menunggu Pembayaran',
        processing: 'Memproses Pembayaran',
        success: 'Pembayaran Berhasil',
        failed: 'Pembayaran Gagal',
        cancelled: 'Pembayaran Dibatalkan',
    };

    return statusTexts[status] || statusTexts.pending;
};

// Error handling utilities
export const getPaymentErrorMessage = (errorCode: string): string => {
    const errorMessages: Record<string, string> = {
        'INSUFFICIENT_BALANCE': 'Saldo tidak mencukupi',
        'INVALID_AMOUNT': 'Jumlah pembayaran tidak valid',
        'PAYMENT_METHOD_DISABLED': 'Metode pembayaran tidak tersedia',
        'TRANSACTION_EXPIRED': 'Transaksi telah kedaluwarsa',
        'NETWORK_ERROR': 'Terjadi kesalahan jaringan',
        'SERVER_ERROR': 'Terjadi kesalahan pada server',
        'UNKNOWN_ERROR': 'Terjadi kesalahan yang tidak diketahui',
    };

    return errorMessages[errorCode] || errorMessages['UNKNOWN_ERROR'];
};

// Payment calculation utilities
export const calculatePaymentFee = (
    amount: number,
    method: PaymentMethodType
): number => {
    const feeRates = {
        wallet: 0, // No fee for wallet
        va: 0.01, // 1% fee for VA
        credit_card: 0.025, // 2.5% fee for credit card
        bank_transfer: 0, // No fee for bank transfer
    };

    return amount * (feeRates[method] || 0);
};

export const calculateTotalAmount = (
    baseAmount: number,
    method: PaymentMethodType
): number => {
    const fee = calculatePaymentFee(baseAmount, method);
    return baseAmount + fee;
};

// Payment method filtering utilities
export const getAvailablePaymentMethods = (
    userBalance?: number,
    amount?: number
): PaymentMethodConfig[] => {
    return PAYMENT_METHODS_CONFIG.filter(method => {
        // Filter out disabled methods
        if (method.disabled) return false;

        // For wallet method, check if user has sufficient balance
        if (method.type === 'wallet' && userBalance !== undefined && amount !== undefined) {
            const validation = validateWalletBalance(userBalance, amount);
            return validation.isValid;
        }

        return true;
    });
};

// Local storage utilities for payment state
export const PAYMENT_STORAGE_KEY = 'payment_method_preference';

export const savePaymentPreference = (method: PaymentMethodType): void => {
    try {
        localStorage.setItem(PAYMENT_STORAGE_KEY, method);
    } catch (error) {
        console.warn('Failed to save payment preference:', error);
    }
};

export const getPaymentPreference = (): PaymentMethodType | null => {
    try {
        const saved = localStorage.getItem(PAYMENT_STORAGE_KEY);
        return saved as PaymentMethodType || null;
    } catch (error) {
        console.warn('Failed to get payment preference:', error);
        return null;
    }
};

// Export all utilities
export default {
    formatCurrency,
    PAYMENT_METHODS_CONFIG,
    validateWalletBalance,
    validatePaymentAmount,
    getPaymentStatusColor,
    getPaymentStatusText,
    getPaymentErrorMessage,
    calculatePaymentFee,
    calculateTotalAmount,
    getAvailablePaymentMethods,
    savePaymentPreference,
    getPaymentPreference,
};
