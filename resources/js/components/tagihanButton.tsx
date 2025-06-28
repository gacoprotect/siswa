import { BillTagihan } from '@/types';
import { FaFileInvoiceDollar } from 'react-icons/fa';

interface HandleBayarParams {
    tah: string;
    tagihan: number;
    spr: number[];
    month: string;
    jen1: number[];
}
interface TagihanParam {
    nouid: string;
    bul: string;
    tah: string;
    spr: number[];
    jen1: number[];
    tagihan: number;
}
interface MonthData {
    tagihan: number;
    transactions: BillTagihan[];
}
interface Props {
    setparam: (v: TagihanParam) => void;
    monthData: MonthData;
    nouid: string;
    month: string; // Tambahkan prop month
}

const PaymentButton: React.FC<Props> = ({ setparam, monthData, nouid, month }) => {
    const handleBayar = ({ tagihan, spr, tah, jen1 }: HandleBayarParams) => {
        setparam({
            tah: tah,
            bul: month,
            spr: spr,
            jen1: jen1,
            tagihan: tagihan,
            nouid: nouid,
        });
        // router.get(route('tagihan.show', { nouid, bul: month }), {
        //     tah: tah,
        //     spr: spr,
        //     tagihan: tagihan,
        //     nouid: nouid,
        // });
    };

    const totalTagihan = monthData.transactions.filter((t) => t.sta === 0).reduce((sum, t) => sum + t.jumlah, 0);
    const sppTransaction = monthData.transactions.find((t) => t.jen === 0);
    const trxjen1 = monthData.transactions.find((t) => t.jen === 1);
    return (
        <>
            {monthData.transactions.some((t) => t.sta === 0) && (
                <button
                    onClick={() =>
                        handleBayar({
                            tah: sppTransaction?.tah ?? '',
                            tagihan: totalTagihan,
                            spr: Array.isArray(sppTransaction?.spr)
                                ? sppTransaction?.spr
                                : typeof sppTransaction?.spr === 'number'
                                  ? [sppTransaction.spr]
                                  : [],
                            month,
                            jen1: Array.isArray(trxjen1?.spr) ? trxjen1?.spr : typeof trxjen1?.spr === 'number' ? [trxjen1.spr] : [],
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
