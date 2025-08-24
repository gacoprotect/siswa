import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import { FaSpinner, FaDownload, FaPrint, FaEye } from 'react-icons/fa';
import MenuLayout from '@/Layout/menu-layout';
import PaymentInvoice from '@/components/payment/payment-invoice';
import { Auth, DataSiswa, BillTagihan, PaymentData } from '@/types';
import { PaymentStatus } from '@/utils/payment-utils';
import { useLogger } from '@/contexts/logger-context';
import { Loading } from '@/components/loading-screen';

interface InvoicePageProps {
    auth: Auth;
    data: DataSiswa;
    invoiceId?: string;
}

interface InvoiceData {
    id: string;
    invoiceNumber: string;
    date: string;
    dueDate: string;
    status: PaymentStatus;
    items: BillTagihan[];
    subtotal: number;
    tax?: number;
    discount?: number;
    total: number;
    paymentData?: PaymentData;
    notes?: string;
}

const Invoice: React.FC = () => {
    const { auth, data, invoiceId } = usePage<InvoicePageProps>().props;
    const { log } = useLogger();
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Mock invoice data - in real app, this would come from API
    const [invoiceData, setInvoiceData] = useState<InvoiceData>({
        id: invoiceId || 'INV-001',
        invoiceNumber: 'INV-2024-001',
        date: new Date().toISOString(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        status: 'pending' as PaymentStatus,
        items: data.tagihan ?? [],
        subtotal: (data.tagihan ?? []).reduce((sum, item) => sum + item.jumlah, 0),
        total: (data.tagihan ?? []).reduce((sum, item) => sum + item.jumlah, 0),
        notes: 'Pembayaran tagihan sekolah untuk periode berjalan'
    });

    useEffect(() => {
        log('Invoice page loaded:', {
            invoiceId,
            siswaName: data.siswa?.namlen,
            totalItems: data.tagihan?.length || 0
        });
    }, [invoiceId, data.siswa?.namlen, data.tagihan?.length, log]);

    const handleDownload = async (invoiceId: string) => {
        setProcessing(true);
        setErrors({});

        try {
            log('Downloading invoice:', invoiceId);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In real app, this would trigger file download
            const link = document.createElement('a');
            link.href = `data:text/plain;charset=utf-8,${encodeURIComponent('Invoice PDF content would be here')}`;
            link.download = `invoice-${invoiceId}.pdf`;
            link.click();

            log('Invoice downloaded successfully');
        } catch (error) {
            log('Error downloading invoice:', error);
            setErrors({ download: 'Gagal mengunduh invoice' });
        } finally {
            setProcessing(false);
        }
    };

    const handlePrint = async (invoiceId: string) => {
        setProcessing(true);
        setErrors({});

        try {
            log('Printing invoice:', invoiceId);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // In real app, this would open print dialog
            window.print();

            log('Invoice print initiated');
        } catch (error) {
            log('Error printing invoice:', error);
            setErrors({ print: 'Gagal mencetak invoice' });
        } finally {
            setProcessing(false);
        }
    };

    const handleView = async (invoiceId: string) => {
        setProcessing(true);
        setErrors({});

        try {
            log('Viewing invoice:', invoiceId);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            // In real app, this would open invoice in new tab or modal
            window.open(`/invoice/${invoiceId}/view`, '_blank');

            log('Invoice view opened');
        } catch (error) {
            log('Error viewing invoice:', error);
            setErrors({ view: 'Gagal membuka invoice' });
        } finally {
            setProcessing(false);
        }
    };

    const onBack = () => {
        log('Navigating back from invoice page');
        window.history.back();
    };

    if (loading) {
        return (
            <MenuLayout title="Invoice Pembayaran" onBack={onBack}>
                <Loading variant="overlay" />
            </MenuLayout>
        );
    }

    return (
        <MenuLayout title="Invoice Pembayaran" onBack={onBack}>
            <div className="space-y-4">
                {/* Invoice Component */}
                <PaymentInvoice
                    invoice={invoiceData}
                    siswa={{
                        name: data.siswa?.namlen || 'N/A',
                        nouid: data.siswa?.nouid || 'N/A',
                        balance: data.balance
                    }}
                    onDownload={handleDownload}
                    onPrint={handlePrint}
                    onView={handleView}
                    processing={processing}
                    errors={errors}
                />

                {/* Additional Actions */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Tambahan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                            onClick={() => handleView(invoiceData.id)}
                            disabled={processing}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {processing ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <FaEye />
                            )}
                            Lihat Detail
                        </button>

                        <button
                            onClick={() => handleDownload(invoiceData.id)}
                            disabled={processing}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {processing ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <FaDownload />
                            )}
                            Download PDF
                        </button>

                        <button
                            onClick={() => handlePrint(invoiceData.id)}
                            disabled={processing}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {processing ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <FaPrint />
                            )}
                            Cetak Invoice
                        </button>
                    </div>
                </div>

                {/* Payment Status Information */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Pembayaran</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Status:</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${invoiceData.status === 'success' ? 'bg-green-100 text-green-800' :
                                invoiceData.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    invoiceData.status === 'failed' ? 'bg-red-100 text-red-800' :
                                        'bg-gray-100 text-gray-800'
                                }`}>
                                {invoiceData.status === 'success' ? 'Lunas' :
                                    invoiceData.status === 'pending' ? 'Menunggu Pembayaran' :
                                        invoiceData.status === 'failed' ? 'Gagal' :
                                            'Tidak Diketahui'}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Tanggal Invoice:</span>
                            <span className="text-gray-900">{new Date(invoiceData.date).toLocaleDateString('id-ID')}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Jatuh Tempo:</span>
                            <span className="text-gray-900">{new Date(invoiceData.dueDate).toLocaleDateString('id-ID')}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Pembayaran:</span>
                            <span className="text-lg font-semibold text-gray-900">
                                {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                }).format(invoiceData.total)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Help Section */}
                <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Bantuan</h3>
                    <div className="space-y-2 text-sm text-blue-800">
                        <p>• Jika Anda mengalami masalah dengan pembayaran, silakan hubungi admin sekolah</p>
                        <p>• Pastikan pembayaran dilakukan sebelum tanggal jatuh tempo</p>
                        <p>• Simpan bukti pembayaran untuk keperluan administrasi</p>
                    </div>
                </div>
            </div>
        </MenuLayout>
    );
};

export default Invoice;
