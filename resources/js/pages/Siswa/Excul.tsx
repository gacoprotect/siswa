import { ConfirmDialog } from '@/components/ConfirmDialog ';
import InputGroup from '@/components/InputGroup';
import { OtpStep } from '@/components/OtpStep';
import { Modal } from '@/components/ui/Modal';
import { useLogger } from '@/contexts/logger-context';
import { useAppConfig } from '@/hooks/use-app-config';
import { cn } from '@/lib/utils';
import { DataExcul, DataSiswa } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaBook, FaCalendarAlt, FaInfoCircle, FaRunning, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface ExculProps {
    nouid: string;
}

const Excul = ({ nouid }: ExculProps) => {
    const { data, errors } = usePage<{ data: DataSiswa }>().props;
    const { log, error: logError } = useLogger();
    const { APP_DEBUG } = useAppConfig();
    const [countdown, setCountdown] = useState(0);
    const otpRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

    const [process, setProcess] = useState<number | null>(null);
    const [dialogConfig, setDialogConfig] = useState<{
        open: boolean;
        step: 'confirm' | 'form' | 'otp' | null;
        action: 'subscribe' | 'unsubscribe' | null;
        exculId: number | null;
        title: string;
    }>({
        open: false,
        step: null,
        action: null,
        exculId: null,
        title: '',
    });

    const [initialData, setInitialData] = useState<DataExcul>({
        sub: [],
        waiting: [],
        rejected: [],
        exited: [],
        excul: [],
    });

    const simulasi = (excul: number) => {
        if (!APP_DEBUG) return null;

        return (
            <div className='border-2 border-red-500 px-4 py-2 rounded-lg space-y-2'>
                <p className='text-xs font-medium border-b-2'>Developer menu</p>
                <div className='flex gap-2'>
                    <button
                        onClick={() => {
                            router.get(route('simulasi.excul', { simulasi: "acc", excul: excul, nouid: nouid }))
                        }}
                        className="p-1 bg-blue-500 rounded-md text-white cursor-pointer"
                    >
                        Terima
                    </button>
                    <button
                        onClick={() => {
                            router.get(route('simulasi.excul', { simulasi: "reject", excul: excul, nouid: nouid }))
                        }}
                        className="p-1 bg-red-500 rounded-md text-white cursor-pointer"
                    >
                        Tolak
                    </button>
                </div>
            </div>
        );
    };
    useEffect(() => {
        if (data?.kegiatan) {
            setInitialData(data.kegiatan);
            log('Data siswa loaded:', data);
        }
    }, [data?.kegiatan, log, data]);

    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    useEffect(() => {
        if (dialogConfig.step === 'otp' && otpRefs.current[0]) {
            otpRefs.current[0]?.focus();
        }
    }, [dialogConfig.step]);



    // Group all excul statuses
    const exculStatuses = useMemo(() => {
        return initialData.excul.map(excul => {
            if (initialData.sub.includes(excul.id)) {
                return { ...excul, status: 'active', statusText: 'Aktif' };
            }
            if (initialData.waiting.includes(excul.id)) {
                return { ...excul, status: 'waiting', statusText: 'Menunggu' };
            }
            if (initialData.rejected.includes(excul.id)) {
                return { ...excul, status: 'rejected', statusText: 'Ditolak' };
            }
            if (initialData.exited.includes(excul.id)) {
                return { ...excul, status: 'exited', statusText: 'Keluar' };
            }
            return { ...excul, status: 'none', statusText: 'Belum Terdaftar' };
        });
    }, [initialData]);

    // Filter by status
    const activeExcul = useMemo(() =>
        exculStatuses.filter(e => e.status === 'active'),
        [exculStatuses]
    );
    const waitingExcul = useMemo(() =>
        exculStatuses.filter(e => e.status === 'waiting'),
        [exculStatuses]
    );
    const rejectedExcul = useMemo(() =>
        exculStatuses.filter(e => e.status === 'rejected'),
        [exculStatuses]
    );
    const exitedExcul = useMemo(() =>
        exculStatuses.filter(e => e.status === 'exited'),
        [exculStatuses]
    );
    const { data: FormData, setData, processing, post, reset, clearErrors, errors: FormErrors, setError } = useForm({
        otp: '',
        excul: 0,
        tgl: '',
        ket: ''
    });
    const validateForm = useCallback((field: string | null = null) => {
        const newErrors: Record<string, string> = {};
        const validateSingleField = field !== null;

        const addErrorIfInvalid = (isInvalid: boolean, errorKey: string, errorMessage: string) => {
            if ((!validateSingleField || errorKey === field) && isInvalid) {
                newErrors[errorKey] = errorMessage;
            }
        };

        // Validasi umum
        addErrorIfInvalid(!FormData.excul, 'excul', 'Pilih Excul Anda');
        addErrorIfInvalid(!FormData.tgl, 'tgl', 'Tanggal wajib diisi');
        addErrorIfInvalid(!FormData.ket, 'ket', 'Masukkan alasan Anda');

        return newErrors;
    }, [FormData]);
    const handleSubscription = useCallback(async (id: number, action: 'subscribe' | 'unsubscribe') => {

        try {
            setData('excul', id);
            // For subscribe/unsubscribe, we need to show dialog first
            setDialogConfig({
                open: true,
                step: action === 'unsubscribe' ? 'confirm' : 'form',
                action: action,
                exculId: id,
                title: action === 'subscribe' ? 'Form Pendaftaran' : 'Form Keluar Ekstrakurikuler'
            });
        } catch (err) {
            logError(`${action} failed:`, err);
        }
    }, [logError, setData]);

    const handleDialogSubmit = useCallback(async () => {
        if (!dialogConfig.action || dialogConfig.exculId === null) return;

        const FormErrors = validateForm();
        setError(FormErrors)
        if (Object.keys(FormErrors).length > 0) {
            logError("Validation Error : ", FormErrors)
            const firstErrorKey = Object.keys(FormErrors)[0];
            if (firstErrorKey) {
                const element = document.getElementById(firstErrorKey) ||
                    document.querySelector(`[name="${firstErrorKey}"], [data-name="${firstErrorKey}"]`);
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        try {
            const routeName = dialogConfig.action === 'subscribe' ? 'subs.excul' : 'unsubs.excul';

            await post(route(routeName, nouid), {
                preserveScroll: true,
                preserveState: true,
                onStart: () => setProcess(dialogConfig.exculId),
                onSuccess: () => {
                    reset();
                },
                onError: () => {
                    toast.error('Permintaan Gagal');
                    logError(errors);
                },
                onFinish: () => {
                    setProcess(null);
                    setDialogConfig(prev => ({ ...prev, open: false }));
                },
            });
        } catch (err) {
            logError(`${dialogConfig.action} failed:`, err);
        }
    }, [dialogConfig, nouid, post, reset, logError, errors, setError, validateForm]);

    const handleDialogClose = useCallback(() => {
        setDialogConfig(prev => ({ ...prev, open: false }));
        reset();
        clearErrors();
    }, [reset, clearErrors]);

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('otp.verif', data.nouid), {
            onSuccess: () => {
                log('OTP SUKSES');
                handleDialogSubmit()
                setDialogConfig(prev => ({ ...prev, step: null }));
            },
            onError: () => {
                log('OTP GAGAL');
            },
        });
    };

    const resendOtp = () => {
        post(route('otp.send', data.nouid), {
            onSuccess: () => {
                setCountdown(60);
            },
        });
    };

    const handleDigitChange = (value: string, field: 'otp', index: number) => {
        const newValue = FormData[field].split('');
        newValue[index] = value.charAt(value.length - 1) || '';
        setData(field, newValue.join(''));
    };

    const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !FormData.otp[index] && index > 0 && otpRefs.current[index - 1]) {
            otpRefs.current[index - 1]?.focus();
        }
    };
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">Aktif</span>;
            case 'waiting':
                return <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">Menunggu</span>;
            case 'rejected':
                return <span className="rounded bg-red-100 px-2 py-1 text-xs text-red-800">Ditolak</span>;
            case 'exited':
                return <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800">Anda telah Keluar</span>;
            case 'registered':
                return <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800">Terdaftar</span>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6 p-4">
            {/* Dialog Modal */}
            {(dialogConfig.open && dialogConfig.step === 'confirm') && (
                <ConfirmDialog
                    open={dialogConfig.step === 'confirm'}
                    onOpenChange={(val) => { setDialogConfig(prev => ({ ...prev, open: val })) }}
                    title="Keluar Ekstrakulikuler"
                    description="Apakah anda yakin ingin keluar dari kegiatan ini?"
                    confirmText="Ya"
                    cancelText="Tidak"
                    closeOnConfirm={false}
                    onConfirm={() => { setDialogConfig(prev => ({ ...prev, open: true, step: 'form' })) }}
                />
            )}
            {dialogConfig.step === 'form' && (
                <Modal
                    isOpen={dialogConfig.open}
                    onClose={handleDialogClose}
                    onConfirm={() => {
                        if (dialogConfig.action === 'unsubscribe') {
                            resendOtp();
                            setDialogConfig(prev => ({ ...prev, step: 'otp' }))
                        } else if (dialogConfig.action === 'subscribe') {
                            handleDialogSubmit()
                            setDialogConfig(prev => ({ ...prev, step: null }));
                        }
                    }}
                    confirmText={processing ? <FaSpinner className="animate-spin" /> : "Kirim"}
                    className='w-100 mx-5'
                    size='xl'
                    title={dialogConfig.title}
                >
                    <div className="flex flex-col gap-4">
                        <InputGroup
                            label={`Tanggal ${dialogConfig.action === 'subscribe' ? "Mulai" : "Berhenti"}`}
                            name='tgl'
                            type="date"
                            onChange={(v) => { setData('tgl', v as string); clearErrors('tgl') }}
                            required={true}
                            error={FormErrors.tgl}
                        />
                        <InputGroup
                            label={`${dialogConfig.action === 'subscribe' ? "Motivasi mendaftar" : "Alasan Berhenti"}`}
                            name='ket'
                            type="textarea"
                            onChange={(v) => { setData('ket', v as string); clearErrors('ket') }}
                            required={true}
                            rows={3}
                            error={FormErrors.ket}

                        />
                    </div>
                </Modal>
            )}
            {dialogConfig.step === 'otp' && (
                <Modal
                    isOpen={dialogConfig.open}
                    onClose={handleDialogClose}
                    className='w-100 mx-5'
                    size='xl'
                >
                    <OtpStep
                        otp={FormData.otp}
                        errors={errors}
                        processing={processing}
                        countdown={countdown}
                        onOtpChange={(value, index) => handleDigitChange(value, 'otp', index)}
                        onKeyDown={handleOtpKeyDown}
                        onBack={() => setDialogConfig(prev => ({ ...prev, step: 'form' }))}
                        onResendOtp={resendOtp}
                        onSubmit={handleOtpSubmit}
                        inputRefs={otpRefs}
                    />
                </Modal>
            )}

            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">Ekstrakurikuler</h3>
            </div>

            {Object.keys(errors).length > 0 && (
                <div className="flex flex-row items-center justify-center space-x-3 py-4 border-2 border-red-600">
                    <AlertCircle className="text-3xl text-red-600" />
                    <span className="text-md font-bold text-red-600">{errors.message ?? "Terjadi Kesalahan"}</span>
                </div>
            )}

            {/* Active Excul */}
            {(activeExcul.length > 0 || waitingExcul.length > 0) ? (
                <div className="rounded-lg bg-white p-6 shadow">
                    <h4 className="mb-4 flex items-center gap-2 border-b pb-2 text-lg font-semibold text-gray-800">
                        <FaRunning className="text-green-500" />
                        Ekstrakurikuler Aktif
                    </h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {activeExcul.map((activity) => (
                            <div key={activity.id} className="rounded-lg border p-4 transition-shadow hover:shadow-md">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h5 className="text-lg font-bold">{activity.name}</h5>
                                        <p className="text-gray-600">
                                            Status: {getStatusBadge(activity.status)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            setData('excul', activity.id)
                                            e.preventDefault();
                                            handleSubscription(activity.id, 'unsubscribe');
                                        }}
                                        disabled={process === activity.id}
                                        className="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
                                    >
                                        {process === activity.id ? (
                                            <FaSpinner className="animate-spin" />
                                        ) : (
                                            'Keluar'
                                        )}
                                    </button>
                                </div>
                                <div className="mt-3 flex items-center justify-between text-sm">
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Kuota: {activity.registered}/{activity.quota}
                                        </p>
                                        <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200">
                                            <div
                                                className="h-1.5 rounded-full bg-green-500"
                                                style={{
                                                    width: `${Math.min(100, (activity.registered / activity.quota) * 100)}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <span className="text-gray-500">{activity.day}, {activity.time}</span>
                                    <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">Lihat Jadwal</span>
                                </div>
                            </div>
                        ))}

                        {waitingExcul.map((activity) => (
                            <div key={activity.id} className="rounded-lg bg-yellow-50 border-2 border-yellow-500 p-4 transition-shadow hover:shadow-md">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h5 className="text-lg font-bold">{activity.name}</h5>
                                        <p className="text-gray-600">
                                            Status: {getStatusBadge(activity.status)}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between text-sm">
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Kuota: {activity.registered}/{activity.quota}
                                        </p>
                                        <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200">
                                            <div
                                                className="h-1.5 rounded-full bg-green-500"
                                                style={{
                                                    width: `${Math.min(100, (activity.registered / activity.quota) * 100)}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <span className="text-gray-500">{activity.day}, {activity.time}</span>
                                    {simulasi(activity.id)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="py-8 text-center text-gray-500">
                    <p>Anda belum terdaftar dalam ekstrakurikuler apapun</p>
                    <a href="#list_excul" className="mt-4 font-medium text-indigo-600 hover:text-indigo-800">Daftar Sekarang</a>
                </div>
            )}

            {/* Available Excul */}
            <div id="list_excul" className="rounded-lg bg-white p-6 shadow">
                <h4 className="mb-4 flex items-center gap-2 border-b pb-2 text-lg font-semibold text-gray-800">
                    <FaBook className="text-indigo-500" />
                    Daftar Ekstrakurikuler Tersedia
                </h4>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {exculStatuses.map((ext) => {
                        const isFull = ext.registered === ext.quota;
                        const isWaiting = waitingExcul.some((a) => a.id === ext.id);
                        const isRejected = rejectedExcul.some((a) => a.id === ext.id);
                        const isExited = exitedExcul.some((a) => a.id === ext.id);
                        const isRegistered = activeExcul.some((a) => a.id === ext.id);
                        const isProcessing = process === ext.id;

                        return (
                            <div key={ext.id} className="rounded-lg border p-4 transition-shadow hover:shadow-lg">
                                <div className="mb-3 flex items-center gap-3">
                                    <h5 className="text-lg font-bold">{ext.name}</h5>
                                    {isRejected && getStatusBadge('rejected')}
                                    {isExited && getStatusBadge('exited')}
                                </div>

                                <div className="space-y-2 text-sm">
                                    <p className="flex items-center gap-2 text-gray-600">
                                        <FaCalendarAlt className="text-gray-400" />
                                        {ext.day}, {ext.time}
                                    </p>
                                    <p className="text-gray-600">Pelatih: {ext.coach}</p>
                                    <div className="flex items-center justify-between pt-2">
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Kuota: {ext.registered}/{ext.quota}
                                            </p>
                                            <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200">
                                                <div
                                                    className="h-1.5 rounded-full bg-green-500"
                                                    style={{
                                                        width: `${Math.min(100, (ext.registered / ext.quota) * 100)}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                        {isFull ? (
                                            <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">Kuota Penuh</span>
                                        ) : isWaiting ? (
                                            getStatusBadge('waiting')
                                        ) : (
                                            <div className='flex items-center gap-4 justify-between pt-2'>
                                                {isRegistered ? (
                                                    getStatusBadge('registered')
                                                ) : (
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleSubscription(ext.id, 'subscribe');
                                                        }}
                                                        className={cn(
                                                            `flex items-center justify-center space-x-2 rounded bg-indigo-600 px-3 py-1 text-xs text-white hover:bg-indigo-700`,
                                                            isProcessing && 'bg-indigo-400 hover:bg-indigo-500'
                                                        )}
                                                        disabled={isProcessing}
                                                    >
                                                        {isProcessing && <FaSpinner className="animate-spin" />}
                                                        <span>{isRejected || isExited ? "Daftar Ulang" : "Daftar"}</span>
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Informasi Penting */}
            <div className="rounded border-l-4 border-blue-400 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                    <FaInfoCircle className="mt-1 flex-shrink-0 text-blue-500" />
                    <div>
                        <h4 className="font-medium text-blue-800">Informasi Penting</h4>
                        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-blue-700">
                            <li>Setiap siswa boleh mengikuti maksimal 2 ekstrakurikuler</li>
                            <li>Pendaftaran ditutup ketika kuota terpenuhi</li>
                            <li>Kehadiran minimal 80% untuk mendapatkan sertifikat</li>
                            <li>Status pendaftaran akan diperiksa oleh admin</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Excul;