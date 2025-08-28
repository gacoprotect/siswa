import React from 'react';
import { usePinContext } from '@/contexts/pin-context';
import { router } from '@inertiajs/react';

// Contoh 1: Menggunakan PIN untuk redirect ke halaman riwayat
export const RiwayatButton: React.FC<{ nouid: string }> = ({ nouid }) => {
    const { verifyPinForRedirect } = usePinContext();

    const handleClick = () => {
        verifyPinForRedirect(
            route('siswa.riwayat', { nouid }),
            'Masukkan PIN untuk mengakses riwayat transaksi'
        );
    };

    return (
        <button
            onClick={handleClick}
            className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            Lihat Riwayat
        </button>
    );
};

// Contoh 2: Menggunakan PIN untuk eksekusi callback (pembayaran)
export const PaymentButton: React.FC<{ amount: number; onPaymentSuccess: () => void }> = ({
    amount,
    onPaymentSuccess
}) => {
    const { verifyPinForExecute } = usePinContext();

    const handlePayment = () => {
        verifyPinForExecute(
            () => {
                // Callback yang akan dieksekusi setelah PIN berhasil
                console.log(`Pembayaran sebesar Rp ${amount.toLocaleString()} berhasil!`);
                onPaymentSuccess();
            },
            `Masukkan PIN untuk mengkonfirmasi pembayaran sebesar Rp ${amount.toLocaleString()}`
        );
    };

    return (
        <button
            onClick={handlePayment}
            className="bg-green-500 text-white px-4 py-2 rounded"
        >
            Bayar Sekarang
        </button>
    );
};

// Contoh 3: Menggunakan PIN untuk aksi kustom
export const CustomActionButton: React.FC = () => {
    const { verifyPinForAction } = usePinContext();

    const handleCustomAction = () => {
        verifyPinForAction({
            id: 'custom-action-1',
            action: 'execute',
            payload: {
                callback: () => {
                    console.log('Aksi kustom berhasil dieksekusi!');
                    // Lakukan aksi lain
                    router.get(route('siswa.profile'));
                }
            },
            description: 'Masukkan PIN untuk melakukan aksi kustom'
        });
    };

    return (
        <button
            onClick={handleCustomAction}
            className="bg-purple-500 text-white px-4 py-2 rounded"
        >
            Aksi Kustom
        </button>
    );
};

// Contoh 4: Menggunakan PIN untuk multiple actions
export const MultiActionComponent: React.FC = () => {
    const { verifyPinForRedirect, verifyPinForExecute } = usePinContext();

    const handleViewProfile = () => {
        verifyPinForRedirect(
            route('siswa.profile'),
            'Masukkan PIN untuk melihat profil'
        );
    };

    const handleUpdateSettings = () => {
        verifyPinForExecute(
            () => {
                console.log('Settings berhasil diupdate!');
                // Update settings logic
            },
            'Masukkan PIN untuk mengupdate pengaturan'
        );
    };

    return (
        <div className="space-y-4">
            <button
                onClick={handleViewProfile}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Lihat Profil
            </button>

            <button
                onClick={handleUpdateSettings}
                className="bg-orange-500 text-white px-4 py-2 rounded"
            >
                Update Settings
            </button>
        </div>
    );
};

// Contoh 5: Menggunakan PIN di dalam form
export const SecureForm: React.FC = () => {
    const { verifyPinForExecute } = usePinContext();
    const [formData, setFormData] = React.useState({ name: '', email: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        verifyPinForExecute(
            () => {
                // Submit form setelah PIN berhasil
                console.log('Form submitted:', formData);
                // API call atau aksi lain
            },
            'Masukkan PIN untuk mengirim data'
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Nama"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border p-2 rounded"
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border p-2 rounded"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Kirim Data
            </button>
        </form>
    );
};
