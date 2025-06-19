import AppLayout from '@/Layout/AppLayout';
import { Siswa } from '@/types';
import { Link } from '@inertiajs/react';
import React from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

interface HistoryProps {
    siswa: Siswa;
    nouid: string;
    onClose: () => void;
    transactions: {
        data: Array<{
            id: number;
            nouid: string;
            order_id: string;
            amount: number;
            bank: string;
            status: string;
            created_at: string;
        }>;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
}

const History: React.FC<HistoryProps> = ({ siswa, nouid, onClose, transactions }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout title="Riwayat Transaksi">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground">
                    <button onClick={() => onClose()} className="flex items-center space-x-2">
                        <FaArrowAltCircleLeft className="text-primary-foreground" />
                        <span>Kembali</span>
                    </button>
                    <h1 className="text-2xl font-bold text-white">Riwayat Transaksi</h1>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Jumlah</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Bank</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Tanggal</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {transactions.data.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{transaction.order_id}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                            Rp {transaction.amount.toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{transaction.bank.toUpperCase()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${getStatusColor(
                                                    transaction.status,
                                                )}`}
                                            >
                                                {transaction.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                            {new Date(transaction.created_at).toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                            <Link
                                                href={`/${transaction.nouid}/transactions/${transaction.order_id}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* <Pagination links={transactions.links} className="px-6 py-4" /> */}
                </div>
            </div>
        </AppLayout>
    );
};

export default History;
