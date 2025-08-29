import AppLayout from '@/Layout/AppLayout'
import { Loading } from '@/components/loading-screen'
import ActionButtons from '@/components/dashboard/action-buttons'
import BalanceSection from '@/components/dashboard/balance-section'
import MenuItems from '@/components/dashboard/menu-items'
import RegistrationStatus from '@/components/dashboard/registration-status'
import StudentInfo from '@/components/dashboard/student-info'
import { useLoading } from '@/contexts/loading-context'
import { useAppConfig } from '@/hooks/use-app-config'
import { formatIDR } from '@/lib/utils'
import { Auth, DataSiswa, SiswaSummary } from '@/types'
import { router, usePage } from '@inertiajs/react'
import { route } from 'ziggy-js'
import React, { useCallback, useMemo, useState } from 'react'

import { PinProvider, usePinContext } from '@/contexts/pin-context'
import { PinModal } from '@/components/PinModal'
import SetupPinPage from '../Siswa/SetupPin'

// Type guard untuk memastikan summary adalah SiswaSummary
const isSiswaSummary = (summary: unknown): summary is SiswaSummary => {
    return Boolean(summary && typeof summary === 'object' && 'reg' in summary && 'pin' in summary);
}

const DashboardContent: React.FC = () => {
    const { auth, data } = usePage<{ auth: Auth, data: DataSiswa }>().props
    const { loading, setLoading } = useLoading();
    const { APP_DEBUG } = useAppConfig();
    const [openModal, setOpenModal] = useState<'setupPin' | null>(null)
    const formattedSaldo = useMemo(() => formatIDR(data.balance || 0), [data.balance]);

    const siswaSummary = useMemo(() => {
        if (data.summary && isSiswaSummary(data.summary)) {
            return data.summary;
        }
        return null;
    }, [data.summary]);

    const isRegistered = siswaSummary?.reg === 1;
    const hasPin = siswaSummary?.pin === true;

    const openSetupPinModal = useCallback(() => {
        if (!loading) setOpenModal('setupPin');
    }, [loading]);

    const { verifyPinForExecute } = usePinContext();

    const openPinModal = useCallback(() => {
        if (!loading) {
            verifyPinForExecute(() => {
                setOpenModal(null);
                router.visit(route('dashboard', data.nouid), {
                    preserveState: true,
                    preserveScroll: true,
                    onBefore: () => setLoading(true),
                    onFinish: () => setLoading(false),
                })
            }, 'Masukkan PIN untuk login');
        }
    }, [loading, verifyPinForExecute, data.nouid, setLoading]);

    const renderDebugMenu = () => {
        if (!APP_DEBUG || !siswaSummary || siswaSummary.reg !== 0) return null;

        const handleSimulation = (type: string) => {
            router.get(route('simulasi.reg', { sim: type, nouid: data.nouid ?? auth?.user?.nouid }));
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

    const renderContent = () => {
        if (!isRegistered) {
            return (
                <>
                    <StudentInfo auth={auth} siswaData={data} />
                    <RegistrationStatus data={data} />
                </>
            );
        }

        if (!auth.user) {
            return (
                <>
                    <StudentInfo auth={auth} siswaData={data} />
                    <ActionButtons
                        auth={auth}
                        data={data}
                        hasPined={hasPin}
                        onPinModalOpen={openPinModal}
                        onSetupPinModalOpen={openSetupPinModal}
                    />
                    <RegistrationStatus data={data} />
                </>
            );
        }
        return (
            <>
                <StudentInfo auth={auth} siswaData={data} />
                <ActionButtons
                    auth={auth}
                    data={data}
                    hasPined={hasPin}
                    onPinModalOpen={openPinModal}
                    onSetupPinModalOpen={openSetupPinModal}
                />
                <BalanceSection formattedSaldo={formattedSaldo} />
                <MenuItems
                    nouid={data.nouid ?? auth?.user?.nouid}
                    setLoading={(v) => setLoading(v)}
                />
                <RegistrationStatus data={data} />
            </>
        );
    };

    return (
        <AppLayout title={auth.user?.namlen ?? 'Dashboard Siswa'}>
            {loading && <Loading variant="overlay" />}

            {renderContent()}

            {renderDebugMenu()}

            {/* PIN Modal menggunakan context */}
            <PinModal />

            {/* Setup PIN Modal */}
            <SetupPinPage
                open={openModal === 'setupPin'}
                hasPin={hasPin}
                setHasPined={() => { }}
                onClose={() => setOpenModal(null)}
            />
        </AppLayout>
    )
}

const Index: React.FC = () => {
    const { auth, data } = usePage<{ auth: Auth, data: DataSiswa }>().props;
    const nouid = data.nouid ?? auth?.user?.nouid ?? '';

    return (
        <PinProvider nouid={nouid}>
            <DashboardContent />
        </PinProvider>
    );
}

export default Index