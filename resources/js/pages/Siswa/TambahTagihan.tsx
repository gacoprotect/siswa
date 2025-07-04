import { Modal } from '@/components/ui/Modal';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';

interface Props {
    open: boolean;
    onClose: (value: boolean) => void;
    nouid: string;
}

const TambahTagihan = ({ open, onClose, nouid }: Props) => {
    const [startMonth, setStartMonth] = useState(dayjs().format('YYYY-MM'));
    const [endMonth, setEndMonth] = useState(dayjs().add(1, 'month').format('YYYY-MM'));
    const { data, setData, post, processing, errors, reset } = useForm<{ nouid: string; months: number[] }>({
        nouid: nouid,
        months: [],
    });
    const lastTagihan = useCallback(async () => {
        try {
            if (!nouid) throw new Error('Tagihan tidak ditemukan');

            const url = route('api.tagihan.last', { nouid });
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.message || 'Gagal mengambil data tagihan');
            }

            if (json?.data?.month) {
                const nextMonth = dayjs(json.data.month);
                setStartMonth(nextMonth.format('YYYY-MM'));
                setEndMonth(nextMonth.add(1, 'month').format('YYYY-MM')); // default 1 bulan ke depan
            }
        } catch (error) {
            console.error('Gagal ambil tagihan terakhir:', error);
            if (onClose) setTimeout(() => onClose(false), 1000);
        }
    }, [nouid, onClose]);

    useEffect(() => {
        if (open) {
            lastTagihan();
        }
    }, [open, lastTagihan]);

    const generateMonthsArray = useCallback((start: string, end: string): number[] => {
        const monthsArray: number[] = [];
        let current = dayjs(start);
        const endDate = dayjs(end);

        while (current.isBefore(endDate) || current.isSame(endDate, 'month')) {
            monthsArray.push(current.valueOf());
            current = current.add(1, 'month');
        }
        return monthsArray;
    }, []);

    useEffect(() => {
        const monthsArray = generateMonthsArray(startMonth, endMonth);
        setData({
            nouid,
            months: monthsArray,
        });
    }, [startMonth, endMonth, generateMonthsArray, nouid, setData]);

    const handleSubmit = () => {
        console.log(data);

        post(route('api.tagihan.new', nouid), {
            onSuccess: () => {
                reset();
                onClose(false);
            },
            preserveScroll: true,
        });
    };

    const handleStartMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartMonth = e.target.value;
        setStartMonth(newStartMonth);
        if (dayjs(newStartMonth).isAfter(dayjs(endMonth))) {
            setEndMonth(dayjs(newStartMonth).add(1, 'month').format('YYYY-MM'));
        }
    };

    const handleEndMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEndMonth = e.target.value;
        if (dayjs(newEndMonth).isBefore(dayjs(startMonth))) return;
        setEndMonth(newEndMonth);
    };

    return (
        <Modal title="Buat Tagihan SPP" isOpen={open} onClose={() => onClose(false)}>
            <div className="space-y-4">
                {/* Form fields remain the same as previous implementation */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Mulai</label>
                    <input
                        type="month"
                        className="input w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={startMonth}
                        onChange={handleStartMonthChange}
                        min={dayjs().format('YYYY-MM')}
                    />
                    {errors.months && <p className="mt-1 text-sm text-red-500">{errors.months}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Sampai</label>
                    <input
                        type="month"
                        className="input w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={endMonth}
                        onChange={handleEndMonthChange}
                        min={startMonth}
                    />
                </div>
                <div className="flex justify-end pt-4">
                    <button
                        onClick={() => onClose(false)}
                        className="mr-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className={`rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
                            processing ? 'cursor-not-allowed opacity-75' : ''
                        }`}
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Tagihan'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default TambahTagihan;
