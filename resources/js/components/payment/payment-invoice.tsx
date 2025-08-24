import React from 'react';
import { useForm } from '@inertiajs/react';
import { FaFileInvoice, FaSpinner, FaDownload, FaPrint, FaEye, FaBuilding } from 'react-icons/fa';
import { formatCurrency, PaymentStatus, getPaymentStatusColor, getPaymentStatusText } from '../../utils/payment-utils';
import { BillTagihan, PaymentData } from '../../types';
import { useLogger } from '@/contexts/logger-context';

interface PaymentInvoiceProps {
    invoice: {
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
    };
    siswa?: {
        name: string;
        nouid: string;
        balance?: number;
    };
    onDownload?: (invoiceId: string) => void;
    onPrint?: (invoiceId: string) => void;
    onView?: (invoiceId: string) => void;
    processing?: boolean;
    errors?: Record<string, string>;
}

const PaymentInvoice: React.FC<PaymentInvoiceProps> = ({
    invoice,
    siswa,
    onDownload,
    onPrint,
    onView,
    processing = false,
    errors = {}
}) => {
    const { log } = useLogger();
    const { setData } = useForm({
        invoice_id: invoice.id,
        action: ''
    });

    const handleAction = (action: string) => {
        setData('action', action);

        switch (action) {
            case 'download':
                if (onDownload) onDownload(invoice.id);
                break;
            case 'print':
                if (onPrint) onPrint(invoice.id);
                break;
            case 'view':
                if (onView) onView(invoice.id);
                break;
            default:
                log('Unknown action:', action);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusBadge = (status: PaymentStatus) => {
        const statusConfig = getPaymentStatusColor(status);
        const statusText = getPaymentStatusText(status);

        return (
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusConfig}`}>
                {statusText}
            </span>
        );
    };

    React.useEffect(() => {
        log('PaymentInvoice rendered:', {
            invoiceId: invoice.id,
            status: invoice.status,
            total: invoice.total
        });
    }, [invoice.id, invoice.status, invoice.total, log]);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Print Area - Hidden by default, shown when printing */}
            <div className="hidden print:block print:bg-white print:p-8">
                {/* Print Header */}
                <div className="print:flex print:justify-between print:items-start print:mb-8">
                    <div className="print:flex print:items-center print:space-x-4">
                        <div className="print:w-16 print:h-16 print:bg-blue-600 print:rounded-lg print:flex print:items-center print:justify-center">
                            <FaBuilding className="print:text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="print:text-2xl print:font-bold print:text-gray-900">SMK NEGERI 1 JAKARTA</h1>
                            <p className="print:text-sm print:text-gray-600">Jl. Pendidikan No. 123, Jakarta Pusat</p>
                            <p className="print:text-sm print:text-gray-600">Telp: (021) 1234-5678 | Email: info@smkn1jakarta.sch.id</p>
                        </div>
                    </div>
                    <div className="print:text-right">
                        <h2 className="print:text-xl print:font-bold print:text-gray-900 print:mb-2">INVOICE</h2>
                        <p className="print:text-sm print:text-gray-600">#{invoice.invoiceNumber}</p>
                        <p className="print:text-sm print:text-gray-600">{formatDate(invoice.date)}</p>
                    </div>
                </div>

                {/* Print Content */}
                <div className="print:space-y-6">
                    {/* Bill To Section */}
                    <div className="print:grid print:grid-cols-2 print:gap-8">
                        <div>
                            <h3 className="print:text-lg print:font-semibold print:text-gray-900 print:mb-2">Bill To:</h3>
                            <div className="print:space-y-1 print:text-sm print:text-gray-700">
                                <p className="print:font-medium">{siswa?.name || 'N/A'}</p>
                                <p>NIS: {siswa?.nouid || 'N/A'}</p>
                                <p>SMK Negeri 1 Jakarta</p>
                                <p>Jakarta Pusat, Indonesia</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="print:text-lg print:font-semibold print:text-gray-900 print:mb-2">Invoice Details:</h3>
                            <div className="print:space-y-1 print:text-sm print:text-gray-700">
                                <p><span className="print:font-medium">Invoice #:</span> {invoice.invoiceNumber}</p>
                                <p><span className="print:font-medium">Date:</span> {formatDate(invoice.date)}</p>
                                <p><span className="print:font-medium">Due Date:</span> {formatDate(invoice.dueDate)}</p>
                                <p><span className="print:font-medium">Status:</span> {getPaymentStatusText(invoice.status)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Print Items Table */}
                    <div>
                        <table className="print:w-full print:border-collapse print:border print:border-gray-300">
                            <thead>
                                <tr className="print:bg-gray-100">
                                    <th className="print:border print:border-gray-300 print:px-4 print:py-2 print:text-left print:text-sm print:font-medium print:text-gray-900">Description</th>
                                    <th className="print:border print:border-gray-300 print:px-4 print:py-2 print:text-left print:text-sm print:font-medium print:text-gray-900">Period</th>
                                    <th className="print:border print:border-gray-300 print:px-4 print:py-2 print:text-right print:text-sm print:font-medium print:text-gray-900">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="print:border print:border-gray-300 print:px-4 print:py-2 print:text-sm print:text-gray-900">{item.ket}</td>
                                        <td className="print:border print:border-gray-300 print:px-4 print:py-2 print:text-sm print:text-gray-600">{item.bulan} {item.tah}</td>
                                        <td className="print:border print:border-gray-300 print:px-4 print:py-2 print:text-sm print:text-gray-900 print:text-right">{formatCurrency(item.jumlah)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Print Summary */}
                    <div className="print:flex print:justify-end">
                        <div className="print:w-64 print:space-y-2">
                            <div className="print:flex print:justify-between print:text-sm">
                                <span className="print:text-gray-600">Subtotal:</span>
                                <span className="print:text-gray-900">{formatCurrency(invoice.subtotal)}</span>
                            </div>
                            {invoice.tax && invoice.tax > 0 && (
                                <div className="print:flex print:justify-between print:text-sm">
                                    <span className="print:text-gray-600">Tax:</span>
                                    <span className="print:text-gray-900">{formatCurrency(invoice.tax)}</span>
                                </div>
                            )}
                            {invoice.discount && invoice.discount > 0 && (
                                <div className="print:flex print:justify-between print:text-sm">
                                    <span className="print:text-gray-600">Discount:</span>
                                    <span className="print:text-gray-900">-{formatCurrency(invoice.discount)}</span>
                                </div>
                            )}
                            <div className="print:flex print:justify-between print:text-lg print:font-bold print:border-t print:border-gray-300 print:pt-2">
                                <span className="print:text-gray-900">Total:</span>
                                <span className="print:text-gray-900">{formatCurrency(invoice.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Print Footer */}
                    <div className="print:mt-8 print:pt-4 print:border-t print:border-gray-300">
                        <div className="print:grid print:grid-cols-2 print:gap-8">
                            <div>
                                <h4 className="print:text-sm print:font-semibold print:text-gray-900 print:mb-2">Payment Terms:</h4>
                                <p className="print:text-xs print:text-gray-600">Payment is due within 30 days of invoice date. Late payments may incur additional charges.</p>
                            </div>
                            <div>
                                <h4 className="print:text-sm print:font-semibold print:text-gray-900 print:mb-2">Contact Information:</h4>
                                <p className="print:text-xs print:text-gray-600">For questions about this invoice, please contact:</p>
                                <p className="print:text-xs print:text-gray-600">Email: billing@smkn1jakarta.sch.id</p>
                                <p className="print:text-xs print:text-gray-600">Phone: (021) 1234-5678</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Screen Display - Hidden when printing */}
            <div className="print:hidden">
                {/* Invoice Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FaFileInvoice className="text-blue-600" size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Invoice Pembayaran</h2>
                                <p className="text-sm text-gray-500">#{invoice.invoiceNumber}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            {getStatusBadge(invoice.status)}
                            <div className="flex space-x-1">
                                {onView && (
                                    <button
                                        onClick={() => handleAction('view')}
                                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                        title="Lihat Invoice"
                                    >
                                        <FaEye size={16} />
                                    </button>
                                )}
                                {onDownload && (
                                    <button
                                        onClick={() => handleAction('download')}
                                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                        title="Download Invoice"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <FaSpinner className="animate-spin" size={16} />
                                        ) : (
                                            <FaDownload size={16} />
                                        )}
                                    </button>
                                )}
                                {onPrint && (
                                    <button
                                        onClick={() => handleAction('print')}
                                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                        title="Print Invoice"
                                        disabled={processing}
                                    >
                                        <FaPrint size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Invoice Details */}
                <div className="px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Student Information */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Informasi Siswa</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                                <p><span className="font-medium">Nama:</span> {siswa?.name || 'N/A'}</p>
                                <p><span className="font-medium">NIS:</span> {siswa?.nouid || 'N/A'}</p>
                                {siswa?.balance !== undefined && (
                                    <p><span className="font-medium">Saldo:</span> {formatCurrency(siswa.balance)}</p>
                                )}
                            </div>
                        </div>

                        {/* Invoice Information */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Informasi Invoice</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                                <p><span className="font-medium">Tanggal:</span> {formatDate(invoice.date)}</p>
                                <p><span className="font-medium">Jatuh Tempo:</span> {formatDate(invoice.dueDate)}</p>
                                <p><span className="font-medium">Status:</span> {getPaymentStatusText(invoice.status)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Invoice Items */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Detail Tagihan</h3>
                        <div className="overflow-hidden border border-gray-200 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Deskripsi
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Periode
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Jumlah
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {invoice.items.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                {item.ket}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {item.bulan} {item.tah}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900 text-right">
                                                {formatCurrency(item.jumlah)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Ringkasan Pembayaran</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="text-gray-900">{formatCurrency(invoice.subtotal)}</span>
                            </div>
                            {invoice.tax && invoice.tax > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Pajak:</span>
                                    <span className="text-gray-900">{formatCurrency(invoice.tax)}</span>
                                </div>
                            )}
                            {invoice.discount && invoice.discount > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Diskon:</span>
                                    <span className="text-gray-900">-{formatCurrency(invoice.discount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
                                <span className="text-gray-900">Total:</span>
                                <span className="text-gray-900">{formatCurrency(invoice.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    {invoice.paymentData && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <h3 className="text-sm font-medium text-blue-900 mb-3">Informasi Pembayaran</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-blue-700">Order ID:</span>
                                    <span className="text-blue-900 font-medium">{invoice.paymentData.order_id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-blue-700">Status Transaksi:</span>
                                    <span className="text-blue-900 font-medium">{invoice.paymentData.transaction_status}</span>
                                </div>
                                {invoice.paymentData.va_numbers && invoice.paymentData.va_numbers.length > 0 && (
                                    <div className="mt-3">
                                        <p className="text-blue-700 font-medium mb-2">Virtual Account:</p>
                                        {invoice.paymentData.va_numbers.map((va, index) => (
                                            <div key={index} className="bg-white p-2 rounded border border-blue-200">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-blue-700">{va.bank}:</span>
                                                    <span className="text-blue-900 font-mono font-medium">{va.va_number}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    {invoice.notes && (
                        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                            <h3 className="text-sm font-medium text-yellow-900 mb-2">Catatan</h3>
                            <p className="text-sm text-yellow-800">{invoice.notes}</p>
                        </div>
                    )}

                    {/* Error Messages */}
                    {Object.keys(errors).length > 0 && (
                        <div className="mt-4 p-4 bg-red-50 rounded-lg">
                            <h3 className="text-sm font-medium text-red-900 mb-2">Error</h3>
                            <div className="space-y-1">
                                {Object.entries(errors).map(([field, message]) => (
                                    <p key={field} className="text-sm text-red-700">{message}</p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentInvoice;
