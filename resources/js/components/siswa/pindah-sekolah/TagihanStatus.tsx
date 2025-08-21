import React, { useState } from 'react';
import { BillData, Siswa } from '@/types';
import { Button } from '@/components/ui/button';
import DetailPayment from '@/components/payment/detail-payment';

interface TagihanStatusProps {
    billData: BillData;
    siswa: Siswa;
}

const TagihanStatus: React.FC<TagihanStatusProps> = ({ billData, siswa }) => {
    const [open, setOpen] = useState(false);
    const isLunas = billData.tagihan <= 0;
    const totalTagihan = billData.transactions.reduce((sum, item) => sum + item.jumlah, 0);

    return (
        <div className="bg-whiterounded-lg shadow">
            {isLunas ? (
                <div className="bg-green-100 text-green-800 p-3 rounded">
                    <p className="font-medium">Semua tagihan sudah lunas. Anda dapat melanjutkan pengajuan pindah sekolah.</p>
                </div>
            ) : (
                <>
                    <div className="bg-red-100 text-red-800 p-3 rounded space-y-4">
                        <p className="font-medium">Anda memiliki tagihan yang belum lunas sebesar Rp {totalTagihan.toLocaleString()}</p>
                        <p className="text-sm mt-1">Silakan melunasi semua tagihan terlebih dahulu sebelum mengajukan pindah sekolah.</p>

                        <Button size='sm' variant='destructive' onClick={() => setOpen(true)}>
                            Detail Tagihan
                        </Button>
                    </div>
                </>
            )}
            {open && (
                <DetailPayment
                    siswa={siswa}
                    onClose={() => { }}
                />
            )}
        </div>
    );
};

export default TagihanStatus;