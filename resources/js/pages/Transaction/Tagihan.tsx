import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

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
    total_tagihan: number;
    siswa: Siswa;
    tagihan: TagihanItem[];
}

interface PaymentPageProps {
    data: PaymentData;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ data }) => {
    const [paymentMethod, setPaymentMethod] = useState<'saldo' | 'virtual_account'>('saldo');

    const { post, processing } = useForm({
        idok: data.idok,
        nouid: data.nouid,
        payment_method: paymentMethod,
        amount: data.total_tagihan,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('payment.process'), {
            onSuccess: () => {
                // Handle success
            },
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="mx-auto max-w-4xl p-6">
            <Head title="Pembayaran Tagihan" />

            <div className="overflow-hidden rounded-lg bg-white shadow-md">
                {/* Header */}
                <div className="bg-blue-600 p-6 text-white">
                    <h1 className="text-2xl font-bold">Pembayaran Tagihan</h1>
                </div>

                {/* Detail Siswa */}
                <div className="border-b p-6">
                    <h2 className="mb-4 text-xl font-semibold">Data Siswa</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <p className="mt-1 font-bold">
                                NIS: {data.siswa.nis} - {data.siswa.namlen}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-600">Nomor Telepon</p>
                            <p>{data.siswa.tel}</p>
                        </div>
                    </div>
                </div>

                {/* Detail Tagihan */}
                <div className="border-b p-6">
                    <h2 className="mb-4 text-xl font-semibold">Rincian Tagihan</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Keterangan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Bulan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Jumlah</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {data.tagihan.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{item.ket}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{item.bulan}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                            {item.jumlah >= 0 ? formatCurrency(item.jumlah) : `- ${formatCurrency(Math.abs(item.jumlah))}`}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <span className="text-lg font-semibold">Total Tagihan:</span>
                        <span className="text-2xl font-bold text-blue-600">{formatCurrency(data.total_tagihan)}</span>
                    </div>
                </div>

                {/* Metode Pembayaran */}
                <div className="p-6">
                    <h2 className="mb-4 text-xl font-semibold">Metode Pembayaran</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {/* Saldo Tabungan */}
                            <div className="flex items-start">
                                <div className="flex h-5 items-center">
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
                                    <label htmlFor="saldo" className="block text-sm font-medium text-gray-700">
                                        Saldo Tabungan
                                    </label>
                                    <div className="mt-1 text-sm text-gray-500">
                                        <p>Saldo tersedia: {formatCurrency(data.siswa.saldo)}</p>
                                        {paymentMethod === 'saldo' && data.siswa.saldo < data.total_tagihan && (
                                            <p className="mt-1 text-red-500">Saldo tidak mencukupi untuk pembayaran ini</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Virtual Account */}
                            <div className="flex items-start">
                                <div className="flex h-5 items-center">
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
                                    <label htmlFor="virtual_account" className="block text-sm font-medium text-gray-700">
                                        Virtual Account
                                    </label>
                                    <div className="mt-1 text-sm text-gray-500">
                                        {paymentMethod === 'virtual_account' && <p>Anda akan diarahkan ke halaman pembayaran eksternal</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing || (paymentMethod === 'saldo' && data.siswa.saldo < data.total_tagihan)}
                                className={`rounded-md px-6 py-3 text-base font-medium text-white shadow-sm ${
                                    processing || (paymentMethod === 'saldo' && data.siswa.saldo < data.total_tagihan)
                                        ? 'cursor-not-allowed bg-gray-400'
                                        : 'bg-blue-600 hover:bg-blue-700'
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
