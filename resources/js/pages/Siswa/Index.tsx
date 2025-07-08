import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/Layout/AppLayout';
import { formatIDR } from '@/lib/utils';
import { Auth, DataSiswa, SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import * as Dialog from '@radix-ui/react-dialog';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    FaCog,
    FaExchangeAlt,
    FaFileInvoiceDollar,
    FaFootballBall,
    FaGraduationCap,
    FaHistory,
    FaIdCard,
    FaKey,
    FaPlusCircle,
    FaTimes,
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
import TagihanContent from './TagihanContent';

// Type definitions
type PageState = 'index' | 'topup' | 'riwayat' | 'tagihan';
type ModalState = 'pin' | 'setupPin' | null;

export interface TagihanParam {
    nouid?: string;
    spr: number[] | [];
    jen1: number[] | [];
    tagihan: number;
}
export default function SiswaDashboard() {
    const {auth, data } = usePage<{ auth: Auth; data: DataSiswa }>().props;
    console.log(data);
    
    // State management
    const [siswaData, setSiswaData] = useState(data);
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const [page, setPage] = useState<PageState>('index');
    const [isBlocked, setIsBlocked] = useState<Boolean>(!data.active);
    const [isLoading, setIsLoading] = useState(false);
    const [isHistory, setIsHistory] = useState(false);
    const [hasPined, setHasPined] = useState(data.siswa.has_pin);
    const [openModal, setOpenModal] = useState<ModalState>(null);
    const [tagihanParam, setTagihanParam] = useState<TagihanParam>({
        spr: [],
        jen1: [],
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
                title: 'Ekstrakurikuler',
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

    // Logout handler
    const handleLogout = useCallback(async () => {
        if (confirm('Anda yakin ingin keluar?')) {
            router.post(
                route('siswa.logout', siswaData.nouid),
                {},
                {
                    onStart: () => setIsLoading(true),
                    onSuccess: () => setIsLoading(false),
                    onError: () => setIsLoading(false),
                },
            );
        }
    }, [siswaData.nouid]);

    // Formatted values
    const formattedSaldo = useMemo(() => formatIDR(siswaData?.siswa.balance || 0), [siswaData?.siswa.balance]);

    // Dynamic content renderer
    const renderActiveContent = useMemo(() => {
        if (activeItem === null) return null;
        const item = menuItems[activeItem];
        return item?.content ? (
            <div className="relative rounded-xl border border-t-4 border-gray-800 bg-blue-50 p-2 pt-8 shadow-lg">
                <button
                    onClick={() => setActiveItem(null)}
                    className="absolute top-3 right-3 text-gray-500 transition hover:text-red-500"
                    aria-label="Tutup"
                >
                    <FaTimes className="h-5 w-5" />
                </button>
                {item.content}
            </div>
        ) : (
            <div>Konten tidak tersedia</div>
        );
    }, [activeItem, menuItems]);

    // Student info component
    const StudentInfo = () => {
        const [menuOpen, setMenuOpen] = useState(false);
        const [dialogOpen, setDialogOpen] = useState(false);

        const handleBlockCard = () => {
            // TODO: Tambahkan logika pemblokiran kartu di sini
            console.log('Kartu diblokir!');
            setDialogOpen(false);
        };

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
                <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
                            <Dialog.Title className="mb-2 text-xl font-bold text-gray-800">Konfirmasi Blokir</Dialog.Title>
                            <Dialog.Description className="mb-4 text-sm text-gray-600">
                                Apakah kamu yakin ingin memblokir kartu siswa ini?
                            </Dialog.Description>

                            <div className="flex justify-end space-x-3">
                                <button onClick={() => setDialogOpen(false)} className="rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
                                    Batal
                                </button>
                                <button onClick={handleBlockCard} className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">
                                    Ya, Blokir
                                </button>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        );
    };

    // Action buttons component
    const ActionButtons = () => (
        <div className="grid w-full grid-cols-2 items-center gap-4 border-b-2 p-2 px-6">
            {auth.user ? (
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-red-800 px-4 py-3 text-white shadow-sm transition-colors hover:bg-red-700"
                >
                    <FiLogOut className="text-lg" />
                    <span>Keluar</span>
                </button>
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
                onClick={openSetupPinModal}
                className="flex items-center justify-center space-x-2 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50"
            >
                <FaExchangeAlt className="text-lg" />
                <span>{hasPined ? 'Ubah PIN' : 'Buat Pin'}</span>
            </button>
        </div>
    );

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

    return (
        <>
            {isBlocked ? (
                <AppLayout title="Kartu Siswa">
                    <div className='flex bg-white min-h-screen items-center'>
                        <div className="flex w-full flex-col mx-2 items-center justify-center rounded-lg border-2 border-red-400 bg-red-50 p-6 text-center shadow-sm">
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
                    {page === 'index' ? (
                        <AppLayout title={siswaData?.siswa.namlen || 'Login'}>
                            <StudentInfo />
                            <ActionButtons />

                            {auth.user && (
                                <>
                                    <BalanceSection />
                                    <MenuItems />
                                    {renderActiveContent}
                                </>
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

            <PinPage
                open={openModal === 'pin'}
                hasPin={hasPined}
                handle={isHistory ? 'riwayat' : page}
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
