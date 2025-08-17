import React from 'react';
import { BillData } from '@/types';

interface TagihanStatusProps {
    billData: BillData;
}

const TagihanStatus: React.FC<TagihanStatusProps> = ({ billData }) => {
    const isLunas = billData.tagihan <= 0;
    const totalTagihan = billData.transactions.reduce((sum, item) => sum + item.jumlah, 0);

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold mb-4">Status Tagihan</h3>

            {isLunas ? (
                <div className="bg-green-100 text-green-800 p-3 rounded">
                    <p className="font-medium">Semua tagihan sudah lunas. Anda dapat melanjutkan pengajuan pindah sekolah.</p>
                </div>
            ) : (
                <>
                    <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
                        <p className="font-medium">Anda memiliki tagihan yang belum lunas sebesar Rp {totalTagihan.toLocaleString()}</p>
                        <p className="text-sm mt-1">Silakan lunasi terlebih dahulu untuk mengajukan pindah sekolah.</p>
                    </div>

                    <div className="mt-4">
                        <h4 className="font-medium mb-2">Detail Tagihan:</h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Bulan</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Keterangan</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Jumlah</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {billData.transactions.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 whitespace-nowrap">{item.bulan}</td>
                                            <td className="px-4 py-2 whitespace-nowrap">{item.ket}</td>
                                            <td className="px-4 py-2 whitespace-nowrap">Rp {item.jumlah.toLocaleString()}</td>
                                            <td className="px-4 py-2 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${item.sta === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {item.sta === 1 ? 'Lunas' : 'Belum Lunas'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
};

export default TagihanStatus;