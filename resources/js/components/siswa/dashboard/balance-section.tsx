import { PageState } from "@/pages/Siswa/Index";
import { FaHistory, FaPlusCircle, FaWallet } from "react-icons/fa";

interface PropsComponent { formattedSaldo: string; onNavigate: (page: PageState) => void; }

const BalanceSection:React.FC<PropsComponent> = ({ formattedSaldo, onNavigate }) => (
    <div className="mb-4 w-full shadow-[0px_10px_10px_-4px_rgba(0,0,0,0.1)] shadow-black">
        <div className="flex w-full flex-row items-center justify-between gap-4 p-4 sm:px-6">
            <div className="flex flex-col space-y-4">
                <h1 className="text-lg font-semibold text-primary-foreground">Saldo Tabungan</h1>
                <div className="flex items-center gap-2 text-primary-foreground">
                    <FaWallet className="text-xl" />
                    <span className="text-xl font-bold">{formattedSaldo}</span>
                </div>
            </div>

            <div className="flex flex-col items-end justify-end space-y-4">
                <button
                    onClick={() => onNavigate('topup')}
                    className="flex items-center gap-2 rounded-md bg-primary-foreground px-4 py-2 text-primary hover:bg-accent"
                >
                    <FaPlusCircle />
                    <span>Topup</span>
                </button>
                <button
                    onClick={() => onNavigate('riwayat')}
                    className="flex items-center gap-2 rounded-md bg-primary-foreground px-4 py-2 text-primary hover:bg-accent"
                >
                    <FaHistory />
                    <span>Riwayat</span>
                </button>
            </div>
        </div>
    </div>
);
export default BalanceSection ;