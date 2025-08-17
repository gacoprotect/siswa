import React, { useCallback, useState } from 'react';
import { Siswa, FormDataPindahSekolah } from '@/types';
import InputGroup from '@/components/InputGroup';
import dayjs from 'dayjs';
import { useAppConfig } from '@/hooks/use-app-config';
import { usePage } from '@inertiajs/react';

interface PindahSekolahFormProps {
    siswa: Siswa;
    onSubmit: (data: FormDataPindahSekolah) => void;
    isTagihanLunas: boolean;
}

const PindahSekolahForm: React.FC<PindahSekolahFormProps> = ({
    siswa,
    onSubmit,
    isTagihanLunas
}) => {
    const { errors } = usePage().props
    const { APP_DEBUG } = useAppConfig();
    const [formData, setFormData] = useState<FormDataPindahSekolah>({
        tgl: APP_DEBUG ? dayjs().format('YYYY-MM-DD') : '',
        kelas: siswa.kel || '',
        tujuan: APP_DEBUG ? 'TEST MODE' : '',
        tgl_stop: APP_DEBUG ? dayjs().format('YYYY-MM-DD') : '',
        ket: APP_DEBUG ? 'TEST MODE TEST MODE' : '',
    });
    const [error, setError] = useState<Record<string, string>>(errors)
    const handleInputChange = useCallback(<K extends keyof FormDataPindahSekolah>(
        name: K,
        value: FormDataPindahSekolah[K]
    ) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error[name]) {
            // setError(prev => ({ ...prev, [name]: undefined }));
        }
    }, [setFormData, error]);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <InputGroup
                        label="Tanggal"
                        type="date"
                        name="tgl"
                        value={formData.tgl}
                        min={dayjs().format('YYYY-MM-DD')}
                        onChange={(e) => handleInputChange("tgl", e as string)}
                        errors={errors}
                        required
                    />
                    <InputGroup
                        label="Kelas saat ini"
                        type="text"
                        name="kelas"
                        value={formData.kelas}
                        onChange={(e) => handleInputChange("kelas", e as string)}
                        errors={errors}
                        required
                    />
                    <InputGroup
                        label="Sekolah Tujuan"
                        type="text"
                        name="tujuan"
                        value={formData.tujuan}
                        onChange={(e) => handleInputChange("tujuan", e as string)}
                        errors={errors}
                        required
                    />
                    <InputGroup
                        label="Tanggal mulai berhenti"
                        type="date"
                        name="tgl_stop"
                        value={formData.tgl_stop}
                        min={dayjs().format('YYYY-MM-DD')}
                        onChange={(e) => handleInputChange("tgl_stop", e as string)}
                        errors={errors}
                        required
                    />
                </div>

                <InputGroup
                    label="Alasan"
                    type="textarea"
                    name="ket"
                    value={formData.ket}
                    min={dayjs().format('YYYY-MM-DD')}
                    onChange={(e) => handleInputChange("ket", e as string)}
                    errors={errors}
                    className='mb-4'
                    required
                />

                <button
                    type="submit"
                    className={`px-4 py-2 rounded text-white ${isTagihanLunas ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    disabled={!isTagihanLunas}
                >
                    Ajukan Pindah Sekolah
                </button>

                {!isTagihanLunas && (
                    <p className="text-red-600 text-sm mt-2">
                        Anda harus melunasi semua tagihan terlebih dahulu sebelum mengajukan pindah sekolah.
                    </p>
                )}
            </form>
        </div>
    );
};

export default PindahSekolahForm;