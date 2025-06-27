import AppLayout from '@/Layout/AppLayout';
import { PaymentDataResponse } from '@/types';
import { router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowLeft, FaCheckCircle, FaClock, FaSpinner, FaTimesCircle } from 'react-icons/fa';

dayjs.extend(duration);

const PaymentInstruction: React.FC<PaymentDataResponse> = ({ order_id, transaction }) => {
    const { nouid, errors } = usePage<{ nouid: string }>().props;
    const [countdown, setCountdown] = useState('');
    const [simulating, setSimulating] = useState(false);
    const [cancelButton, setCancelButon] = useState(true);
    const [errorCancel, setErrorCancel] = useState<string | null>(null);
    const [errorSimulate, setErrorSimulate] = useState<string | null>(null);

    const expiry = dayjs(transaction.expiry_time);

    useEffect(() => {
        if (!order_id || transaction.status === 'success') {
            router.visit(route('siswa.index', nouid));
            return;
        }

        const updateCountdown = () => {
            const now = dayjs();
            const diff = expiry.diff(now);

            if (diff <= 0) {
                setCountdown('Waktu pembayaran telah habis');
                return false;
            } else {
                const dur = dayjs.duration(diff);
                setCountdown(`${dur.hours()}j ${dur.minutes()}m ${dur.seconds()}d`);
                return true;
            }
        };

        // Initial update
        const shouldContinue = updateCountdown();

        if (shouldContinue) {
            const interval = setInterval(updateCountdown, 1000);
            return () => clearInterval(interval);
        }
    }, [order_id, transaction, expiry]);

    const getStatusBadge = useCallback(() => {
        const statusConfig = {
            success: {
                bg: 'bg-green-100',
                text: 'text-green-700',
                icon: <FaCheckCircle />,
                label: 'Berhasil',
            },
            pending: {
                bg: 'bg-yellow-100',
                text: 'text-yellow-700',
                icon: <FaSpinner className="animate-spin" />,
                label: 'Menunggu Pembayaran',
            },
            failed: {
                bg: 'bg-red-100',
                text: 'text-red-700',
                icon: <FaTimesCircle />,
                label: 'Gagal',
            },
            canceled: {
                bg: 'bg-red-100',
                text: 'text-red-700',
                icon: <FaTimesCircle />,
                label: 'Transaksi Dibatalkan',
            },
        };

        const config = statusConfig[transaction.status as keyof typeof statusConfig];

        if (!config) return null;

        return (
            <span className={`inline-flex items-center gap-2 rounded-full ${config.bg} px-3 py-1 text-sm ${config.text}`}>
                {config.icon} {config.label}
            </span>
        );
    }, [transaction.status]);
    useEffect(() => {
        const btn = () => {
            if (['success', 'failed', 'canceled'].includes(transaction.status)) {
                setCancelButon(false);
            } else {
                setCancelButon(true);
            }
        };

        btn();
    }, [transaction.status]);
    const handleCancel = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setErrorCancel(null);
            await router.post(
                route('transactions.cancel', {
                    nouid,
                    orderId: transaction.order_id,
                }),
                {
                    nouid,
                    order_id: transaction.order_id,
                },
            );
        } catch (err) {
            setErrorCancel('Terjadi kesalahan saat memproses pembayaran');
            console.error(err);
        }
    };

    const handleSimulate = async (e: React.FormEvent, va: string) => {
        e.preventDefault();
        try {
            setSimulating(true);
            setErrorSimulate(null);
            await router.post(
                route('payment.simulate', {
                    nouid,
                    orderId: transaction.order_id,
                }),
                {
                    nouid,
                    order_id: transaction.order_id,
                    va_number: va,
                    amount: transaction.amount,
                    type: transaction.type,
                    tah: transaction.tah,
                    month: transaction.month,
                    spr: transaction.spr,
                },
                {
                    onBefore: () => {
                        setSimulating(true);
                    },
                },
            );
        } catch (error) {
            setErrorSimulate('Simulasi pembayaran gagal');
            console.error('Simulasi pembayaran gagal:', error);
        } finally {
            setSimulating(false);
        }
    };

    const formatAmount = (amount: string) => {
        return `Rp ${parseInt(amount).toLocaleString('id-ID')}`;
    };

    const formatExpiryDate = (date: string) => {
        return dayjs(date).format('DD MMM YYYY HH:mm');
    };

    return (
        <AppLayout title="Instruksi Pembayaran">
            <div className="mx-auto max-w-2xl overflow-hidden rounded-lg bg-white shadow-md">
                <div className="flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground">
                    <button onClick={() => window.history.back()} className="flex items-center space-x-2 transition-opacity hover:opacity-80">
                        <FaArrowLeft />
                        <span>Dashboard</span>
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
                                <div className="font-bold">{formatExpiryDate(transaction.expiry_time)}</div>
                                <div className="text-xs text-blue-700">Sisa waktu: {countdown}</div>
                            </div>
                        </div>
                    )}
                    {errors.message && <p className="text-center text-sm text-red-500">{errors.message}</p>}
                    {errors.va_number && <p className="text-center text-sm text-red-500">{errors.va_number}</p>}

                    {errorCancel && <p className="mb-4 text-center text-sm text-red-500">{errorCancel}</p>}

                    <div className="mb-6 rounded-lg border border-gray-200 p-4">
                        <h2 className="mb-3 text-lg font-semibold">Detail Transaksi</h2>
                        <div className="space-y-4">
                            <div className="flex flex-col lg:flex-row lg:justify-between">
                                <span className="text-gray-600">Order ID</span>
                                <span className="font-medium">{transaction.order_id}</span>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:justify-between">
                                <span className="text-gray-600">Jumlah</span>
                                <span className="font-medium">{formatAmount(transaction.amount)}</span>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:justify-between">
                                <span className="text-gray-600">Metode Pembayaran</span>
                                <span className="font-medium">Virtual Account (VA)</span>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:justify-between">
                                <span className="text-gray-600">Nomor Virtual Account</span>
                                <div className="flex items-center justify-between space-x-4">
                                    <span className="font-medium">{transaction.va_number}</span>
                                    <button
                                        disabled={simulating}
                                        onClick={(e) => {
                                            setSimulating(true);
                                            handleSimulate(e, transaction.va_number);
                                        }}
                                        className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-bold text-white ${
                                            simulating ? 'bg-cyan-700' : 'bg-cyan-900 hover:bg-cyan-800'
                                        } transition-colors disabled:opacity-70`}
                                    >
                                        {simulating ? (
                                            <>
                                                <FaSpinner className="animate-spin" />
                                                <span>Memproses pembayaran</span>
                                            </>
                                        ) : (
                                            'Simulasi Pembayaran'
                                        )}
                                    </button>
                                </div>
                                {errorSimulate && <p className="text-center text-sm text-red-500">{errorSimulate}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 rounded-lg border border-gray-200 p-4">
                        <h2 className="mb-3 text-lg font-semibold">Instruksi Pembayaran</h2>
                        <ol className="list-decimal space-y-3 pl-5">
                            <li>Buka aplikasi mobile banking / internet banking Anda</li>
                            <li>
                                Masukkan nomor VA: <span className="font-bold">{transaction.va_number}</span>
                            </li>
                            <li>Masukkan jumlah pembayaran sesuai tagihan</li>
                            <li>Ikuti instruksi di aplikasi hingga selesai</li>
                            <li>Pembayaran akan dikonfirmasi otomatis dalam 1-5 menit</li>
                        </ol>
                    </div>

                    {cancelButton && (
                        <div className="mb-6 flex flex-col items-center justify-center space-y-2">
                            {errorCancel && <p className="text-center text-sm text-red-500">{errorCancel}</p>}

                            <button
                                disabled={transaction.status === 'canceled'}
                                onClick={handleCancel}
                                className={`rounded-lg px-4 py-2 font-bold text-white transition-colors ${
                                    transaction.status === 'canceled' ? 'cursor-not-allowed bg-red-300' : 'bg-red-700 hover:bg-red-800'
                                }`}
                            >
                                Batalkan Transaksi
                            </button>
                        </div>
                    )}

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
