import AppLayout from '@/Layout/AppLayout'
import { useForm, usePage } from '@inertiajs/react'
import React, { ChangeEvent, useEffect, useCallback, useRef, useState } from 'react'
import { countries } from 'countries-list'
import { AlertTriangle, Info, CheckCircle } from 'lucide-react'
import AlamatForm from '@/components/form/alamat-form'
import KontakForm from '@/components/form/kontak-form'
import DokForm from '@/components/form/dokumen-form'
import PersonalForm from '@/components/form/personal-form'
import InfoBadge from '@/components/info-badge'
import { NoteDialog } from '@/components/NoteDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog '

type Address = {
    addr: string
    rt: string
    rw: string
    kec: string
    desa: string
    kodpos: string
    prov: string
    kab: string
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

const Register = ({ nouid }: { nouid: string }) => {
    const { errors } = usePage().props
    const [step, setStep] = React.useState<'WNA' | 'WNI' | null>(null)
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    const { data, setData, post, processing, reset } = useForm<FormData>({
        nama: '',
        warneg: '',
        warnegName: '',
        nik: '',
        kk: '',
        paspor: '',
        alamat1: {
            addr: '',
            rt: '',
            rw: '',
            kec: '',
            desa: '',
            kodpos: '',
            prov: '',
            kab: '',
        },
        alamat2: {
            addr: '',
            rt: '',
            rw: '',
            kec: '',
            desa: '',
            kodpos: '',
            prov: '',
            kab: '',
        },
        temtin: '',
        hub: '',
        tel: '',
        email: '',
        ktpFile: null,
        pasporFile: null,
        ktpPreview: null,
        pasporPreview: null,
    })

    useEffect(() => {
        if (data.warneg === 'ID') {
            setStep('WNI')
        } else if (data.warneg) {
            setStep('WNA')
        } else {
            setStep(null)
        }
    }, [data.warneg])

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
    }, [data, setData])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (step === 'WNI' && !data.ktpFile) {
            setIsDialogOpen(true)
            return
        }
        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (typeof value === 'object' && !(value instanceof File)) {
                    formData.append(key, JSON.stringify(value))
                } else {
                    formData.append(key, value as string | Blob)
                }
            }
        })

        post(route('register', nouid), {
            onSuccess: () => {
                reset()
            }
        })
    }

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
                    {/* Personal Information Section */}
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
                        setData={setData}
                        setStep={setStep}
                        errors={errors}
                    />

                    {/* Document Upload Section */}
                    {step !== null && (<>
                        <DokForm
                            step={step}
                            setData={handleFileUpload}
                            processing={processing}
                            previews={{
                                ktpPreview: data.ktpPreview,
                                pasporPreview: data.pasporPreview
                            }}
                            errors={errors}
                        />

                        {/* Address Section */}
                        <AlamatForm
                            data={{
                                temtin: data.temtin,
                                alamat1: data.alamat1,
                                alamat2: data.alamat2
                            }}
                            setData={setData}
                            step={step}
                            errors={errors}
                        />

                        <KontakForm
                            data={{
                                hub: data.hub,
                                tel: data.tel,
                                email: data.email
                            }}
                            setData={setData}
                            errors={errors}
                        />

                        <div className='pt-6'>
                            <button
                                type='submit'
                                className={`w-full px-4 py-3 text-white rounded-md transition-colors ${processing
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-primary hover:bg-primary-dark cursor-pointer'
                                    } font-medium`}
                                disabled={processing}
                            >
                                {processing ? (
                                    <span className='flex items-center justify-center'>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Mengirim...
                                    </span>
                                ) : (
                                    'Daftar Sekarang'
                                )}
                            </button>
                        </div>
                    </>)}
                </form>
                <ConfirmDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    title="KTP Belum Diupload"
                    description="Foto KTP wajib diunggah untuk WNI. Harap lengkapi sebelum melanjutkan."
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