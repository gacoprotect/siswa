import { cn } from '@/lib/utils';
import { Excul as ExculType } from '@/types';
import { router } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { FaBook, FaCalendarAlt, FaInfoCircle, FaRunning, FaSpinner } from 'react-icons/fa';

interface ExculProps {
    nouid: string;
}
interface DataExcul {
    sub: number[];
    excul: ExculType[];
}
interface Response {
    success: boolean;
    data: DataExcul;
}
const Excul = ({ nouid }: ExculProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [process, setProcess] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<DataExcul>({
        sub: [],
        excul: [],
    });
    const [subexcul, setsubExcul] = useState<number[]>(initialData.sub);

    const fetchData = useCallback(
        async (load = true) => {
            try {
                if (load) setIsLoading(true);
                setError(null);

                const response = await fetch(route('api.excul', nouid) + '?nouid=' + nouid);

                if (!response.ok) {
                    throw new Error('Gagal memuat data');
                }

                const data: Response = await response.json();

                if (!data.success) {
                    throw new Error('Terjadi kesalahan server');
                }

                setInitialData(data.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Terjadi kesalahan jaringan');
            } finally {
                if (load) setIsLoading(false);
            }
        },
        [nouid],
    );
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    useEffect(() => {
        setsubExcul(initialData.sub);
    }, [initialData.sub]);
    const excul = initialData.excul;
    const subExcul = initialData.excul
        .filter((e) => subexcul.includes(e.id))
        .map((e) => ({
            id: e.id,
            name: e.name,
            status: 'Aktif',
        }));

    const subscribe = ({ e, id }: { e: React.MouseEvent<HTMLButtonElement>; id: number }) => {
        e.preventDefault();
        if (subexcul.includes(id)) return;
        setProcess(id);
        router.post(
            route('subs.excul', nouid),
            { excul: id },
            {
                preserveScroll: true,
                preserveState: true,
                onError: (errors) => {
                    console.error('Validasi gagal:', errors);
                },
                onFinish: () => {
                    fetchData(false);
                    setProcess(null);
                },
            },
        );
    };

    const unsubs = ({ e, id }: { e: React.MouseEvent<HTMLButtonElement>; id: number }) => {
        e.preventDefault();

        if (!subexcul.includes(id)) return;
        router.post(
            route('unsubs.excul', nouid),
            { excul: id },
            {
                preserveScroll: true,
                preserveState: true,
                onError: (errors) => {
                    console.error('Validasi gagal:', errors);
                },
                onFinish: () => {
                    fetchData(false);
                },
            },
        );
    };

    if (isLoading) {
        return (
            <div className="flex flex-row items-center justify-center space-x-3 py-4">
                <FaSpinner className="animate-spin text-3xl text-blue-600" />
                <span className="text-lg font-bold text-blue-600">Memuat data</span>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex flex-row items-center justify-center space-x-3 py-4">
                <X className="text-3xl text-red-600" />
                <span className="text-lg font-bold text-red-600">{error}</span>
            </div>
        );
    }
    return (
        <div className="space-y-6 p-4">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">Ekstrakurikuler</h3>
            </div>

            {/* Ekstrakurikuler yang diikuti siswa */}
            <div className="rounded-lg bg-white p-6 shadow">
                <h4 className="mb-4 flex items-center gap-2 border-b pb-2 text-lg font-semibold text-gray-800">
                    <FaRunning className="text-indigo-500" />
                    Ekstrakurikuler Yang Diikuti
                </h4>

                {subExcul.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {subExcul.map((activity) => (
                            <div key={activity.id} className="rounded-lg border p-4 transition-shadow hover:shadow-md">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h5 className="text-lg font-bold">{activity.name}</h5>
                                        <p className="text-gray-600">
                                            Status: <span className="font-medium text-green-600">{activity.status}</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => unsubs({ e, id: activity.id })}
                                        className="text-sm font-medium text-red-600 hover:text-red-800"
                                    >
                                        Keluar
                                    </button>
                                </div>
                                <div className="mt-3 flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Rabu, 14.00-16.00</span>
                                    <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">Lihat Jadwal</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-8 text-center text-gray-500">
                        <p>Anda belum terdaftar dalam ekstrakurikuler apapun</p>
                        <button className="mt-4 font-medium text-indigo-600 hover:text-indigo-800">Daftar Sekarang</button>
                    </div>
                )}
            </div>

            {/* Daftar Ekstrakurikuler Tersedia */}
            <div className="rounded-lg bg-white p-6 shadow">
                <h4 className="mb-4 flex items-center gap-2 border-b pb-2 text-lg font-semibold text-gray-800">
                    <FaBook className="text-indigo-500" />
                    Daftar Ekstrakurikuler Tersedia
                </h4>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {excul.map((ext) => (
                        <div key={ext.id} className="rounded-lg border p-4 transition-shadow hover:shadow-lg">
                            <div className="mb-3 flex items-center gap-3">
                                {/* <div className="rounded-full bg-gray-100 p-2">{ext.icon}</div> */}
                                <h5 className="text-lg font-bold">{ext.name}</h5>
                            </div>

                            <div className="space-y-2 text-sm">
                                <p className="flex items-center gap-2 text-gray-600">
                                    <FaCalendarAlt className="text-gray-400" />
                                    {ext.day}, {ext.time}
                                </p>
                                <p className="text-gray-600">Pelatih: {ext.coach}</p>
                                <div className="flex items-center justify-between pt-2">
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Kuota: {ext.registered}/{ext.quota}
                                        </p>
                                        <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200">
                                            <div
                                                className="h-1.5 rounded-full bg-green-500"
                                                style={{
                                                    width: `${(ext.registered / ext.quota) * 100}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    {ext.registered === ext.quota ? (
                                        <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">Kuota Pendaftaran Penuh</span>
                                    ) : subExcul.some((a) => a.id === ext.id) ? (
                                        <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">Sudah Terdaftar</span>
                                    ) : (
                                        <button
                                            onClick={(e) => subscribe({ e, id: ext.id })}
                                            className={cn(
                                                `flex items-center justify-center space-x-2 rounded bg-indigo-600 px-3 py-1 text-xs text-white hover:bg-indigo-700`,
                                                `${process === ext.id && 'bg-indigo-400 hover:bg-indigo-500'}`,
                                            )}
                                            disabled={process === ext.id}
                                        >
                                            {process === ext.id && <FaSpinner className="animate-spin" />}
                                            <span>Daftar</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Informasi Penting */}
            <div className="rounded border-l-4 border-blue-400 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                    <FaInfoCircle className="mt-1 flex-shrink-0 text-blue-500" />
                    <div>
                        <h4 className="font-medium text-blue-800">Informasi Penting</h4>
                        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-blue-700">
                            <li>Setiap siswa boleh mengikuti maksimal 2 ekstrakurikuler</li>
                            <li>Pendaftaran ditutup ketika kuota terpenuhi</li>
                            <li>Kehadiran minimal 80% untuk mendapatkan sertifikat</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Excul;
