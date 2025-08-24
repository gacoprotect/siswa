import { Auth, BillTagihan, DataSiswa, Siswa, TagihanSummary } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import React from 'react';
import Table from '../table/table';
import { formatCurrency } from '@/lib/utils';
import TagihanTableFooter from './tagihan-table-footer';
import TagihanBadge from './tagihan-badge';
import { Button } from '../ui/button';
import { PaymentMethod, PaymentMethodType } from '../payment';



interface PaymentPageProps {
    tableData: Array<BillTagihan> | [];
    siswa: Siswa;
    existingTransaction?: {
        exist: boolean;
        uri?: string;
    };
}

const DetailPayment: React.FC<PaymentPageProps> = ({ siswa, tableData, existingTransaction }) => {
    const { data: pageData, summary } = usePage<{ auth: Auth; data: DataSiswa, summary: TagihanSummary }>().props;

    const { post, processing, setData, errors, setError, clearErrors } = useForm({
        spr: summary?.spr as number[],
        nouid: pageData.nouid,
        payment_method: 'wallet',
        amount: summary.total_tagihan,
        orderId: '',
        uri: null as string | null,
    });

    const handlePaymentSubmit = async (method: PaymentMethodType) => {
        clearErrors()

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Example of different handling based on payment method
            if (method === 'wallet') {
                // Handle wallet payment
                post('/api/payment/wallet', {
                    onSuccess: () => {
                        console.log('Wallet payment successful');
                    },
                });
            } else {
                // Handle VA payment
                post('/api/payment/va', {
                    onSuccess: () => {
                        console.log('VA payment initiated');
                    },
                });
            }
        } catch {
            setError('payment_method', 'Terjadi kesalahan saat memproses pembayaran');
        }
    };

    const handleMethodSelection = (method: PaymentMethodType) => {
        setData('payment_method', method);
        clearErrors(); // Clear errors when method changes
    };

    const tagihanTableData = tableData?.map((item) => ({
        tagihan: `${item.tah} - ${item.bulan}`,
        jumlah: formatCurrency(item.jumlah),
        ket: item.ket
    })) || [];

    const totalTagihan = tableData?.reduce((acc, cur) => acc + cur.jumlah, 0) || 0;
    const total = tableData?.filter(t => t.jen === 0).reduce((acc, cur) => acc + cur.jumlah, 0) || 0;
    const totalDisc = tableData?.filter(t => t.jen === 1).reduce((acc, cur) => acc + cur.jumlah, 0) || 0;


    return (
        <div className="min-h-screen overflow-hidden space-y-2 ">

            {/* Detail Siswa */}
            <div className="border-b p-2 space-y-2">

                <div className='flex items-center justify-center'>
                    <h1 className="text-xl text-blue-500 font-bold text-center">Pembayaran Tagihan</h1>
                </div>
                <div className="mt-4 p-2">
                    <div className="flex text-sm">
                        <div className="font-medium w-25">NIS</div>
                        <div className="font-medium mx-2">:</div>
                        <div className="font-medium flex-1 text-left">{siswa.nis}</div>
                    </div>
                    <div className="flex text-sm">
                        <div className="font-medium w-25">Nama</div>
                        <div className="font-medium mx-2">:</div>
                        <div className="font-medium flex-1 text-left">{siswa.namlen.toUpperCase()}</div>
                    </div>
                    <div className="flex text-sm">
                        <div className="font-medium w-25">No. Telepon</div>
                        <div className="font-medium mx-2">:</div>
                        <div className="font-medium flex-1 text-left">{siswa.tel}</div>
                    </div>
                </div>
            </div>

            {/* Detail Tagihan */}
            <Table
                title="Rincian Tagihan"
                badge={true}
                badgeRender={<TagihanBadge data={tableData} />}
                dataLength={tableData.length}
                subtext="Tagihan"
                th={["Tagihan", "Jumlah", "Keterangan"]}
                data={tagihanTableData}
                footer={<TagihanTableFooter total={total} totalDisc={totalDisc} totalTagihan={totalTagihan} />}
            />

            {/* Metode Pembayaran */}
            <div className="p-4">
                {summary.isPaid ? (
                    <div className='text-center justify-center'>
                        <Button >
                            Lihat Invoice
                        </Button>

                        <div className="flex flex-col items-center space-y-4 p-6">
                            <div className="flex h-15 w-40 items-center justify-center border-4 border-green-700 p-4">
                                <h1 className="text-4xl font-bold text-green-700">LUNAS</h1>
                            </div>
                            <p className="text-gray-600">Pembayaran berhasil diproses</p>
                        </div>
                    </div>
                ) : (
                    <PaymentMethod
                        selectedMethod={handleMethodSelection}
                        siswa={siswa}
                        totalAmount={totalTagihan}
                        existingTransaction={existingTransaction}
                        onSubmit={handlePaymentSubmit}
                        processing={processing}
                        errors={errors}
                    />
                )}
            </div>
        </div>
    );
};

export default DetailPayment;
