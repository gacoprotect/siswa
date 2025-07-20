import { PageProps } from '@/types';
import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';
interface Riwayat {
    id: number;
    nama: string;
    total: number;
}
interface Props extends PageProps {
    riwayat: Riwayat[];
    filter: string;
}

export default function FilterRiwayat() {
    const { riwayat, filter } = usePage<Props>().props;
    const [search, setSearch] = useState(filter || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.visit(route('test.dashboard'), {
            method: 'get',
            data: { filter: search },
            only: ['riwayat'], // hanya update data tabel
            preserveState: true,
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Riwayat Transaksi</h1>

            <form onSubmit={handleSubmit} className="mb-4 space-x-2">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded px-3 py-1"
                    placeholder="Cari nama transaksi..."
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
                    Cari
                </button>
            </form>

            <ul className="bg-white rounded shadow p-4">
                {riwayat.length === 0 && <li className="text-gray-500">Tidak ada data.</li>}
                {riwayat.map((item: Riwayat) => (
                    <li key={item.id} className="border-b py-2">
                        {item.nama} - Rp{item.total.toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}
