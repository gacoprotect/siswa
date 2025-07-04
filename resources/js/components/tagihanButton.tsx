import { TagihanParam } from '@/pages/Siswa/Index';
import { Summary } from '@/pages/Siswa/TagihanContent';
import { FaFileInvoiceDollar } from 'react-icons/fa';

interface Props {
    setparam: (v: TagihanParam) => void;
    summary: Summary
}

const PaymentButton: React.FC<Props> = ({ setparam, summary }) => {
    const handleBayar = ({ tagihan, spr, jen1 }: TagihanParam) => {
        setparam({
            spr,
            jen1,
            tagihan
        });
    };

    return (
        <button
            onClick={() =>
                handleBayar({
                    tagihan: summary.total_tagihan,
                    spr: summary.spr,
                    jen1: summary.jen1,
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
