import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { FaBuilding, FaCopy, FaSpinner, FaCheck, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import MenuLayout from '@/Layout/menu-layout';
import { Auth, DataSiswa } from '@/types';
import { useLogger } from '@/contexts/logger-context';

interface VAPaymentPageProps {
    auth: Auth;
    data: DataSiswa;
}

interface VirtualAccount {
    bank: string;
    va_number: string;
    logo?: string;
}

const VAPayment: React.FC = () => {
    const { auth, data } = usePage<VAPaymentPageProps>().props;
    const { log } = useLogger();
    const [copied, setCopied] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Mock VA data
    const [vaData] = useState<VirtualAccount[]>([
        {
            bank: 'BCA',
            va_number: '1234567890123456',
            logo: '/images/bca-logo.png'
        },
        {
            bank: 'Mandiri',
            va_number: '1234567890123457',
            logo: '/images/mandiri-logo.png'
        },
        {
            bank: 'BNI',
            va_number: '1234567890123458',
            logo: '/images/bni-logo.png'
        }
    ]);

    useEffect(() => {
        log('VA Payment page loaded');
    }, [log]);

    const handleCopy = async (text: string, type: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(type);
            log('Copied to clipboard:', type);

            setTimeout(() => {
                setCopied(null);
            }, 2000);
        } catch (error) {
            log('Failed to copy:', error);
        }
    };

    const handleCheckStatus = () => {
        setLoading(true);
        log('Checking payment status');

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            router.visit(`/${data.nouid}/payment/success`);
        }, 2000);
    };

    const onBack = () => {
        window.history.back();
    };

    const totalAmount = (data.tagihan || []).reduce((sum, item) => sum + item.jumlah, 0);

    return (
        <MenuLayout title="Pembayaran Virtual Account" onBack={onBack}>
            <div className="space-y-6">
                {/* Payment Summary */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pembayaran</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
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
                        <div className="flex justify-between">
                            <span className="text-gray-600">Order ID:</span>
                            <span className="text-gray-900 font-mono">ORDER-{Date.now()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Jatuh Tempo:</span>
                            <span className="text-gray-900">
                                {new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('id-ID')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Virtual Account Instructions */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Virtual Account</h2>
                    <div className="space-y-4">
                        {vaData.map((va, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                                            <FaBuilding className="text-gray-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{va.bank}</h3>
                                            <p className="text-sm text-gray-600">Virtual Account</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleCopy(va.va_number, `va-${index}`)}
                                        className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                                    >
                                        {copied === `va-${index}` ? (
                                            <>
                                                <FaCheck size={12} />
                                                <span>Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaCopy size={12} />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                                <div className="bg-gray-50 rounded p-3">
                                    <p className="text-sm text-gray-600 mb-1">Nomor Virtual Account:</p>
                                    <p className="font-mono text-lg font-medium text-gray-900">{va.va_number}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Instructions */}
                <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                    <h2 className="text-lg font-semibold text-blue-900 mb-4">Cara Pembayaran</h2>
                    <div className="space-y-3 text-sm text-blue-800">
                        <div className="flex items-start space-x-3">
                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mt-0.5">1</span>
                            <p>Pilih salah satu bank di atas untuk melakukan pembayaran</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mt-0.5">2</span>
                            <p>Salin nomor Virtual Account yang tersedia</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mt-0.5">3</span>
                            <p>Buka aplikasi m-banking atau internet banking bank yang dipilih</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mt-0.5">4</span>
                            <p>Pilih menu "Transfer" → "Virtual Account"</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mt-0.5">5</span>
                            <p>Masukkan nomor Virtual Account dan jumlah pembayaran</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mt-0.5">6</span>
                            <p>Konfirmasi dan selesaikan pembayaran</p>
                        </div>
                    </div>
                </div>

                {/* Important Notes */}
                <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
                    <div className="flex items-start space-x-3">
                        <FaExclamationTriangle className="text-yellow-600 mt-1" size={20} />
                        <div>
                            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Penting!</h3>
                            <div className="space-y-2 text-sm text-yellow-800">
                                <p>• Pembayaran akan diproses otomatis setelah transfer berhasil</p>
                                <p>• Pastikan jumlah transfer sesuai dengan total tagihan</p>
                                <p>• Pembayaran akan kedaluwarsa dalam 24 jam</p>
                                <p>• Simpan bukti transfer untuk keperluan administrasi</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleCheckStatus}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin" size={20} />
                                Memeriksa Status...
                            </>
                        ) : (
                            <>
                                <FaClock size={20} />
                                Cek Status Pembayaran
                            </>
                        )}
                    </button>

                    <button
                        onClick={onBack}
                        className="w-full flex items-center justify-center gap-3 p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        </MenuLayout>
    );
};

export default VAPayment;
