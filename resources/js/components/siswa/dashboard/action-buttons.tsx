import { ConfirmDialog } from "@/components/ConfirmDialog ";
import { Auth, DataSiswa } from "@/types";
import { router } from "@inertiajs/react";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { FaExchangeAlt, FaKey } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";



interface PropsComponent {
    auth: Auth;
    data: DataSiswa;
    hasPined: boolean;
    onPinModalOpen: () => void;
    onSetupPinModalOpen: () => void;
    onLogout: () => void;
}
const ActionButtons: React.FC<PropsComponent> = ({ auth, data, hasPined, onPinModalOpen, onSetupPinModalOpen, onLogout }) => {
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const register = () => {
        router.get(route('register', data.nouid));
    };
    const disabled = data.summary?.reg === 0;

    if (disabled) {
        return (
            <div className={'flex items-center justify-center gap-4 border-t-2 border-b-2 border-blue-500 bg-white p-2 px-6'}>
                <AlertCircle className="font-medium text-amber-600" />
                <span className="font-medium text-amber-600">Status Akun sedang dalam verifikasi</span>
            </div>
        );
    }

    return (
        <div className="grid w-full grid-cols-2 items-center gap-4 border-b-2 p-2 px-6">
            {auth.user ? (
                <>
                    <button
                        onClick={() => setLogoutDialogOpen(true)}
                        className="flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-red-800 px-4 py-3 text-white shadow-sm transition-colors hover:bg-red-700"
                    >
                        <FiLogOut className="text-lg" />
                        <span>Keluar</span>
                    </button>

                    <ConfirmDialog
                        open={logoutDialogOpen}
                        onOpenChange={setLogoutDialogOpen}
                        title="Konfirmasi Logout"
                        description="Anda yakin ingin keluar?"
                        confirmText="Ya, Keluar"
                        onConfirm={onLogout}
                    />
                </>
            ) : (
                <button
                    onClick={onPinModalOpen}
                    className="flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50"
                    disabled={disabled}
                >
                    <FaKey className="text-lg" />
                    <span>Masukan PIN</span>
                </button>
            )}

            <button
                onClick={() => {
                    if (hasPined) {
                        onSetupPinModalOpen();
                    } else if (!hasPined && data.summary?.reg === 1) {
                        onSetupPinModalOpen();
                    } else {
                        register();
                    }
                }}
                className="flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50"
                disabled={disabled}
            >
                <FaExchangeAlt className="text-lg" />
                <span>{hasPined ? 'Ubah PIN' : ((!hasPined && data.summary?.reg === 1) ? 'Buat Pin' : 'daftar')}</span>
            </button>
        </div>
    );
};
export default ActionButtons;
