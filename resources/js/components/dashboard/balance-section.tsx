import { useLoading } from "@/contexts/loading-context";
import { usePinContext } from "@/contexts/pin-context";
import { router } from "@inertiajs/react";
import { FaHistory, FaPlusCircle, FaWallet } from "react-icons/fa";

interface PropsComponent { formattedSaldo: string; }

const BalanceSection: React.FC<PropsComponent> = ({ formattedSaldo }) => {
    const { setLoading } = useLoading();
    const { verifyPinForExecute, pinHook } = usePinContext();
    const redirect = (page: string) => {
        router.visit(route(`${page}.index`, pinHook?.data.nouid), {
            preserveState: true,
            preserveScroll: true,
            onBefore: () => setLoading(true),
            onFinish: () => setLoading(false),
        })
    }
    const handleClick = (page: 'topup' | 'riwayat') => {
        if (page === 'topup') return redirect(page);
        verifyPinForExecute(() => {
            redirect(page)
        })
    }

    return (
        <div className="mb-4 w-full shadow-[0px_10px_10px_-4px_rgba(0,0,0,0.1)] shadow-black">
            <div className="flex w-full flex-row items-center justify-between gap-4 p-4 sm:px-6">
                <div className="flex flex-col space-y-4">
                    <h1 className="text-lg font-semibold text-white">Saldo Tabungan</h1>
                    <div className="flex items-center gap-2 text-white">
                        <FaWallet className="text-xl" />
                        <span className="text-xl font-bold">{formattedSaldo}</span>
                    </div>
                </div>

                <div className="flex flex-col items-end justify-end space-y-4">
                    <button
                        onClick={() => handleClick('topup')}
                        className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-primary hover:bg-accent"
                    >
                        <FaPlusCircle />
                        <span>Topup</span>
                    </button>
                    <button
                        onClick={() => handleClick('riwayat')}
                        className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-primary hover:bg-accent"
                    >
                        <FaHistory />
                        <span>Riwayat</span>
                    </button>
                </div>
            </div>
        </div>
    )
};
export default BalanceSection;