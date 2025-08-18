import { Plus, FileText, CalendarDays, Send } from 'lucide-react';
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { useLogger } from '@/contexts/logger-context';
import { Button } from '@/components/ui/button';
import InputGroup from '@/components/InputGroup';
import InputFile from '@/components/InputFile';
import { router, useForm, usePage } from '@inertiajs/react';
import { ConfirmDialog } from '@/components/ConfirmDialog ';
import { DataSiswa, IzinType, JenisIzin } from '@/types';
import { SelectInput } from '@/components/SelectInput';
import { useAppConfig } from '@/hooks/use-app-config';
import dayjs from 'dayjs';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/status-badge';

type IzinProps = {
    nouid: string;
    onClose?: () => void;
};

type FormData = {
    jen: number;
    tgl_mulai: string;
    tgl_akhir: string;
    ket: string;
    dok: File | null;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const Izin: React.FC<IzinProps> = ({ nouid }) => {
    const { data: pageData, jenis = [] } = usePage<{
        data: DataSiswa;
        jenis: JenisIzin[];
    }>().props;

    const isMobile = useIsMobile();
    const { log, error: logError } = useLogger();
    const { APP_DEBUG } = useAppConfig();
    const [sedangMembuat, setSedangMembuat] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedIzinId, setSelectedIzinId] = useState<string | null>(null);
    const [daftarIzin, setDaftarIzin] = useState<IzinType[]>(pageData.izin || []);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, reset, post, processing } = useForm<FormData>({
        jen: APP_DEBUG ? 2 : 0,
        tgl_mulai: APP_DEBUG ? dayjs().format('YYYY-MM-DD') : '',
        tgl_akhir: APP_DEBUG ? dayjs().format('YYYY-MM-DD') : '',
        ket: APP_DEBUG ? 'TEST MODE TEST MODE' : '',
        dok: null
    });

    const jenisIzinOptions = useMemo(() => (
        jenis.map(item => ({
            value: item.id.toString(),
            label: item.title
        }))
    ), [jenis]);

    const validateForm = useCallback((): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        if (!data.jen) {
            newErrors.jen = 'Jenis izin harus dipilih';
            isValid = false;
        }

        if (!data.tgl_mulai) {
            newErrors.tgl_mulai = 'Tanggal mulai harus diisi';
            isValid = false;
        }

        if (!data.tgl_akhir) {
            newErrors.tgl_akhir = 'Tanggal selesai harus diisi';
            isValid = false;
        } else if (dayjs(data.tgl_akhir).isBefore(dayjs(data.tgl_mulai))) {
            newErrors.tgl_akhir = 'Tanggal selesai tidak boleh sebelum tanggal mulai';
            isValid = false;
        }

        if (!data.ket) {
            newErrors.ket = 'Keterangan harus diisi';
            isValid = false;
        } else if (data.ket.length < 10) {
            newErrors.ket = 'Keterangan minimal 10 karakter';
            isValid = false;
        }

        if (!data.dok && !imagePreview) {
            newErrors.dok = 'Dokumen pendukung diperlukan';
            isValid = false;
            setTimeout(() => {
                fileInputRef.current?.focus();
            }, 0);
        }

        setErrors(newErrors);
        if (!isValid) logError('Validation errors', newErrors);
        return isValid;
    }, [data, imagePreview, logError]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png'];
        const maxSize = 2 * 1024 * 1024; // 2MB

        if (!validTypes.includes(file.type)) {
            setErrors(prev => ({ ...prev, dok: 'Format file harus JPG atau PNG' }));
            return;
        }

        if (file.size > maxSize) {
            setErrors(prev => ({ ...prev, dok: 'Ukuran file maksimal 2MB' }));
            return;
        }

        setErrors(prev => ({ ...prev, dok: undefined }));

        const reader = new FileReader();
        reader.onload = (event) => {
            setImagePreview(event.target?.result as string);
            setData('dok', file);
        };
        reader.readAsDataURL(file);
    }, [setData]);

    const handleRemoveImage = useCallback(() => {
        setImagePreview(null);
        setData('dok', null);
        setErrors(prev => ({ ...prev, dok: undefined }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [setData]);

    const handleInputChange = useCallback(<K extends keyof FormData>(
        name: K,
        value: FormData[K]
    ) => {
        setData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }, [setData, errors]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setSedangMembuat(true);

        try {
            await post(route('izin.store', nouid), {
                onSuccess: () => {
                    const jenisIzin = jenis.find(j => j.id === data.jen);
                    const title = jenisIzin?.title || 'Unknown';

                    const izinBaru: IzinType = {
                        id: Math.random().toString(36).substring(2, 9),
                        ...data,
                        dok: imagePreview || null,
                        sta: 'menunggu',
                        created_at: new Date(),
                        title: title
                    };

                    setDaftarIzin(prev => [...prev, izinBaru]);
                    reset();
                    setImagePreview(null);
                    setErrors({});
                    log('Pengajuan izin berhasil', izinBaru);
                },
                onError: (errors) => {
                    setErrors(errors);
                    log('Gagal mengajukan izin', { errors, data });
                },
                onFinish: () => {
                    setSedangMembuat(false);
                }
            });
        } catch (error) {
            console.error('Submission error:', error);
            setSedangMembuat(false);
            log('Error sistem saat mengajukan izin', { error });
        }
    }, [data, imagePreview, validateForm, nouid, reset, log, post, jenis]);

    const handleBatal = useCallback((id: string) => {
        setSelectedIzinId(id);
        setDialogOpen(true);
    }, []);

    const batalkanIzin = useCallback(() => {
        if (!selectedIzinId) return;
        router.post(route('izin.cancel', nouid), { id: selectedIzinId }, {
            onSuccess: () => {
                setDaftarIzin(prev => prev.map(izin =>
                    izin.id === selectedIzinId ? { ...izin, sta: 'dibatalkan' } : izin
                ));
                setDialogOpen(false);
                log('Izin dibatalkan', { idIzin: selectedIzinId });
            }
        });

    }, [selectedIzinId, log, nouid]);

    const formatDate = useCallback((date: Date | string, withTime = false) => {
        return dayjs(date).format(withTime ? 'DD MMMM YYYY HH:mm' : 'DD MMMM YYYY');
    }, []);

    const renderEmptyState = useMemo(() => (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
            <FileText className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-500 mb-1">
                Belum ada pengajuan izin
            </h3>
            <p className="text-gray-400 text-center max-w-md px-4">
                Anda belum membuat permohonan izin. Klik tombol "Ajukan Izin Baru" untuk membuat pengajuan.
            </p>
        </div>
    ), []);

    const renderIzinItem = useCallback((izin: IzinType) => {
        return (
            <div key={izin.id} className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow bg-white space-y-2">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg text-gray-800 capitalize">
                                {izin.title || 'Izin Tidak Diketahui'}
                            </h3>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            <CalendarDays className="inline mr-1 w-4 h-4" />
                            {formatDate(izin.tgl_mulai)} - {formatDate(izin.tgl_akhir)}
                        </p>
                    </div>
                    <StatusBadge status={izin.sta} />
                </div>

                <div className={cn("mt-4 flex justify-between gap-2 items-end", isMobile && "flex-col-reverse items-start")}>
                    <span className="text-xs text-start text-gray-400">
                        Diajukan pada: {formatDate(izin.created_at, true)}
                    </span>
                    <div className={cn("flex-1 flex w-full gap-2 justify-end", isMobile && "w-full")}>
                        {izin.sta === 'menunggu' && (
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleBatal(izin.id)}
                                className="hover:bg-red-600 transition-colors"
                            >
                                Batalkan
                            </Button>
                        )}
                        <Button
                            size="sm"
                            onClick={() => { }}
                        >
                            Detail
                        </Button>
                    </div>
                </div>
            </div>
        );
    }, [formatDate, handleBatal, isMobile]);

    const renderForm = useMemo(() => (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-center mb-6">
                <h2 className="text-xl font-bold text-blue-800">Formulir Pengajuan Izin</h2>
            </div>

            <div className="space-y-5">
                <SelectInput
                    name="jen"
                    label="Jenis Izin"
                    value={data.jen.toString()}
                    onChange={(value) => handleInputChange("jen", parseInt(value))}
                    options={jenisIzinOptions}
                    placeholder="Pilih jenis izin"
                    errors={errors}
                    required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup
                        label="Tanggal Mulai"
                        type={data.jen === 3 ? "datetime-local" : "date"}
                        name="tgl_mulai"
                        value={data.tgl_mulai}
                        min={dayjs().format('YYYY-MM-DD')}
                        onChange={(e) => handleInputChange("tgl_mulai", e as string)}
                        errors={errors}
                        required
                    />

                    <InputGroup
                        label="Tanggal Selesai"
                        type={data.jen === 3 ? "datetime-local" : "date"}
                        name="tgl_akhir"
                        value={data.tgl_akhir}
                        onChange={(e) => handleInputChange("tgl_akhir", e as string)}
                        min={data.tgl_mulai}
                        errors={errors}
                        required
                    />
                </div>

                <InputGroup
                    label="Keterangan"
                    type="textarea"
                    name="ket"
                    value={data.ket}
                    onChange={(e) => handleInputChange("ket", e as string)}
                    placeholder="Berikan penjelasan detail alasan izin..."
                    rows={4}
                    errors={errors}
                    required
                />

                <InputFile
                    ref={fileInputRef}
                    name="dok"
                    label="Dokumen Pendukung"
                    preview={imagePreview ?? undefined}
                    showError={!!errors.dok}
                    errorMessage={errors.dok}
                    handleRemoveImage={handleRemoveImage}
                    handleFileChange={handleFileChange}
                />
                <p className="mt-1 text-sm text-gray-500">Format: JPG, PNG (Maks. 2MB)</p>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <Button
                        variant="destructive"
                        type="button"
                        onClick={() => {
                            reset();
                            setErrors({});
                            setImagePreview(null);
                            setSedangMembuat(false);
                        }}
                        disabled={processing}
                    >
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={processing}
                    >
                        <Send className="mr-2 w-4 h-4" />
                        {processing ? 'Mengajukan...' : 'Ajukan Izin'}
                    </Button>
                </div>
            </div>
        </form>
    ), [data, errors, handleFileChange, handleInputChange, handleRemoveImage, handleSubmit, imagePreview, reset, jenisIzinOptions, processing]);

    return (
        <div className="max-w-4xl mx-auto p-2">
            {!sedangMembuat ? (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <Button
                            onClick={() => setSedangMembuat(true)}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            <Plus className="mr-2" size={16} /> Ajukan Izin Baru
                        </Button>
                    </div>

                    {daftarIzin.length === 0 ? renderEmptyState : (
                        <div className="space-y-4">
                            {daftarIzin.map(renderIzinItem)}
                        </div>
                    )}
                </>
            ) : renderForm}

            <ConfirmDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title="Batalkan Izin"
                description="Apakah anda yakin ingin membatalkan izin ini?"
                confirmText="Ya"
                cancelText="Tidak"
                onConfirm={batalkanIzin}
            />
        </div>
    );
};

export default Izin;