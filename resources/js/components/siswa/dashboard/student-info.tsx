import { ConfirmDialog } from "@/components/ConfirmDialog ";
import { Auth, DataSiswa } from "@/types";
import { useEffect, useState } from "react";
import { FaCog, FaGraduationCap, FaIdCard, FaUser } from "react-icons/fa";


interface PropsComponent {
    auth: Auth;
    siswaData: DataSiswa;
    onBlockRequest: () => void;
}
const StudentInfo: React.FC<PropsComponent> = ({ auth, siswaData, onBlockRequest }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuOpen && !(e.target as Element).closest('.menu-container')) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [menuOpen]);

    return (
        <div className="relative flex w-full flex-col items-start rounded-t-lg bg-white p-4 px-6">
            <div className="flex items-center space-x-3">
                <FaUser className="flex-shrink-0 text-xl text-primary" />
                <h2 className="truncate text-3xl font-semibold text-primary">{auth.user?.namlen ?? siswaData.siswa.namlen ?? '******'}</h2>
            </div>
            <div className="flex items-center space-x-3">
                <FaIdCard className="flex-shrink-0 text-lg text-primary" />
                <p className="text-primary md:text-lg">NIS: {auth.user?.nis ?? siswaData.siswa.nis ?? '*****'}</p>
            </div>
            <div className="flex items-center space-x-3">
                <FaGraduationCap className="flex-shrink-0 text-lg text-primary" />
                <p className="text-primary md:text-lg">Kelas: {auth.user?.kel ?? siswaData.siswa.kel ?? '***'}</p>
            </div>

            {/* Menu Gear */}
            <div className="absolute right-4 bottom-2 menu-container">
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="p-2 focus:outline-none"
                        aria-label="Menu pengaturan"
                    >
                        <FaCog className="text-xl text-blue-500" />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 z-10 mt-1 w-40 rounded-md border bg-white shadow-md">
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    setDialogOpen(true);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                            >
                                🔒 Blokir Kartu
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title="Konfirmasi Blokir"
                description="Apakah kamu yakin ingin memblokir kartu siswa ini?"
                confirmText="Ya, Blokir"
                onConfirm={onBlockRequest}
            />
        </div>
    );
};

export default StudentInfo;