import { StatusCard } from "@/components/status-card";
import { DataSiswa } from "@/types";



const RegistrationStatus:React.FC<{ data: DataSiswa }> = ({ data }) => {
    if (data.summary?.reg === 0) {
        return (
            <StatusCard
                variant="success"
                title="Pendaftaran Anda berhasil"
                description={
                    <>
                        <p>Terima kasih! Kami sedang memverifikasi data Anda.</p>
                        <p>PIN akan dikirim ke nomor WhatsApp Anda setelah disetujui.</p>
                        <p>Pastikan nomor WhatsApp yang Anda daftarkan aktif untuk menerima informasi lebih lanjut.</p>
                    </>
                }
            />
        );
    }

    if (data.summary?.reg === -1) {
        return (
            <StatusCard
                variant="error"
                title="Pendaftaran Anda ditolak"
                description={
                    <>
                        <p>Mohon maaf, pendaftaran Anda belum dapat disetujui pada saat ini.</p>
                        <p>Silakan mendaftar kembali dengan memastikan seluruh data telah lengkap dan sesuai ketentuan.</p>
                        <p>Jika membutuhkan bantuan, silakan hubungi tim kami melalui kontak resmi yang tersedia.</p>
                    </>
                }
            />
        );
    }

    if (data.summary?.reg === -2) {
        return (
            <StatusCard
                variant="blocked"
                title="Kartu Diblokir"
                description="Kartu ini telah diblokir dan tidak dapat digunakan. Silakan hubungi pihak terkait untuk informasi lebih lanjut."
            />
        );
    }

    return null;
};
export default RegistrationStatus ;