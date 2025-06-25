import { TransactionDetail } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowDown, ArrowUp, Ban, Banknote, CheckCircle, Clock, Copy, CreditCard, Landmark, Share2, ShoppingCart, Smartphone, Wallet, X, XCircle } from 'lucide-react';
import React from 'react';

interface TransactionDetailProps {
    transaction: TransactionDetail;
    onClose: () => void;
}

const Detail: React.FC<TransactionDetailProps> = ({ transaction, onClose }) => {
    // Determine icons
    

    const getStatusBadge = (status: 'success' | 'pending' | 'failed' | 'canceled') => {
        switch (status) {
            case 'success':
                return (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Berhasil
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                        <Clock className="mr-1 h-4 w-4" />
                        Menunggu
                    </span>
                );
            case 'failed':
                return (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                        <XCircle className="mr-1 h-4 w-4" />
                        Gagal
                    </span>
                );
            case 'canceled':
                return (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                        <Ban className="mr-1 h-4 w-4" />
                        Dibatalkan
                    </span>
                );
            default:
                return null;
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'topup':
            case 'deposit':
                return <ArrowDown className="rounded-full bg-blue-100 p-2 text-blue-500" size={40} />;
            case 'payment':
            case 'purchase':
                return <ShoppingCart className="rounded-full bg-purple-100 p-2 text-purple-500" size={40} />;
            case 'transfer':
                return <ArrowUp className="rounded-full bg-orange-100 p-2 text-orange-500" size={40} />;
            case 'withdraw':
                return <Wallet className="rounded-full bg-amber-100 p-2 text-amber-500" size={40} />;
            case 'bank_transfer':
            case 'credit_card':
                return <CreditCard className="rounded-full bg-indigo-100 p-2 text-indigo-500" size={40} />;
            default:
                return <Banknote className="rounded-full bg-gray-100 p-2 text-gray-500" size={40} />;
        }
    };

    // Formatters
    const formatCurrency = (amount: string) => {
        const num = parseFloat(amount);
        return num.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const vaInfo = transaction.va_number;

    // Animations
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="mx-auto w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
                    initial={{ y: -50, scale: 0.9 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: 50, scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    {/* Header */}
                    <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-4 shadow-sm">
                        <button onClick={onClose} className="rounded-full p-2 transition hover:bg-gray-100 active:scale-95">
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-900">Detail Transaksi</h2>
                        <div className="w-6" />
                    </div>

                    {/* Content */}
                    <div className="max-h-[85vh] overflow-y-auto px-6 py-8">
                        {/* Icon & Amount */}
                        <div className="mb-8 flex flex-col items-center text-center">
                            <div className="mb-4 text-4xl">{getTypeIcon(transaction.type || transaction.payment_type)}</div>
                            <div className={`text-3xl font-bold ${parseFloat(transaction.amount) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {parseFloat(transaction.amount) > 0 ? '+' : ''}
                                {formatCurrency(transaction.amount)}
                            </div>
                            <span
                                className={`mt-3 inline-flex items-center rounded-full px-4 py-1 text-sm font-medium`}
                            >
                                {getStatusBadge(transaction.status)}
                            </span>
                        </div>

                        {/* Details Section */}
                        <div className="mb-6 rounded-2xl bg-gray-50 p-5">
                            <h3 className="mb-4 text-base font-semibold text-gray-700">Informasi Transaksi</h3>
                            <div className="space-y-3">
                                <DetailRow
                                    icon={<Landmark size={16} />}
                                    label="Metode Pembayaran"
                                    value={transaction.payment_type.replace('_', ' ')}
                                />
                                {vaInfo && (
                                    <>
                                        {/* <DetailRow icon={<Landmark size={16} />} label="Bank" value={vaInfo.bank} /> */}
                                        <DetailRow icon={<CreditCard size={16} />} label="Virtual Account" value={vaInfo} copyable />
                                    </>
                                )}
                                {transaction.phone && <DetailRow icon={<Smartphone size={16} />} label="Nomor Telepon" value={transaction.phone} />}
                                <DetailRow label="Tanggal" value={formatDate(transaction.created_at)} />
                                <DetailRow label="ID Transaksi" value={transaction.id} copyable />
                                <DetailRow label="Order ID" value={transaction.order_id} copyable />
                                <div className="mt-4 flex justify-between border-t border-gray-200 pt-3">
                                    <span className="font-semibold">Total Bayar</span>
                                    <span className="text-lg font-semibold">{formatCurrency(transaction.amount)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Alerts */}
                        {transaction.status === 'pending' && transaction.expiry_time && (
                            <AlertNotice
                                type="warning"
                                message={`Batas pembayaran sampai ${new Date(transaction.expiry_time).toLocaleString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}`}
                            />
                        )}
                        {transaction.status === 'failed' && transaction.failure_message && (
                            <AlertNotice type="error" message={transaction.failure_message} />
                        )}

                        {/* Actions */}
                        <div className="mt-6 flex gap-4">
                            <button className="flex flex-1 items-center justify-center rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium transition hover:bg-gray-100">
                                <Share2 className="mr-2" size={16} />
                                Bagikan
                            </button>
                            <button className="flex flex-1 items-center justify-center rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium transition hover:bg-gray-100">
                                <Copy className="mr-2" size={16} /> Salin ID
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Detail;

// Reusable DetailRow Component
function DetailRow({ icon, label, value, copyable }: { icon?: React.ReactNode; label: string; value: number | string; copyable?: boolean }) {
    return (
        <div className="flex justify-between">
            <span className="flex items-center text-gray-500">
                {icon}
                <span className="ml-2 text-sm">{label}</span>
            </span>
            <div className="flex items-center">
                <span className="text-sm font-medium capitalize">{value}</span>
                {copyable && <Copy className="ml-2 cursor-pointer text-gray-400 hover:text-gray-600" size={16} />}
            </div>
        </div>
    );
}

// Reusable AlertNotice Component
function AlertNotice({ type, message }: { type: 'warning' | 'error'; message: string }) {
    const styles = {
        warning: 'border-l-4 border-yellow-500 bg-yellow-50 text-yellow-700',
        error: 'border-l-4 border-red-500 bg-red-50 text-red-700',
    };
    return (
        <div className={`mb-6 flex items-start p-4 ${styles[type]}`}>
            <AlertCircle className={`mr-2 ${type === 'warning' ? 'text-yellow-500' : 'text-red-500'}`} size={20} />
            <p className="text-sm leading-tight">{message}</p>
        </div>
    );
}
