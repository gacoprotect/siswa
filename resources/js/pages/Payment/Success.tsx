import React, { useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { FaCheckCircle, FaFileInvoice, FaHome, FaHistory } from 'react-icons/fa';
import MenuLayout from '@/Layout/menu-layout';
import { Auth, DataSiswa } from '@/types';
import { useLogger } from '@/contexts/logger-context';

interface PaymentSuccessPageProps {
    auth: Auth;
    data: DataSiswa;
}

const PaymentSuccess: React.FC = () => {
    const { auth, data } = usePage<PaymentSuccessPageProps>().props;
    const { log } = useLogger();

    useEffect(() => {
        log('Payment success page loaded');
    }, [log]);

    const handleGoHome = () => {
        router.visit(`/${data.nouid}`);
    };

    const handleViewHistory = () => {
        router.visit(`/${data.nouid}/payment/history`);
    };

    const handleViewInvoice = () => {
        router.visit(`/${data.nouid}/payment/invoice`);
    };

    const onBack = () => {
        window.history.back();
    };

    return (
        <MenuLayout title="Pembayaran Berhasil" onBack={onBack}>
            <div className="space-y-6">
                {/* Success Message */}
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <FaCheckCircle className="text-green-600" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h1>
                    <p className="text-gray-600">Terima kasih, pembayaran Anda telah berhasil diproses.</p>
                </div>

                {/* Transaction Details */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Detail Transaksi</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className="text-green-600 font-medium">Berhasil</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tanggal:</span>
                            <span className="text-gray-900">{new Date().toLocaleDateString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Waktu:</span>
                            <span className="text-gray-900">{new Date().toLocaleTimeString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Metode Pembayaran:</span>
                            <span className="text-gray-900">Saldo Tabungan</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Total Pembayaran:</span>
                            <span className="text-lg font-semibold text-gray-900">
                                {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                }).format(2050000)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                    <h2 className="text-lg font-semibold text-blue-900 mb-4">Langkah Selanjutnya</h2>
                    <div className="space-y-3 text-sm text-blue-800">
                        <p>• Bukti pembayaran telah dikirim ke email Anda</p>
                        <p>• Status tagihan akan diperbarui dalam beberapa menit</p>
                        <p>• Simpan bukti pembayaran untuk keperluan administrasi</p>
                        <p>• Jika ada pertanyaan, silakan hubungi admin sekolah</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleViewInvoice}
                        className="w-full flex items-center justify-center gap-3 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <FaFileInvoice size={20} />
                        Lihat Invoice
                    </button>

                    <button
                        onClick={handleViewHistory}
                        className="w-full flex items-center justify-center gap-3 p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        <FaHistory size={20} />
                        Lihat Riwayat Pembayaran
                    </button>

                    <button
                        onClick={handleGoHome}
                        className="w-full flex items-center justify-center gap-3 p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <FaHome size={20} />
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        </MenuLayout>
    );
};

export default PaymentSuccess;
