import AppLayout from '@/Layout/AppLayout';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaArrowLeft, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

interface DetailProps {
    transaction: {
        order_id: string;
        nouid: string;
        amount: number;
        bank: string;
        va_number: string;
        status: string;
        created_at: string;
        expiry_time: string;
        payment_data: object;
    };
}

const Detail: React.FC<DetailProps> = ({ transaction }) => {
    const [isChecking, setIsChecking] = useState(false);

    const getStatusIcon = () => {
        switch (transaction.status) {
            case 'success':
                return <FaCheckCircle className="text-4xl text-green-500" />;
            case 'failed':
                return <FaTimesCircle className="text-4xl text-red-500" />;
            default:
                return <FaClock className="text-4xl text-yellow-500" />;
        }
    };

    const checkStatus = async () => {
        setIsChecking(true);
        try {
            await router.reload();
        } finally {
            setIsChecking(false);
        }
    };

    return (
        <AppLayout title="Detail Transaksi">
            <div className="mx-auto max-w-2xl overflow-hidden rounded-lg bg-white shadow-md">
                <div className="flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground">
                    <button onClick={() => router.visit('/transactions')} className="flex items-center space-x-2">
                        <FaArrowLeft className="text-primary-foreground" />
                        <span>Kembali ke Riwayat</span>
                    </button>
                    <h1 className="text-2xl font-bold text-white">Detail Transaksi</h1>
                </div>

                <div className="p-6">
                    <div className="mb-6 flex flex-col items-center justify-center">
                        <div className="mb-2 rounded-full bg-gray-100 p-3">{getStatusIcon()}</div>
                        <span className="text-lg font-semibold capitalize">{transaction.status}</span>
                    </div>

                    <div className="mb-6 rounded-lg border border-gray-200 p-4">
                        <h2 className="mb-3 text-lg font-semibold">Informasi Transaksi</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Order ID</span>
                                <span className="font-medium">{transaction.order_id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Jumlah</span>
                                <span className="font-medium">Rp {transaction.amount.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Metode Pembayaran</span>
                                <span className="font-medium">Transfer Bank {transaction.bank.toUpperCase()}</span>
                            </div>
                            {transaction.va_number && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Nomor VA</span>
                                    <span className="font-medium">{transaction.va_number}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tanggal Transaksi</span>
                                <span className="font-medium">{new Date(transaction.created_at).toLocaleString('id-ID')}</span>
                            </div>
                            {transaction.expiry_time && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Batas Pembayaran</span>
                                    <span className="font-medium">{new Date(transaction.expiry_time).toLocaleString('id-ID')}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {transaction.status === 'pending' && (
                        <div className="mb-6">
                            <button
                                onClick={checkStatus}
                                disabled={isChecking}
                                className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-white transition duration-200 hover:bg-blue-700 disabled:bg-blue-400"
                            >
                                {isChecking ? (
                                    <>
                                        <svg
                                            className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Memeriksa Status...
                                    </>
                                ) : (
                                    'Periksa Status Terbaru'
                                )}
                            </button>
                        </div>
                    )}

                    <div className="rounded-lg bg-gray-50 p-4 text-gray-800">
                        <h3 className="mb-2 font-semibold">Catatan</h3>
                        <p>
                            {transaction.status === 'pending'
                                ? 'Silakan selesaikan pembayaran sebelum waktu yang ditentukan.'
                                : transaction.status === 'success'
                                  ? 'Pembayaran telah berhasil diterima.'
                                  : 'Transaksi gagal atau telah kedaluwarsa.'}
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Detail;
