import MenuLayout from '@/Layout/menu-layout'
import React, { useEffect, useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import { Auth, BillTagihan, DataSiswa, TagihanSummary } from '@/types'
import TagihanHeader from '@/components/tagihan/tagihan-header';
import { formatCurrency } from '@/lib/utils';
import Table from '@/components/table/table';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { FaSpinner } from 'react-icons/fa';
import TagihanBaru from '@/components/tagihan/tagihan-baru';
import DetailPayment from '@/components/tagihan/detail-payment';
import TagihanBadge from '@/components/tagihan/tagihan-badge';

export interface TagihanPageState {
    loading: boolean,
    bayar: boolean,
    riwayat: boolean,
    tambahTagihan: boolean,
}

const Index = () => {
    const { auth, data, summary, nouid: pageNouid } = usePage<{ auth: Auth; data: DataSiswa; summary: TagihanSummary; nouid: string }>().props
    const nouid = pageNouid ?? auth.user?.nouid ?? data.siswa?.nouid ?? null

    const [state, setState] = useState<TagihanPageState>({
        loading: false,
        bayar: false,
        riwayat: false,
        tambahTagihan: false,
    })
    const [tagihan, setTagihan] = useState(data.tagihan);
    useEffect(() => {
        setTagihan(data.tagihan)
    }, [data.tagihan]);
    // Wrapper function to match TagihanHeader's expected interface
    const handleStateChange = (key: keyof TagihanPageState, value: boolean | BillTagihan[]) => {
        if (value === undefined) return;
        setState(prev => ({ ...prev, [key]: value }));
    };

    // Transform tagihan data for table
    const tagihanTableData = tagihan?.filter(t => t.jen === 0).map((item) => ({
        tagihan: `${item.tah} - ${item.bulan}`,
        jumlah: formatCurrency(item.jumlah),
        ket: item.ket
    })) || [];
    const onBack = () => {
        handleStateChange('loading', false)
        if (state.bayar) return handleStateChange('bayar', false)

        return window.history.back();
    }
    return (
        <MenuLayout title="Tagihan" onBack={onBack}>
            {state.bayar ? (
                <div className="space-y-2">
                    <DetailPayment
                        siswa={data.siswa}
                        tableData={data.tagihan ?? []}
                        existingTransaction={{
                            exist: summary.exist_trx?.exist ?? false,
                            uri: summary.exist_trx?.uri
                        }}
                    />
                </div>
            ) : (
                <div className="space-y-2">
                    {/* Summary Cards */}
                    <TagihanHeader state={state} setState={handleStateChange} summary={summary} />

                    {/* Bills Table / Riwayat */}
                    {state.riwayat ? (
                        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                            <p className="text-gray-500">Fitur riwayat tagihan (dummy)</p>
                            <ul className="mt-4 space-y-2">
                                {tagihan?.map((item, idx) => (
                                    <li key={idx} className="text-sm text-gray-700">
                                        {item.tah} - {item.bulan} : {item.ket} ({formatCurrency(item.jumlah)})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        tagihan?.filter(t => t.jen === 0).length === 0 ? (
                            <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                                <p className="text-gray-500">Tidak ada data tagihan</p>
                            </div>
                        ) : (
                            <div className='space-y-2'>
                                <Table
                                    title="Rincian Tagihan"
                                    badge={true}
                                    badgeRender={<TagihanBadge data={tagihan ?? []} />}
                                    dataLength={tagihanTableData.length}
                                    subtext="Tagihan"
                                    th={["Tagihan", "Jumlah", "Keterangan"]}
                                    data={tagihanTableData}
                                />
                                <div className='flex items-center justify-end gap-2'>
                                    {summary.future_bills && (
                                        <Button onClick={() => router.visit(route('bill.index', nouid))} variant="destructive" size='sm' disabled={state.loading}>
                                            Batal
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => {
                                            handleStateChange('loading', true);
                                            handleStateChange('bayar', true)
                                        }}
                                        className='bg-emerald-600 hover:bg-emerald-700' variant="default" size='sm'
                                        disabled={state.loading}>
                                        {state.loading ? (<FaSpinner className='animate-spin' />) : (<Send />)}
                                        {state.loading ? 'memproses' : 'Bayar Sekarang'}
                                    </Button>
                                </div>
                            </div>
                        )
                    )}

                    {/* Modal Tambah Tagihan */}
                    <TagihanBaru
                        nouid={nouid ?? null}
                        open={state.tambahTagihan}
                        onClose={() => handleStateChange('tambahTagihan', false)}
                    />
                </div>
            )}
        </MenuLayout>
    )
}

export default Index