import PaymentButton from '@/components/tagihanButton';
import { useIsMobile } from '@/hooks/use-mobile';
import { BillTagihan } from '@/types';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaChevronDown, FaChevronUp, FaExclamationTriangle, FaFileInvoiceDollar, FaMoneyBillWave, FaSpinner } from 'react-icons/fa';

interface MonthData {
    tagihan: number;
    transactions: BillTagihan[];
}

interface GroupedData {
    [year: string]: {
        [month: string]: MonthData;
    };
}

interface Summary {
    total_tagihan: number;
    total_pembayaran: number;
    sisa_tagihan: number;
}
interface TagihanParam {
    nouid: string | null;
    spr: number | null;
    jen1: number[] | [];
    tagihan: number;
}
const StatCard = ({ title, value, icon, bgColor }: { title: string; value: string; icon: React.ReactNode; bgColor: string }) => (
    <div className={`${bgColor} rounded-lg p-4 shadow-sm`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
            </div>
            <div className="rounded-full bg-white p-3">{icon}</div>
        </div>
    </div>
);

const TagihanContent = ({ nouid, setTagihanParam }: { nouid: string; setTagihanParam: (v: TagihanParam) => void }) => {
    const isMobile = useIsMobile();
    const [isLoading, setIsLoading] = useState(true);
    const [groupedData, setGroupedData] = useState<GroupedData>({});
    const [error, setError] = useState<string | null>(null);
    const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({});
    const [summary, setSummary] = useState<Summary | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(route('tagihan.index', nouid));

                if (!response.ok) {
                    throw new Error('Gagal memuat data tagihan');
                }

                const data = await response.json();

                if (data.status !== 'success') {
                    throw new Error('Terjadi kesalahan server');
                }

                setGroupedData(data.data);
                setSummary(data.summary);

                // Set expanded state for all years
                const years = Object.keys(data.data);
                const initialExpanded = years.reduce(
                    (acc, year) => {
                        acc[year] = true;
                        return acc;
                    },
                    {} as Record<string, boolean>,
                );
                setExpandedYears(initialExpanded);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Terjadi kesalahan jaringan');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [nouid]);

    const toggleYear = (year: string) => {
        setExpandedYears((prev) => ({
            ...prev,
            [year]: !prev[year],
        }));
    };

    const getStatusBadge = (status: number) => {
        switch (status) {
            case 2:
                return (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        <FaCheckCircle className="mr-1" /> Lunas
                    </span>
                );
            case 1:
                return (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        <FaSpinner className="mr-1 animate-spin" /> Proses
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                        <FaExclamationTriangle className="mr-1" /> Belum Bayar
                    </span>
                );
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-row items-center justify-center space-x-3 py-4">
                <FaSpinner className="animate-spin text-3xl text-blue-600" />
                <span className="text-lg text-blue-600 font-bold">Memuat data</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center space-x-3 p-4 text-red-600">
                <X className="animate-pulse" />
                <span>{error}</span>
            </div>
        );
    }

    if (Object.keys(groupedData).length === 0) {
        return <div className="p-4 text-center text-gray-500">Tidak ada data tagihan</div>;
    }

    return (
        <div className="space-y-6 p-2">
            {/* Header dan Button */}
            <div className="mb-6 flex items-center justify-between space-y-3">
                <h3 className="text-2xl font-bold text-gray-800">Tagihan</h3>
                <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700">
                    <FaFileInvoiceDollar className="text-lg" />
                    Buat Tagihan
                </button>
            </div>
            {summary && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <StatCard
                        title="Total Tagihan"
                        value={`Rp ${summary.total_tagihan.toLocaleString('id-ID')}`}
                        icon={<FaFileInvoiceDollar className="text-blue-500" />}
                        bgColor="bg-blue-50"
                    />
                    <StatCard
                        title="Total Pembayaran"
                        value={`Rp ${summary.total_pembayaran.toLocaleString('id-ID')}`}
                        icon={<FaCheckCircle className="text-green-500" />}
                        bgColor="bg-green-50"
                    />
                    <StatCard
                        title="Sisa Tagihan"
                        value={`Rp ${summary.sisa_tagihan.toLocaleString('id-ID')}`}
                        icon={<FaExclamationTriangle className="text-amber-500" />}
                        bgColor="bg-amber-50"
                    />
                </div>
            )}
            {/* Daftar per Tahun */}
            {Object.entries(groupedData).map(([year, monthlyData]) => {
                const unpaidMonthsCount = Object.values(monthlyData).filter((monthData) =>
                    monthData.transactions.some((t) => t.sta === 0 && t.jen === 0),
                ).length;

                return (
                    <div key={year} className="rounded-lg border border-gray-200">
                        <button onClick={() => toggleYear(year)} className="flex w-full items-center justify-between p-4 hover:bg-gray-50">
                            <h4 className="text-lg font-semibold text-gray-800">Tahun {year}</h4>
                            <div className="flex items-center space-x-3">
                                {unpaidMonthsCount > 0 && (
                                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                        {unpaidMonthsCount} Belum Bayar
                                    </span>
                                )}
                                {expandedYears[year] ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
                            </div>
                        </button>

                        {expandedYears[year] && (
                            <div className="border-t border-gray-200">
                                {Object.entries(monthlyData).map(([month, monthData]) => (
                                    <div key={month} className="p-4">
                                        {isMobile ? (
                                            <div className="mb-3 flex-col items-center justify-between">
                                                <div className="flex items-center justify-between">
                                                    <h5 className="font-medium text-gray-700">{month}</h5>
                                                    <div className="flex items-center space-x-2">
                                                        {monthData.transactions.some((t) => t.sta === 1)
                                                            ? getStatusBadge(1)
                                                            : monthData.transactions.every((t) => t.sta === 2 || t.jen === 1)
                                                              ? getStatusBadge(2)
                                                              : getStatusBadge(0)}
                                                    </div>
                                                </div>

                                                {monthData.transactions.some((t) => t.jen === 0 && (t.sta === 0 || t.sta === 1)) && (
                                                    <div
                                                        className={`mb-3 flex items-center ${monthData.transactions.some((t) => t.sta === 0) ? 'justify-between' : 'justify-end'} `}
                                                    >
                                                        {monthData.transactions.some((t) => t.sta === 0) && (
                                                            <PaymentButton
                                                                setparam={(v) => setTagihanParam(v)}
                                                                monthData={monthData}
                                                                nouid={nouid}
                                                                month={month}
                                                            />
                                                        )}
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-sm font-medium text-gray-500">Tagihan:</span>
                                                            <span
                                                                className={`text-lg font-bold ${monthData.tagihan > 0 ? 'text-red-600' : 'text-green-600'}`}
                                                            >
                                                                Rp {Math.abs(monthData.tagihan).toLocaleString('id-ID')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex-col">
                                                <div className="mb-3 flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <h5 className="font-medium text-gray-700">{month}</h5>
                                                        {monthData.transactions.some((t) => t.sta === 1)
                                                            ? getStatusBadge(1)
                                                            : monthData.transactions.every((t) => t.sta === 2 || t.jen === 1)
                                                              ? getStatusBadge(2)
                                                              : getStatusBadge(0)}
                                                    </div>
                                                    {monthData.transactions.some((t) => t.jen === 0 && (t.sta === 0 || t.sta === 1)) && (
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-sm font-medium text-gray-500">Total Tagihan:</span>
                                                            <span
                                                                className={`text-lg font-bold ${monthData.tagihan > 0 ? 'text-red-600' : 'text-green-600'}`}
                                                            >
                                                                Rp {Math.abs(monthData.tagihan).toLocaleString('id-ID')}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                {monthData.transactions.some((t) => t.jen === 0 && (t.sta === 0 || t.sta === 1)) && (
                                                    <div
                                                        className={`mb-3 flex items-center ${monthData.transactions.some((t) => t.sta === 0) ? 'justify-between' : 'justify-end'} `}
                                                    >
                                                        {monthData.transactions.some((t) => t.sta === 0) && (
                                                            <PaymentButton
                                                                setparam={(v) => setTagihanParam(v)}
                                                                monthData={monthData}
                                                                nouid={nouid}
                                                                month={month}
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Jenis</th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                            Keterangan
                                                        </th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Jumlah</th>
                                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 bg-white">
                                                    {monthData.transactions.map((transaction, index) => (
                                                        <tr key={`${year}-${month}-${index}`}>
                                                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                                                                {transaction.jen === 0 ? (
                                                                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                                                        <FaFileInvoiceDollar className="mr-1" />
                                                                        Tagihan
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                                        <FaMoneyBillWave className="mr-1" />
                                                                        Bantuan
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-500">{transaction.ket}</td>
                                                            <td
                                                                className={`px-4 py-3 text-sm whitespace-nowrap ${
                                                                    transaction.jen === 1 ? 'text-green-600' : 'text-gray-700'
                                                                }`}
                                                            >
                                                                {transaction.jen === 1 ? '+' : ''}Rp{' '}
                                                                {Math.abs(transaction.jumlah).toLocaleString('id-ID')}
                                                            </td>
                                                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                                                                {transaction.jen === 1 ? '-' : getStatusBadge(transaction.sta)}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default TagihanContent;
