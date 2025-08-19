import { TagihanParam } from '@/pages/Siswa/Index';
import { Summary } from '@/types';
import { FaFileInvoiceDollar } from 'react-icons/fa';

interface Props {
    onClose: () => void
    setparam: (v: TagihanParam) => void;
    summary: Summary
}

const PaymentButton: React.FC<Props> = ({ onClose, setparam, summary }) => {
    const handleBayar = ({ tagihan, spr }: TagihanParam) => {
        setparam({
            spr,
            tagihan
        });
        onClose()
    };

    return (
        <button
            onClick={() =>
                handleBayar({
                    tagihan: summary.total_tagihan,
                    spr: summary.spr,
                })
            }
            className="flex items-center gap-2 rounded-lg bg-green-600 p-2 text-sm text-white transition-colors hover:bg-green-700"
            aria-label="Bayar tagihan sekarang"
        >
            <FaFileInvoiceDollar className="text-sm" />
            Bayar Sekarang
        </button>
    );
};

export default PaymentButton;
