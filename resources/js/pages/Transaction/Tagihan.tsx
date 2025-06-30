import AppLayout from '@/Layout/AppLayout';
import { initialSiswa } from '@/lib/initial';
import { SharedData, Siswa } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowAltCircleLeft, FaSpinner } from 'react-icons/fa';

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
    spr_tagihan: number;
    tah_tagihan: string;
    total_tagihan: number;
    bulan_tagihan: string;
    siswa: Siswa;
    tagihan: TagihanItem[];
    orderId: string;
    jen1: number[];
}
interface TagihanParam {
    nouid: string | null;
    spr: number | null;
    jen1: number[] | [];
    tagihan: number;
}
interface PaymentPageProps {
    tagihanParam: TagihanParam;
    onClose?: () => void;
    // data: PaymentData;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ tagihanParam, onClose }) => {
    const { flash } = usePage<SharedData>().props;
    const [isLoading, setIsLoading] = useState(true);
    const [exist, setExist] = useState(false);
    const [lunas, setLunas] = useState(false);
    const [InitialData, setInitialData] = useState<PaymentData>({
        idok: 0,
        nouid: '',
        sta: 0,
        spr_tagihan: 0,
        tah_tagihan: '',
        total_tagihan: 0,
        bulan_tagihan: '',
        siswa: initialSiswa,
        tagihan: [],
        jen1: [],
        orderId: '',
    });
    const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'va'>('wallet');
    const { data, post, processing, setData } = useForm({
        spr: InitialData.spr_tagihan,
        jen1: InitialData.jen1,
        nouid: InitialData.nouid,
        payment_method: paymentMethod,
        amount: InitialData.total_tagihan,
        orderId: InitialData.orderId,
        uri: null,
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
                },
                body: JSON.stringify(tagihanParam),
            });
            if (!response.ok) {
                throw new Error('Gagal mengambil data tagihan');
            }

            const data = await response.json();
            if (data.redirect) {
                setExist(true);
                //     window.location.href = data.redirect;
                //     return;
            }
            if (data) {
                setInitialData(data.data as PaymentData);
                setData((prev) => ({
                    ...prev,
                    spr: data.data.spr_tagihan,
                    jen1: data.data.jen1,
                    tah: data.data.tah_tagihan,
                    month: data.data.bulan_tagihan,
                    nouid: data.data.nouid,
                    amount: data.data.total_tagihan,
                    uri: data.redirect ?? null,
                    orderId: data.data.orderId,
                }));
            }
        } catch (error) {
            console.error(error instanceof Error ? error.message : 'Terjadi kesalahan');
            setTimeout(() => {
                onClose?.();
            }, 1000);
        } finally {
            setTimeout(async () => {
                await setIsLoading(false);
            }, 1000);
        }
    }, [tagihanParam, setData, onClose]);

    useEffect(() => {
        fetchPaymentData();
    }, [fetchPaymentData]);

    useEffect(() => {
        setData('payment_method', paymentMethod);
    }, [paymentMethod, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('tagihan.pay', InitialData.nouid), {
            onSuccess: () => {
                if (flash?.success) {
                    setLunas(true);
                } else {
                    setLunas(false);
                }
                setTimeout(() => {
                    // onClose?.()
                }, 5000);
            },
            onError: () => {
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

    const isSaldoInsufficient = paymentMethod === 'wallet' && InitialData.siswa.balance < InitialData.total_tagihan;
    const isSubmitDisabled = processing || isSaldoInsufficient;

    return (
        <AppLayout>
            <Head title="Pembayaran Tagihan" />
            <div className="min-h-screen overflow-hidden rounded-lg bg-white shadow-md">
                <div className="flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground">
                    <button onClick={onClose} className="flex items-center space-x-2 transition-opacity hover:opacity-80" aria-label="Kembali">
                        <FaArrowAltCircleLeft className="text-primary-foreground" />
                        <span>Kembali</span>
                    </button>
                    <h1 className="text-2xl font-bold text-white">Topup Saldo</h1>
                </div>
                {isLoading ? (
                    <div className="flex min-h-screen flex-col items-center justify-center space-y-3">
                        <FaSpinner className="animate-spin text-3xl text-blue-600" />
                        <span className="text-lg text-gray-700">Memuat data pembayaran...</span>
                    </div>
                ) : (
                    <>
                        {/* Detail Siswa */}
                        <div className="border-b p-4 sm:p-6">
                            <h2 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">Data Siswa</h2>
                            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-bold sm:text-base">
                                        NIS : {InitialData.siswa.nis} - {InitialData.siswa.namlen.toLocaleUpperCase()}
                                    </p>
                                </div>

                                <div className="mt-2 sm:mt-0">
                                    <p className="text-sm text-gray-600">Nomor Telepon</p>
                                    <p className="text-sm sm:text-base">{InitialData.siswa.tel || '-'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Detail Tagihan */}
                        <div className="border-b p-4 sm:p-6">
                            <h2 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">Rincian Tagihan</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 sm:py-3">
                                                Keterangan
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 sm:py-3">
                                                Bulan
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 sm:py-3">
                                                Jumlah
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {InitialData.tagihan.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6">{item.ket}</td>
                                                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6">{item.bulan}</td>
                                                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6">
                                                    {item.jumlah >= 0 ? formatCurrency(item.jumlah) : `- ${formatCurrency(Math.abs(item.jumlah))}`}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4 flex items-center justify-between sm:mt-6">
                                <span className="text-base font-semibold sm:text-lg">Total Tagihan:</span>
                                <span className="text-xl font-bold text-blue-600 sm:text-2xl">{formatCurrency(InitialData.total_tagihan)}</span>
                            </div>
                        </div>

                        {/* Metode Pembayaran */}
                        {lunas ? (
                            <div className="flex justify-center p-6">
                                <div className="flex h-15 w-40 items-center justify-center border-4 border-green-700 p-4">
                                    <h1 className="text-4xl font-bold text-green-700">LUNAS</h1>
                                </div>
                            </div>
                        ) : exist ? (
                            <div className="mx-6 mb-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700 shadow-sm">
                                <p className="font-semibold">Transaksi Belum Selesai</p>
                                <p className="mt-1">
                                    Anda memiliki transaksi yang belum selesai. Silakan selesaikan transaksi sebelumnya untuk melanjutkan.
                                </p>
                                <button
                                    onClick={() => {
                                        if (typeof data.uri === 'string') window.location.href = data.uri;
                                        console.log(data.uri);
                                    }} // ganti dengan URL dari backend
                                    className="mt-3 inline-block rounded bg-yellow-600 px-4 py-2 font-medium text-white transition hover:bg-yellow-700"
                                >
                                    Lanjutkan ke Transaksi
                                </button>
                            </div>
                        ) : (
                            <div className="p-4 sm:p-6">
                                <h2 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">Metode Pembayaran</h2>

                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-3 sm:space-y-4">
                                        {/* Saldo Tabungan */}
                                        <div className="flex items-start">
                                            <div className="mt-1 flex h-5 items-center">
                                                <input
                                                    id="wallet"
                                                    name="payment_method"
                                                    type="radio"
                                                    checked={paymentMethod === 'wallet'}
                                                    onChange={() => setPaymentMethod('wallet')}
                                                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <label htmlFor="wallet" className="block text-sm font-medium text-gray-700 sm:text-base">
                                                    Saldo Tabungan
                                                </label>
                                                <div className="mt-1 text-xs text-gray-500 sm:text-sm">
                                                    <p>Saldo tersedia: {formatCurrency(InitialData.siswa.balance)}</p>
                                                    {isSaldoInsufficient && (
                                                        <p className="mt-1 text-red-500">Saldo tidak mencukupi untuk pembayaran ini</p>
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
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <label htmlFor="va" className="block text-sm font-medium text-gray-700 sm:text-base">
                                                    Virtual Account
                                                </label>
                                                <div className="mt-1 text-xs text-gray-500 sm:text-sm">
                                                    {paymentMethod === 'va' && <p>Anda akan diarahkan ke halaman pembayaran eksternal</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end sm:mt-8">
                                        <button
                                            type="submit"
                                            disabled={isSubmitDisabled}
                                            className={`rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors sm:px-6 sm:py-3 sm:text-base ${
                                                isSubmitDisabled
                                                    ? 'cursor-not-allowed bg-gray-400'
                                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                                            }`}
                                        >
                                            {processing ? 'Memproses...' : 'Bayar Sekarang'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </>
                )}
            </div>
        </AppLayout>
    );
};

export default PaymentPage;
