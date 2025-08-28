import { Modal } from '@/components/ui/Modal';
import { useCallback, useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface Props {
    open: boolean;
    onClose: (value: boolean) => void;
    nouid: string;
    setTambahTagihan: (v: SetTambahTagihan) => void;
}


interface DataTambahTagihan {
    tah: string;
    ket: string;
    jumlah: number;
    bulan: string; // Juli, Agustus, dst (format Indonesia)
}

interface SetTambahTagihan {
    spr: number[];
    data: DataTambahTagihan[];
}

interface Grouped {
    [tah: string]: number[];
}

const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const TambahTagihan = ({ open, onClose, nouid, setTambahTagihan }: Props) => {
    const [grouped, setGrouped] = useState<Grouped>({});
    const [loading, setLoading] = useState(false);
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<number | ''>('');
    const [error, setError] = useState<string>('');

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const url = route('api.tagihan.exists', { nouid });
            const res = await fetch(url);
            const json = await res.json();

            if (!res.ok) throw new Error(json.message);

            const data: Grouped = json.data || {};
            setGrouped(data);
        } catch (err) {
            console.error('Gagal ambil tagihan:', err);
        } finally {
            setLoading(false);
        }
    }, [nouid]);

    useEffect(() => {
        if (open) {
            setSelectedYear('');
            setSelectedMonth('');
            setError('');
            getData();
        }
    }, [open, getData]);

    const monthOptions = selectedYear
        ? (grouped[selectedYear] || [])
              .sort((a, b) => a - b)
              .map((monthNumber) => ({
                  value: monthNumber,
                  label: monthNames[monthNumber - 1], // indeks bulan 0-based
              }))
        : [];

    const handleSubmit = useCallback(async () => {
        if (!selectedYear || !selectedMonth) {
            setError('Harap pilih tahun dan bulan terlebih dahulu.');
            return;
        }

        setError('');
        try {
            const url = route('api.tagihan.add', { nouid }) + `?t=${selectedYear}&b=${selectedMonth}`;
            const res = await fetch(url);
            const json = await res.json();

            if (!res.ok || !json.success) throw new Error(json.message);

            const data: SetTambahTagihan = json.data || {};
            setTambahTagihan(data);
            onClose(false);
        } catch (err) {
            console.error('Gagal ambil tagihan:', err);
            setError('Gagal mengambil data tagihan. Coba lagi.');
        }
    }, [nouid, selectedYear, selectedMonth, onClose, setTambahTagihan]);

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
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Sampai */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">Sampai:</label>
                                <div className="flex flex-row gap-3">
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => {
                                            setSelectedYear(e.target.value);
                                            setSelectedMonth('');
                                        }}
                                        className="w-full rounded-md border bg-white px-4 py-2 text-gray-800"
                                    >
                                        <option value="">-- Pilih Tahun --</option>
                                        {Object.keys(grouped)
                                            .sort((a, b) => parseInt(b) - parseInt(a))
                                            .map((year) => (
                                                <option key={year} value={year}>
                                                    Tahun {year}
                                                </option>
                                            ))}
                                    </select>

                                    <select
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                        className="w-full rounded-md border bg-white px-4 py-2 text-gray-800 capitalize"
                                        disabled={!selectedYear}
                                    >
                                        <option value="">-- Pilih Bulan --</option>
                                        {monthOptions.map(({ value, label }) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Error message */}
                        {error && <p className="pt-2 text-sm text-red-600">{error}</p>}

                        {/* Submit button */}
                        <div className="flex justify-end pt-4">
                            <button
                                disabled={!selectedYear || !selectedMonth}
                                onClick={handleSubmit}
                                className="rounded-md bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                            >
                                Tambahkan Tagihan
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default TambahTagihan;
