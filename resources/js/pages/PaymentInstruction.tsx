import AppLayout from '@/Layout/AppLayout';
import { PaymentDataResponse } from '@/types';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaCheckCircle, FaClock, FaSpinner, FaTimesCircle } from 'react-icons/fa';
dayjs.extend(duration);

const PaymentInstruction: React.FC<PaymentDataResponse> = ({ order_id, nouid, transaction }) => {
    const [countdown, setCountdown] = useState('');
    const expiry = dayjs(transaction.expiry_time);

    useEffect(() => {
        if (!order_id) router.visit(route('siswa.index'));

        const interval = setInterval(() => {
            const now = dayjs();
            const diff = expiry.diff(now);
            if (diff <= 0) {
                setCountdown('Waktu pembayaran telah habis');
                clearInterval(interval);
            } else {
                const dur = dayjs.duration(diff);
                setCountdown(`${dur.hours()}j ${dur.minutes()}m ${dur.seconds()}d`);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [order_id, transaction.expiry_time, expiry]);

    const getStatusBadge = () => {
        switch (transaction.status) {
            case 'success':
                return (
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        <FaCheckCircle /> Berhasil
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex animate-pulse items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                        <FaSpinner className="animate-spin" /> Menunggu Pembayaran
                    </span>
                );
            case 'failed':
                return (
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                        <FaTimesCircle /> Gagal
                    </span>
                );
            default:
                return null;
        }
    };

    const getBankName = (bankCode: string) => {
        const banks: Record<string, string> = {
            bca: 'BCA',
            bni: 'BNI',
            bri: 'BRI',
            mandiri: 'Mandiri',
            permata: 'Permata',
        };
        return banks[bankCode] || bankCode.toUpperCase();
    };

    const getVaNumber = () => {
        if (transaction.payment_data?.va_numbers?.length) return transaction.payment_data.va_numbers[0].va_number;
        return transaction.payment_data?.permata_va_number || '-';
    };

    const getBankCode = () => {
        if (transaction.payment_data?.va_numbers?.length) return transaction.payment_data.va_numbers[0].bank;
        return 'permata';
    };

    return (
        <AppLayout title="Instruksi Pembayaran">
            <div className="mx-auto max-w-2xl overflow-hidden rounded-lg bg-white shadow-md">
                <div className="flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground">
                    <button onClick={() => window.history.back()} className="flex items-center space-x-2">
                        <FaArrowLeft /> <span>Dashboard</span>
                    </button>
                </div>

                <div className="p-6">
                    <h1 className="mb-3 text-center text-2xl font-bold">Instruksi Pembayaran</h1>

                    <div className="mb-4 flex justify-center">{getStatusBadge()}</div>

                    {transaction.status === 'pending' && (
                        <div className="mb-6 flex flex-col gap-2 rounded-lg bg-blue-50 p-4 text-blue-800 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-2">
                                <FaClock />
                                <span>Batas Waktu Pembayaran</span>
                            </div>
                            <div className="text-sm lg:text-right">
                                <div className="font-bold">{dayjs(transaction.expiry_time).format('DD MMM YYYY HH:mm')}</div>
                                <div className="text-xs text-blue-700">Sisa waktu: {countdown}</div>
                            </div>
                        </div>
                    )}

                    <div className="mb-6 rounded-lg border border-gray-200 p-4">
                        <h2 className="mb-3 text-lg font-semibold">Detail Transaksi</h2>
                        <div className="space-y-4">
                            <div className="flex flex-col lg:flex-row lg:justify-between">
                                <span className="text-gray-600">Order ID</span>
                                <span className="font-medium">{transaction.payment_data.order_id}</span>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:justify-between">
                                <span className="text-gray-600">Jumlah</span>
                                <span className="font-medium">Rp {parseInt(transaction.payment_data.gross_amount).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:justify-between">
                                <span className="text-gray-600">Metode Pembayaran</span>
                                <span className="font-medium">Transfer Bank {getBankName(getBankCode())}</span>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:justify-between">
                                <span className="text-gray-600">Nomor Virtual Account</span>
                                <span className="font-medium">{getVaNumber()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 rounded-lg border border-gray-200 p-4">
                        <h2 className="mb-3 text-lg font-semibold">Instruksi Pembayaran</h2>
                        <ol className="list-decimal space-y-3 pl-5">
                            <li>Buka aplikasi mobile banking / internet banking Anda</li>
                            <li>
                                Masukkan nomor VA: <span className="font-bold">{getVaNumber()}</span>
                            </li>
                            <li>Masukkan jumlah pembayaran sesuai tagihan</li>
                            <li>Ikuti instruksi di aplikasi hingga selesai</li>
                            <li>Pembayaran akan dikonfirmasi otomatis dalam 1-5 menit</li>
                        </ol>
                    </div>

                    <div className="rounded-lg bg-yellow-50 p-4 text-yellow-800">
                        <h3 className="mb-2 font-semibold">Perhatian!</h3>
                        <p>Hanya lakukan pembayaran ke nomor VA di atas. Simpan bukti transaksi untuk referensi.</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PaymentInstruction;
