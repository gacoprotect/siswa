import AppLayout from '@/Layout/AppLayout'
import { router, useForm } from '@inertiajs/react'
import React, { useEffect, useCallback, useRef, useState, useMemo } from 'react'
import AlamatForm from '@/components/form/alamat-form'
import KontakForm from '@/components/form/kontak-form'
import DokForm from '@/components/form/dokumen-form'
import PersonalForm from '@/components/form/personal-form'
import InfoBadge from '@/components/info-badge'
import { Modal } from '@/components/ui/Modal'
import Show from '../Snk/Show'
import { toast } from 'react-toastify'
import { FaSpinner } from 'react-icons/fa'
import { cn } from '@/lib/utils'
import useDebugLogger from '@/hooks/use-debug-logger'
import { useAppConfig } from '@/hooks/use-app-config'
import { ConfirmDialog } from '@/components/ConfirmDialog '

// Type definitions remain the same
type Address = {
    addr: string
    rt: string
    rw: string
    kec: string
    desa: string
    kodpos: string
    prov: string
    kab: string
    kabName: string
}

export type FormData = {
    nama: string
    warneg: string
    warnegName: string
    nik: string
    kk: string
    paspor: string
    alamat1: Address
    alamat2: Address
    temtin: string
    hub: string
    tel: string
    email: string
    ktpFile: File | null
    pasporFile: File | null
    ktpPreview?: string | null
    pasporPreview?: string | null
}

interface SnkContentItem {
    label?: string;
    description?: string;
    items?: SnkContentItem[];
}

interface SnkContent {
    intro?: string;
    title: string;
    items: SnkContentItem[];
}

interface SnkPoint {
    nmr: number;
    title: string;
    content: SnkContent;
}

interface SnkProps {
    version: string
    effective: string
    title: string
    summary: string
    points: SnkPoint[]
}

interface SignatureData {
    payload: string;
    sign: string;
    qr_code_svg: string;
    ortu: string;
    siswa: string;
    kota: string;
}
interface Agreement extends SignatureData {
    snk: SnkProps
}
interface Props {
    nouid: string;
    agreement: Agreement
}

const Register = ({ nouid, agreement }: Props) => {
    const config = useAppConfig();
    const isDev = config.APP_ENV === 'local';
    const { log, error: logError } = useDebugLogger();

    // State management
    const [modalState, setModalState] = useState({
        isDialogOpen: false,
        isSignatureModalOpen: false,
    });
    const [processing, setProcessing] = useState(false);

    // Form state
    const { data, setData, reset, errors: formErrors } = useForm<FormData>({
        nama: isDev ? 'TEST MODE' : '',
        warneg: isDev ? 'ID' : '',
        warnegName: isDev ? 'Indonesia' : '',
        nik: isDev ? '1234567890123456' : '',
        kk: isDev ? '1234567890123456' : '',
        paspor: isDev ? '1234567890' : '',
        temtin: isDev ? '0' : '',
        alamat1: {
            prov: isDev ? '33' : '',
            kab: isDev ? '33.06' : '',
            kec: isDev ? '33.06.07' : '',
            desa: isDev ? '33.06.07.2017' : '',
            kabName: isDev ? 'Purworejo' : '',
            addr: isDev ? 'TEST MODE' : '',
            rt: isDev ? '001' : '',
            rw: isDev ? '001' : '',
            kodpos: isDev ? '12345' : '',
        },
        alamat2: {
            prov: isDev ? '33' : '',
            kab: isDev ? '33.06' : '',
            kec: isDev ? '33.06.07' : '',
            desa: isDev ? '33.06.07.2017' : '',
            kabName: isDev ? 'Purworejo' : '',
            addr: isDev ? 'TEST MODE' : '',
            rt: isDev ? '001' : '',
            rw: isDev ? '001' : '',
            kodpos: isDev ? '12345' : '',
        },
        hub: isDev ? '0' : '',
        tel: isDev ? '081808856626' : '',
        email: isDev ? 'gacoprotect@gmail.com' : '',
        ktpFile: null,
        pasporFile: null,
        ktpPreview: null,
        pasporPreview: null,
    });

    const formRef = useRef<HTMLFormElement>(null);

    // Derived state
    const step = useMemo(() => {
        return data.warneg === 'ID' ? 'WNI' : data.warneg ? 'WNA' : null;
    }, [data.warneg]);

    // Cleanup effect
    useEffect(() => {
        return () => {
            if (data.ktpPreview) URL.revokeObjectURL(data.ktpPreview);
            if (data.pasporPreview) URL.revokeObjectURL(data.pasporPreview);
        };
    }, [data.ktpPreview, data.pasporPreview]);

    // Handlers
    const handleFileUpload = useCallback((field: string, file: File | null) => {
        // Clean up previous preview if exists
        if (field === 'ktpFile' && data.ktpPreview) {
            URL.revokeObjectURL(data.ktpPreview);
        }
        if (field === 'pasporFile' && data.pasporPreview) {
            URL.revokeObjectURL(data.pasporPreview);
        }

        // Create new preview if file exists
        const previewUrl = file ? URL.createObjectURL(file) : null;

        setData(prev => ({
            ...prev,
            [field]: file,
            [`${field}Preview`]: previewUrl
        }));
    }, [data.ktpPreview, data.pasporPreview, setData]);

    const validateForm = useCallback(() => {
        const newErrors: Record<string, string> = {};

        if (!data.warneg) newErrors.warneg = 'Pilih Negara Anda';
        if (!data.nama) newErrors.nama = 'Nama lengkap wajib diisi';

        if (step === 'WNI') {
            if (data.nik.length > 0 && data.nik.length < 16) newErrors.nik = 'NIK harus 16 digit';
            if (!data.nik) newErrors.nik = 'NIK wajib diisi';
            if (data.kk.length > 0 && data.kk.length < 16) newErrors.kk = 'No. KK harus 16 digit';
            if (!data.kk) newErrors.kk = 'No. KK wajib diisi';
            if (!data.ktpFile) newErrors.ktpFile = 'Foto KTP wajib diunggah';
        } else if (step === 'WNA') {
            if (!data.paspor) newErrors.paspor = 'Nomor paspor wajib diisi';
            if (!data.pasporFile) newErrors.pasporFile = 'Foto paspor wajib diunggah';
        }

        if (!data.temtin) newErrors.temtin = 'wajib dipilih';

        // Address validation
        const validateAddress = (prefix: string, address: Address, isDomisili = false) => {
            if (!address.prov) newErrors[`${prefix}.prov`] = `${isDomisili ? 'Provinsi domisili' : 'Provinsi'} wajib diisi`;
            if (!address.kab) newErrors[`${prefix}.kab`] = `${isDomisili ? 'Kabupaten/Kota domisili' : 'Kabupaten/Kota'} wajib diisi`;
            if (!address.kec) newErrors[`${prefix}.kec`] = `${isDomisili ? 'Kecamatan domisili' : 'Kecamatan'} wajib diisi`;
            if (!address.desa) newErrors[`${prefix}.desa`] = `${isDomisili ? 'Desa/Kelurahan domisili' : 'Desa/Kelurahan'} wajib diisi`;
            if (!address.addr) newErrors[`${prefix}.addr`] = `${isDomisili ? 'Alamat domisili' : 'Alamat'} wajib diisi`;
            if (!address.rt) newErrors[`${prefix}.rt`] = 'wajib diisi';
            if (!address.rw) newErrors[`${prefix}.rw`] = 'wajib diisi';
            if (!address.kodpos) newErrors[`${prefix}.kodpos`] = 'wajib diisi';
        };

        validateAddress('alamat1', data.alamat1);
        if (parseInt(data.temtin) > 0) {
            validateAddress('alamat2', data.alamat2, true);
        }

        // Contact validation
        if (data.tel.length > 0 && (data.tel.length < 9 || data.tel.length > 13)) {
            newErrors.tel = 'nomor telepon tidak valid';
        }
        if (!data.tel) newErrors.tel = 'Nomor telepon wajib diisi';
        if (!data.email) newErrors.email = 'Email wajib diisi';
        if (!data.hub) newErrors.hub = 'Hubungan dengan siswa wajib diisi';

        return newErrors;
    }, [data, step]);

    const getSignature = useCallback(async (next = false) => {

        try {
            const signatureFormData = {
                nouid: nouid,
                warneg: data.warneg,
                nama: data.nama,
                kabName: data.alamat1.kabName
                    ?.replace(/^KAB\.\s*/i, '')
                    .replace(/^KOTA\s*/i, '')
                    .trim()
                    .toLowerCase()
                    .replace(/\b\w/g, (c) => c.toUpperCase()) || '',
                ...(data.warneg === 'ID' ? { nik: data.nik } : { paspor: data.paspor })
            };
            await router.visit(route('test.register', { nouid: nouid, q: 'agreement' }), {
                method: 'post',
                data: signatureFormData,
                only: ['agreement'], // hanya ambil props sesuai tab
                preserveState: true,
                preserveScroll: true,
                onStart: () => setProcessing(true),
                onSuccess: (res) => {
                    log('RESPONSE : ', res);
                    if (next) {
                        setModalState(prev => ({ ...prev, isSignatureModalOpen: true }));
                    }
                },
                onError: () => {
                    throw new Error('Terjadi Kesalahan');
                },
                onFinish: () => setProcessing(false),
            });


        } catch (err) {
            logError('Signature request failed:', err);
            toast.error('Gagal mendapatkan tanda tangan digital');
        } finally {
            setProcessing(false);
        }
    }, [data, nouid, log, logError]);

    const handleNext = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([key, value]) => {
                setData(key as keyof FormData, value as string);
            });

            // Scroll to first error
            const firstErrorKey = Object.keys(errors)[0];
            if (firstErrorKey) {
                const element = document.getElementById(firstErrorKey) ||
                    document.querySelector(`[name="${firstErrorKey}"], [data-name="${firstErrorKey}"]`);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        await getSignature(true);
    }, [validateForm, getSignature, setData]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const formData = new FormData();

            // Add simple fields
            const simpleFields: Array<keyof FormData> = [
                'nama', 'warneg', 'warnegName', 'nik', 'kk',
                'paspor', 'temtin', 'hub', 'tel', 'email'
            ];

            simpleFields.forEach(field => {
                const value = data[field];
                if (value !== null && value !== undefined) {
                    formData.append(field, String(value));
                }
            });

            // Add files
            if (data.ktpFile) formData.append('ktpFile', data.ktpFile);
            if (data.pasporFile) formData.append('pasporFile', data.pasporFile);

            // Add addresses
            const addAddressToFormData = (prefix: string, address: Address) => {
                Object.entries(address).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        formData.append(`${prefix}[${key}]`, String(value));
                    }
                });
            };

            addAddressToFormData('alamat1', data.alamat1);
            if (parseInt(data.temtin) === 1) {
                addAddressToFormData('alamat2', data.alamat2);
            }

            // Add signature data if available
            if (agreement.sign) {
                formData.append('sign', agreement.sign);
                formData.append('payload', agreement.payload);
            }

            await router.post(route('register', nouid), formData, {
                onSuccess: () => {
                    reset();
                    setModalState(prev => ({ ...prev, isSignatureModalOpen: false }));
                    toast.success('Pendaftaran berhasil!');
                },
                onError: (errors) => {
                    toast.error('Terjadi kesalahan saat pendaftaran');
                    logError("Error Submit:", errors);
                },
            });
        } catch (err) {
            logError("Error Submit:", err);
            toast.error('Proses pendaftaran gagal');
        } finally {
            setProcessing(false);
        }
    }, [data, agreement, nouid, reset, logError]);

    // Debug logging
    useEffect(() => {
        if (isDev) {
            console.count("REGISTER RENDER");
        }
    }, [isDev]);

    return (
        <AppLayout title='Pendaftaran'>
            <div className='max-w-2xl min-h-screen mx-auto px-4 py-6 bg-white rounded-lg shadow-md'>
                <div className='flex flex-col items-center justify-center mb-6'>
                    <h1 className='text-2xl font-bold text-primary text-center'>
                        Formulir Pendaftaran SIP
                    </h1>
                    <span className='font-semibold text-sm text-blue-500'>
                        (Student Information & Payment)
                    </span>
                </div>

                <InfoBadge
                    variant='warning'
                    title='Perhatian!'
                    items={[
                        'Isi data sesuai identitas resmi (KTP/Paspor).',
                        'Unggah foto dokumen asli yang jelas dan terbaca.',
                        'Pastikan nomor WhatsApp dan email aktif untuk menerima PIN akses SIP.',
                        'Jika WNA, wajib unggah paspor dan KITAS/KITAP yang berlaku.',
                    ]}
                />

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className='space-y-6'
                    encType='multipart/form-data'
                >
                    <PersonalForm
                        data={{
                            warneg: data.warneg,
                            warnegName: data.warnegName,
                            nama: data.nama,
                            nik: data.nik,
                            kk: data.kk,
                            paspor: data.paspor
                        }}
                        step={step}
                        setStep={(newStep) => setData('warneg', newStep === 'WNI' ? 'ID' : 'OTHER')}
                        errors={formErrors}
                        onChange={(fieldName, value) => setData(fieldName as keyof FormData, value)}
                    />

                    {step !== null && (
                        <>
                            <DokForm
                                step={step}
                                processing={processing}
                                previews={{
                                    ktpPreview: data.ktpPreview,
                                    pasporPreview: data.pasporPreview
                                }}
                                errors={formErrors}
                                onChange={handleFileUpload}
                            />

                            <AlamatForm
                                data={{
                                    temtin: data.temtin,
                                    alamat1: data.alamat1,
                                    alamat2: data.alamat2
                                }}
                                onChange={(fieldName, value) => setData(fieldName as keyof FormData, value as string)}
                                step={step}
                                errors={formErrors}
                            />

                            <KontakForm
                                data={{
                                    hub: data.hub,
                                    tel: data.tel,
                                    email: data.email
                                }}
                                onChange={(fieldName, value) => setData(fieldName as keyof FormData, value)}
                                errors={formErrors}
                            />

                            <div className='pt-6'>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className={cn(
                                        `w-full px-4 py-3 flex justify-center items-center text-white rounded-md transition-colors bg-primary hover:bg-primary-dark cursor-pointer font-medium`,
                                        processing && 'bg-primary/50 cursor-not-allowed'
                                    )}
                                    disabled={processing}
                                >
                                    {processing ? <FaSpinner className='animate-spin text-center' /> : 'Lanjutkan'}
                                </button>
                            </div>

                            <Modal
                                isOpen={modalState.isSignatureModalOpen}
                                onClose={() => setModalState(prev => ({ ...prev, isSignatureModalOpen: false }))}
                                onConfirm={handleSubmit}
                                confirmText={processing ? "mendaftar" : "Setuju"}
                                confirmDisabled={processing}
                                header={false}
                                agreement={
                                    <p>
                                        Saya yang bertanda tangan di bawah ini <strong>{data.nama}</strong> menyatakan telah membaca,
                                        memahami, dan menyetujui seluruh ketentuan di atas terkait Kartu Pelajar atas nama <strong>{agreement?.siswa}</strong>.
                                    </p>
                                }
                            >
                                <Show
                                    childData={agreement}
                                    isChild
                                />
                            </Modal>
                        </>
                    )}
                </form>

                <ConfirmDialog
                    open={modalState.isDialogOpen}
                    onOpenChange={(open) => setModalState(prev => ({ ...prev, isDialogOpen: open }))}
                    title="Dokumen Belum Lengkap"
                    description={step === 'WNI'
                        ? "Foto KTP wajib diunggah untuk WNI. Harap lengkapi sebelum melanjutkan."
                        : "Foto paspor wajib diunggah untuk WNA. Harap lengkapi sebelum melanjutkan."}
                    confirmText="Mengerti"
                    cancelText={null}
                    onConfirm={() => setModalState(prev => ({ ...prev, isDialogOpen: false }))}
                    variant="danger"
                />
            </div>
        </AppLayout>
    );
};

export default React.memo(Register);