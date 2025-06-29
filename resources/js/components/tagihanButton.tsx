import { BillTagihan } from '@/types';
import { FaFileInvoiceDollar } from 'react-icons/fa';

interface HandleBayarParams {
    tagihan: number;
    spr: number | null;
    jen1: number[];
}

interface TagihanParam extends HandleBayarParams {
    nouid: string;
}

interface MonthData {
    tagihan: number;
    transactions: BillTagihan[];
}

interface Props {
    setparam: (v: TagihanParam) => void;
    monthData: MonthData;
    nouid: string;
    month?: string; 
}

const PaymentButton: React.FC<Props> = ({ setparam, monthData, nouid }) => {
    const handleBayar = ({ tagihan, spr, jen1 }: HandleBayarParams) => {
        setparam({
            spr,
            jen1,
            tagihan,
            nouid,
        });
    };

    // Precompute transactions data
    const unpaidTransactions = monthData.transactions.filter((t) => t.sta === 0);
    const hasUnpaid = unpaidTransactions.length > 0;
    const totalTagihan = unpaidTransactions.reduce((sum, t) => sum + t.jumlah, 0);

    // Get SPR values with null checks
    const sppSpr = monthData.transactions.find((t) => t.jen === 0)?.spr ?? null;
    const jen1Sprs = monthData.transactions.filter((t) => t.jen === 1 && t.spr !== undefined && t.spr !== null).map((t) => t.spr as number);

    if (!hasUnpaid) {
        return null;
    }

    return (
        <button
            onClick={() =>
                handleBayar({
                    tagihan: totalTagihan,
                    spr: sppSpr,
                    jen1: jen1Sprs,
                })
            }
            className="flex items-center gap-2 rounded-lg bg-green-600 p-2 text-sm text-white transition-colors hover:bg-green-700"
            aria-label="Bayar tagihan sekarang"
        >
            <FaFileInvoiceDollar className="text-lg" />
            Bayar Sekarang
        </button>
    );
};

export default PaymentButton;
