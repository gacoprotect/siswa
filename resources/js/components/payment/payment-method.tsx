import { useForm } from '@inertiajs/react';
import React from 'react'
import { FaSpinner } from 'react-icons/fa';
import {
    formatCurrency,
    PAYMENT_METHODS_CONFIG,
    validateWalletBalance,
    PaymentMethodType
} from '../../utils/payment-utils';
import { useLogger } from '@/contexts/logger-context';

interface PaymentMethodProps {
    selectedMethod: (method: PaymentMethodType) => void;
    siswa?: {
        balance?: number;
    };
    totalAmount?: number;
    existingTransaction?: {
        exist: boolean;
        uri?: string;
    };
    onSubmit?: (method: PaymentMethodType) => void;
    processing?: boolean;
    errors?: Record<string, string>;
}

type PaymentMethodState = {
    method: PaymentMethodType;
    exist: boolean;
}



const PaymentMethod: React.FC<PaymentMethodProps> = ({
    selectedMethod,
    siswa,
    totalAmount = 0,
    existingTransaction,
    onSubmit,
    processing = false,
    errors = {}
}) => {
    const { log } = useLogger();
    const [state, setState] = React.useState<PaymentMethodState>({
        method: 'wallet',
        exist: existingTransaction?.exist || false,
    });

    const { data, setData } = useForm({
        payment_method: state.method,
        uri: existingTransaction?.uri || ''
    });

    // Update form data when state changes
    React.useEffect(() => {
        setData('payment_method', state.method);
    }, [state.method, setData]);

    // Calculate if wallet balance is insufficient
    const isSaldoInsufficient = React.useMemo(() => {

        if (siswa?.balance === undefined || siswa?.balance === null) {
            log('No balance available, returning false');
            return false;
        }

        const validation = validateWalletBalance(siswa.balance, totalAmount || 0);
        return !validation.isValid;
    }, [siswa?.balance, totalAmount, log]);


    // Determine if submit should be disabled
    const isSubmitDisabled = React.useMemo(() => {

        if (processing) {
            log('Submit disabled: processing');
            return true;
        }
        if (state.method === 'wallet' && isSaldoInsufficient) {
            log('Submit disabled: wallet method with insufficient balance');
            return true;
        }
        if (state.method === 'va' && state.exist) {
            log('Submit enabled: VA method with existing transaction');
            return false;
        }

        log('Submit enabled: default case');
        return false;
    }, [processing, state.method, isSaldoInsufficient, state.exist, log]);

    const handleMethodChange = (method: PaymentMethodType) => {
        setState(prev => ({ ...prev, method }));
        selectedMethod(method);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitDisabled) return;

        if (onSubmit) {
            onSubmit(state.method);
        }
    };

    const handleContinueTransaction = () => {
        if (data.uri) {
            window.location.href = data.uri;
        }
    };

    const renderMethodDescription = (methodType: PaymentMethodType) => {
        if (state.method !== methodType) return null;

        if (methodType === 'wallet') {
            return (
                <div className="mt-1 text-sm text-gray-500">
                    <p>Saldo Tersedia : {formatCurrency(siswa?.balance ?? 0)}</p>
                    {isSaldoInsufficient ? (
                        <p className="text-red-500">Saldo tidak mencukupi untuk melakukan transaksi ini</p>
                    ) : (
                        <p>Cukup dan aman untuk bertransaksi</p>
                    )}
                </div>
            );
        }

        if (methodType === 'va') {
            return state.exist ? (
                <div className="mt-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700 shadow-sm">
                    <p className="font-semibold">Transaksi Belum Selesai</p>
                    <p className="mt-1">
                        Anda memiliki transaksi yang belum selesai. Silakan selesaikan transaksi sebelumnya untuk melanjutkan.
                    </p>
                </div>
            ) : (
                <div className="mt-1 text-sm text-gray-500">Transfer melalui bank partner</div>
            );
        }

        return null;
    };

    React.useEffect(() => {
        if (state.method || log || siswa?.balance || totalAmount) {
            log('Checking saldo insufficiency:', {
                method: state.method,
                balance: siswa?.balance,
                totalAmount,
                isWallet: state.method === 'wallet',
                hasBalance: !!siswa?.balance
            });
        }
        if (isSaldoInsufficient || processing || state.exist) {
            log('Checking isSubmitDisabled:', {
                processing,
                method: state.method,
                isSaldoInsufficient,
                exist: state.exist
            });
        }
    }, [state.method, log, siswa?.balance, totalAmount, isSaldoInsufficient, processing, state.exist]);

    
    return (
        <div className='p-4'>
            <h2 className="mb-3 text-md font-semibold">Metode Pembayaran</h2>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    {PAYMENT_METHODS_CONFIG.filter(method => !method.disabled).map((paymentMethod) => (
                        <div key={paymentMethod.id} className="flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    id={paymentMethod.id}
                                    name="payment_method"
                                    type="radio"
                                    checked={state.method === paymentMethod.type}
                                    onChange={() => handleMethodChange(paymentMethod.type)}
                                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                    disabled={processing}
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <label
                                    htmlFor={paymentMethod.id}
                                    className="flex items-center text-sm font-medium text-gray-700 sm:text-base"
                                >
                                    {paymentMethod.icon && (
                                        <span className="mr-2 flex items-center">
                                            {React.createElement(paymentMethod.icon, { size: 16 })}
                                        </span>
                                    )}
                                    {paymentMethod.label}
                                </label>
                                {renderMethodDescription(paymentMethod.type)}
                            </div>
                        </div>
                    ))}
                </div>

                {errors.payment_method && (
                    <p className="mt-2 text-sm text-red-600">{errors.payment_method}</p>
                )}

                <div className="mt-6 flex justify-end sm:mt-8">
                    {state.method === 'va' && state.exist ? (
                        <button
                            type="button"
                            onClick={handleContinueTransaction}
                            className="mt-3 inline-block rounded bg-yellow-600 px-4 py-2 font-medium text-white transition hover:bg-yellow-700"
                        >
                            Lanjutkan ke Transaksi
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isSubmitDisabled}
                            className={`rounded-md px-6 py-3 text-base font-medium text-white shadow-sm transition-colors ${isSubmitDisabled
                                ? 'cursor-not-allowed bg-gray-400'
                                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                                }`}
                        >
                            {processing ? (
                                <span className="flex items-center justify-center">
                                    <FaSpinner className="mr-2 animate-spin" />
                                    Memproses...
                                </span>
                            ) : (
                                'Bayar Sekarang'
                            )}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default PaymentMethod;