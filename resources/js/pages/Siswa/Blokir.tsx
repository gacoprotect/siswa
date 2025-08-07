import AppLayout from '@/Layout/AppLayout';
import React, { useCallback, useState } from 'react'
import SetupPinPage from './SetupPin';
import { DataSiswa } from '@/types';
import { usePage } from '@inertiajs/react';

const Blokir:React.FC = () => {
    const { data: initialData } = usePage<{ data: DataSiswa; }>().props;
    const [hasPined, setHasPined] = useState(Boolean(initialData.summary?.pin));
    const [openModal, setOpenModal] = useState(false);


    const openSetupPinModal = useCallback(() => {
        setOpenModal(true);
    }, []);
    return (
        <AppLayout title="Kartu Siswa">
            <div className="flex min-h-screen items-center bg-white">
                <div className="mx-2 flex w-full flex-col items-center justify-center rounded-lg border-2 border-red-400 bg-red-50 p-6 text-center shadow-sm">
                    <h3 className="mb-2 text-lg font-semibold text-red-600">🔒 Kartu Diblokir</h3>
                    <p className="mb-4 text-sm text-red-700">
                        Kartu ini telah diblokir dan tidak dapat digunakan. Silakan aktifkan kembali untuk melanjutkan.
                    </p>
                    <button
                        onClick={openSetupPinModal}
                        className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                        🔓 Aktifkan Kembali
                    </button>
                </div>
            </div>
            <SetupPinPage
                open={openModal}
                hasPin={hasPined}
                setHasPined={() => setHasPined(true)}
                onClose={()=>setOpenModal(false)}
            />
        </AppLayout>
    );
}


export default Blokir