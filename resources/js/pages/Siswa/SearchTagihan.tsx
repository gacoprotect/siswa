import InputGroup from '@/components/InputGroup';
import { Modal } from '@/components/ui/Modal';
import { useState } from 'react';
import { FaChevronDown, FaChevronRight, FaSpinner } from 'react-icons/fa';

interface Props {
    open: boolean;
    onClose: (value: boolean) => void;
    nouid: string;
    setTambahTagihan: (v: SetTambahTagihan) => void;
}
interface SetTambahTagihan {
    spr: number[];
    jen1: number[];
    data: DataTambahTagihan[];
}
interface DataTambahTagihan {
    tah: string;
    ket: string;
    jumlah: number;
    bulan: string; // juli , agustus, format indonesia
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
const SearchTagihan = ({ open, onClose, nouid, setTambahTagihan }: Props) => {
    const [loading, setLoading] = useState(false);
    const contoh = [
        {
            id: 1,
            tah: "2025",
            bulid: 8,
            jumlah: 100000,
            ket: "SPP SMA TA 2025/2026",
            jen: 0, // 0 = tagihan, 1 = pengurangan
            sta: 0,
        },
        {
            id: 1,
            tah: "2025",
            bulid: 8,
            jumlah: 30000,
            ket: "Extrakulikuler Agustus-2025",
            jen: 0, // 0 = tagihan, 1 = pengurangan
            sta: 0,
        },
    ] as ResponseForBill[];
    return (
        <Modal title="Pilih Tagihan" isOpen={open} onClose={() => onClose(false)}>
            <div className='flex flex-row gap-2'>
                <InputGroup name='tahun' label='Tahun' type='date' onChange={()=>''}/>
                <InputGroup name='bulan' label='Bulan' type='date' onChange={()=>''}/>
            </div>
            <div className="max-h-[75vh] space-y-6 overflow-y-auto px-1">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                        <FaSpinner className="mb-2 animate-spin text-2xl" />
                        <span>Memuat data tagihan...</span>
                    </div>
                ) : Object.keys(contoh).length === 0 ? (
                    <p className="py-4 text-center text-gray-600">Tidak ada data tagihan tersedia</p>
                ) : (
                    <div></div>
                )}
            </div>
        </Modal>
    );
};

export default SearchTagihan;
