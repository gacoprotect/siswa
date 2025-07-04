import AppLayout from '@/Layout/AppLayout';
import { initialSiswa } from '@/lib/initial';
import { SharedData, Siswa } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowAltCircleLeft, FaSpinner } from 'react-icons/fa';
import { TagihanParam } from '../Siswa/Index';

interface TagihanItem {
    id: number;
    tah: string;
    jen: number;
    ket: string;
    sta: number;
    jumlah: number;
    bulan: string;
}

interface PaymentData {
    idok: number;
    nouid: string;
    sta: number;
    spr_tagihan: number[];
    tah_tagihan: string;
    total_tagihan: number;
    bulan_tagihan: string;
    siswa: Siswa;
    tagihan: TagihanItem[];
    orderId: string;
    jen1: number[];
}

interface PaymentPageProps {
    tagihanParam: TagihanParam;
    onClose?: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ tagihanParam, onClose }) => {
    const { flash } = usePage<SharedData>().props;
    const [isLoading, setIsLoading] = useState(true);
    const [exist, setExist] = useState(false);
    const [lunas, setLunas] = useState(false);
    const [initialData, setInitialData] = useState<PaymentData>({
        idok: 0,
        nouid: '',
        sta: 0,
        spr_tagihan: [],
        tah_tagihan: '',
        total_tagihan: 0,
        bulan_tagihan: '',
        siswa: initialSiswa,
        tagihan: [],
        jen1: [],
        orderId: '',
    });

    const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'va'>('wallet');

    const { data, post, processing, setData, errors } = useForm({
        spr: [] as number[],
        jen1: [] as number[],
        nouid: '',
        payment_method: 'wallet',
        amount: 0,
        orderId: '',
        uri: null as string | null,
    });

    const fetchPaymentData = useCallback(async () => {
        setIsLoading(true);
        try {
            if (!tagihanParam.nouid) {
                throw new Error('Tagihan tidak ditemukan');
            }

            const url = route('api.tagihan', { nouid: tagihanParam.nouid });
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(tagihanParam),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal mengambil data tagihan');
            }

            const responseData = await response.json();

            if (responseData.redirect) {
                setExist(true);
                setData('uri', responseData.redirect);
                return;
            }

            if (responseData.data) {
                const paymentData = responseData.data as PaymentData;
                setInitialData(paymentData);
                setData({
                    spr: paymentData.spr_tagihan,
                    jen1: paymentData.jen1,
                    nouid: paymentData.nouid,
                    payment_method: paymentMethod,
                    amount: paymentData.total_tagihan,
                    orderId: paymentData.orderId,
                    uri: null,
                });
            }
        } catch (error) {
            console.error('Error:', error instanceof Error ? error.message : 'Terjadi kesalahan');
            // Tambahkan feedback ke user
            if (onClose) {
                setTimeout(onClose, 1000);
            }
        } finally {
            setIsLoading(false);
        }
    }, [tagihanParam, setData, onClose,paymentMethod]);

    useEffect(() => {
        fetchPaymentData();
    }, [fetchPaymentData]);

    useEffect(() => {
        setData('payment_method', paymentMethod);
    }, [paymentMethod, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitDisabled) return;

        post(route('tagihan.pay', initialData.nouid), {
            preserveScroll: true,
            onSuccess: () => {
                if (flash?.success) {
                    setLunas(true);
                    // Auto close setelah 5 detik jika pembayaran berhasil
                    setTimeout(() => {
                        if (onClose) onClose();
                    }, 5000);
                }
            },
            onError: (errors) => {
                console.error('Payment error:', errors);
                setLunas(false);
            },
        });
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const isSaldoInsufficient = paymentMethod === 'wallet' && initialData.siswa.balance < initialData.total_tagihan;
    const isSubmitDisabled = processing || isSaldoInsufficient || isLoading;

    if (isLoading) {
        return (
            <AppLayout>
                <Head title="Memuat Pembayaran" />
                <div className="flex min-h-screen bg-white flex-col items-center justify-center space-y-3">
                    <FaSpinner className="animate-spin text-3xl text-blue-600" />
                    <span className="text-lg text-gray-700">Memuat data pembayaran...</span>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title="Pembayaran Tagihan" />
            <div className="min-h-screen overflow-hidden rounded-lg bg-white shadow-md">
                <div className="flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground">
                    <button onClick={onClose} className="flex items-center space-x-2 transition-opacity hover:opacity-80" disabled={processing}>
                        <FaArrowAltCircleLeft className="text-primary-foreground" />
                        <span>Kembali</span>
                    </button>
                    <h1 className="text-2xl font-bold text-white">Pembayaran Tagihan</h1>
                </div>

                {exist ? (
                    <div className="mx-6 mb-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700 shadow-sm">
                        <p className="font-semibold">Transaksi Belum Selesai</p>
                        <p className="mt-1">Anda memiliki transaksi yang belum selesai. Silakan selesaikan transaksi sebelumnya untuk melanjutkan.</p>
                        <button
                            onClick={() => {
                                if (data.uri) window.location.href = data.uri;
                            }}
                            className="mt-3 inline-block rounded bg-yellow-600 px-4 py-2 font-medium text-white transition hover:bg-yellow-700"
                        >
                            Lanjutkan ke Transaksi
                        </button>
                    </div>
                ) : lunas ? (
                    <div className="flex flex-col items-center space-y-4 p-6">
                        <div className="flex h-15 w-40 items-center justify-center border-4 border-green-700 p-4">
                            <h1 className="text-4xl font-bold text-green-700">LUNAS</h1>
                        </div>
                        <p className="text-gray-600">Pembayaran berhasil diproses</p>
                    </div>
                ) : (
                    <>
                        {/* Detail Siswa */}
                        <div className="border-b p-4 sm:p-6">
                            <h2 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">Data Siswa</h2>
                            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-bold sm:text-base">
                                        NIS: {initialData.siswa.nis} - {initialData.siswa.namlen.toUpperCase()}
                                    </p>
                                    {/* <p className="mt-1 text-sm text-gray-600">Saldo: {formatCurrency(initialData.siswa.balance)}</p> */}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Nomor Telepon</p>
                                    <p className="text-sm sm:text-base">{initialData.siswa.tel || 'Tidak ada data'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Detail Tagihan */}
                        <div className="border-b p-4 sm:p-6">
                            <h2 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">Rincian Tagihan</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    {/* ... (table header tetap sama) ... */}
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {initialData.tagihan.map((item, index) => (
                                            <tr key={`${item.id}-${index}`}>
                                                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6">{item.ket}</td>
                                                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6">{item.bulan}</td>
                                                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6">
                                                    {formatCurrency(item.jumlah)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4 flex items-center justify-between sm:mt-6">
                                <span className="text-base font-semibold sm:text-lg">Total Tagihan:</span>
                                <span className="text-xl font-bold text-blue-600 sm:text-2xl">{formatCurrency(initialData.total_tagihan)}</span>
                            </div>
                        </div>

                        {/* Metode Pembayaran */}
                        <div className="p-4 sm:p-6">
                            <h2 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">Metode Pembayaran</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    {/* Wallet Payment */}
                                    <div className="flex items-start">
                                        <div className="mt-1 flex h-5 items-center">
                                            <input
                                                id="wallet"
                                                name="payment_method"
                                                type="radio"
                                                checked={paymentMethod === 'wallet'}
                                                onChange={() => setPaymentMethod('wallet')}
                                                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                                disabled={processing}
                                            />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <label htmlFor="wallet" className="block text-sm font-medium text-gray-700 sm:text-base">
                                                Saldo Tabungan : {formatCurrency(initialData.siswa.balance)}
                                            </label>
                                            <div className="mt-1 text-sm text-gray-500">
                                                {isSaldoInsufficient ? (
                                                    <p className="text-red-500">Saldo tidak mencukupi</p>
                                                ) : (
                                                    <p>Cukup dan aman untuk bertransaksi</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Virtual Account */}
                                    <div className="flex items-start">
                                        <div className="mt-1 flex h-5 items-center">
                                            <input
                                                id="va"
                                                name="payment_method"
                                                type="radio"
                                                checked={paymentMethod === 'va'}
                                                onChange={() => setPaymentMethod('va')}
                                                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                                disabled={processing}
                                            />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <label htmlFor="va" className="block text-sm font-medium text-gray-700 sm:text-base">
                                                Virtual Account
                                            </label>
                                            <div className="mt-1 text-sm text-gray-500">Transfer melalui bank partner</div>
                                        </div>
                                    </div>
                                </div>

                                {errors.payment_method && <p className="mt-2 text-sm text-red-600">{errors.payment_method}</p>}

                                <div className="mt-6 flex justify-end sm:mt-8">
                                    <button
                                        type="submit"
                                        disabled={isSubmitDisabled}
                                        className={`rounded-md px-6 py-3 text-base font-medium text-white shadow-sm transition-colors ${
                                            isSubmitDisabled
                                                ? 'cursor-not-allowed bg-gray-400'
                                                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                                        }`}
                                    >
                                        {processing ? (
                                            <span className="flex items-center justify-center">
                                                <FaSpinner className="mr-2 animate-spin" />
                                                Memproses...
                                            </span>
                                        ) : (
                                            'Bayar Sekarang'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
};

export default PaymentPage;
