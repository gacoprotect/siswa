import React from 'react';
import { useForm } from '@inertiajs/react';
import PaymentMethod from './payment-method';
import { PaymentMethodType, formatCurrency } from '../../utils/payment-utils';

interface PaymentExampleProps {
    siswa: {
        balance: number;
    };
    totalAmount: number;
    existingTransaction?: {
        exist: boolean;
        uri?: string;
    };
}

const PaymentExample: React.FC<PaymentExampleProps> = ({
    siswa,
    totalAmount,
    existingTransaction
}) => {
    const [selectedMethod, setSelectedMethod] = React.useState<PaymentMethodType>('wallet');
    const [processing, setProcessing] = React.useState(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const { post } = useForm({
        payment_method: selectedMethod,
        amount: totalAmount,
    });

    const handleMethodSelection = (method: PaymentMethodType) => {
        setSelectedMethod(method);
        setErrors({}); // Clear errors when method changes
    };

    const handlePaymentSubmit = async (method: PaymentMethodType) => {
        setProcessing(true);
        setErrors({});

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Example of different handling based on payment method
            if (method === 'wallet') {
                // Handle wallet payment
                post('/api/payment/wallet', {
                    onSuccess: () => {
                        console.log('Wallet payment successful');
                    },
                    onError: (errors) => {
                        setErrors(errors);
                    },
                });
            } else {
                // Handle VA payment
                post('/api/payment/va', {
                    onSuccess: () => {
                        console.log('VA payment initiated');
                    },
                    onError: (errors) => {
                        setErrors(errors);
                    },
                });
            }
        } catch (error) {
            setErrors({ payment_method: 'Terjadi kesalahan saat memproses pembayaran' });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-gray-900">Pembayaran</h1>
                    <p className="text-gray-600 mt-2">
                        Total yang harus dibayar: {formatCurrency(totalAmount)}
                    </p>
                </div>

                <PaymentMethod
                    selectedMethod={handleMethodSelection}
                    siswa={siswa}
                    totalAmount={totalAmount}
                    existingTransaction={existingTransaction}
                    onSubmit={handlePaymentSubmit}
                    processing={processing}
                    errors={errors}
                />
            </div>
        </div>
    );
};

export default PaymentExample;
