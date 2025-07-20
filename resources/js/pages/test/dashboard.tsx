import { PageProps } from '@/types';
import {  router, usePage } from '@inertiajs/react';

interface Props extends PageProps {
    message: string;
    stats: {
        siswa: string;
        guru: string;

    };
    waktu: string;
    activeTab: string;
    infoUmum: {
        jumlahSiswa: string;
        jumlahGuru: string;

    };
    grafik: string;
    riwayat: Riwayat[];

}
interface Riwayat { id: string; nama: string; total: number }
export default function Dashboard() {
    const { message, stats, waktu, activeTab, infoUmum, grafik, riwayat } = usePage<Props>().props;

    const reloadStats = () => {
        router.visit('/test/dashboard', {
            only: ['waktu'],
            preserveState: true,
        });
    };

    const changeTab = (tab: string) => {
        router.visit(route('test.dashboard'), {
            method: 'get',
            data: { tab },
            only: [tab, 'activeTab'], // hanya ambil props sesuai tab
            preserveState: true,
        });
    };
    return (
        <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold">Dashboard Test</h1>
            <p>{message}</p>

            <div className="bg-gray-100 p-4 rounded">
                <h2 className="font-semibold mb-2">Statistik</h2>
                <p>Siswa: {stats.siswa}</p>
                <p>Guru: {stats.guru}</p>
                <p className="text-sm text-gray-600 mt-2">Diperbarui: {waktu}</p>
                <button
                    onClick={reloadStats}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Refresh Statistik
                </button>
            </div>

            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Dashboard Interaktif</h1>

                <div className="space-x-2 mb-6">
                    {['infoUmum', 'grafik', 'riwayat'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => changeTab(tab)}
                            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="bg-white p-4 rounded shadow">
                    {activeTab === 'infoUmum' && (
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Info Umum</h2>
                            <p>Siswa: {infoUmum?.jumlahSiswa}</p>
                            <p>Guru: {infoUmum?.jumlahGuru}</p>
                        </div>
                    )}

                    {activeTab === 'grafik' && (
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Grafik Pendaftaran</h2>
                            <pre>{JSON.stringify(grafik, null, 2)}</pre>
                        </div>
                    )}

                    {activeTab === 'riwayat' && (
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Riwayat Transaksi</h2>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    router.visit(route('test.dashboard'), {
                                        method: 'get',
                                        data: {
                                            tab: 'riwayat',
                                            filter: (document.getElementById('filterInput') as HTMLInputElement).value
                                        },
                                        only: ['riwayat', 'activeTab'],
                                        preserveState: true,
                                    });
                                }}
                                className="mb-4 space-x-2"
                            >
                                <input
                                    id="filterInput"
                                    defaultValue={new URLSearchParams(location.search).get('filter') || ''}
                                    placeholder="Cari transaksi..."
                                    className="border px-3 py-1 rounded"
                                />
                                <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
                                    Cari
                                </button>
                            </form>

                            <ul>
                                {riwayat?.length === 0 && <li>Tidak ada data.</li>}
                                {riwayat?.map((r: Riwayat) => (
                                    <li key={r.id}>{r.nama} - Rp{r.total.toLocaleString()}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            </div>

        </div>
    );
}
