import React, { useEffect, useState, useCallback } from 'react'
import { FaSpinner } from 'react-icons/fa';
import { Modal } from '../ui/Modal';
import { router, usePage } from '@inertiajs/react';
import { SelectInput } from '../SelectInput';
import { Auth, DataSiswa, TagihanSummary } from '@/types';
import { Button } from '../ui/button';

interface TagihanBaruProps {
    nouid: string | null;
    open: boolean;
    onClose: (v: boolean) => void;
}

interface Grouped {
    [tah: string]: number[];
}

const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const TagihanBaru: React.FC<TagihanBaruProps> = ({ nouid, open, onClose }) => {
    const { errors } = usePage<{ auth: Auth; data: DataSiswa; summary: TagihanSummary; errors: Record<string, string[]> }>().props
    const [grouped, setGrouped] = useState<Grouped>({});
    const [selectedYear, setSelectedYear] = useState<number | string>('');
    const [selectedMonth, setSelectedMonth] = useState<number | string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setSelectedYear('');
            setSelectedMonth('');
            setGrouped({});
        }
    }, [open]);


    const fetchData = useCallback(async () => {
        if (!nouid || !open || loading) return;

        // Prevent multiple simultaneous requests
        if (Object.keys(grouped).length > 0) return;

        setLoading(true);
        try {
            router.visit(route('bill.index', { nouid }), {
                data: { tab: 0 },
                preserveState: true,
                preserveScroll: true,
                except: ['ziggy', 'auth'],
                onStart: () => { setLoading(true) },
                onSuccess: (page) => {
                    // Response structure from getExistTagihan: { nouid, data: Grouped }
                    if (page.props.exist_bills) {
                        setGrouped(page.props.exist_bills as Grouped);
                    }
                },
                onError: (errorData) => {
                    console.error('Error loading data:', errorData);
                },
                onFinish: () => setLoading(false)
            });
        } catch (err) {
            console.error('Gagal memuat data tagihan:', err);
            setLoading(false);
        }
    }, [nouid, open, loading, grouped]);

    useEffect(() => {
        if (open) {
            fetchData();
        }
    }, [open, fetchData])

    const yearOptions = Object.keys(grouped)
        .sort((a, b) => parseInt(b) - parseInt(a))
        .map((year) => ({
            value: year,
            label: `Tahun ${year}`
        }));

    const monthOptions = selectedYear
        ? (grouped[selectedYear] || [])
            .sort((a, b) => a - b)
            .map((monthNumber) => ({
                value: monthNumber,
                label: monthNames[monthNumber - 1], // indeks bulan 0-based
            }))
        : [];

    const handleSubmit = async () => {
        if (!selectedYear || !selectedMonth) {
            console.error('Harap pilih tahun dan bulan terlebih dahulu.');
            return;
        }

        if (!nouid) {
            console.error('ID siswa tidak valid.');
            return;
        }

        setLoading(true);

        try {
            // Use bill.index with query parameters for adding tagihan
            router.visit(route('bill.index', { nouid }), {
                data: {
                    t: Number(selectedYear),
                    b: Number(selectedMonth)
                },
                preserveState: false,
                preserveScroll: true,
                except: ['ziggy', 'auth'],
                onSuccess: () => {
                    onClose(false);
                },
                onError: (errorData) => {
                    console.error('Error adding tagihan:', errorData);
                },
                onFinish: () => setLoading(false)
            });
        } catch (err) {
            console.error('Gagal menambahkan tagihan:', err);
            setLoading(false);
        }
    };

    return (
        <Modal size='md' title="Pilih Tagihan" isOpen={open} onClose={() => onClose(false)}>
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
                        <div className="grid grid-cols-2 gap-6 ">
                            <SelectInput
                                name="year"
                                label="Tahun:"
                                value={selectedYear}
                                onChange={(value) => {
                                    setSelectedYear(value);
                                    setSelectedMonth('');
                                }}
                                options={yearOptions}
                                placeholder="Pilih tahun"
                                errors={errors}
                                required
                            />

                            <SelectInput
                                name="month"
                                label="Bulan:"
                                value={selectedMonth}
                                onChange={(value) => setSelectedMonth(parseInt(value))}
                                options={monthOptions}
                                placeholder="Pilih bulan"
                                errors={errors}
                                required
                                disabled={!selectedYear}
                            />
                        </div>

                        {/* Error message */}
                        {errors && Object.keys(errors).length > 0 && (
                            <p className="pt-2 text-sm text-red-600">
                                {Object.values(errors).flat().join(', ')}
                            </p>
                        )}

                        {/* Submit button */}
                        <div className="flex justify-end pt-4">
                            <Button
                                disabled={!selectedYear || !selectedMonth || loading}
                                onClick={handleSubmit}
                            >
                                {loading ? 'Memproses...' : 'Tambahkan Tagihan'}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}

export default TagihanBaru