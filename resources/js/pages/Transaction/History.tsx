import AppLayout from '@/Layout/AppLayout';
import { TransactionDetail } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { ArrowDown, ArrowUp, Banknote, CheckCircle, Clock, CreditCard, ShoppingCart, Wallet, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import Detail from './Detail';
import { useLogger } from '@/contexts/logger-context';

type PageProps = {
    transactions: TransactionDetail[];
    nouid: string;
};
type HistoryProps = { onClose: () => void };

const History: React.FC<HistoryProps> = () => {
    console.count('Component Render');
    const { log } = useLogger();
    const { transactions, nouid } = usePage<PageProps>().props;
    log("Data Transaksi : ", transactions);
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetail | null>(null);
    const getStatusIcon = (status: 'success' | 'pending' | 'failed' | 'canceled') => {
        switch (status) {
            case 'success':
                return <CheckCircle className="text-green-500" size={16} />;
            case 'pending':
                return <Clock className="text-yellow-500" size={16} />;
            case 'failed':
                return <XCircle className="text-red-500" size={16} />;
            case 'canceled':
                return <XCircle className="text-red-500" size={16} />;
            default:
                return null;
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'topup':
            case 'deposit':
                return <ArrowDown className="text-blue-500" size={20} />;
            case 'payment':
            case 'purchase':
                return <ShoppingCart className="text-purple-500" size={20} />;
            case 'transfer':
                return <ArrowUp className="text-orange-500" size={20} />;
            case 'withdraw':
                return <Wallet className="text-amber-500" size={20} />;
            case 'bank_transfer':
            case 'credit_card':
                return <CreditCard className="text-indigo-500" size={20} />;
            default:
                return <Banknote className="text-gray-500" size={20} />;
        }
    };

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
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout title="Riwayat Transaksi">
            <div className="overflow-hidden rounded-lg bg-white shadow-md">
                {/* <div className="flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground">
                    <button onClick={() => window.history.back()} className="flex items-center space-x-2">
                        <FaArrowAltCircleLeft className="text-primary-foreground" />
                        <span>Kembali</span>
                    </button>
                    <h1 className="text-2xl font-bold text-white">Riwayat Transaksi</h1>
                </div>

                <div className="divide-y">
                    {transactions.map((trx) => (
                        <div
                            key={trx.order_id}
                            className="flex cursor-pointer items-center p-4 transition-colors hover:bg-gray-50"
                            onClick={() => setSelectedTransaction(trx)}
                        >

                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                {getTypeIcon(trx.type || trx.payment_type)}
                            </div>


                            <div className="flex-1">
                                <h3 className="font-medium capitalize">{trx.type || trx.payment_type.replace('_', ' ')}</h3>
                                <p className="text-sm text-gray-500">{trx.note || `Order: ${trx.order_id}`}</p>
                                <div className="mt-1 flex items-center text-sm">
                                    {getStatusIcon(trx.status)}
                                    <span className="ml-1 text-gray-500 capitalize">{trx.status}</span>
                                </div>
                            </div>


                            <div
                                className={`text-right ${trx.status === 'failed' || trx.status === 'canceled' ? 'text-red-600' : parseFloat(trx.amount) > 0 ? 'text-green-600' : 'text-red-600'}`}
                            >
                                <div className={`font-medium`}>
                                    {parseFloat(trx.amount) > 0 ? '+' : ''}
                                    {formatCurrency(trx.amount)}
                                </div>
                                <div className="mt-1 text-xs text-gray-400">{formatDate(trx.created_at)}</div>

                                {trx.status === 'pending' && (
                                    <button
                                        className="mt-2 inline-block rounded-lg bg-blue-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-blue-600"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.get(`/${nouid}/payment/${trx.order_id}`);
                                        }}
                                    >
                                        Bayar Sekarang
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {selectedTransaction && <Detail transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />} */}
            </div>
        </AppLayout>
    );
};

export default History;
