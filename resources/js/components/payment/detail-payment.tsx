import { Summary,Auth, BillTagihan, DataSiswa, Siswa } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useIsMobile } from '@/hooks/use-mobile';



interface ResponseData {
    nouid?: string;
    items: BillTagihan[];
    total_tagihan: number;
    total_diskon: number;
    sisa_tagihan: number;
    orderId: string;
}
interface PaymentPageProps {
    siswa: Siswa;
    onClose?: () => void;
}

const DetailPayment: React.FC<PaymentPageProps> = ({ siswa, onClose }) => {
    const { auth, data: pageData } = usePage<{ auth: Auth; data: DataSiswa }>().props;
    const isMobile = useIsMobile();
    const [exist, setExist] = useState(false);
    const [lunas, setLunas] = useState(false);
    const [initialData, setInitialData] = useState<ResponseData>({
        nouid: pageData.nouid ?? auth.user?.nouid,
        items: pageData.tagihan ?? [],
        total_tagihan: pageData.summary?.total_tagihan ?? 0,
        total_diskon: pageData.summary?.total_disc ?? 0,
        sisa_tagihan: 0,
        orderId: '',
    });

    const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'va'>('wallet');

    const { data, post, processing, setData, errors } = useForm({
        spr: pageData.summary?.spr as number[],
        nouid: pageData.nouid,
        payment_method: paymentMethod,
        amount: pageData.summary?.total_tagihan,
        orderId: '',
        uri: null as string | null,
    });

    useEffect(() => {
        setData('payment_method', paymentMethod);
    }, [paymentMethod, setData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitDisabled) return;

        await post(route('tagihan.pay', pageData.nouid), {
            preserveScroll: true,
            onSuccess: () => {
                setLunas(true);
                // Auto close setelah 5 detik jika pembayaran berhasil
                setTimeout(() => {
                    onClose?.();
                }, 10000);
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

    const isSaldoInsufficient = paymentMethod === 'wallet' && siswa.balance < initialData.total_tagihan;
    const isSubmitDisabled = processing || isSaldoInsufficient ;
    return (
        <div className="min-h-screen overflow-hidden rounded-lg bg-white shadow-md">

            {/* Detail Siswa */}
            <div className="border-b p-4 sm:p-6">
                {isMobile && (
                    <div className='flex items-center justify-center'>
                        <h1 className="text-2xl font-bold text-center">Pembayaran Tagihan</h1>
                    </div>)}
                <div className="mt-3grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 bg-gray-100 p-2">
                    <div>
                        <p className="text-sm font-bold sm:text-base">
                            NIS: {siswa.nis} - {siswa.namlen.toUpperCase()}
                        </p>
                        {/* <p className="mt-1 text-sm text-gray-600">Saldo: {formatCurrency(siswa.balance)}</p> */}
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Nomor Telepon</p>
                        <p className="text-sm sm:text-base">{siswa.tel || 'Tidak ada data'}</p>
                    </div>
                </div>
            </div>

            {/* Detail Tagihan */}
            <div className="border-b p-4 sm:p-6">
                <div className="flex mb-3 text-center items-center justify-between">
                    <h2 className="text-lg font-semibold">Rincian Tagihan</h2>
                    <span className="bg-gray-100 p-1 text-sm rounded-3xl text-gray-500">ID# {initialData.orderId}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 sm:py-3">
                                    Tahun
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 sm:py-3">
                                    Bulan
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 sm:py-3">
                                    Jumlah
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 sm:py-3">
                                    Keterangan
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {initialData.items.map((item, index) => (
                                <tr key={`${item.id}-${index}`}>
                                    <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6">{item.tah}</td>
                                    <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6">{item.bulan}</td>
                                    <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6">
                                        {formatCurrency(item.jumlah)}
                                    </td>
                                    <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6">{item.ket}</td>
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
                {exist ? (
                    <div className="mx-6 mb-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700 shadow-sm">
                        <p className="font-semibold">Transaksi Belum Selesai</p>
                        <p className="mt-1">
                            Anda memiliki transaksi yang belum selesai. Silakan selesaikan transaksi sebelumnya untuk melanjutkan.
                        </p>
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
                    <>
                        <h2 className="text-md mb-3 font-semibold sm:mb-4">
                            Metode Pembayaran : {paymentMethod === 'wallet' ? 'Saldo Tabungan' : 'Virtual Account'}
                        </h2>

                        <div className="flex flex-col items-center space-y-4 p-6">
                            <div className="flex h-15 w-40 items-center justify-center border-4 border-green-700 p-4">
                                <h1 className="text-4xl font-bold text-green-700">LUNAS</h1>
                            </div>
                            <p className="text-gray-600">Pembayaran berhasil diproses</p>
                        </div>
                    </>
                ) : (
                    <>
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
                                            Saldo Tabungan : {formatCurrency(siswa.balance)}
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
                                    className={`rounded-md px-6 py-3 text-base font-medium text-white shadow-sm transition-colors ${isSubmitDisabled
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
                    </>
                )}
            </div>
        </div>
    );
};

export default DetailPayment;
