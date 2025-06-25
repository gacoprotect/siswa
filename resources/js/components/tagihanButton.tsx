import { BillTagihan } from '@/types';
import { router } from '@inertiajs/react';
import { FaFileInvoiceDollar } from 'react-icons/fa';

interface HandleBayarParams {
    tah: string;
    tagihan: number;
    spr: number;
    month: string;
}

interface MonthData {
    tagihan: number;
    transactions: BillTagihan[];
}
interface Props {
    monthData: MonthData;
    nouid: string;
    month: string; // Tambahkan prop month
}

const PaymentButton: React.FC<Props> = ({ monthData, nouid, month }) => {
    const handleBayar = ({ tagihan, spr, tah }: HandleBayarParams) => {
        router.get(route('tagihan.show', { nouid, bul: month }), {
            tah: tah,
            spr: spr,
            tagihan: tagihan,
            nouid: nouid,
        });
    };

    const totalTagihan = monthData.transactions.filter((t) => t.sta === 0).reduce((sum, t) => sum + t.jumlah, 0);
    const sppTransaction = monthData.transactions.find((t) => t.jen === 0);

    return (
        <>
            {monthData.transactions.some((t) => t.sta === 0) && (
                <button
                    onClick={() =>
                        handleBayar({
                            tah: sppTransaction?.tah ?? '',
                            tagihan: totalTagihan,
                            spr: sppTransaction?.spr ?? 0, // atau nilai spr yang sesuai
                            month,
                        })
                    }
                    className="flex items-center gap-2 rounded-lg bg-green-600 p-2 text-sm text-white transition-colors hover:bg-green-700"
                >
                    <FaFileInvoiceDollar className="text-lg" />
                    Bayar Sekarang
                </button>
            )}
        </>
    );
};

export default PaymentButton;
