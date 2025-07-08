import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaSpinner } from 'react-icons/fa';

interface Props {
    open: boolean;
    onClose: (value: boolean) => void;
    nouid: string;
    setTambahTagihan: (v: SetTambahTagihan) => void;
}
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
    const [loading, setLoading] = useState(false);
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedBills, setSelectedBills] = useState<ResponseForBill[]>([]);
    const [showAllMonths, setShowAllMonths] = useState(false); // New state

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const url = route('api.tagihan.add', { nouid });
            const res = await fetch(url);
            const json = await res.json();

            if (!res.ok) throw new Error(json.message);

            const data: Grouped = json.data || {};
            setGrouped(data);

            // Set default selected year to the first available year
            if (Object.keys(data).length > 0 && !selectedYear) {
                setSelectedYear(Object.keys(data)[0]);
            }
        } catch (err) {
            console.error('Gagal ambil tagihan:', err);
        } finally {
            setLoading(false);
        }
    }, [nouid, selectedYear]);

    useEffect(() => {
        if (open) getData();
    }, [open, getData]);

    const monthOptions = selectedYear
        ? [
              { value: '', label: 'Semua Bulan' },
              ...Object.keys(grouped[selectedYear] || {})
                  .sort((a, b) => monthNames.indexOf(a) - monthNames.indexOf(b))
                  .map((month) => ({ value: month, label: month })),
          ]
        : [];

    const toggleBillSelection = (bill: ResponseForBill) => {
        setSelectedBills((prev) => {
            const isSelected = prev.some((b) => b.id === bill.id);
            if (isSelected) {
                return prev.filter((b) => b.id !== bill.id);
            } else {
                return [...prev, bill];
            }
        });
    };

    const handleSubmit = () => {
        const spr: number[] = [];
        const jen1: number[] = [];
        const data: DataTambahTagihan[] = [];

        selectedBills.forEach((bill) => {
            // Get the correct month name from the bill data
            const monthName = monthNames[bill.bulid - 1] || 'Undefined';

            if (bill.jen === 0) {
                spr.push(bill.id);
                data.push({
                    tah: bill.tah,
                    bulan: monthName, // Use the properly formatted month name
                    ket: bill.ket,
                    jumlah: bill.jumlah,
                });
            } else {
                jen1.push(bill.id);
            }
        });

        console.log('SUBMIT DATA', data);

        if (data.length > 0) {
            setTambahTagihan({ spr, jen1, data });
            onClose(false);
        }
    };

    // Modified displayBills to ensure consistent month data
    const displayBills = () => {
        if (!selectedYear) return [];

        if (!selectedMonth) {
            // When showing all months
            return Object.entries(grouped[selectedYear]).flatMap(([month, bills]) =>
                bills
                    .filter((b) => b.jen === 0)
                    .map((bill) => ({
                        ...bill,
                        monthName: month,
                        bulid: monthNames.indexOf(month) + 1 || bill.bulid, // Fallback to original bulid if not found
                    })),
            );
        }

        // When showing specific month
        return (grouped[selectedYear]?.[selectedMonth] || [])
            .filter((b) => b.jen === 0)
            .map((bill) => ({
                ...bill,
                monthName: selectedMonth,
                bulid: monthNames.indexOf(selectedMonth) + 1 || bill.bulid, // Fallback to original bulid
            }));
    };
    return (
        <Modal title="Pilih Tagihan" isOpen={open} onClose={() => onClose(false)}>
            <div className="max-h-[75vh] space-y-6 overflow-y-auto px-1">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                        <FaSpinner className="mb-2 animate-spin text-2xl" />
                        <span>Memuat data tagihan...</span>
                    </div>
                ) : Object.keys(grouped).length === 0 ? (
                    <p className="py-4 text-center text-gray-600">Tidak ada data tagihan tersedia</p>
                ) : (
                    <>
                        <div className="flex flex-row gap-2">
                            {/* Tahun Dropdown */}
                            <select
                                value={selectedYear}
                                onChange={(e) => {
                                    setSelectedYear(e.target.value);
                                    setSelectedMonth(''); // Reset to "Semua Bulan"
                                }}
                                className="w-full bg-gray-100 px-4 py-3 font-semibold text-gray-800"
                            >
                                {Object.keys(grouped)
                                    .sort((a, b) => parseInt(b) - parseInt(a))
                                    .map((year) => (
                                        <option key={year} value={year}>
                                            Tahun {year}
                                        </option>
                                    ))}
                            </select>

                            {/* Bulan Dropdown */}
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="w-full bg-gray-100 px-4 py-3 font-semibold text-gray-800 capitalize"
                                disabled={!selectedYear}
                            >
                                {monthOptions.map(({ value, label }) => (
                                    <option key={value || 'all'} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Display bills */}
                        {selectedYear && (
                            <div className="space-y-4">
                                {displayBills().map(({ id, ket, jumlah, monthName, bulid }) => {
                                    const isSelected = selectedBills.some((b) => b.id === id);
                                    return (
                                        <div
                                            key={id}
                                            className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-shadow hover:shadow-md"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-800">{ket}</div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span>Rp {jumlah.toLocaleString('id-ID')}</span>
                                                    {!selectedMonth && <span className="text-xs text-gray-400">{monthName}</span>}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    toggleBillSelection({
                                                        id,
                                                        ket,
                                                        jumlah,
                                                        tah: selectedYear,
                                                        bulid,
                                                        jen: 0,
                                                        sta: 0,
                                                    })
                                                }
                                                className={cn(
                                                    `rounded-full p-2 text-blue-600 transition hover:bg-blue-50`,
                                                    isSelected && 'text-red-500 hover:bg-red-50',
                                                )}
                                                title={isSelected ? 'Hapus tagihan' : 'Tambahkan tagihan'}
                                            >
                                                {isSelected ? <FaMinus /> : <FaPlus />}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Submit button */}
                        {selectedBills.length > 0 && (
                            <div className="flex justify-end pt-4">
                                <button onClick={handleSubmit} className="rounded-md bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700">
                                    Tambahkan {selectedBills.length} Tagihan
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Modal>
    );
};

export default TambahTagihan;
