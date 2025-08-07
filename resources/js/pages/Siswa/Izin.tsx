import { CheckCircle, Clock, XCircle, Plus, FileText, CalendarDays, HeartPulse, Scissors, User, HelpCircle, Send } from 'lucide-react';
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { useLogger } from '@/contexts/logger-context';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import InputGroup from '@/components/InputGroup';
import InputFile from '@/components/InputFile';
import { useForm } from '@inertiajs/react';
import { ConfirmDialog } from '@/components/ConfirmDialog ';

type IzinProps = { nouid: string; onClose?: () => void };

type JenisIzin = 'sakit' | 'dispensasi' | 'pribadi' | 'lainnya';
type StatusIzin = 'menunggu' | 'disetujui' | 'ditolak' | 'dibatalkan';

interface Izin {
    id: string;
    jenis: JenisIzin;
    tglStart: string;
    tglEnd: string;
    ket: string;
    dok: string | null;
    status: StatusIzin;
    dibuatPada: Date;
}

interface FormErrors {
    jenis?: string;
    tglStart?: string;
    tglEnd?: string;
    ket?: string;
    dok?: string;
}

const JENIS_IZIN_OPTIONS = [
    { value: 'sakit', label: 'Izin Sakit', icon: HeartPulse, color: 'text-red-500' },
    { value: 'dispensasi', label: 'Dispensasi', icon: Scissors, color: 'text-blue-500' },
    { value: 'pribadi', label: 'Keperluan Pribadi', icon: User, color: 'text-purple-500' },
    { value: 'lainnya', label: 'Lainnya', icon: HelpCircle, color: 'text-gray-500' },
] as const;

const STATUS_CONFIG = {
    menunggu: { label: 'Menunggu', icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-100', text: 'text-yellow-600' },
    disetujui: { label: 'Disetujui', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-600' },
    ditolak: { label: 'Ditolak', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-600' },
    dibatalkan: { label: 'Dibatalkan', icon: XCircle, color: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-100', text: 'text-gray-600' },
} as const;

const Izin: React.FC<IzinProps> = () => {
    const { log, error: logError } = useLogger();
    const [sedangMembuat, setSedangMembuat] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedIzinId, setSelectedIzinId] = useState<string | null>(null);
    const [daftarIzin, setDaftarIzin] = useState<Izin[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, reset } = useForm({
        jenis: '' as JenisIzin,
        tglStart: '',
        tglEnd: '',
        ket: '',
        dok: null as File | null
    });

    const validateForm = useCallback((): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        if (!data.jenis) {
            newErrors.jenis = 'Jenis izin harus dipilih';
            isValid = false;
        }

        if (!data.tglStart) {
            newErrors.tglStart = 'Tanggal mulai harus diisi';
            isValid = false;
        }

        if (!data.tglEnd) {
            newErrors.tglEnd = 'Tanggal selesai harus diisi';
            isValid = false;
        } else if (new Date(data.tglEnd) < new Date(data.tglStart)) {
            newErrors.tglEnd = 'Tanggal selesai tidak boleh sebelum tanggal mulai';
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
                const fileInputButton = document.querySelector('.file-upload-container');
                if (fileInputButton) {
                    (fileInputButton as HTMLElement).focus();
                }
            }, 0);
        }
        setErrors(newErrors);
        if (!isValid) logError(newErrors)
        return isValid;
    }, [data, imagePreview, logError]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type and size
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            const maxSize = 2 * 1024 * 1024; // 2MB

            if (!validTypes.includes(file.type)) {
                setErrors(prev => ({ ...prev, dok: 'Format file harus JPG, JPEG, atau PNG' }));
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
        }
    }, [setData]);

    const handleRemoveImage = useCallback((name: keyof FormErrors) => {
        setImagePreview(null);
        setData(name, null);
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }, [setData]);

    const handleInputChange = useCallback((name: keyof typeof data, value: string | File | null) => {
        setData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }, [setData, errors]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const izinBaru: Izin = {
            id: Math.random().toString(36).substring(2, 9),
            jenis: data.jenis,
            tglStart: data.tglStart,
            tglEnd: data.tglEnd,
            ket: data.ket,
            dok: imagePreview,
            status: 'menunggu',
            dibuatPada: new Date()
        };

        setDaftarIzin(prev => [...prev, izinBaru]);
        setSedangMembuat(false);
        reset();
        setImagePreview(null);
        setErrors({});
        log('Pengajuan izin dikirim', izinBaru);
    }, [data, imagePreview, log, reset, validateForm]);

    const handleBatal = useCallback((id: string) => {
        setSelectedIzinId(id);
        setDialogOpen(true);
    }, []);

    const batalkanIzin = useCallback(() => {
        if (!selectedIzinId) return;

        setDaftarIzin(prev => prev.map(izin =>
            izin.id === selectedIzinId ? { ...izin, status: 'dibatalkan' } : izin
        ));
        setDialogOpen(false);
        log('Izin dibatalkan', { idIzin: selectedIzinId });
    }, [selectedIzinId, log]);

    const formatDate = useCallback((date: Date | string, withTime = false) => {
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            ...(withTime && { hour: '2-digit', minute: '2-digit' })
        };
        return new Date(date).toLocaleDateString('id-ID', options);
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

    const renderIzinItem = useCallback((izin: Izin) => {
        const status = STATUS_CONFIG[izin.status];
        const jenisIzin = JENIS_IZIN_OPTIONS.find(j => j.value === izin.jenis);

        return (
            <div key={izin.id} className="border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow bg-white">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg text-gray-800 capitalize">
                                {jenisIzin?.label}
                            </h3>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            <CalendarDays className="inline mr-1 w-4 h-4" />
                            {formatDate(izin.tglStart)} - {formatDate(izin.tglEnd)}
                        </p>
                    </div>
                    <Badge
                        variant="outline"
                        className={`flex items-center gap-1 px-3 py-1 ${status.bg} ${status.text} ${status.border}`}
                    >
                        <status.icon className={status.color} size={16} />
                        <span className="capitalize">{status.label}</span>
                    </Badge>
                </div>

                <div className="mt-4 space-y-2">
                    <div>
                        <h4 className="text-sm font-medium text-gray-500">Keterangan</h4>
                        <p className="text-gray-600 whitespace-pre-line">{izin.ket}</p>
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                        Diajukan pada: {formatDate(izin.dibuatPada, true)}
                    </span>
                    {izin.status === 'menunggu' && (
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleBatal(izin.id)}
                            className="hover:bg-red-600 transition-colors"
                        >
                            Batalkan Pengajuan
                        </Button>
                    )}
                </div>
            </div>
        );
    }, [formatDate, handleBatal]);

    const renderForm = useMemo(() => (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Formulir Pengajuan Izin</h2>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Izin*</label>
                    <Select
                        value={data.jenis}
                        onValueChange={(value) => handleInputChange("jenis", value as JenisIzin)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih jenis izin" />
                        </SelectTrigger>
                        <SelectContent>
                            {JENIS_IZIN_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value} className="hover:bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <option.icon className={`w-4 h-4 ${option.color}`} />
                                        <span>{option.label}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.jenis && (
                        <p className="mt-1 text-sm text-red-600">{errors.jenis}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai*</label>
                        <InputGroup
                            type="date"
                            name="tglStart"
                            value={data.tglStart}
                            onChange={(e) => handleInputChange("tglStart", e as string)}
                            className="focus:ring-blue-500 focus:border-blue-500"
                            error={errors.tglStart}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Selesai*</label>
                        <InputGroup
                            type="date"
                            name="tglEnd"
                            value={data.tglEnd}
                            onChange={(e) => handleInputChange("tglEnd", e as string)}
                            min={data.tglStart}
                            error={errors.tglEnd}
                            className="focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Keterangan*</label>
                    <InputGroup
                        name="ket"
                        type='textarea'
                        value={data.ket}
                        onChange={(e) => handleInputChange("ket", e as string)}
                        placeholder="Berikan penjelasan detail alasan izin..."
                        rows={4}
                        error={errors.ket}
                        className="focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <InputFile
                        ref={fileInputRef}
                        name="dok"
                        label="Dokumen Pendukung"
                        preview={imagePreview ?? undefined}
                        showError={!!errors.dok}
                        errorMessage={errors.dok}
                        handleRemoveImage={() => {
                            handleRemoveImage('dok');
                            setData('dok', null);
                        }}
                        handleFileChange={handleFileChange}
                        className="file-upload-container" // Add this class for focusing
                    />
                    <p className="mt-1 text-sm text-gray-500">Format: JPG, PNG (Maks. 2MB)</p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <Button
                        variant="destructive"
                        type="button"
                        onClick={() => {
                            setSedangMembuat(false);
                            setErrors({});
                        }}
                    >
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                        <Send className="mr-2 w-4 h-4" /> Ajukan Izin
                    </Button>
                </div>
            </div>
        </form>
    ), [data, setData, errors, handleFileChange, handleInputChange, handleRemoveImage, handleSubmit, imagePreview]);

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            {!sedangMembuat ? (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <Button
                            onClick={() => setSedangMembuat(true)}
                            className="bg-blue-600 hover:bg-blue-700 transition-colors"
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