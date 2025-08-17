import PindahSekolahForm from '@/components/siswa/pindah-sekolah/PindahSekolahForm';
import TagihanStatus from '@/components/siswa/pindah-sekolah/TagihanStatus';
import { Auth, DataPindahSekolah, DataSiswa, FormDataPindahSekolah, PindahSekolahProps } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { useCallback, useEffect, useState } from 'react';
import { TagihanParam } from './Index';
import DetailPayment from '@/components/payment/detail-payment';
import { Summary } from '../Tagihan/TagihanContent';
import { CalendarDays } from 'lucide-react';
import { StatusBadge } from '@/components/status-badge';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const PindahSekolah: React.FC<PindahSekolahProps> = ({ nouid }) => {
    const { auth, data: pageData, summary } = usePage<{
        auth: Auth;
        data: DataSiswa;
        summary: Summary
    }>().props;

    const isMobile = useIsMobile();
    const [pindah, setPindah] = useState<DataPindahSekolah | null>(null);
    const [submittedData, setSubmittedData] = useState<DataPindahSekolah | null>(null);

    // Cek apakah sudah ada pengajuan pindah sekolah
    useEffect(() => {
        if (pageData.pindah) {
            setPindah(pageData.pindah);
        }
    }, [pageData.pindah]);

    const billData = {
        tagihan: summary.total_tagihan ?? 0,
        transactions: pageData.tagihan ?? []
    };

    const isTagihanLunas = billData.tagihan <= 0;
    const [tagihanParam, setTagihanParam] = useState<TagihanParam>({
        spr: summary.spr ?? [],
        tagihan: summary.total_tagihan ?? 0,
    });

    const formatDate = useCallback((date: Date | string, withTime = false) => {
        return dayjs(date).format(withTime ? 'DD MMMM YYYY HH:mm' : 'DD MMMM YYYY');
    }, []);

    const handleFormSubmit = (formData: FormDataPindahSekolah) => {
        const newPindahData: DataPindahSekolah = {
            nops: `PS-${Math.floor(Math.random() * 10000)}`, // Contoh nomor dummy
            tin: 0,
            idta: 0,
            tgl: formData.tgl,
            idsis: pageData.siswa?.id || 0,
            oldidkel: pageData.siswa?.idkel || 0,
            sek: formData.tujuan,
            ala: formData.ket,
            sta: 'menunggu',
            created_at: new Date().toISOString(),
            tgl_stop: formData.tgl_stop
        };

        setSubmittedData(newPindahData);
        setPindah(newPindahData);
    };

    const handleBatal = () => {
        setPindah(null);
        setSubmittedData(null);
    };

    const handleDetail = () => {
        // Implementasi detail pengajuan
        console.log('Detail pengajuan:', pindah);
    };

    // Tampilkan data yang baru disubmit atau data yang sudah ada
    const displayData = submittedData || pindah;

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
            {displayData ? (
                <div className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow bg-white space-y-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-lg text-gray-800 capitalize">
                                Pengajuan Pindah Sekolah
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                                <CalendarDays className="inline mr-1 w-4 h-4" />
                                {formatDate(displayData.tgl)}
                            </p>
                            <div className="mt-2 space-y-1">
                                <p className="text-sm">
                                    <span className="font-medium">Sekolah Tujuan:</span> {displayData.sek}
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium">Nomor Pengajuan:</span> {displayData.nops || '-'}
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium">Alasan:</span> {displayData.ala}
                                </p>
                                <p className="text-sm">
                                    <span className="font-medium">Tanggal Berhenti:</span> {formatDate(displayData.tgl_stop)}
                                </p>
                            </div>
                        </div>
                        <StatusBadge status={displayData.sta} />
                    </div>

                    <div className={cn("mt-4 flex justify-between gap-2 items-end", isMobile && "flex-col-reverse items-start")}>
                        <span className="text-xs text-start text-gray-400">
                            Diajukan pada: {formatDate(displayData.created_at, true)}
                        </span>
                        <div className={cn("flex-1 flex w-full gap-2 justify-end", isMobile && "w-full")}>
                            {displayData.sta === 'menunggu' && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleBatal}
                                    className="hover:bg-red-600 transition-colors"
                                >
                                    Batalkan
                                </Button>
                            )}
                            <Button
                                size="sm"
                                onClick={handleDetail}
                            >
                                Detail
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <h2 className="text-center text-blue-500 text-xl font-bold mb-6">Formulir Permohonan Pindah Sekolah</h2>

                    <TagihanStatus billData={billData} />

                    {!isTagihanLunas && (
                        <DetailPayment
                            siswa={pageData.siswa}
                            tagihanParam={{ ...tagihanParam, nouid: pageData.nouid }}
                            walletBalance={pageData.balance}
                            onClose={() => { }}
                        />
                    )}

                    <PindahSekolahForm
                        siswa={pageData.siswa}
                        onSubmit={handleFormSubmit}
                        isTagihanLunas={isTagihanLunas}
                        initialFormData={{
                            kelas: pageData.siswa?.kelas?.nama || '',
                            tgl: new Date().toISOString().split('T')[0]
                        }}
                        walletBalance={pageData.balance}
                    />
                </>
            )}
        </div>
    );
};

export default PindahSekolah;