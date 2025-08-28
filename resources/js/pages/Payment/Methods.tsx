import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { FaSpinner, FaArrowLeft } from 'react-icons/fa';
import MenuLayout from '@/Layout/menu-layout';
import PaymentMethod from '@/components/payment/payment-method';
import { Auth, DataSiswa } from '@/types';
import { PaymentMethodType } from '@/utils/payment-utils';
import { useLogger } from '@/contexts/logger-context';
import { Loading } from '@/components/loading-screen';

interface PaymentMethodsPageProps {
    auth: Auth;
    data: DataSiswa;
}

const PaymentMethods: React.FC = () => {
    const { auth, data } = usePage<PaymentMethodsPageProps>().props;
    const { log } = useLogger();
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('wallet');
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        log('Payment methods page loaded:', {
            siswaName: data.siswa?.namlen,
            balance: data.balance,
            totalTagihan: data.tagihan?.length || 0
        });
    }, [data.siswa?.namlen, data.balance, data.tagihan?.length, log]);

    const handleMethodSelection = (method: PaymentMethodType) => {
        setSelectedMethod(method);
        log('Payment method selected:', method);
    };

    const handlePaymentSubmit = async (method: PaymentMethodType) => {
        setProcessing(true);
        setErrors({});

        try {
            log('Processing payment with method:', method);

            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 3000));

            // In real app, this would make API call to process payment
            if (method === 'wallet') {
                // Process wallet payment
                log('Wallet payment processed successfully');
                router.visit('/payment/success');
            } else if (method === 'va') {
                // Process VA payment
                log('VA payment initiated successfully');
                router.visit('/payment/va-payment');
            }

        } catch (error) {
            log('Payment processing error:', error);
            setErrors({ payment: 'Gagal memproses pembayaran. Silakan coba lagi.' });
        } finally {
            setProcessing(false);
        }
    };

    const onBack = () => {
        log('Navigating back from payment methods');
        window.history.back();
    };

    if (loading) {
        return (
            <MenuLayout title="Metode Pembayaran" onBack={onBack}>
                <Loading variant="overlay" />
            </MenuLayout>
        );
    }

    const totalAmount = (data.tagihan || []).reduce((sum, item) => sum + item.jumlah, 0);

    return (
        <MenuLayout title="Metode Pembayaran" onBack={onBack}>
            <div className="space-y-4">
                {/* Payment Summary */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pembayaran</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Tagihan:</span>
                            <span className="text-lg font-semibold text-gray-900">
                                {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                }).format(totalAmount)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Saldo Tersedia:</span>
                            <span className={`font-medium ${(data.balance || 0) >= totalAmount ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                }).format(data.balance || 0)}
                            </span>
                        </div>
                        {data.balance && data.balance < totalAmount && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                <p className="text-sm text-yellow-800">
                                    ⚠️ Saldo tidak mencukupi. Silakan top up saldo atau pilih metode pembayaran lain.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Payment Method Component */}
                <div className="bg-white rounded-lg border border-gray-200">
                    <PaymentMethod
                        selectedMethod={handleMethodSelection}
                        siswa={{
                            balance: data.balance
                        }}
                        totalAmount={totalAmount}
                        existingTransaction={{
                            exist: false,
                            uri: ''
                        }}
                        onSubmit={handlePaymentSubmit}
                        processing={processing}
                        errors={errors}
                    />
                </div>

                {/* Payment Information */}
                <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Informasi Pembayaran</h3>
                    <div className="space-y-2 text-sm text-blue-800">
                        <p>• <strong>Saldo Tabungan:</strong> Pembayaran langsung dari saldo yang tersedia</p>
                        <p>• <strong>Virtual Account:</strong> Transfer melalui bank partner yang tersedia</p>
                        <p>• Pembayaran akan diproses secara otomatis setelah konfirmasi</p>
                        <p>• Bukti pembayaran akan dikirim ke email Anda</p>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="bg-green-50 rounded-lg border border-green-200 p-4">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">Keamanan</h3>
                    <div className="space-y-2 text-sm text-green-800">
                        <p>🔒 Semua transaksi dilindungi dengan enkripsi SSL</p>
                        <p>🔒 Data pembayaran Anda aman dan tidak akan dibagikan</p>
                        <p>🔒 Transaksi dipantau 24/7 untuk keamanan</p>
                    </div>
                </div>

                {/* Error Display */}
                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-red-900 mb-2">Error</h3>
                        <div className="space-y-1">
                            {Object.entries(errors).map(([field, message]) => (
                                <p key={field} className="text-sm text-red-700">{message}</p>
                            ))}
                        </div>
                    </div>
                )}

                {/* Back Button */}
                <div className="flex justify-center">
                    <button
                        onClick={onBack}
                        disabled={processing}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <FaArrowLeft />
                        Kembali
                    </button>
                </div>
            </div>
        </MenuLayout>
    );
};

export default PaymentMethods;
