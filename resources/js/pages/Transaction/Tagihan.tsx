import { Head, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

interface TagihanItem {
    id: number;
    tah: string;
    jen: number;
    ket: string;
    sta: number;
    jumlah: number;
    bulan: string;
}

interface Siswa {
    nis: string;
    namlen: string;
    temlah: string;
    tgllah: string;
    tel: string;
    kel: string | null;
    saldo: number;
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
}

interface PaymentPageProps {
    data: PaymentData;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ data }) => {
    const [paymentMethod, setPaymentMethod] = useState<'saldo' | 'virtual_account'>('saldo');
    const { post, processing, setData } = useForm({
        spr: data.spr_tagihan,
        tah: data.tah_tagihan,
        month: data.bulan_tagihan,
        nouid: data.nouid,
        payment_method: paymentMethod,
        amount: data.total_tagihan,
    });
    useEffect(() => {
        setData('payment_method', paymentMethod);
    }, [paymentMethod, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('tagihan.pay', data.nouid), {
            onSuccess: () => {
                // Handle success
            },
            onError: (errors) => {
                // Handle errors if needed
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

    const isSaldoInsufficient = paymentMethod === 'saldo' && data.siswa.saldo < data.total_tagihan;
    const isSubmitDisabled = processing || isSaldoInsufficient;

    return (
        <div className="mx-auto max-w-4xl p-4 sm:p-6">
            <Head title="Pembayaran Tagihan" />

            <div className="overflow-hidden rounded-lg bg-white shadow-md">
                {/* Header */}
                <div className="bg-blue-600 px-6 py-4 text-white sm:py-6">
                    <h1 className="text-xl font-bold sm:text-2xl">Pembayaran Tagihan</h1>
                </div>

                {/* Detail Siswa */}
                <div className="border-b p-4 sm:p-6">
                    <h2 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">Data Siswa</h2>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                        <div>
                            <p className="text-sm font-bold sm:text-base">
                                NIS : {data.siswa.nis} - {data.siswa.namlen.toLocaleUpperCase()}
                            </p>
                        </div>

                        <div className="mt-2 sm:mt-0">
                            <p className="text-sm text-gray-600">Nomor Telepon</p>
                            <p className="text-sm sm:text-base">{data.siswa.tel || '-'}</p>
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
                                {data.tagihan.map((item, index) => (
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
                        <span className="text-xl font-bold text-blue-600 sm:text-2xl">{formatCurrency(data.total_tagihan)}</span>
                    </div>
                </div>

                {/* Metode Pembayaran */}
                <div className="p-4 sm:p-6">
                    <h2 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">Metode Pembayaran</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-3 sm:space-y-4">
                            {/* Saldo Tabungan */}
                            <div className="flex items-start">
                                <div className="mt-1 flex h-5 items-center">
                                    <input
                                        id="saldo"
                                        name="payment_method"
                                        type="radio"
                                        checked={paymentMethod === 'saldo'}
                                        onChange={() => setPaymentMethod('saldo')}
                                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="ml-3">
                                    <label htmlFor="saldo" className="block text-sm font-medium text-gray-700 sm:text-base">
                                        Saldo Tabungan
                                    </label>
                                    <div className="mt-1 text-xs text-gray-500 sm:text-sm">
                                        <p>Saldo tersedia: {formatCurrency(data.siswa.saldo)}</p>
                                        {isSaldoInsufficient && <p className="mt-1 text-red-500">Saldo tidak mencukupi untuk pembayaran ini</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Virtual Account */}
                            <div className="flex items-start">
                                <div className="mt-1 flex h-5 items-center">
                                    <input
                                        id="virtual_account"
                                        name="payment_method"
                                        type="radio"
                                        checked={paymentMethod === 'virtual_account'}
                                        onChange={() => setPaymentMethod('virtual_account')}
                                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="ml-3">
                                    <label htmlFor="virtual_account" className="block text-sm font-medium text-gray-700 sm:text-base">
                                        Virtual Account
                                    </label>
                                    <div className="mt-1 text-xs text-gray-500 sm:text-sm">
                                        {paymentMethod === 'virtual_account' && <p>Anda akan diarahkan ke halaman pembayaran eksternal</p>}
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
            </div>
        </div>
    );
};

export default PaymentPage;
