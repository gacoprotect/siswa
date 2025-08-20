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
import { useAppConfig } from '@/hooks/use-app-config'
import { ConfirmDialog } from '@/components/ConfirmDialog '
import { useLogger } from '@/contexts/logger-context'


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
    // const isDev = false;
    const { log, error: logError } = useLogger();
    const [modalState, setModalState] = useState({
        isDialogOpen: false,
        isAgreement: false,
    });
    const [processing, setProcessing] = useState(false);
    const { data, setData, reset, clearErrors, setError, errors: formErrors } = useForm<FormData>({
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

    const formRef = useRef<HTMLFormElement>(null)
    const step = useMemo(() => {
        return data.warneg === 'ID' ? 'WNI' : data.warneg ? 'WNA' : null;
    }, [data.warneg]);
    useEffect(() => {
        return () => {
            if (data.ktpPreview) URL.revokeObjectURL(data.ktpPreview);
            if (data.pasporPreview) URL.revokeObjectURL(data.pasporPreview);
        };
    }, [data.ktpPreview, data.pasporPreview]);

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


    const getSignature = useCallback(async () => {
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
            await Promise.all([
                router.visit(route('register.create', { nouid: nouid, q: 'agreement' }), {
                    // method: 'post',
                    data: signatureFormData,
                    only: ['agreement'], // hanya ambil props sesuai tab
                    preserveState: true,
                    preserveScroll: true,
                    onStart: () => {
                        setProcessing(true);
                        log('Memanggil getSignature...');
                    },
                    onSuccess: (res) => {
                        log('CEK RESPONSE : ', res);
                        setModalState(prev => ({ ...prev, isAgreement: true }));
                    },
                    onError: () => {
                        toast.error('Terjadi Kesalahan')
                        throw new Error('Terjadi Kesalahan');
                    },
                    onFinish: () => {
                        log('Selesai visit, modalState.isAgreement:', modalState.isAgreement);
                        setProcessing(false)
                    },
                })
            ]);


        } catch (err) {
            logError('Signature request failed:', err);
            toast.error('Terjadi Kesalahan');
        }
    }, [data, nouid, log, logError, modalState.isAgreement]);

    const validateForm = useCallback((field: string | null = null) => {
        const newErrors: Record<string, string> = {};
        const validateSingleField = field !== null;

        // Helper function untuk menambahkan error jika kondisi terpenuhi
        const addErrorIfInvalid = (isInvalid: boolean, errorKey: string, errorMessage: string) => {
            if ((!validateSingleField || errorKey === field) && isInvalid) {
                newErrors[errorKey] = errorMessage;
            }
        };

        // Validasi umum
        addErrorIfInvalid(!data.warneg, 'warneg', 'Pilih Negara Anda');
        addErrorIfInvalid(!data.nama, 'nama', 'Nama lengkap wajib diisi');

        // Validasi step WNI
        if (step === 'WNI') {
            addErrorIfInvalid(data.nik.length > 0 && data.nik.length < 16, 'nik', 'NIK harus 16 digit');
            addErrorIfInvalid(!data.nik, 'nik', 'NIK wajib diisi');
            addErrorIfInvalid(data.kk.length > 0 && data.kk.length < 16, 'kk', 'No. KK harus 16 digit');
            addErrorIfInvalid(!data.kk, 'kk', 'No. KK wajib diisi');
            addErrorIfInvalid(!data.ktpFile, 'ktpFile', 'Foto KTP wajib diunggah');
        }
        // Validasi step WNA
        else if (step === 'WNA') {
            addErrorIfInvalid(!data.paspor, 'paspor', 'Nomor paspor wajib diisi');
            addErrorIfInvalid(!data.pasporFile, 'pasporFile', 'Foto paspor wajib diunggah');
        }

        // Validasi lainnya
        addErrorIfInvalid(!data.temtin, 'temtin', 'wajib dipilih');
        addErrorIfInvalid(data.tel.length > 0 && (data.tel.length < 9 || data.tel.length > 13), 'tel', 'nomor telepon tidak valid');
        addErrorIfInvalid(!data.tel, 'tel', 'Nomor telepon wajib diisi');
        addErrorIfInvalid(!data.email, 'email', 'Email wajib diisi');
        addErrorIfInvalid(!data.hub, 'hub', 'Hubungan dengan siswa wajib diisi');

        // Validasi alamat
        const validateAddress = (prefix: string, address: Address, isDomisili = false) => {
            const label = isDomisili ? 'domisili' : '';
            addErrorIfInvalid(!address.prov, `${prefix}.prov`, `Provinsi ${label} wajib diisi`);
            addErrorIfInvalid(!address.kab, `${prefix}.kab`, `Kabupaten/Kota ${label} wajib diisi`);
            addErrorIfInvalid(!address.kec, `${prefix}.kec`, `Kecamatan ${label} wajib diisi`);
            addErrorIfInvalid(!address.desa, `${prefix}.desa`, `Desa/Kelurahan ${label} wajib diisi`);
            addErrorIfInvalid(!address.addr, `${prefix}.addr`, `Alamat ${label} wajib diisi`);
            addErrorIfInvalid(!address.rt, `${prefix}.rt`, 'RT wajib diisi');
            addErrorIfInvalid(!address.rw, `${prefix}.rw`, 'RW wajib diisi');
            addErrorIfInvalid(!address.kodpos, `${prefix}.kodpos`, 'Kode pos wajib diisi');
        };

        // Jalankan validasi alamat utama
        if (!validateSingleField || field?.startsWith('alamat1')) {
            validateAddress('alamat1', data.alamat1);
        }

        // Jalankan validasi alamat domisili jika diperlukan
        if (parseInt(data.temtin) > 0 && (!validateSingleField || field?.startsWith('alamat2'))) {
            validateAddress('alamat2', data.alamat2, true);
        }

        return newErrors;
    }, [data, step]);

    const handleNext = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validateForm();
        setError(errors)
        if (Object.keys(errors).length > 0) {
            logError("Validation Error : ", errors)
            const firstErrorKey = Object.keys(errors)[0];
            if (firstErrorKey) {
                const element = document.getElementById(firstErrorKey) ||
                    document.querySelector(`[name="${firstErrorKey}"], [data-name="${firstErrorKey}"]`);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        await getSignature();

    }, [validateForm, getSignature, logError, setError]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
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

            await Promise.all([
                router.post(route('auth.register', nouid), formData, {
                    onBefore: () => {
                        setProcessing(true);
                    },
                    onSuccess: () => {
                        reset();
                        toast.success('Pendaftaran berhasil!');
                    },
                    onError: (errors) => {
                        toast.error('Terjadi kesalahan');
                        logError("Error Submit:", errors);
                    },
                    onFinish: () => {
                        setModalState(prev => ({ ...prev, isAgreement: false }));
                        setProcessing(false)
                    },
                })
            ])
        } catch (err) {
            logError("Error Submit:", err);
            toast.error('Proses pendaftaran gagal');
        }
    }, [data, agreement, nouid, reset, logError]);

    const handleChange = useMemo(() =>
        <K extends keyof FormData>(field: K, value: FormData[K]) => {
            setData(field, value);
            if (!value || shouldValidateWhenNotEmpty(field, value)) {
                const err = validateForm(field);
                setError(err);
            } else {
                clearErrors(field);
            }
        },
        [validateForm, clearErrors, setData, setError]
    );

    const shouldValidateWhenNotEmpty = <K extends keyof FormData>(field: K, value: FormData[K]): boolean => {
        const validationRules: {
            [Key in keyof FormData]?: (v: FormData[Key]) => boolean;
        } = {
            tel: (v) => v.length > 0 && (v.length < 9 || v.length > 13),
            email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            nik: (v) => v.length > 0 && v.length < 16,
            kk: (v) => v.length > 0 && v.length < 16,
        };

        const validator = validationRules[field];
        return validator ? validator(value) : false;
    };


    // Debug logging
    useEffect(() => {
        if (isDev) {
            console.count("REGISTER RENDER");
        }
    }, [isDev]);
    useEffect(() => {
        log('Processing changed:', processing);
    }, [processing, log]);

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
                        errors={formErrors}
                        onChange={(fieldName, value) => handleChange(fieldName as keyof FormData, value)}
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
                                onChange={(fieldName, value) => handleChange(fieldName as keyof FormData, value as string)}
                                step={step}
                                errors={formErrors}
                            />

                            <KontakForm
                                data={{
                                    hub: data.hub,
                                    tel: data.tel,
                                    email: data.email
                                }}
                                onChange={(fieldName, value) => handleChange(fieldName as keyof FormData, value)}
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
                                isOpen={modalState.isAgreement}
                                onClose={() => setModalState(prev => ({ ...prev, isAgreement: false }))}
                                onConfirm={handleSubmit}
                                confirmText={processing ? "mendaftar" : "Setuju"}
                                confirmDisabled={processing}
                                header={false}
                                onScrollToBottom={()=>''}
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