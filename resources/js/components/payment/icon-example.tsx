import React from 'react';
import { Wallet, Building2, CreditCard, Banknote } from 'lucide-react';
import { PaymentMethod, PaymentMethodType } from './index';

// Example of custom payment methods with Lucide icons
const customPaymentMethods = [
    {
        id: 'wallet',
        label: 'Saldo Tabungan',
        description: 'Saldo Tersedia',
        type: 'wallet' as PaymentMethodType,
        icon: Wallet,
    },
    {
        id: 'va',
        label: 'Virtual Account',
        description: 'Transfer melalui bank partner',
        type: 'va' as PaymentMethodType,
        icon: Building2,
    },
    {
        id: 'credit_card',
        label: 'Kartu Kredit',
        description: 'Pembayaran dengan kartu kredit',
        type: 'credit_card' as PaymentMethodType,
        icon: CreditCard,
    },
    {
        id: 'bank_transfer',
        label: 'Transfer Bank',
        description: 'Transfer manual ke rekening',
        type: 'bank_transfer' as PaymentMethodType,
        icon: Banknote,
    },
];

const IconExample: React.FC = () => {
    const handleMethodSelection = (method: PaymentMethodType) => {
        console.log('Selected method:', method);
    };

    const handlePaymentSubmit = (method: PaymentMethodType) => {
        console.log('Processing payment with:', method);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">Payment Method dengan Lucide Icons</h2>
            <PaymentMethod
                selectedMethod={handleMethodSelection}
                siswa={{ balance: 1000000 }}
                totalAmount={500000}
                onSubmit={handlePaymentSubmit}
            />
        </div>
    );
};

export default IconExample;
