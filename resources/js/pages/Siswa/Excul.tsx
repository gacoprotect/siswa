import { useEffect, useState } from 'react';
import { FaBook, FaCalendarAlt, FaChess, FaFlask, FaInfoCircle, FaMusic, FaPaintBrush, FaRunning, FaSpinner, FaUsers } from 'react-icons/fa';

interface ExculProps {
    nouid: string;
}

const Excul = ({ nouid }: ExculProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(route('api.excul', nouid) + '?nouid=' + nouid);

                if (!response.ok) {
                    throw new Error('Gagal memuat data');
                }

                const data = await response.json();

                if (data.status !== 'success') {
                    throw new Error('Terjadi kesalahan server');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Terjadi kesalahan jaringan');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [nouid]);

    // Data contoh ekstrakurikuler
    const excul = [
        {
            id: 1,
            name: 'Futsal',
            day: 'Senin',
            time: '15.00-17.00',
            coach: 'Coach Ahmad',
            quota: 20,
            registered: 18,
            icon: <FaRunning className="text-red-500" />,
        },
        {
            id: 2,
            name: 'Pramuka',
            day: 'Rabu',
            time: '14.00-16.00',
            coach: 'Pak Budi',
            quota: 30,
            registered: 25,
            icon: <FaUsers className="text-amber-500" />,
        },
        {
            id: 3,
            name: 'Seni Lukis',
            day: 'Kamis',
            time: '13.00-15.00',
            coach: 'Bu Citra',
            quota: 15,
            registered: 12,
            icon: <FaPaintBrush className="text-blue-500" />,
        },
        {
            id: 4,
            name: 'Robotika',
            day: 'Selasa',
            time: '15.00-17.00',
            coach: 'Pak Dedi',
            quota: 12,
            registered: 10,
            icon: <FaFlask className="text-purple-500" />,
        },
        {
            id: 5,
            name: 'Paduan Suara',
            day: 'Jumat',
            time: '14.00-16.00',
            coach: 'Bu Eka',
            quota: 25,
            registered: 20,
            icon: <FaMusic className="text-green-500" />,
        },
        {
            id: 6,
            name: 'Catur',
            day: 'Senin',
            time: '16.00-18.00',
            coach: 'Pak Fajar',
            quota: 10,
            registered: 8,
            icon: <FaChess className="text-gray-500" />,
        },
    ];

    // Data siswa yang sudah terdaftar
    const subExcul = [
        { id: 1, name: 'Futsal', status: 'Aktif' },
        { id: 4, name: 'Robotika', status: 'Aktif' },
    ];
    if (isLoading) {
        return (
            <div className="flex flex-row items-center justify-center space-x-3 py-4">
                <FaSpinner className="animate-spin text-3xl text-blue-600" />
                <span className="text-lg font-bold text-blue-600">Memuat data</span>
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
                                    <button className="text-sm font-medium text-red-600 hover:text-red-800">Keluar</button>
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
                                <div className="rounded-full bg-gray-100 p-2">{ext.icon}</div>
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
                                    {subExcul.some((a) => a.id === ext.id) ? (
                                        <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">Sudah Terdaftar</span>
                                    ) : (
                                        <button className="rounded bg-indigo-600 px-3 py-1 text-xs text-white hover:bg-indigo-700">Daftar</button>
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
