import PaymentButton from '@/components/tagihanButton';
import { BillTagihan } from '@/types';
import { X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { FaFileInvoice, FaFileInvoiceDollar, FaHistory, FaSpinner, FaTrashAlt } from 'react-icons/fa';
import { TagihanParam } from '../Siswa/Index';
import TambahTagihan from './TambahTagihan';
import RiwayatTagihan from './RiwayatTagihan';

interface DataTambahTagihan {
    tah: string;
    ket: string;
    jumlah: number;
    bulan: string;
}

interface SetTambahTagihan {
    spr: number[];
    data: DataTambahTagihan[];
}

export interface Summary {
    total_tagihan: number;
    total_pembayaran?: number;
    total_disc?: number;
    spr: number[];
}

const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const TagihanContent = ({ nouid, setTagihanParam, onClose }: { nouid: string; setTagihanParam: (v: TagihanParam) => void; onClose: () => void }) => {
    const [isLoading, setIsLoading] = useState(false); // Tidak perlu loading untuk operasi lokal
    const [riwayat, setRiwayat] = useState(false);
    const [buatTagihanModal, setBuatTagihanModal] = useState(false);
    const [groupedData, setGroupedData] = useState<BillTagihan[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [summary, setSummary] = useState<Summary>({
        total_tagihan: 0,
        total_disc: 0,
        spr: [],
    });
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
    // Format mata uang
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Cek apakah tagihan di masa depan
    const getIsFutureBill = (tah: string, bulan: string): boolean => {
        const monthNumber = monthNames.indexOf(bulan) + 1;
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        return parseInt(tah) > currentYear || (parseInt(tah) === currentYear && monthNumber > currentMonth);
    };

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
                const combined = [...prev, ...newItems];
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
                const existingSpr = new Set(prev.spr);
                const existingDataKeys = new Set(groupedData.map((item) => `${item.tah}-${item.bulan.toLowerCase()}-${item.ket}`));

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
                        totalNewAmount += item.jumlah;
                    }
                });

                return {
                    ...prev,
                    spr: [...prev.spr, ...newSpr],
                    total_tagihan: prev.total_tagihan + totalNewAmount,
                };
            });
        },
        [groupedData],
    );

    // Hapus tagihan (lokal)
    const handleDelete = useCallback((item: DataTambahTagihan) => {
        setGroupedData((prev) => prev.filter((bill) => !(bill.tah === item.tah && bill.bulan === item.bulan && bill.ket === item.ket)));

        setSummary((prev) => {
            const amountToRemove = item.jumlah;
            return {
                ...prev,
                total_tagihan: prev.total_tagihan - amountToRemove,
            };
        });
    }, []);
    if (isLoading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center space-y-3">
                <FaSpinner className="animate-spin text-3xl text-blue-600" />
                <span className="text-lg text-gray-700">Memuat data...</span>
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
        <div className="space-y-6 p-4">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-green-50 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Tagihan</p>
                            <p className="mt-1 text-2xl font-semibold text-gray-900">{formatCurrency(summary.total_tagihan)}</p>
                        </div>
                        <div className="rounded-full bg-white p-3">
                            <FaFileInvoiceDollar className="text-green-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={() => setBuatTagihanModal(true)}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    <FaFileInvoice />
                    Buat Tagihan
                </button>
                <button onClick={() => (setRiwayat(!riwayat))} className="flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700">
                    <FaHistory />
                    Riwayat
                </button>
            </div>

            {/* Bills Table */}
            {riwayat ? (<RiwayatTagihan nouid={nouid}/>) : (groupedData.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                    <p className="text-gray-500">Tidak ada data tagihan</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border shadow-sm">
                    <div className="bg-white p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="mb-4 text-lg font-semibold">Rincian Tagihan</h2>
                            <span className="mb-4 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                                {groupedData.filter((t) => t.jen === 0).length} Tagihan
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Tagihan</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Jumlah</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {groupedData.map((item) => {
                                        const isFutureBill = getIsFutureBill(item.tah, item.bulan);

                                        return (
                                            <tr key={`${item.tah}-${item.bulan}-${item.ket}`}>
                                                <td className="flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap text-gray-900">
                                                    {isFutureBill && (
                                                        <button
                                                            onClick={() => handleDelete(item)}
                                                            className="text-red-500 hover:text-red-700"
                                                            title="Hapus Tagihan"
                                                        >
                                                            <FaTrashAlt />
                                                        </button>
                                                    )}
                                                    {item.tah} - {item.bulan}
                                                </td>
                                                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900">{formatCurrency(item.jumlah)}</td>
                                                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900">{item.ket}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Summary Footer */}
                        <div className="mt-6 space-y-3 border-t pt-4">
                            {summary.total_disc ? (
                                <>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Total:</span>
                                        <span className="font-medium text-red-600">{formatCurrency(summary.total_tagihan - summary.total_disc)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Potongan :</span>
                                        <span className="font-medium text-red-600">{formatCurrency(summary.total_disc)}</span>
                                    </div>
                                </>
                            ) : null}

                            <div className="flex justify-between text-lg font-semibold">
                                <span>Total Tagihan:</span>
                                <span className="text-blue-600">{formatCurrency(summary.total_tagihan)}</span>
                            </div>

                            <div className="pt-4" onClick={onClose}>
                                <PaymentButton setparam={setTagihanParam} summary={summary} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Add Bill Modal */}
            <TambahTagihan setTambahTagihan={handleTambahTagihan} open={buatTagihanModal} onClose={() => setBuatTagihanModal(false)} nouid={nouid} />
        </div>
    );
};

export default TagihanContent;
