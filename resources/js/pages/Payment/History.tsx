import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { FaFileInvoice, FaSpinner, FaEye, FaDownload } from 'react-icons/fa';
import MenuLayout from '@/Layout/menu-layout';
import { Auth, DataSiswa, PaymentData } from '@/types';
import { PaymentStatus, getPaymentStatusColor, getPaymentStatusText, formatCurrency } from '@/utils/payment-utils';
import { useLogger } from '@/contexts/logger-context';
import { Loading } from '@/components/loading-screen';

interface PaymentHistoryPageProps {
    auth: Auth;
    data: DataSiswa;
}

interface PaymentTransaction {
    id: string;
    invoiceNumber: string;
    date: string;
    amount: number;
    status: PaymentStatus;
    method: string;
    paymentData?: PaymentData;
    description: string;
}

const PaymentHistory: React.FC = () => {
    const { auth, data } = usePage<PaymentHistoryPageProps>().props;
    const { log } = useLogger();
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<PaymentTransaction | null>(null);

    // Mock payment history data - in real app, this would come from API
    const [transactions, setTransactions] = useState<PaymentTransaction[]>([
        {
            id: 'TRX-001',
            invoiceNumber: 'INV-2024-001',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
            amount: 500000,
            status: 'success',
            method: 'Saldo Tabungan',
            description: 'Pembayaran SPP Januari 2024',
            paymentData: {
                order_id: 'ORDER-001',
                gross_amount: '500000',
                payment_type: 'wallet',
                transaction_status: 'settlement',
                transaction_time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            }
        },
        {
            id: 'TRX-002',
            invoiceNumber: 'INV-2024-002',
            date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
            amount: 750000,
            status: 'success',
            method: 'Virtual Account',
            description: 'Pembayaran Uang Makan Februari 2024',
            paymentData: {
                order_id: 'ORDER-002',
                gross_amount: '750000',
                payment_type: 'va',
                transaction_status: 'settlement',
                transaction_time: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
                va_numbers: [
                    { bank: 'BCA', va_number: '1234567890' }
                ]
            }
        },
        {
            id: 'TRX-003',
            invoiceNumber: 'INV-2024-003',
            date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days ago
            amount: 300000,
            status: 'failed',
            method: 'Virtual Account',
            description: 'Pembayaran Uang Kegiatan Maret 2024'
        }
    ]);

    useEffect(() => {
        log('Payment history page loaded:', {
            siswaName: data.siswa?.namlen,
            totalTransactions: transactions.length
        });
    }, [data.siswa?.namlen, transactions.length, log]);

    const handleViewTransaction = (transaction: PaymentTransaction) => {
        setSelectedTransaction(transaction);
        log('Viewing transaction:', transaction.id);
    };

    const handleDownloadReceipt = async (transactionId: string) => {
        setProcessing(true);
        try {
            log('Downloading receipt for transaction:', transactionId);
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate download
            const link = document.createElement('a');
            link.href = `data:text/plain;charset=utf-8,${encodeURIComponent('Receipt content would be here')}`;
            link.download = `receipt-${transactionId}.pdf`;
            link.click();

            log('Receipt downloaded successfully');
        } catch (error) {
            log('Error downloading receipt:', error);
        } finally {
            setProcessing(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status: PaymentStatus) => {
        const statusConfig = getPaymentStatusColor(status);
        const statusText = getPaymentStatusText(status);

        return (
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusConfig}`}>
                {statusText}
            </span>
        );
    };

    const onBack = () => {
        log('Navigating back from payment history');
        window.history.back();
    };

    if (loading) {
        return (
            <MenuLayout title="Riwayat Pembayaran" onBack={onBack}>
                <Loading variant="overlay" />
            </MenuLayout>
        );
    }

    return (
        <MenuLayout title="Riwayat Pembayaran" onBack={onBack}>
            <div className="space-y-4">
                {/* Summary */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Transaksi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">
                                {transactions.filter(t => t.status === 'success').length}
                            </p>
                            <p className="text-sm text-gray-600">Berhasil</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-yellow-600">
                                {transactions.filter(t => t.status === 'pending').length}
                            </p>
                            <p className="text-sm text-gray-600">Menunggu</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-red-600">
                                {transactions.filter(t => t.status === 'failed').length}
                            </p>
                            <p className="text-sm text-gray-600">Gagal</p>
                        </div>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Daftar Transaksi</h2>
                    </div>

                    {transactions.length === 0 ? (
                        <div className="p-8 text-center">
                            <FaFileInvoice className="mx-auto text-gray-400 mb-4" size={48} />
                            <p className="text-gray-500">Belum ada riwayat transaksi</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {transactions.map((transaction) => (
                                <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-medium text-gray-900">
                                                    {transaction.invoiceNumber}
                                                </h3>
                                                {getStatusBadge(transaction.status)}
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1">
                                                {transaction.description}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <span>{formatDate(transaction.date)}</span>
                                                <span>•</span>
                                                <span>{transaction.method}</span>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900">
                                                {formatCurrency(transaction.amount)}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => handleViewTransaction(transaction)}
                                                    className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                    title="Lihat Detail"
                                                >
                                                    <FaEye size={14} />
                                                </button>
                                                {transaction.status === 'success' && (
                                                    <button
                                                        onClick={() => handleDownloadReceipt(transaction.id)}
                                                        disabled={processing}
                                                        className="p-1 text-green-600 hover:text-green-800 transition-colors disabled:opacity-50"
                                                        title="Download Receipt"
                                                    >
                                                        {processing ? (
                                                            <FaSpinner className="animate-spin" size={14} />
                                                        ) : (
                                                            <FaDownload size={14} />
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Transaction Detail Modal */}
                {selectedTransaction && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
                            <div className="p-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Detail Transaksi
                                    </h3>
                                    <button
                                        onClick={() => setSelectedTransaction(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600">Invoice Number</p>
                                    <p className="font-medium">{selectedTransaction.invoiceNumber}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Deskripsi</p>
                                    <p className="font-medium">{selectedTransaction.description}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Tanggal</p>
                                    <p className="font-medium">{formatDate(selectedTransaction.date)}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Metode Pembayaran</p>
                                    <p className="font-medium">{selectedTransaction.method}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Jumlah</p>
                                    <p className="font-medium text-lg">{formatCurrency(selectedTransaction.amount)}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">Status</p>
                                    <div className="mt-1">{getStatusBadge(selectedTransaction.status)}</div>
                                </div>

                                {selectedTransaction.paymentData && (
                                    <div>
                                        <p className="text-sm text-gray-600">Order ID</p>
                                        <p className="font-medium">{selectedTransaction.paymentData.order_id}</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t border-gray-200">
                                <button
                                    onClick={() => setSelectedTransaction(null)}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MenuLayout>
    );
};

export default PaymentHistory;
