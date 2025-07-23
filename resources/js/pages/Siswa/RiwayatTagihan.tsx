import { Link } from '@inertiajs/react';
import React from 'react';

interface Tagihan {
    id: number;
    nomor_tagihan: string;
    tanggal_tagihan: string;
    jatuh_tempo: string;
    jumlah: number;
    status: 'lunas' | 'menunggu'; // menunggu konfirmasi
    metode_pembayaran?: string;
}

const RiwayatTagihan = ({ tagihans }:{tagihans: Tagihan[]}) => {
    // const tagihans = [] as Tagihan
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'lunas':
                return <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">Lunas</span>;
            case 'belum_lunas':
                return <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">Belum Lunas</span>;
            case 'jatuh_tempo':
                return <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">Jatuh Tempo</span>;
            default:
                return <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">{status}</span>;
        }
    };

    return (
        <div className="py-6">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="border-b border-gray-200 bg-white p-6">
                        {/* Filter Section */}
                        <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                            <div className="w-full md:w-1/3">
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                                    Cari Nomor Tagihan
                                </label>
                                <input
                                    type="text"
                                    id="search"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Cari..."
                                />
                            </div>
                            <div className="w-full md:w-1/3">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="">Semua Status</option>
                                    <option value="lunas">Lunas</option>
                                    <option value="belum_lunas">Belum Lunas</option>
                                    <option value="jatuh_tempo">Jatuh Tempo</option>
                                </select>
                            </div>
                            <div className="flex w-full items-end md:w-1/3">
                                <button
                                    type="button"
                                    className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Filter
                                </button>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            No. Tagihan
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Tanggal Tagihan
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Jatuh Tempo
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Jumlah
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {tagihans.map((tagihan) => (
                                        <tr key={tagihan.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{tagihan.nomor_tagihan}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {new Date(tagihan.tanggal_tagihan).toLocaleDateString('id-ID')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {new Date(tagihan.jatuh_tempo).toLocaleDateString('id-ID')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{formatCurrency(tagihan.jumlah)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(tagihan.status)}</td>
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                <Link href={route('tagihan.detail', tagihan.id)} className="text-indigo-600 hover:text-indigo-900">
                                                    Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {/* {tagihans.links.length > 3 && (
                            <div className="mt-6 flex items-center justify-between">
                                <Pagination links={tagihans.links} />
                                </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiwayatTagihan;
