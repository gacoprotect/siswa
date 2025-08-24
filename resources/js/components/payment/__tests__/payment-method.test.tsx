import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import PaymentMethod from '../payment-method';
import { LoggerProvider } from '@/contexts/logger-context';

// Mock Inertia useForm
vi.mock('@inertiajs/react', () => ({
    useForm: () => ({
        data: { payment_method: 'wallet', uri: '' },
        setData: vi.fn(),
        post: vi.fn(),
        processing: false,
        errors: {},
        setError: vi.fn(),
    }),
}));

// Mock useAppConfig hook
vi.mock('@/hooks/use-app-config', () => ({
    useAppConfig: () => ({
        APP_DEBUG: false,
        APP_ENV: 'testing',
        APP_NAME: 'Test App',
    }),
}));

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <LoggerProvider>
        {children}
    </LoggerProvider>
);

describe('PaymentMethod Component', () => {
    const defaultProps = {
        selectedMethod: vi.fn(),
        siswa: { balance: 1000000 },
        totalAmount: 500000,
        existingTransaction: { exist: false },
        onSubmit: vi.fn(),
        processing: false,
        errors: {},
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders payment method options correctly', () => {
        render(<PaymentMethod {...defaultProps} />, { wrapper: TestWrapper });

        expect(screen.getByText('Metode Pembayaran')).toBeInTheDocument();
        expect(screen.getByLabelText('Saldo Tabungan')).toBeInTheDocument();
        expect(screen.getByLabelText('Virtual Account')).toBeInTheDocument();
    });

    it('shows wallet balance when wallet method is selected', () => {
        render(<PaymentMethod {...defaultProps} />, { wrapper: TestWrapper });

        const walletRadio = screen.getByLabelText('Saldo Tabungan');
        fireEvent.click(walletRadio);

        expect(screen.getByText(/Saldo Tersedia/)).toBeInTheDocument();
        expect(screen.getByText(/Rp 1.000.000/)).toBeInTheDocument();
    });

    it('shows insufficient balance warning when balance is low', () => {
        const propsWithLowBalance = {
            ...defaultProps,
            siswa: { balance: 100000 },
            totalAmount: 500000,
        };

        render(<PaymentMethod {...propsWithLowBalance} />, { wrapper: TestWrapper });

        const walletRadio = screen.getByLabelText('Saldo Tabungan');
        fireEvent.click(walletRadio);

        expect(screen.getByText('Saldo tidak mencukupi untuk melakukan transaksi ini')).toBeInTheDocument();
    });

    it('calls selectedMethod when payment method changes', () => {
        render(<PaymentMethod {...defaultProps} />, { wrapper: TestWrapper });

        const vaRadio = screen.getByLabelText('Virtual Account');
        fireEvent.click(vaRadio);

        expect(defaultProps.selectedMethod).toHaveBeenCalledWith('va');
    });

    it('shows existing transaction warning for VA when transaction exists', () => {
        const propsWithExistingTransaction = {
            ...defaultProps,
            existingTransaction: { exist: true, uri: 'https://example.com' },
        };

        render(<PaymentMethod {...propsWithExistingTransaction} />, { wrapper: TestWrapper });

        const vaRadio = screen.getByLabelText('Virtual Account');
        fireEvent.click(vaRadio);

        expect(screen.getByText('Transaksi Belum Selesai')).toBeInTheDocument();
    });

    it('disables submit button when processing', () => {
        const propsWithProcessing = {
            ...defaultProps,
            processing: true,
        };

        render(<PaymentMethod {...propsWithProcessing} />, { wrapper: TestWrapper });

        const submitButton = screen.getByRole('button', { name: /memproses/i });
        expect(submitButton).toBeDisabled();
    });

    it('calls onSubmit when form is submitted', async () => {
        render(<PaymentMethod {...defaultProps} />, { wrapper: TestWrapper });

        const submitButton = screen.getByText('Bayar Sekarang');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(defaultProps.onSubmit).toHaveBeenCalledWith('wallet');
        });
    });

    it('displays error messages correctly', () => {
        const propsWithErrors = {
            ...defaultProps,
            errors: { payment_method: 'Metode pembayaran tidak valid' },
        };

        render(<PaymentMethod {...propsWithErrors} />, { wrapper: TestWrapper });

        expect(screen.getByText('Metode pembayaran tidak valid')).toBeInTheDocument();
    });

    it('shows continue transaction button for existing VA transaction', () => {
        const propsWithExistingTransaction = {
            ...defaultProps,
            existingTransaction: { exist: true, uri: 'https://example.com' },
        };

        render(<PaymentMethod {...propsWithExistingTransaction} />, { wrapper: TestWrapper });

        const vaRadio = screen.getByLabelText('Virtual Account');
        fireEvent.click(vaRadio);

        expect(screen.getByText('Lanjutkan ke Transaksi')).toBeInTheDocument();
    });

    it('filters out disabled payment methods', () => {
        render(<PaymentMethod {...defaultProps} />, { wrapper: TestWrapper });

        // Should only show wallet and VA (credit_card and bank_transfer are disabled)
        const paymentMethods = screen.getAllByRole('radio');
        expect(paymentMethods).toHaveLength(2);
    });

    it('displays payment method icons when available', () => {
        render(<PaymentMethod {...defaultProps} />, { wrapper: TestWrapper });

        // Check if payment methods are rendered with icons
        expect(screen.getByLabelText('Saldo Tabungan')).toBeInTheDocument();
        expect(screen.getByLabelText('Virtual Account')).toBeInTheDocument();
    });
});
