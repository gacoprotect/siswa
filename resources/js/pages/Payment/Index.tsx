import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { FaFileInvoice, FaCreditCard, FaHistory, FaSpinner } from 'react-icons/fa';
import MenuLayout from '@/Layout/menu-layout';
import { Auth, DataSiswa } from '@/types';
import { useLogger } from '@/contexts/logger-context';
import { Loading } from '@/components/loading-screen';
import { formatCurrency } from '@/utils/payment-utils';

interface PaymentPageProps {
    auth: Auth;
    data: DataSiswa;
}

const PaymentIndex: React.FC = () => {
    const { auth, data } = usePage<PaymentPageProps>().props;
    const { log } = useLogger();
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        log('Payment index page loaded:', {
            siswaName: data.siswa?.namlen,
            balance: data.balance,
            totalTagihan: data.tagihan?.length || 0
        });
    }, [data.siswa?.namlen, data.balance, data.tagihan?.length, log]);

    const handleNavigateToInvoice = () => {
        setProcessing(true);
        log('Navigating to invoice page');

        // Simulate loading
        setTimeout(() => {
            router.visit(route('payment.invoice', auth.user?.nouid));
        }, 500);
    };

    const handleNavigateToHistory = () => {
        setProcessing(true);
        log('Navigating to payment history');

        // Simulate loading
        setTimeout(() => {
            router.visit(route('payment.history', auth.user?.nouid));
        }, 500);
    };

    const handleNavigateToMethods = () => {
        setProcessing(true);
        log('Navigating to payment methods');

        // Simulate loading
        setTimeout(() => {
            router.visit(route('payment.methods', auth.user?.nouid));
        }, 500);
    };

    const onBack = () => {
        log('Navigating back from payment page');
        window.history.back();
    };

    if (loading) {
        return (
            <MenuLayout title="Pembayaran" onBack={onBack}>
                <Loading variant="overlay" />
            </MenuLayout>
        );
    }

    const totalTagihan = (data.tagihan || []).reduce((sum, item) => sum + item.jumlah, 0);

    return (
        <MenuLayout title="Pembayaran" onBack={onBack}>
            <div className="space-y-4">
                {/* Payment Summary */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pembayaran</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-blue-600">Saldo Tersedia</p>
                                    <p className="text-xl font-semibold text-blue-900">
                                        {formatCurrency(data.balance || 0)}
                                    </p>
                                </div>
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <FaCreditCard className="text-blue-600" size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-orange-600">Total Tagihan</p>
                                    <p className="text-xl font-semibold text-orange-900">
                                        {formatCurrency(totalTagihan)}
                                    </p>
                                </div>
                                <div className="bg-orange-100 p-2 rounded-lg">
                                    <FaFileInvoice className="text-orange-600" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Actions */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Aksi Pembayaran</h2>
                    <div className="space-y-3">
                        <button
                            onClick={handleNavigateToInvoice}
                            disabled={processing}
                            className="w-full flex items-center justify-between p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <FaFileInvoice size={20} />
                                <div className="text-left">
                                    <p className="font-medium">Lihat Invoice</p>
                                    <p className="text-sm text-blue-100">Detail tagihan dan pembayaran</p>
                                </div>
                            </div>
                            {processing ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <span className="text-blue-100">→</span>
                            )}
                        </button>

                        <button
                            onClick={handleNavigateToMethods}
                            disabled={processing}
                            className="w-full flex items-center justify-between p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <FaCreditCard size={20} />
                                <div className="text-left">
                                    <p className="font-medium">Metode Pembayaran</p>
                                    <p className="text-sm text-green-100">Pilih cara pembayaran</p>
                                </div>
                            </div>
                            {processing ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <span className="text-green-100">→</span>
                            )}
                        </button>

                        <button
                            onClick={handleNavigateToHistory}
                            disabled={processing}
                            className="w-full flex items-center justify-between p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <FaHistory size={20} />
                                <div className="text-left">
                                    <p className="font-medium">Riwayat Pembayaran</p>
                                    <p className="text-sm text-purple-100">Lihat transaksi sebelumnya</p>
                                </div>
                            </div>
                            {processing ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <span className="text-purple-100">→</span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Quick Payment Info */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Cepat</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Nama Siswa:</span>
                            <span className="text-gray-900 font-medium">{data.siswa?.namlen || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">NIS:</span>
                            <span className="text-gray-900 font-medium">{data.siswa?.nouid || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Jumlah Tagihan:</span>
                            <span className="text-gray-900 font-medium">{data.tagihan?.length || 0} item</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Status Pembayaran:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${totalTagihan === 0 ? 'bg-green-100 text-green-800' :
                                data.balance && data.balance >= totalTagihan ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                {totalTagihan === 0 ? 'Lunas' :
                                    data.balance && data.balance >= totalTagihan ? 'Cukup Saldo' :
                                        'Perlu Top Up'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Help Section */}
                <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Bantuan Pembayaran</h3>
                    <div className="space-y-2 text-sm text-blue-800">
                        <p>• Pastikan saldo mencukupi sebelum melakukan pembayaran</p>
                        <p>• Pembayaran dapat dilakukan melalui saldo tabungan atau virtual account</p>
                        <p>• Simpan bukti pembayaran untuk keperluan administrasi</p>
                        <p>• Hubungi admin sekolah jika mengalami kendala</p>
                    </div>
                </div>
            </div>
        </MenuLayout>
    );
};

export default PaymentIndex;
