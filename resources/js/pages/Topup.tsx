import InputGroup from '@/components/InputGroup';
import AppLayout from '@/Layout/AppLayout';
import { Nominal, Siswa } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Check, Copy, X } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaArrowAltCircleLeft, FaSpinner } from 'react-icons/fa';

interface TopupProps {
    siswa: Siswa;
    nouid: string;
    onClose: () => void;
}
const MINIMAL_TOPUP = 10000;
const NOMINALS: Nominal[] = [
    { id: 1, amount: 50000 },
    { id: 2, amount: 100000 },
    { id: 3, amount: 200000 },
    { id: 4, amount: 300000 },
    { id: 5, amount: 500000 },
    { id: 6, amount: 1000000 },
];

const Topup: React.FC<TopupProps> = ({ siswa, nouid, onClose }) => {
    const { errors } = usePage().props;
    const [va, setVa] = useState<string | null>(null);
    const [selectedNominal, setSelectedNominal] = useState<number | null>(null);
    const [customNominal, setCustomNominal] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [copyError, setCopyError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Fungsi khusus untuk menyalin VA tanpa mempengaruhi state form
    const handleCopy = useCallback(async () => {
        if (!va) {
            setCopyError('Nomor VA belum tersedia');
            return;
        }

        try {
            await navigator.clipboard.writeText(va);
            setCopied(true);
            setCopyError(null);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            setCopyError('Gagal menyalin nomor VA. Silakan salin manual.');
            console.error('Gagal menyalin:', err);
        }
    }, [va]);

    const fetchVaNumber = useCallback(async () => {
        try {
            setIsLoading(true);
            setFormError(null);
            setCopyError(null);

            const response = await fetch(route('api.reqVA', nouid));

            if (!response.ok) {
                throw new Error('Gagal memuat data pembayaran');
            }

            const data = await response.json();

            if (data.success !== true) {
                throw new Error(data.message || 'Terjadi kesalahan pada server');
            }

            setVa(data.va_number);
        } catch (err) {
            setFormError(err instanceof Error ? err.message : 'Terjadi kesalahan jaringan');
        } finally {
            setIsLoading(false);
        }
    }, [nouid]);

    useEffect(() => {
        fetchVaNumber();
    }, [fetchVaNumber]);

    const nominalValue = useMemo(() => {
        if (customNominal) {
            return parseInt(customNominal);
        }
        if (selectedNominal) {
            return NOMINALS.find((n) => n.id === selectedNominal)?.amount || null;
        }
        return null;
    }, [customNominal, selectedNominal]);

    const validateForm = useCallback(() => {
        if (!nominalValue) {
            setFormError('Harap pilih nominal topup!');
            return false;
        }

        if (nominalValue < MINIMAL_TOPUP) {
            setFormError(`Minimal topup adalah Rp ${MINIMAL_TOPUP.toLocaleString('id-ID')}`);
            return false;
        }

        if (!va) {
            setFormError('Nomor Virtual Account tidak valid');
            return false;
        }

        return true;
    }, [nominalValue, va]);

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setIsSubmitting(true);
            setFormError(null);

            if (!validateForm()) {
                setIsSubmitting(false);
                return;
            }

            try {
                await router.post(
                    route('topup.charge', nouid),
                    {
                        va_number: va,
                        amount: nominalValue,
                        nouid: nouid,
                    },
                    {
                        onError: (errors) => {
                            setFormError(errors?.message || 'Gagal memproses pembayaran');
                        },
                    },
                );
            } catch (err) {
                setFormError('Terjadi kesalahan saat memproses pembayaran');
                console.error(err);
            } finally {
                setIsSubmitting(false);
            }
        },
        [nominalValue, nouid, validateForm, va],
    );

    return (
        <AppLayout title="Top Up">
            <div className="min-h-screen overflow-hidden rounded-lg bg-white shadow-md">
                <div className="flex items-center justify-between bg-primary px-4 py-4 text-primary-foreground">
                    <button onClick={onClose} className="flex items-center space-x-2 transition-opacity hover:opacity-80" aria-label="Kembali">
                        <FaArrowAltCircleLeft className="text-primary-foreground" />
                        <span>Kembali</span>
                    </button>
                    <h1 className="text-2xl font-bold text-white">Topup Saldo</h1>
                </div>
                {isLoading ? (
                    <div className="flex min-h-screen flex-col items-center justify-center space-y-3">
                        <FaSpinner className="animate-spin text-3xl text-blue-600" />
                        <span className="text-lg text-gray-700">Memuat data pembayaran...</span>
                    </div>
                ) : (
                    <>
                        <div className="p-6">
                            <div className="mb-6 rounded-lg bg-gray-50 p-4">
                                <h2 className="mb-2 text-lg font-semibold">Informasi Siswa</h2>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <p className="text-sm text-gray-600">Nama</p>
                                        <p className="font-medium">{siswa.namlen}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">NISN</p>
                                        <p className="font-medium">{siswa.nis}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Kelas</p>
                                        <p className="font-medium">{siswa.kel}</p>
                                    </div>
                                </div>
                            </div>

                            {formError && (
                                <div className="mb-4 flex items-start space-x-2 rounded-lg bg-red-100 p-3 text-red-700">
                                    <X className="mt-0.5 h-5 w-5 flex-shrink-0" />
                                    <span>{formError}</span>
                                </div>
                            )}

                            {/* Bagian Informasi VA dengan penanganan error terpisah */}
                            <div className="mb-6">
                                <h2 className="mb-3 text-lg font-semibold">Bank</h2>
                                <div className="flex flex-col space-y-2">
                                    <span className="text-gray-600">Nomor Virtual Account:</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg font-bold">{va || 'Loading...'}</span>
                                        {va && (
                                            <button
                                                onClick={handleCopy}
                                                className="text-gray-500 hover:text-black"
                                                aria-label="Salin nomor VA"
                                                type="button"
                                            >
                                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                            </button>
                                        )}
                                    </div>
                                    {copyError && <p className="text-sm text-red-500">{copyError}</p>}
                                    <p className="text-sm text-gray-500">Salin nomor VA untuk melakukan pembayaran melalui ATM/Mobile Banking</p>
                                </div>
                            </div>

                            {/* Form Pembayaran */}
                            <form onSubmit={handleSubmit}>
                                <div className={`mb-6`}>
                                    <h2 className="mb-3 text-lg font-semibold text-primary">Pilih Nominal</h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        {NOMINALS.map((nominal) => (
                                            <button
                                                key={nominal.id}
                                                type="button"
                                                className={`${formError && 'border-2 border-red-600'} rounded-lg border p-3 transition-all ${
                                                    selectedNominal === nominal.id
                                                        ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                                                        : 'border-primary bg-primary-foreground hover:bg-primary-foreground/40'
                                                }`}
                                                onClick={() => {
                                                    setSelectedNominal(nominal.id);
                                                    setCustomNominal('');
                                                    setFormError(null);
                                                }}
                                                aria-label={`Pilih Rp ${nominal.amount.toLocaleString('id-ID')}`}
                                            >
                                                <div className="font-medium">Rp {nominal.amount.toLocaleString('id-ID')}</div>
                                            </button>
                                        ))}

                                        <InputGroup
                                            onChange={(value) => {
                                                setCustomNominal(value ? String(value) : '');
                                                setSelectedNominal(null);
                                                setFormError(null);
                                            }}
                                            name="nominal"
                                            placeholder="Masukkan nominal custom"
                                            value={customNominal}
                                            prefix="Rp"
                                            className={`col-span-2 ${formError && 'border-2 border-red-600'}`}
                                            type="number"
                                            min={MINIMAL_TOPUP}
                                        />
                                        {errors.nominal && <p className="text-sm text-red-500">{errors.nominal}</p>}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white transition duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                                    disabled={isSubmitting}
                                    aria-label="Lanjutkan pembayaran"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <FaSpinner className="animate-spin" />
                                            Memproses...
                                        </span>
                                    ) : (
                                        'Lanjutkan Pembayaran'
                                    )}
                                </button>
                            </form>
                        </div>
                        <div className="mx-auto mt-6 max-w-md rounded-lg bg-white p-6 shadow-md">
                            <h2 className="mb-3 text-lg font-semibold">Panduan Topup</h2>
                            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                                <li>Proses topup membutuhkan waktu 1-5 menit</li>
                                <li>Pastikan nominal yang ditransfer sesuai dengan yang dipilih</li>
                                <li>Minimal topup Rp {MINIMAL_TOPUP.toLocaleString('id-ID')}</li>
                                <li>Jika mengalami kendala, hubungi customer service</li>
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
};

export default Topup;
