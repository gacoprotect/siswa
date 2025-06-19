import AppLayout from '@/Layout/AppLayout';
import { router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

interface PaymentInstructionProps {
    id: string;
    paymentData: {
        order_id: string;
        gross_amount: string;
        payment_type: string;
        transaction_status: string;
        va_numbers?: Array<{
            bank: string;
            va_number: string;
        }>;
        permata_va_number?: string;
    };
}

const PaymentInstruction: React.FC<PaymentInstructionProps> = ({ id, paymentData }) => {
    useEffect(() => {
        // Jika tidak ada ID, redirect kembali
        if (!id) {
            router.visit(route('siswa.index'));
        }
    }, [id]);
    const getBankName = (bankCode: string) => {
        const banks: Record<string, string> = {
            bca: 'BCA',
            bni: 'BNI',
            bri: 'BRI',
            mandiri: 'Mandiri',
            permata: 'Permata',
        };
        return banks[bankCode] || bankCode;
    };

    const getVaNumber = () => {
        if (paymentData.va_numbers) {
            return paymentData.va_numbers[0].va_number;
        }
        if (paymentData.permata_va_number) {
            return paymentData.permata_va_number;
        }
        return '-';
    };

    const getBankCode = () => {
        if (paymentData.va_numbers) {
            return paymentData.va_numbers[0].bank;
        }
        return 'permata';
    };

    return (
        <AppLayout title="Instruksi Pembayaran">
            <div className="mx-auto max-w-2xl overflow-hidden rounded-lg bg-white shadow-md">
                <div className="flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground">
                    <button onClick={() => router.visit(route('siswa.index'))} className="flex items-center space-x-2">
                        <FaArrowLeft className="text-primary-foreground" />
                        <span>Kembali ke Dashboard</span>
                    </button>
                    <h1 className="text-2xl font-bold text-white">Instruksi Pembayaran</h1>
                </div>

                <div className="p-6">
                    <div className="mb-6 flex items-center justify-center">
                        <div className="rounded-full bg-green-100 p-3">
                            <FaCheckCircle className="text-4xl text-green-500" />
                        </div>
                    </div>

                    <div className="mb-6 rounded-lg border border-gray-200 p-4">
                        <h2 className="mb-3 text-lg font-semibold">Detail Transaksi</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Order ID</span>
                                <span className="font-medium">{paymentData.order_id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Jumlah</span>
                                <span className="font-medium">Rp {parseInt(paymentData.gross_amount).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Metode Pembayaran</span>
                                <span className="font-medium">Transfer Bank {getBankName(getBankCode())}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 rounded-lg border border-gray-200 p-4">
                        <h2 className="mb-3 text-lg font-semibold">Instruksi Pembayaran</h2>
                        <ol className="list-decimal space-y-3 pl-5">
                            <li>Buka aplikasi mobile banking atau internet banking Anda</li>
                            <li>
                                Pilih menu transfer dan masukkan nomor VA: <span className="font-bold">{getVaNumber()}</span>
                            </li>
                            <li>Masukkan jumlah yang harus dibayarkan</li>
                            <li>Ikuti instruksi hingga pembayaran selesai</li>
                            <li>Pembayaran akan diproses otomatis dalam 1-5 menit</li>
                        </ol>
                    </div>

                    <div className="rounded-lg bg-yellow-50 p-4 text-yellow-800">
                        <h3 className="mb-2 font-semibold">Perhatian!</h3>
                        <p>Jangan melakukan pembayaran selain melalui nomor VA di atas. Simpan bukti pembayaran Anda sebagai referensi.</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default PaymentInstruction;
