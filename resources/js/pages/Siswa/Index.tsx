import { Blokir } from '@/components/blokir';
import { Loading } from '@/components/loading-screen';
import { useLogger } from '@/contexts/logger-context';
import AppLayout from '@/Layout/AppLayout';
import { formatIDR } from '@/lib/utils';
import { Auth, DataSiswa } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaFileInvoiceDollar, FaFootballBall, FaUserGraduate } from 'react-icons/fa';
import { route } from 'ziggy-js';
import TagihanContent from '../Tagihan/TagihanContent';
import Topup from '../Topup';
import PaymentPage from '../Transaction/Tagihan';
import DataSiswaContent from './DataSiswaContent';
import Excul from './Excul';
import PinPage from './Pin';
import SetupPinPage from './SetupPin';
import ActiveContent from '@/components/siswa/dashboard/active-content';
import StudentInfo from '@/components/siswa/dashboard/student-info';
import ActionButtons from '@/components/siswa/dashboard/action-buttons';
import BalanceSection from '@/components/siswa/dashboard/balance-section';
import MenuItems from '@/components/siswa/dashboard/menu-items';
import RegistrationStatus from '@/components/siswa/dashboard/registration-status';
import { useAppConfig } from '@/hooks/use-app-config';
import { MdMail } from 'react-icons/md';
import Izin from './Izin';
import { useLoading } from '@/contexts/loading-context';
import PindahSekolah from './PindahSekolah';

// Type definitions
export type PageState = 'index' | 'topup' | 'riwayat' | 'tagihan';
export type TabState = 'tagihan' | 'siswa' | 'kegiatan' | 'izin' | 'pindah';
export type ModalState = 'pin' | 'setupPin' | 'blokir' | null;

export interface TagihanParam {
    nouid?: string;
    spr: number[] | [];
    tagihan: number;
}

export default function SiswaDashboard() {
    const props = usePage().props
    const { auth, data: initialData, page: initialPage, tab } = usePage<{
        auth: Auth;
        data: DataSiswa;
        page: PageState;
        tab: TabState
    }>().props;

    const { log, count } = useLogger();
    const { APP_DEBUG } = useAppConfig();

    // State management
    const [siswaData, setSiswaData] = useState(initialData);
    const [activeItem, setActiveItem] = useState<number | null>(null);
    const [page, setPage] = useState<PageState>(initialPage);
    const { loading: isLoading, setLoading: setIsLoading } = useLoading();
    const [isHistory, setIsHistory] = useState(false);
    const [hasPined, setHasPined] = useState(Boolean(initialData.summary?.pin));
    const [openModal, setOpenModal] = useState<ModalState>(null);
    const [tagihanParam, setTagihanParam] = useState<TagihanParam>({
        spr: [],
        tagihan: 0,
    });

    // Debug logging
    useEffect(() => {
        if (APP_DEBUG) {
            count('Component Render');
            log({ props, siswaData });
        }
    }, [APP_DEBUG, count, log, props, siswaData]);

    useEffect(() => {
        setSiswaData(prev => ({ ...prev, ...initialData }));
    }, [initialData]);

    // Sync tab with active item
    useEffect(() => {
        const tabToIndexMap: Record<TabState, number> = {
            tagihan: 0,
            siswa: 1,
            kegiatan: 2,
            izin: 3,
            pindah: 4,
        };

        if (tab && tab in tabToIndexMap) {
            setActiveItem(tabToIndexMap[tab]);
        } else {
            setActiveItem(null);
        }
    }, [tab]);

    // Memoized menu items to prevent unnecessary re-renders
    const menuItems = useMemo(() => [
        {
            title: 'Tagihan',
            tab: 'tagihan',
            icon: <FaFileInvoiceDollar className="h-6 w-6 text-green-600" />,
            color: 'border-green-700 bg-green-50 hover:bg-green-100',
            content:
                <TagihanContent
                    nouid={siswaData.nouid ?? auth?.user?.nouid}
                    setTagihanParam={(v: TagihanParam) => {
                        setTagihanParam(v);
                        setPage('tagihan');
                    }}
                    onClose={() => setActiveItem(null)}
                />
            ,
        },
        {
            title: 'Data Siswa',
            tab: 'siswa',
            icon: <FaUserGraduate className="h-6 w-6 text-amber-600" />,
            color: 'border-amber-700 bg-amber-50 hover:bg-amber-100',
            content: <DataSiswaContent nouid={siswaData.nouid ?? auth?.user?.nouid} siswa={siswaData.siswa} />,
        },
        {
            title: 'Kegiatan',
            tab: 'kegiatan',
            icon: <FaFootballBall className="h-6 w-6 text-rose-600" />,
            color: 'border-rose-700 bg-rose-50 hover:bg-rose-100',
            content: <Excul nouid={siswaData.nouid ?? auth?.user?.nouid} />,
        },
        {
            title: 'Izin',
            tab: 'izin',
            icon: <MdMail className="h-6 w-6 text-rose-600" />,
            color: 'border-rose-700 bg-rose-50 hover:bg-rose-100',
            content: <Izin nouid={siswaData.nouid ?? auth?.user?.nouid} />,
        },
        {
            title: 'Pindah Sekolah',
            tab: 'pindah',
            icon: <MdMail className="h-6 w-6 text-rose-600" />,
            color: 'border-rose-700 bg-rose-50 hover:bg-rose-100',
            content: <PindahSekolah nouid={siswaData.nouid ?? auth?.user?.nouid} />,
        },
    ], [siswaData.nouid, auth?.user?.nouid, siswaData.siswa]);

    // Memoized formatted saldo
    const formattedSaldo = useMemo(() => formatIDR(siswaData.balance || 0), [siswaData.balance]);

    // Navigation handler
    const navigateToPage = useCallback((newPage: PageState) => {
        if (newPage === 'riwayat') {
            setIsHistory(true);
            setOpenModal('pin');
        } else {
            setPage(newPage);
        }
    }, []);

    // const refreshData = useCallback(() => {
    //     if (isLoading) return;

    //     setIsLoading(true);
    //     router.visit(route('siswa.index', siswaData.nouid ?? auth?.user?.nouid), {
    //         preserveState: true,
    //         onFinish: () => setIsLoading(false),
    //     });
    // }, [siswaData.nouid, auth?.user?.nouid, isLoading, setIsLoading]);

    // Modal handlers
    const openPinModal = useCallback(() => {
        if (!isLoading) setOpenModal('pin');
    }, [isLoading]);

    const openSetupPinModal = useCallback(() => {
        if (!isLoading) setOpenModal('setupPin');
    }, [isLoading]);

    const closeModal = useCallback((success = false) => {
        setOpenModal(null);
        // refreshData();
        if (!success) {
            setIsHistory(false);
            setPage('index');
        }
    }, []);

    const handleLogout = useCallback(() => {
        router.post(route('siswa.logout', siswaData.nouid ?? auth?.user?.nouid), {}, {
            onStart: () => setIsLoading(true),
            onFinish: () => setIsLoading(false),
        });
    }, [siswaData.nouid, auth?.user?.nouid, setIsLoading]);

    const handleBlockRequest = useCallback(() => {
        setOpenModal('blokir');
    }, []);


    const renderDebugMenu = () => {
        if (!APP_DEBUG || siswaData?.summary?.reg !== 0) return null;

        const handleSimulation = (type: string) => {
            router.get(route('simulasi.reg', { sim: type, nouid: siswaData.nouid ?? auth?.user?.nouid }));
        };

        return (
            <div className='border-2 bg-white border-red-500 px-4 py-2 rounded-lg space-y-2'>
                <p className='text-xs font-medium border-b-2'>Developer menu</p>
                <div className='flex gap-2'>
                    <button
                        onClick={() => handleSimulation("acc")}
                        className="p-1 bg-blue-500 rounded-md text-white cursor-pointer"
                    >
                        Terima
                    </button>
                    <button
                        onClick={() => handleSimulation("reject")}
                        className="p-1 bg-red-500 rounded-md text-white cursor-pointer"
                    >
                        Tolak
                    </button>
                    <button
                        onClick={() => handleSimulation("blocked")}
                        className="p-1 bg-red-500 rounded-md text-white cursor-pointer"
                    >
                        Block
                    </button>
                </div>
            </div>
        );
    };

    // Render different pages based on state
    switch (page) {
        case 'topup':
            return (
                <Topup
                    siswa={siswaData.siswa}
                    nouid={siswaData.nouid ?? auth?.user?.nouid}
                    onClose={() => {
                        setPage('index');
                        closeModal();
                    }}
                />
            );
        case 'tagihan':
            return (
                <PaymentPage
                    siswa={siswaData.siswa}
                    tagihanParam={{ ...tagihanParam, nouid: siswaData.nouid ?? auth?.user?.nouid }}
                    onClose={() => {
                        setPage('index');
                        closeModal();
                    }}
                />
            );
        default:
            return (
                <>
                    {isLoading && <Loading variant="overlay" />}
                    {(activeItem !== null) &&
                        <ActiveContent
                            nouid={siswaData.nouid ?? auth?.user?.nouid}
                            activeItem={activeItem}
                            menuItems={menuItems}
                            onBack={() => {
                                // refreshData();
                                router.get(route('siswa.index', siswaData.nouid ?? auth?.user?.nouid))
                                setActiveItem(null)
                            }}
                        />}
                    <AppLayout title={auth.user?.namlen ?? 'Login'}>
                        <StudentInfo
                            auth={auth}
                            siswaData={siswaData}
                            onBlockRequest={handleBlockRequest}
                        />

                        <ActionButtons
                            auth={auth}
                            data={siswaData}
                            hasPined={hasPined}
                            onPinModalOpen={openPinModal}
                            onSetupPinModalOpen={openSetupPinModal}
                            onLogout={handleLogout}
                        />

                        {auth.user && (
                            <>
                                <BalanceSection
                                    formattedSaldo={formattedSaldo}
                                    onNavigate={navigateToPage}
                                />
                                <MenuItems
                                    nouid={siswaData.nouid ?? auth?.user?.nouid}
<<<<<<< HEAD
                                    menuItems={menuItems}
=======
>>>>>>> 5e35211622926a0b054c5ebd226c780a23e92e84
                                    onItemClick={setActiveItem}
                                />
                            </>
                        )}

                        <RegistrationStatus data={siswaData} />
                        {renderDebugMenu()}
                    </AppLayout>

                    {/* Modals */}
                    <Blokir
                        open={openModal === 'blokir'}
                        onClose={closeModal}
                        setLoading={setIsLoading}
                    />

                    <PinPage
                        open={openModal === 'pin'}
                        hasPin={hasPined}
                        setPage={setPage}
                        setOpenSetupPin={() => setOpenModal('setupPin')}
                        handle={auth.user ? (isHistory ? 'riwayat' : 'auth') : 'index'}
                        onClose={(success) => {
                            closeModal(success);
                            if (!success) setIsHistory(false);
                        }}
                    />

                    <SetupPinPage
                        open={openModal === 'setupPin'}
                        hasPin={hasPined}
                        setHasPined={() => setHasPined(true)}
                        onClose={closeModal}
                    />
                </>
            );
    }
}