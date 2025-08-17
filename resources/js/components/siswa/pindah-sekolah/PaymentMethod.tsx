import React, { useState } from 'react';

interface PaymentMethodProps {
    onSelect: (method: 'wallet' | 'va') => void;
    walletBalance: number;
    totalTagihan: number;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ onSelect, walletBalance, totalTagihan }) => {
    const [selectedMethod, setSelectedMethod] = useState<'wallet' | 'va' | null>(null);
    const isWalletSufficient = walletBalance >= totalTagihan;

    const handleSelect = (method: 'wallet' | 'va') => {
        setSelectedMethod(method);
        onSelect(method);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold mb-4">Metode Pembayaran</h3>
            
            <div className="space-y-3">
                <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedMethod === 'wallet' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => isWalletSufficient && handleSelect('wallet')}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium">Bayar dengan Wallet</h4>
                            <p className="text-sm text-gray-600">Saldo: Rp {walletBalance.toLocaleString()}</p>
                        </div>
                        {!isWalletSufficient && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                Saldo tidak mencukupi
                            </span>
                        )}
                    </div>
                </div>

                <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedMethod === 'va' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    onClick={() => handleSelect('va')}
                >
                    <h4 className="font-medium">Bayar dengan Virtual Account</h4>
                    <p className="text-sm text-gray-600">Transfer ke VA sekolah Anda</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;