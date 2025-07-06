import { Modal } from '@/components/ui/Modal';
import { formatBulan } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { FaChevronDown, FaChevronRight, FaSpinner } from 'react-icons/fa';

interface Props {
    open: boolean;
    onClose: (value: boolean) => void;
    nouid: string;
    setTambahTagihan: (v: SetTambahTagihan) => void;
}

interface ResponseForBill {
    id: number;
    tah: string;
    bulid: number;
    jumlah: number;
    ket: string;
    jen: number; // 0 = tagihan, 1 = pengurangan
    sta: number;
}
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
interface Grouped {
    [tah: string]: {
        [bul: string]: ResponseForBill[];
    };
}

const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const TambahTagihan = ({ open, onClose, nouid, setTambahTagihan }: Props) => {
    const [grouped, setGrouped] = useState<Grouped>({});
    const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({});
    const [selectedMonths, setSelectedMonths] = useState<Record<string, Record<string, boolean>>>({});
    const [loading, setLoading] = useState(false);

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const url = route('api.tagihan.add', { nouid });
            const res = await fetch(url);
            const json = await res.json();

            if (!res.ok) throw new Error(json.message);

            const data: Grouped = json.data || {};
            setGrouped(data);

            const initExpand: Record<string, boolean> = {};
            const initSelected: Record<string, Record<string, boolean>> = {};

            Object.keys(data).forEach((year) => {
                initExpand[year] = false;
                initSelected[year] = {};
                Object.keys(data[year]).forEach((month) => {
                    initSelected[year][month] = false;
                });
            });

            setExpandedYears(initExpand);
            setSelectedMonths(initSelected);
        } catch (err) {
            console.error('Gagal ambil tagihan:', err);
        } finally {
            setLoading(false);
        }
    }, [nouid]);

    useEffect(() => {
        if (open) getData();
    }, [open, getData]);

    const toggleYear = (year: string) => {
        setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));
    };

    const toggleMonth = (year: string, month: string) => {
        setSelectedMonths((prev) => ({
            ...prev,
            [year]: {
                ...prev[year],
                [month]: !prev[year][month],
            },
        }));
    };

    const handleSubmit = () => {
        const spr: number[] = [];
        const jen1: number[] = [];
        const data: SetTambahTagihan['data'] = [];

        Object.entries(selectedMonths).forEach(([year, months]) => {
            Object.entries(months).forEach(([month, isChecked]) => {
                if (!isChecked) return;
                const bills = grouped[year]?.[month] ?? [];

                const main = bills.find((b) => b.jen === 0);
                const disc = bills.filter((b) => b.jen === 1);

                if (main) {
                    spr.push(main.id);
                    jen1.push(...disc.map((d) => d.id));

                    const totalDisc = disc.reduce((acc, d) => acc + d.jumlah, 0);

                    data.push({
                        tah: year,
                        bulan: formatBulan(month),
                        ket: main.ket,
                        jumlah: main.jumlah - totalDisc,
                    });
                }
            });
        });
        const bills = { spr, jen1, data };
        if (data.length > 0) {
            setTambahTagihan(bills);
            onClose(false);
        }
    };

    return (
        <Modal title="Pilih Tagihan SPP" isOpen={open} onClose={() => onClose(false)}>
            <div className="max-h-[75vh] space-y-6 overflow-y-auto px-1">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                        <FaSpinner className="mb-2 animate-spin text-2xl" />
                        <span>Memuat data tagihan...</span>
                    </div>
                ) : Object.keys(grouped).length === 0 ? (
                    <p className="py-4 text-center text-gray-600">Tidak ada data tagihan tersedia</p>
                ) : (
                    Object.entries(grouped)
                        .sort(([a], [b]) => parseInt(b) - parseInt(a))
                        .map(([year, months]) => (
                            <div key={year} className="overflow-hidden rounded-lg border shadow-sm">
                                <button
                                    className="flex w-full items-center justify-between bg-gray-100 px-4 py-3 transition-colors hover:bg-gray-200"
                                    onClick={() => toggleYear(year)}
                                >
                                    <span className="font-semibold text-gray-800">Tahun {year}</span>
                                    {expandedYears[year] ? <FaChevronDown /> : <FaChevronRight />}
                                </button>

                                {expandedYears[year] && (
                                    <div className="space-y-3 bg-white px-4 py-3 transition-all">
                                        {Object.keys(months)
                                            .sort((a, b) => monthNames.indexOf(a) - monthNames.indexOf(b))
                                            .map((month) => {
                                                const tagihan = months[month].filter((b) => b.jen === 0);
                                                if (tagihan.length === 0) return null;

                                                return (
                                                    <div
                                                        key={month}
                                                        className="flex items-start rounded-lg border border-gray-200 p-3 shadow-sm transition-shadow hover:shadow-md"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={`${year}-${month}`}
                                                            checked={selectedMonths[year]?.[month] || false}
                                                            onChange={() => toggleMonth(year, month)}
                                                            className="mt-1 mr-3 accent-blue-600"
                                                        />
                                                        <label htmlFor={`${year}-${month}`} className="flex-1 cursor-pointer">
                                                            <div className="font-medium text-gray-800 capitalize">{month}</div>
                                                            {tagihan.map((item) => (
                                                                <div key={item.id} className="ml-2 text-sm text-gray-600">
                                                                    {item.ket} — Rp {item.jumlah.toLocaleString('id-ID')}
                                                                </div>
                                                            ))}
                                                        </label>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                )}
                            </div>
                        ))
                )}

                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="rounded-md bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Tambahkan Tagihan
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default TambahTagihan;
