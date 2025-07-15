import { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronRight, FaSpinner } from 'react-icons/fa';
import dayjs from 'dayjs';

interface PaidBill {
    id: number;
    nmr: number;
    jum: string;
    ket: string;
    sta: number;
    trx_id: number;
}

interface Transaction {
    order_id: string;
    amount: number;
    paid_at: string;
    bills: PaidBill[];
}

interface ApiResponseSuccess {
    success: true;
    data: {
        nouid: string;
        trx: Transaction[];
    };
    meta?: {
        filter?: {
            year?: string;
            month?: string;
        };
    };
}

interface ApiResponseError {
    success: false;
    message: string;
    error_code?: string;
    errors?: Record<string, string[]>;
}

type ApiResponse = ApiResponseSuccess | ApiResponseError;

const RiwayatTagihan = ({ nouid }: { nouid: string }) => {
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState(dayjs().format('YYYY'));
    const [month, setMonth] = useState(dayjs().month() + 1); // Gunakan angka (1-12)
    const [showAll, setShowAll] = useState(true);
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
    const [data, setData] = useState<ApiResponseSuccess['data'] | null>(null);
    const [error, setError] = useState<{ message: string; error_code?: string } | null>(null);

    const fetchData = async (params: { t?: string; m?: number } = {}) => {
        setLoading(true);
        setError(null);
        try {
            // Convert params to URLSearchParams, handling month conversion
            const queryParams = new URLSearchParams();

            if (params.t) queryParams.append('t', params.t);
            if (params.m) queryParams.append('m', params.m.toString());

            const response = await fetch(`${route('tagihan.history', nouid)}?${queryParams.toString()}`);

            if (!response.ok) {
                // Handle HTTP errors
                if (response.status === 404) {
                    throw new Error('Data siswa tidak ditemukan');
                }
                throw new Error(`Terjadi kesalahan (${response.status})`);
            }

            const result: ApiResponse = await response.json();

            if (!result.success) {
                // Handle API errors
                if (result.errors) {
                    // Handle validation errors specifically
                    const errorMessages = Object.values(result.errors).flat().join(', ');
                    throw new Error(`Validasi gagal: ${errorMessages}`);
                }
                throw new Error(result.message || 'Gagal memuat data');
            }

            setData(result.data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError({
                message: err instanceof Error ? err.message : 'Gagal memuat data. Silakan coba lagi.',
                error_code: (err as any)?.error_code
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFilterSubmit = (all = true) => {
        const params = all ? {} : {
            t: year,
            m: month, // Convert string month to number
        };
        fetchData(params);
    };
    const formatDate = (dateString: string) => {
        return dayjs(dateString).format('DD MMMM YYYY HH:mm');
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    if (loading && !data) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <FaSpinner className="animate-spin text-2xl mb-2" />
                <span>Memuat data tagihan...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-center">
                <div className="text-red-500 mb-2">
                    {error.message}
                    {error.error_code && (
                        <span className="text-gray-500 text-sm block mt-1">Kode: {error.error_code}</span>
                    )}
                </div>
                <button
                    onClick={() => fetchData()}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Coba Lagi
                </button>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex gap-2 sm:self-end">
                    {showAll ? (<button
                        onClick={() => {
                            setShowAll(false);
                            handleFilterSubmit(false);
                        }}
                        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 disabled:opacity-50"
                        disabled={loading}
                    >
                        Filter
                    </button>) : (
                        <button
                            onClick={() => {
                                setShowAll(true);
                                handleFilterSubmit(true);
                            }}
                            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 disabled:opacity-50"
                            disabled={loading}
                        >
                            Tampilkan Semua
                        </button>)}
                    {!showAll && (
                        <button
                            onClick={() => handleFilterSubmit(false)}
                            className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-xl shadow-sm hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 disabled:opacity-50"
                            disabled={loading}
                        >
                            Terapkan Filter
                        </button>
                    )}
                </div>

                {!showAll && (
                    <div className="flex flex-row gap-4 flex-1">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tahun
                            </label>
                            <select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                disabled={loading}
                            >
                                {Array.from({ length: 5 }, (_, i) => {
                                    const y = dayjs().year() - i;
                                    return (
                                        <option key={y} value={y}>
                                            {y}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bulan
                            </label>
                            <select
                                value={month}
                                onChange={(e) => setMonth(Number(e.target.value))} // Konversi ke number
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                                disabled={loading}
                            >
                                {Array.from({ length: 12 }, (_, i) => {
                                    const monthNumber = i + 1;
                                    return (
                                        <option key={monthNumber} value={monthNumber}>
                                            {dayjs().month(i).format('MMMM')} {/* Menampilkan nama bulan */}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                )}
            </div>


            <div className="space-y-4">
                {data.trx.length === 0 ? (
                    <div className="text-center py-8 bg-white rounded-lg shadow">
                        <p className="text-gray-500">Tidak ada data tagihan untuk ditampilkan</p>
                    </div>
                ) : (
                    data.trx.map((trx) => (
                        <div key={trx.order_id} className="bg-gray-100 rounded-lg shadow overflow-hidden">
                            <div
                                className="flex justify-between items-center p-4 cursor-pointer bg-gray-200 hover:bg-gray-50 transition-colors"
                                onClick={() => setExpandedItems(prev => ({
                                    ...prev,
                                    [trx.order_id]: !prev[trx.order_id]
                                }))}
                            >
                                <div>
                                    <h3 className="font-semibold text-sm text-gray-800">ID: {trx.order_id}</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {formatDate(trx.paid_at)}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-bold text-gray-800 mr-3">
                                        {formatCurrency(trx.amount)}
                                    </span>
                                    {expandedItems[trx.order_id] ? (
                                        <FaChevronDown className="text-gray-500" />
                                    ) : (
                                        <FaChevronRight className="text-gray-500" />
                                    )}
                                </div>
                            </div>

                            {expandedItems[trx.order_id] && (
                                <div className="p-4 border-t">
                                    <h4 className="font-medium text-gray-700 mb-3">Detail Tagihan</h4>
                                    <div className="space-y-3">
                                        {trx.bills.map(bill => (
                                            <div key={bill.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                                                <div>
                                                    <p className="font-medium text-gray-800">{bill.nmr}. {bill.ket}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-gray-800">
                                                        {formatCurrency(parseInt(bill.jum))}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RiwayatTagihan;