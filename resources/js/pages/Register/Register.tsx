import AppLayout from '@/Layout/AppLayout'
import { router, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useCallback, useRef, useState } from 'react'
import AlamatForm from '@/components/form/alamat-form'
import KontakForm from '@/components/form/kontak-form'
import DokForm from '@/components/form/dokumen-form'
import PersonalForm from '@/components/form/personal-form'
import InfoBadge from '@/components/info-badge'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ConfirmDialog '
import Show from '../Snk/Show'
import { toast } from 'react-toastify'
import { PageProps } from '@/types'
import { FaSpinner } from 'react-icons/fa'
import { cn } from '@/lib/utils'
import useDebugLogger from '@/hooks/use-debug-logger'

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
    qr_code_svg?: string
    sign?: string
    ortu?: string
    siswa?: string
    kota?: string
}
interface SignatureData {
    payload: string;
    sign: string;
    qr_code_svg: string;
    ortu: string;
    kota: string;
    siswa: string;
}

const Register = ({ nouid, snk }: { nouid: string; snk: SnkProps }) => {
    const { data: propsData, errors } = usePage<PageProps>().props
    const [step, setStep] = React.useState<'WNA' | 'WNI' | null>(null)
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [processing, setProcessing] = React.useState(false)
    const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>(errors)
    const formRef = useRef<HTMLFormElement>(null)
    const isDev = Boolean(import.meta.env.VITE_APP_DEBUG === 'true' && import.meta.env.VITE_APP_ENV === 'local')
    const { log, error } = useDebugLogger();


    const { data, setData, reset } = useForm<FormData>({
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
    })
    const [signatureData, setSignatureData] = useState<SignatureData>({
        payload: '',
        sign: '',
        qr_code_svg: '',
        ortu: '',
        kota: '',
        siswa: '',
    });
    const signatureForm = useForm({
        nouid: nouid,
        warneg: data.warneg,
        nama: data.nama,
        kabName: data.alamat1.kabName ?
            data.alamat1.kabName
                .replace(/^KAB\.\s*/i, '')
                .replace(/^KOTA\s*/i, '')
                .trim()
                .toLowerCase()
                .replace(/\b\w/g, (c) => c.toUpperCase())
            : '',
        ...(data.warneg === 'ID' ? { nik: data.nik } : { paspor: data.paspor })
    });

    const getSignature = useCallback(async (next = false) => {

        setProcessing(true)
        try {
            await signatureForm.post(route('snk.show', nouid), {
                preserveScroll: true,
                onSuccess: (response) => {
                    if (next) {
                        setOpen(true)
                    }
                    const signatureData = response.props.data as SignatureData;
                    log('SignatureData response:', signatureData);
                    if (!signatureData?.sign) {
                        error('Missing signature in response:', signatureData);
                        throw new Error('Invalid signature response: Sign property missing');
                    }

                    setSignatureData({
                        payload: signatureData.payload,
                        sign: signatureData.sign,
                        qr_code_svg: signatureData.qr_code_svg,
                        ortu: signatureData.ortu || data.nama,
                        kota: signatureData.kota,
                        siswa: signatureData.siswa
                    });


                    setProcessing(false)
                },
                onError: (errors) => {
                    error('Signature error:', errors);
                    setProcessing(false)
                    throw new Error(errors.message || 'Failed to generate signature');
                },
                onFinish: () => {
                    setProcessing(false)
                }
            });
        } catch (err) {
            error('Signature request failed:', err);
            // toast.error(error.message);
        }
    }, [data, nouid, error, log, signatureForm]);

    useEffect(() => {

        setValidationErrors(errors);

        if (propsData?.sign) {
            setSignatureData({
                payload: propsData.payload as string,
                sign: propsData.sign as string,
                qr_code_svg: propsData.qr_code_svg as string,
                ortu: propsData.ortu as string,
                kota: propsData.kota as string,
                siswa: propsData.siswa as string
            });
        }

        if (data.warneg === 'ID') {
            setStep('WNI');
        } else if (data.warneg) {
            setStep('WNA');
        } else {
            setStep(null);
        }

    }, [errors, propsData, data.warneg]);


    // Clean up object URLs when component unmounts
    useEffect(() => {
        return () => {
            if (data.ktpPreview) URL.revokeObjectURL(data.ktpPreview)
            if (data.pasporPreview) URL.revokeObjectURL(data.pasporPreview)
        }
    }, [data.ktpPreview, data.pasporPreview])

    const handleFileUpload = useCallback((field: string, file: File | null) => {
        // First clean up previous preview if exists
        if (field === 'ktpFile' && data.ktpPreview) {
            URL.revokeObjectURL(data.ktpPreview)
        }
        if (field === 'pasporFile' && data.pasporPreview) {
            URL.revokeObjectURL(data.pasporPreview)
        }

        // Create new preview if file exists
        let previewUrl = null
        if (file) {
            previewUrl = URL.createObjectURL(file)
        }

        setData({
            ...data,
            [field]: file,
            [`${field}Preview`]: previewUrl
        })
        setValidationErrors(prev => {
            const newErrors = { ...prev }
            delete newErrors[field]
            return newErrors
        })
    }, [data, setData, setValidationErrors])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        // Validasi field
        if (!data.warneg) newErrors.warneg = 'Pilih Negara Anda'
        if (!data.nama) newErrors.nama = 'Nama lengkap wajib diisi'
        if (step === 'WNI') {
            if (data.nik.length > 0 && data.nik.length < 16) newErrors.nik = 'NIK harus 16 digit'
            if (!data.nik) newErrors.nik = 'NIK wajib diisi'
            if (data.kk.length > 0 && data.kk.length < 16) newErrors.kk = 'No. KK harus 16 digit'
            if (!data.kk) newErrors.kk = 'No. KK wajib diisi'
            if (!data.ktpFile) newErrors.ktpFile = 'Foto KTP wajib diunggah'
        } else if (step === 'WNA') {
            if (!data.paspor) newErrors.paspor = 'Nomor paspor wajib diisi'
            if (!data.pasporFile) newErrors.pasporFile = 'Foto paspor wajib diunggah'
        }
        if (!data.temtin) newErrors.temtin = 'wajib dipilih'

        // Alamat
        if (!data.alamat1.prov) newErrors['alamat1.prov'] = 'Provinsi wajib diisi'
        if (!data.alamat1.kab) newErrors['alamat1.kab'] = 'Kabupaten/Kota wajib diisi'
        if (!data.alamat1.kec) newErrors['alamat1.kec'] = 'Kecamatan wajib diisi'
        if (!data.alamat1.desa) newErrors['alamat1.desa'] = 'Desa/Kelurahan wajib diisi'
        if (!data.alamat1.addr) newErrors['alamat1.addr'] = 'Alamat wajib diisi'
        if (!data.alamat1.rt) newErrors['alamat1.rt'] = 'wajib diisi'
        if (!data.alamat1.rw) newErrors['alamat1.rw'] = 'wajib diisi'
        if (!data.alamat1.kodpos) newErrors['alamat1.kodpos'] = 'wajib diisi'

        if (parseInt(data.temtin) > 0) {
            if (!data.alamat2.prov) newErrors['alamat2.prov'] = 'Provinsi domisili wajib diisi'
            if (!data.alamat2.kab) newErrors['alamat2.kab'] = 'Kabupaten/Kota domisili wajib diisi'
            if (!data.alamat2.kec) newErrors['alamat2.kec'] = 'Kecamatan domisili wajib diisi'
            if (!data.alamat2.desa) newErrors['alamat2.desa'] = 'Desa/Kelurahan domisili wajib diisi'
            if (!data.alamat2.addr) newErrors['alamat2.addr'] = 'Alamat domisili wajib diisi'
            if (!data.alamat2.rt) newErrors['alamat2.rt'] = 'wajib diisi'
            if (!data.alamat2.rw) newErrors['alamat2.rw'] = 'wajib diisi'
            if (!data.alamat2.kodpos) newErrors['alamat2.kodpos'] = 'wajib diisi'
        }

        // Dokumen

        if (data.tel.length > 0 && data.tel.length < 9) newErrors.tel = 'nomor telepon tidak valid'
        if (data.tel.length > 13) newErrors.tel = 'nomor telepon tidak valid'
        if (!data.tel) newErrors.tel = 'Nomor telepon wajib diisi'
        if (!data.email) newErrors.email = 'Email wajib diisi'
        if (!data.hub) newErrors.hub = 'Hubungan dengan siswa wajib diisi'
        return newErrors
    }
    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validate form first
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            // Scroll to first error
            const firstErrorKey = Object.keys(errors)[0];
            if (firstErrorKey) {
                const element =
                    document.getElementById(firstErrorKey) ||
                    document.querySelector(`[name="${firstErrorKey}"], [data-name="${firstErrorKey}"]`)
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        try {
            // Get signature first
            await getSignature(true);
        } catch (err) {
            toast.error('Gagal mendapatkan tanda tangan digital');
            if (import.meta.env.VITE_APP_DEBUG) {
                error('Signature error:', err);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Prepare main form data
            const formData = new FormData();

            // Add simple fields
            const simpleFields: Array<keyof FormData> = ['nama', 'warneg', 'warnegName', 'nik', 'kk', 'paspor', 'temtin', 'hub', 'tel', 'email'];
            simpleFields.forEach(field => {
                if (data[field] !== null && data[field] !== undefined) {
                    formData.append(field, data[field] as string);
                }
            });

            // Add files
            if (data.ktpFile) formData.append('ktpFile', data.ktpFile);
            if (data.pasporFile) formData.append('pasporFile', data.pasporFile);

            // Add addresses
            Object.entries(data.alamat1).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formData.append(`alamat1[${key}]`, value);
                }
            });

            if (parseInt(data.temtin) === 1) {
                Object.entries(data.alamat2).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        formData.append(`alamat2[${key}]`, value);
                    }
                });
            }

            if (signatureData.sign) {
                formData.append('sign', signatureData.sign);
                formData.append('payload', signatureData.payload);
            }

            const debugFormData: Record<string, string> = {};
            formData.forEach((value, key) => {
                debugFormData[key] = String(value);
            });
            log("DEBUG FORMDATA:", { "Debug FormData": debugFormData });


            router.post(route('register', nouid), formData, {
                onSuccess: () => {
                    reset();
                    setOpen(false);
                    toast.success('Pendaftaran berhasil!');
                },
                onError: (errors) => {
                    toast.error('Terjadi kesalahan saat pendaftaran');
                    setValidationErrors(errors);
                    error("Error Submit :", errors)
                },
                onFinish: () => {
                    setProcessing(false);
                },
            });
        } catch (err) {
            error("Error Submit :", err)
            toast.error('Proses pendaftaran gagal');
        } finally {
            setProcessing(false);
        }
    };

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

                <InfoBadge variant='warning' title='Perhatian!' items={[
                    'Isi data sesuai identitas resmi (KTP/Paspor).',
                    'Unggah foto dokumen asli yang jelas dan terbaca.',
                    'Pastikan nomor WhatsApp dan email aktif untuk menerima PIN akses SIP.',
                    'Jika WNA, wajib unggah paspor dan KITAS/KITAP yang berlaku.',
                ]} />

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
                        setStep={setStep}
                        errors={validationErrors}
                        onChange={(fieldName: string, value: string) => {
                            setData(prev => ({ ...prev, [fieldName]: value }))
                            setValidationErrors(prev => {
                                const newErrors = { ...prev }
                                delete newErrors[fieldName]
                                return newErrors
                            })
                        }}
                    />


                    {/* Document Upload Section */}
                    {step !== null && (<>
                        <DokForm
                            step={step}
                            processing={processing}
                            previews={{
                                ktpPreview: data.ktpPreview,
                                pasporPreview: data.pasporPreview
                            }}
                            errors={validationErrors}
                            onChange={handleFileUpload}
                        />

                        {/* Address Section */}
                        <AlamatForm
                            data={{
                                temtin: data.temtin,
                                alamat1: data.alamat1,
                                alamat2: data.alamat2
                            }}
                            onChange={(fieldName: string, value: string | unknown) => {
                                setData(prev => ({ ...prev, [fieldName]: value }))
                                setValidationErrors(prev => {
                                    const newErrors = { ...prev }
                                    delete newErrors[fieldName]
                                    return newErrors
                                })
                            }}
                            step={step}
                            errors={validationErrors}
                        />

                        <KontakForm
                            data={{
                                hub: data.hub,
                                tel: data.tel,
                                email: data.email
                            }}
                            onChange={(fieldName: string, value: string) => {
                                setData(prev => ({ ...prev, [fieldName]: value }))
                                setValidationErrors(prev => {
                                    const newErrors = { ...prev }
                                    delete newErrors[fieldName]
                                    return newErrors
                                })
                            }}
                            errors={validationErrors}
                        />

                        <div className='pt-6'>
                            <button
                                onClick={handleNext}
                                className={cn(`w-full px-4 py-3 flex justify-center items-center text-white rounded-md transition-colors bg-primary hover:bg-primary-dark cursor-pointer font-medium`,
                                    processing && 'bg-primary/50 cursor-not-allowed'
                                )}
                                disabled={processing}
                            >
                                {processing ? <FaSpinner className='animate-spin text-center' /> : 'Lanjutkan'}
                            </button>
                        </div>

                        {/* Terms and Conditions Modal */}
                        <Modal
                            isOpen={open}
                            onClose={() => {
                                setOpen(false);
                                setProcessing(false)
                            }}
                            onConfirm={(e) => {
                                handleSubmit(e);
                                setProcessing(true);
                            }}
                            confirmText={processing ? "mendaftar" : "Setuju"}
                            confirmDisabled={processing}
                            header={false}
                            // error={validationErrors.snk}
                            agreement={<p>
                                Saya yang bertanda tangan di bawah ini <strong>{data.nama}</strong> menyatakan telah membaca,
                                memahami, dan menyetujui seluruh ketentuan di atas terkait Kartu Pelajar atas nama <strong>{signatureData?.siswa}</strong>.
                            </p>}
                        >
                            <Show
                                childData={{
                                    nouid: nouid,
                                    ...snk,
                                    ...signatureData
                                }}
                                isChild
                            />

                        </Modal>
                    </>)}
                </form>

                <ConfirmDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    title="Dokumen Belum Lengkap"
                    description={step === 'WNI'
                        ? "Foto KTP wajib diunggah untuk WNI. Harap lengkapi sebelum melanjutkan."
                        : "Foto paspor wajib diunggah untuk WNA. Harap lengkapi sebelum melanjutkan."}
                    confirmText="Mengerti"
                    cancelText={null}
                    onConfirm={() => setIsDialogOpen(false)}
                    variant="danger"
                />
            </div>
        </AppLayout>
    )
}

export default Register