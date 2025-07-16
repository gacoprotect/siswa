import React, { ChangeEvent, useEffect, useState, useCallback } from 'react';
import Section from './section';

interface DokFormProps {
    step: 'WNI' | 'WNA' | null;
    setData: (field: string, value: File | null) => void;
    processing: boolean;
    errors?: {
        ktpFile?: string;
        pasporFile?: string;
    };
    // Tambahkan prop untuk menyimpan URL preview dari parent component
    previews?: {
        ktpPreview?: string | null;
        pasporPreview?: string | null;
    };
}

const DokForm: React.FC<DokFormProps> = React.memo(({
    step,
    setData,
    processing,
    errors = {},
    previews = {}
}) => {
    const [ktpPreview, setKtpPreview] = useState<string | null>(previews.ktpPreview || null);
    const [pasporPreview, setPasporPreview] = useState<string | null>(previews.pasporPreview || null);
    const [touched, setTouched] = useState({
        ktpFile: false,
        pasporFile: false
    });

    // Update local state ketika previews dari parent berubah
    useEffect(() => {
        setKtpPreview(previews.ktpPreview || null);
        setPasporPreview(previews.pasporPreview || null);
    }, [previews.ktpPreview, previews.pasporPreview]);

    // Clear previews when processing
    useEffect(() => {
        if (processing) {
            setKtpPreview(null);
            setPasporPreview(null);
        }
    }, [processing]);

    // Clean up object URLs
    useEffect(() => {
        return () => {
            if (ktpPreview) URL.revokeObjectURL(ktpPreview);
            if (pasporPreview) URL.revokeObjectURL(pasporPreview);
        };
    }, [ktpPreview, pasporPreview]);

    const handleImageChange = useCallback((
        e: ChangeEvent<HTMLInputElement>,
        type: 'ktpFile' | 'pasporFile'
    ) => {
        const file = e.target.files?.[0];
        setTouched(prev => ({ ...prev, [type]: true }));

        if (!file) {
            setData(type, null);
            type === 'ktpFile' ? setKtpPreview(null) : setPasporPreview(null);
            return;
        }

        // Validate file type
        if (!file.type.match('image/(jpeg|png|jpg)')) {
            alert('Hanya file gambar (JPEG/PNG/JPG) yang diperbolehkan');
            return;
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Ukuran file maksimal 2MB');
            return;
        }

        setData(type, file);
        const previewUrl = URL.createObjectURL(file);
        type === 'ktpFile' ? setKtpPreview(previewUrl) : setPasporPreview(previewUrl);
    }, [setData]);

    const renderFileUpload = useCallback((
        type: 'ktpFile' | 'pasporFile',
        label: string,
        preview: string | null,
        setPreview: (value: string | null) => void
    ) => {
        const showError = touched[type] && errors[type];
        const fieldName = type === 'ktpFile' ? 'KTP' : 'Paspor/KITAS';

        return (
            <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                    {label} *
                </label>
                <div className='flex flex-col space-y-2'>
                    {preview ? (
                        <div className='relative'>
                            <img
                                src={preview}
                                alt={`Preview ${label}`}
                                className='max-w-full h-auto max-h-64 rounded border border-gray-200'
                            />
                            <button
                                type='button'
                                className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors'
                                onClick={() => {
                                    setData(type, null);
                                    setPreview(null);
                                    setTouched(prev => ({ ...prev, [type]: true }));
                                }}
                                aria-label={`Hapus ${label}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <>
                            <label className='flex flex-col items-center justify-center px-4 py-8 bg-white rounded-md border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className='mt-2 text-sm font-medium text-gray-700'>
                                    Upload {fieldName}
                                </span>
                                <span className='text-xs text-gray-500 mt-1'>
                                    Format: JPG/PNG, maksimal 2MB
                                </span>
                                <input
                                    type='file'
                                    accept='image/jpeg, image/png, image/jpg'
                                    className='hidden'
                                    onChange={(e) => handleImageChange(e, type)}
                                    // required
                                />
                            </label>
                        </>
                    )}
                    {showError && (
                        <p className="text-xs text-red-500 mt-1">{errors[type]}</p>
                    )}
                </div>
            </div>
        );
    }, [errors, handleImageChange, setData, touched]);

    return (
        <Section title='Upload Dokumen'>
            <div className='space-y-6 bg-gray-50 p-6 rounded-lg'>
                {step === 'WNI' ? (
                    renderFileUpload(
                        'ktpFile',
                        'Foto KTP',
                        ktpPreview,
                        setKtpPreview
                    )
                ) : (
                    renderFileUpload(
                        'pasporFile',
                        'Paspor/KITAS',
                        pasporPreview,
                        setPasporPreview
                    )
                )}
            </div>
        </Section>
    );
});

export default DokForm;