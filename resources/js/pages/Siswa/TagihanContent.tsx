import PaymentButton from '@/components/tagihanButton';
import { useIsMobile } from '@/hooks/use-mobile';
import { BillTagihan } from '@/types';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaExclamationTriangle, FaFileInvoice, FaFileInvoiceDollar, FaHistory, FaSpinner } from 'react-icons/fa';
import { TagihanParam } from './Index';
import TambahTagihan from './TambahTagihan';

export interface Summary {
    total_tagihan: number;
    total_pembayaran: number;
    sisa_tagihan: number;
    total_disc: number;
    spr: number[];
    jen1: number[];
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
    const [buatTagihanModal, setBuatTagihanModal] = useState(false);
    const [groupedData, setGroupedData] = useState<BillTagihan[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [summary, setSummary] = useState<Summary>({
        total_tagihan: 0,
        total_pembayaran: 0,
        sisa_tagihan: 0,
        total_disc: 0,
        spr: [],
        jen1: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // setIsLoading(true);
                setError(null);

                const response = await fetch(route('tagihan.index', nouid));

                if (!response.ok) {
                    throw new Error('Gagal memuat data tagihan');
                }

                const data = await response.json();

                if (data.success) {
                    throw new Error('Terjadi kesalahan server');
                }

                setGroupedData(data.data);
                setSummary(data.summary);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Terjadi kesalahan jaringan');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [nouid]);
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };
    if (isLoading) {
        return (
            <div className="flex flex-row items-center justify-center space-x-3 py-4">
                <FaSpinner className="animate-spin text-3xl text-blue-600" />
                <span className="text-lg font-bold text-blue-600">Memuat data</span>
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
    return (
        <div className="space-y-6 p-2">
            {summary && (
                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    <StatCard
                        title="Total Tagihan"
                        value={`Rp ${summary.total_tagihan.toLocaleString('id-ID')}`}
                        icon={<FaFileInvoiceDollar className="text-green-500" />}
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

            <div className="mb-6 flex items-center justify-between">
                {groupedData.length > 0 && <PaymentButton setparam={(v) => setTagihanParam(v)} summary={summary} />}
                <button onClick={()=>setBuatTagihanModal(true)} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                    <FaFileInvoice className="text-lg" />
                    Buat Tagihan
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                    <FaHistory className="text-lg" />
                    Riwayat
                </button>
            </div>

            {groupedData.length === 0 ? (
                <div className="p-4 text-center text-gray-500">Tidak ada data tagihan</div>
            ) : (
                <div className="mb-6 flex items-center justify-center">
                    <div className="w-full border-b p-2">
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
                                    {groupedData.map((item, index) => (
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
                            <span className="text-base font-semibold sm:text-lg">Pengurangan:</span>
                            <span className="text-xl font-bold text-blue-600 sm:text-2xl">{formatCurrency(summary.total_disc)}</span>
                        </div>
                        <div className="flex items-center justify-between sm:mt-6">
                            <span className="text-base font-semibold sm:text-lg">Tagihan:</span>
                            <span className="text-xl font-bold text-blue-600 sm:text-2xl">
                                {formatCurrency(summary.total_tagihan - summary.total_disc)}
                            </span>
                        </div>
                    </div>
                </div>
            )}
             <TambahTagihan open={buatTagihanModal} onClose={()=>setBuatTagihanModal(false)} nouid={nouid} />
        </div>
    );
};

export default TagihanContent;
