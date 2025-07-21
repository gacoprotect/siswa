import { Blokir } from '@/components/blokir';
import { ConfirmDialog } from '@/components/ConfirmDialog ';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/Layout/AppLayout';
import { cn, formatIDR } from '@/lib/utils';
import { Auth, DataSiswa, SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    FaArrowAltCircleLeft,
    FaAtom,
    FaCog,
    FaExchangeAlt,
    FaFileInvoiceDollar,
    FaFootballBall,
    FaGraduationCap,
    FaHistory,
    FaIdCard,
    FaKey,
    FaPlusCircle,
    FaUser,
    FaUserGraduate,
    FaWallet,
} from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { route } from 'ziggy-js';
import Topup from '../Topup';
import PaymentPage from '../Transaction/Tagihan';
import DataSiswaContent from './DataSiswaContent';
import Excul from './Excul';
import PinPage from './Pin';
import SetupPinPage from './SetupPin';
import TagihanContent from '../Tagihan/TagihanContent';
import { StatusCard } from '@/components/status-card';

// Type definitions
type PageState = 'index' | 'topup' | 'riwayat' | 'tagihan';
type ModalState = 'pin' | 'setupPin' | 'blokir' | null;

export interface TagihanParam {
    nouid?: string;
    spr: number[] | [];
    tagihan: number;
}
export default function SiswaDashboard() {
    const { auth, data } = usePage<{ auth: Auth; data: DataSiswa }>().props;
    console.count("Component Render : ");

    // State management
    const [siswaData, setSiswaData] = useState(data);
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const [page, setPage] = useState<PageState>('index');
    // const [isBlocked, setIsBlocked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isHistory, setIsHistory] = useState(false);
    const [hasPined, setHasPined] = useState(Boolean(data.summary?.pin));
    const [openModal, setOpenModal] = useState<ModalState>(null);
    const [tagihanParam, setTagihanParam] = useState<TagihanParam>({
        spr: [],
        tagihan: 0,
    });

    useToast(usePage<SharedData>().props);
    useEffect(() => {
        setSiswaData(data);
    }, [data]);

    const navigateToPage = useCallback(async (newPage: PageState) => {
        if (newPage === 'riwayat') {
            setIsHistory(true);
            setOpenModal('pin');
        } else {
            setPage(newPage);
        }
    }, []);
    const menuItems = useMemo(
        () => [
            {
                title: 'Tagihan',
                icon: <FaFileInvoiceDollar className="h-6 w-6 text-green-600" />,
                color: 'border-green-700 bg-green-50 hover:bg-green-100',
                content: (
                    <TagihanContent
                        nouid={siswaData.nouid}
                        setTagihanParam={(v: TagihanParam) => {
                            setTagihanParam(v);
                            navigateToPage('tagihan');
                        }}
                        onClose={() => setActiveItem(null)}
                    />
                ),
            },
            {
                title: 'Data Siswa',
                icon: <FaUserGraduate className="h-6 w-6 text-amber-600" />,
                color: 'border-amber-700 bg-amber-50 hover:bg-amber-100',
                content: <DataSiswaContent nouid={siswaData.nouid} siswa={siswaData.siswa} />,
            },
            {
                title: 'Kegiatan',
                icon: <FaFootballBall className="h-6 w-6 text-rose-600" />,
                color: 'border-rose-700 bg-rose-50 hover:bg-rose-100',
                content: <Excul nouid={data.nouid} />,
            },
        ],
        [siswaData, navigateToPage, data],
    );

    const refreshData = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetch(route('api.siswa', siswaData.nouid) + `?nouid=${encodeURIComponent(siswaData.nouid)}`);
            if (!res.ok) {
                console.error('Terjadi kesalahan saat mengambil data siswa');
            }

            const data = await res.json();

            if (data.success !== true) {
                console.error(data.message || 'Terjadi kesalahan pada server');
            }

            setSiswaData(data.data);
        } catch (err) {
            setIsLoading(false);
            console.error(err instanceof Error ? err.message : 'Terjadi kesalahan jaringan');
        } finally {
            setIsLoading(false);
        }
    }, [siswaData]);

    const openPinModal = useCallback(async () => {
        if (!isLoading) setOpenModal('pin');
    }, [isLoading]);

    const openSetupPinModal = useCallback(async () => {
        if (!isLoading) setOpenModal('setupPin');
    }, [isLoading]);

    const closeModal = useCallback(async (success = false) => {
        setOpenModal(null);
        if (!success) {
            setIsHistory(false);
            setPage('index');
        }
    }, []);

    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const handleLogout = useCallback(() => {
        router.post(
            route('siswa.logout', siswaData.nouid),
            {},
            {
                onStart: () => setIsLoading(true),
                onSuccess: () => setIsLoading(false),
                onError: () => setIsLoading(false),
            },
        );
    }, [siswaData.nouid]);

    // Formatted values
    const formattedSaldo = useMemo(() => formatIDR(siswaData?.siswa.balance || 0), [siswaData?.siswa.balance]);

    // Dynamic content renderer
    const renderActiveContent = useMemo(() => {
        if (activeItem === null) return null;
        const item = menuItems[activeItem];
        return item?.content ? (
            <AppLayout title={item?.title || 'MAI'}>
                <div className="min-h-screen overflow-hidden rounded-lg bg-white shadow-md">
                    <div className="flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground">
                        <button onClick={() => setActiveItem(null)} className="flex items-center space-x-2 transition-opacity hover:opacity-80" aria-label="Kembali">
                            <FaArrowAltCircleLeft className="text-primary-foreground" />
                            <span>Kembali</span>
                        </button>
                        <h1 className="text-2xl font-bold text-white">{item?.title}</h1>
                    </div>
                    {item.content}
                </div>
            </AppLayout>
        ) : (
            <div>Konten tidak tersedia</div>
        );
    }, [activeItem, menuItems]);

    // Student info component
    const StudentInfo = () => {
        const [menuOpen, setMenuOpen] = useState(false);
        const [dialogOpen, setDialogOpen] = useState(false);

        return (
            <div className="relative flex w-full flex-col items-start rounded-t-lg bg-white p-4 px-6">
                <div className="flex items-center space-x-3">
                    <FaUser className="flex-shrink-0 text-xl text-primary" />
                    <h2 className="truncate text-3xl font-semibold text-primary">{siswaData?.siswa.namlen || '******'}</h2>
                </div>
                <div className="flex items-center space-x-3">
                    <FaIdCard className="flex-shrink-0 text-lg text-primary" />
                    <p className="text-primary md:text-lg">NIS: {siswaData?.siswa.nis || '*****'}</p>
                </div>
                <div className="flex items-center space-x-3">
                    <FaGraduationCap className="flex-shrink-0 text-lg text-primary" />
                    <p className="text-primary md:text-lg">Kelas: {siswaData?.siswa.kel || '******'}</p>
                </div>

                {/* Menu Gear */}
                <div className="absolute right-4 bottom-2">
                    <div className="relative">
                        <div className="cursor-pointer p-2" onClick={() => setMenuOpen((prev) => !prev)}>
                            <FaCog className="text-xl text-blue-500" />
                        </div>

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

                {/* Dialog konfirmasi blokir */}
                <ConfirmDialog
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    title="Konfirmasi Blokir"
                    description="Apakah kamu yakin ingin memblokir kartu siswa ini?"
                    confirmText="Ya, Blokir"
                    onConfirm={() => {
                        setOpenModal('blokir');
                    }}
                />
            </div>
        );
    };

    // Action buttons component
    const ActionButtons = () => {
        const register = () => {
            router.get(route('register', data.nouid))
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
                            onConfirm={handleLogout}
                        />
                    </>
                ) : (
                    <button
                        onClick={openPinModal}
                        className="flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50"
                    >
                        <FaKey className="text-lg" />
                        <span>Masukan PIN</span>
                    </button>
                )}

                <button
                    onClick={() => {
                        if (hasPined) {
                            openSetupPinModal()
                        } else { register() }
                    }
                    }
                    className="flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50"
                >
                    <FaExchangeAlt className="text-lg" />
                    <span>{hasPined ? 'Ubah PIN' : 'Daftar'}</span>
                </button>
            </div>
        )
    };

    // Balance section component
    const BalanceSection = () => (
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
                        onClick={() => navigateToPage('topup')}
                        className="flex items-center gap-2 rounded-md bg-primary-foreground px-4 py-2 text-primary hover:bg-accent"
                    >
                        <FaPlusCircle />
                        <span>Topup</span>
                    </button>
                    <button
                        onClick={() => navigateToPage('riwayat')}
                        className="flex items-center gap-2 rounded-md bg-primary-foreground px-4 py-2 text-primary hover:bg-accent"
                    >
                        <FaHistory />
                        <span>Riwayat</span>
                    </button>
                </div>
            </div>
        </div>
    );

    // Menu items component
    const MenuItems = () => (
        <div className="mb-6 grid grid-cols-3 gap-4 px-4 sm:grid-cols-5">
            {menuItems.map((item, index) => (
                <button
                    key={index}
                    className={`flex flex-col items-center justify-center rounded-xl border border-t-5 p-2 transition duration-200 ${item.color}`}
                    onClick={() => setActiveItem(index)}
                >
                    {item.icon}
                    <span className="mt-2 text-center text-sm font-semibold text-gray-800">{item.title}</span>
                </button>
            ))}
        </div>
    );

    if (isLoading) {
        return (
            <AppLayout title="Loading...">
                <div className="flex min-h-screen flex-col items-center justify-center space-y-6 bg-blue-100">
                    <FaAtom className="animate-spin-slow text-5xl text-blue-400" />
                    <div className="relative">
                        <div className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-2xl font-bold tracking-wider text-transparent">
                            Memuat Data
                        </div>
                        <div className="animate-loading-line absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600"></div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <>
            {!data.active ? (
                <AppLayout title="Kartu Siswa">
                    <div className="flex min-h-screen items-center bg-white">
                        <div className="mx-2 flex w-full flex-col items-center justify-center rounded-lg border-2 border-red-400 bg-red-50 p-6 text-center shadow-sm">
                            <h3 className="mb-2 text-lg font-semibold text-red-600">🔒 Kartu Diblokir</h3>
                            <p className="mb-4 text-sm text-red-700">
                                Kartu ini telah diblokir dan tidak dapat digunakan. Silakan aktifkan kembali untuk melanjutkan.
                            </p>
                            <button
                                onClick={() => setOpenModal('setupPin')}
                                className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                            >
                                🔓 Aktifkan Kembali
                            </button>
                        </div>
                    </div>
                </AppLayout>
            ) : (
                <>
                    {activeItem !== null ? (renderActiveContent) :

                        page === 'index' ? (
                            <AppLayout title={siswaData?.siswa.namlen || 'Login'}>
                                <StudentInfo />
                                <ActionButtons />

                                {auth.user && (
                                    <>
                                        <BalanceSection />
                                        <MenuItems />

                                    </>
                                )}

                                {(data.summary?.reg === 0) ? (
                                    // For reg === 0 (success)
                                    <StatusCard
                                        variant="success"
                                        title="Pendaftaran Anda berhasil"
                                        description={
                                            <>
                                                <p>Terima kasih! Kami sedang memverifikasi data Anda.</p>
                                                <p>PIN akan dikirim ke nomor WhatsApp Anda setelah disetujui.</p>
                                                <p>Pastikan nomor WhatsApp yang Anda daftarkan aktif untuk menerima informasi lebih lanjut.</p>
                                            </>
                                        }
                                    />) : (data.summary?.reg === -1) ? (

                                        // For reg === -1 (error)
                                        <StatusCard
                                            variant="error"
                                            title="Pendaftaran Anda ditolak"
                                            description={
                                                <>
                                                    <p>Mohon maaf, pendaftaran Anda belum dapat disetujui pada saat ini.</p>
                                                    <p>Silakan mendaftar kembali dengan memastikan seluruh data telah lengkap dan sesuai ketentuan.</p>
                                                    <p>Jika membutuhkan bantuan, silakan hubungi tim kami melalui kontak resmi yang tersedia.</p>
                                                </>
                                            }
                                        />) : data.summary?.reg === -2 && (

                                            // For reg === -2 (blocked)
                                            <StatusCard
                                                variant="blocked"
                                                title="Kartu Diblokir"
                                                description="Kartu ini telah diblokir dan tidak dapat digunakan. Silakan hubungi pihak terkait untuk informasi lebih lanjut."
                                            />
                                        )}


                            </AppLayout>
                        ) : page === 'topup' ? (
                            <Topup
                                siswa={siswaData.siswa}
                                nouid={siswaData.nouid}
                                onClose={() => {
                                    setPage('index');
                                    closeModal();
                                    refreshData();
                                }}
                            />
                        ) : page === 'tagihan' ? (
                            <PaymentPage
                                siswa={siswaData.siswa}
                                tagihanParam={{ ...tagihanParam, nouid: siswaData.nouid }}
                                onClose={() => {
                                    setPage('index');
                                    closeModal();
                                    refreshData();
                                }}
                            />
                        ) : null}
                </>
            )}
            <Blokir open={openModal === 'blokir'} onClose={() => closeModal()} setLoading={(v) => setIsLoading(v)} />
            <PinPage
                open={openModal === 'pin'}
                hasPin={hasPined}
                handle={!auth.user ? 'index' : isHistory ? 'riwayat' : 'auth'}
                setPage={setPage}
                setOpenSetupPin={openSetupPinModal}
                onClose={(success) => {
                    closeModal(success);
                    if (!success) setIsHistory(false);
                }}
            />
            <SetupPinPage
                open={openModal === 'setupPin'}
                hasPin={hasPined}
                setHasPined={() => setHasPined(true)}
                onClose={() => {
                    closeModal();
                    refreshData();
                }}
            />
        </>
    );
}
