import PaymentButton from '@/components/tagihanButton';
import { useIsMobile } from '@/hooks/use-mobile';
import { BillTagihan } from '@/types';
import { X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { FaExclamationTriangle, FaFileInvoice, FaFileInvoiceDollar, FaHistory, FaSpinner } from 'react-icons/fa';
import { TagihanParam } from './Index';
import TambahTagihan from './TambahTagihan';
interface DataTambahTagihan {
    tah: string;
    ket: string;
    jumlah: number;
    bulan: string; // juli , agustus, format indonesia
}

interface SetTambahTagihan {
    spr: number[];
    jen1: number[];
    data: DataTambahTagihan[];
}
export interface Summary {
    total_tagihan: number;
    total_pembayaran?: number;
    sisa_tagihan: number;
    total_disc?: number;
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
        // total_pembayaran: 0,
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

    const handleTambahTagihan = useCallback(
        (items: SetTambahTagihan) => {
            if (!items?.data?.length) return;

            setGroupedData((prev) => {
                const existingKeys = new Set(prev.map((item) => `${item.tah}-${item.bulan.toLowerCase()}-${item.ket}`));

                const newItems = items.data.filter((item) => {
                    const normalizedMonth = item.bulan.toLowerCase();
                    const key = `${item.tah}-${normalizedMonth}-${item.ket}`;
                    return !existingKeys.has(key);
                });

                // Gabungkan dan urutkan data
                const combined = [...prev, ...newItems];

                // Urutkan berdasarkan tahun (desc) dan bulan (asc)
                return combined.sort((a, b) => {
                    const yearCompare = parseInt(b.tah) - parseInt(a.tah);
                    if (yearCompare !== 0) return yearCompare;

                    const monthOrder = [
                        'januari',
                        'februari',
                        'maret',
                        'april',
                        'mei',
                        'juni',
                        'juli',
                        'agustus',
                        'september',
                        'oktober',
                        'november',
                        'desember',
                    ];
                    return monthOrder.indexOf(a.bulan.toLowerCase()) - monthOrder.indexOf(b.bulan.toLowerCase());
                });
            });

            setSummary((prev) => {
                // Buat mapping untuk pengecekan duplikat
                const existingSpr = new Set(prev.spr);
                const existingJen1 = new Set(prev.jen1);
                const existingDataKeys = new Set(groupedData.map((item) => `${item.tah}-${item.bulan.toLowerCase()}-${item.ket}`));

                // Hitung hanya data yang benar-benar baru
                let totalNewAmount = 0;
                const newSpr: number[] = [];
                const newJen1: number[] = [];

                items.data.forEach((item, index) => {
                    const normalizedMonth = item.bulan.toLowerCase();
                    const dataKey = `${item.tah}-${normalizedMonth}-${item.ket}`;

                    if (!existingDataKeys.has(dataKey)) {
                        if (!existingSpr.has(items.spr[index])) {
                            newSpr.push(items.spr[index]);
                        }
                        if (items.jen1[index] && !existingJen1.has(items.jen1[index])) {
                            newJen1.push(items.jen1[index]);
                        }
                        totalNewAmount += item.jumlah;
                    }
                });

                return {
                    ...prev,
                    spr: [...prev.spr, ...newSpr],
                    jen1: [...prev.jen1, ...newJen1],
                    total_tagihan: prev.total_tagihan + totalNewAmount,
                    sisa_tagihan: prev.total_tagihan + totalNewAmount - (prev.total_pembayaran || 0) - (prev.total_disc || 0),
                };
            });
        },
        [groupedData],
    );

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

            <div className="mb-6 flex items-center justify-between gap-2">
                <button
                    onClick={() => setBuatTagihanModal(true)}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                    <FaFileInvoice className="text-sm" />
                    Buat Tagihan
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                    <FaHistory className="text-sm" />
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
                                            Tagihan
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
                                    {groupedData.map((item) => (
                                        <tr key={`${item.tah}-${item.bulan}-${item.ket}`}>
                                            <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6">{item.tah}-{item.bulan}</td>
                                            {/* <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6">{item.bulan}</td> */}
                                            <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6">
                                                {formatCurrency(item.jumlah)}
                                            </td>
                                            <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900 sm:px-6">{item.ket}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {summary.total_disc !== 0 && (
                            <div className="mt-4 flex items-center justify-between sm:mt-6">
                                <span className="text-base font-semibold sm:text-lg">Pengurangan:</span>
                                <span className="text-xl font-bold text-blue-600 sm:text-2xl">{formatCurrency(summary.total_disc ?? 0)}</span>
                            </div>
                        )}
                        <div className="flex items-center justify-between sm:mt-6">
                            <span className="text-base font-semibold sm:text-lg">Tagihan:</span>
                            <span className="text-xl font-bold text-blue-600 sm:text-2xl">
                                {formatCurrency(summary.total_tagihan - (summary.total_disc ?? 0))}
                            </span>
                        </div>
                        <div className="mt-6 flex items-center justify-end">
                            <PaymentButton setparam={(v) => setTagihanParam(v)} summary={summary} />
                        </div>
                    </div>
                </div>
            )}
            <TambahTagihan setTambahTagihan={handleTambahTagihan} open={buatTagihanModal} onClose={() => setBuatTagihanModal(false)} nouid={nouid} />
        </div>
    );
};

export default TagihanContent;
