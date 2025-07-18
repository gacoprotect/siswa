import React, { ChangeEvent, useEffect, useState, useCallback } from 'react';
import Section from './section';
import { AlertCircle } from 'lucide-react';

interface DokFormProps {
    step: 'WNI' | 'WNA' | null;
    processing: boolean;
    previews?: {
        ktpPreview?: string | null;
        pasporPreview?: string | null;
    };
    errors?: Record<string, string>;
    onChange?: (field: string, value: File | null) => void;
}

const DokForm: React.FC<DokFormProps> = React.memo(({
    step,
    processing,
    errors = {},
    previews = {},
    onChange,
}) => {
    const [ktpPreview, setKtpPreview] = useState<string | null>(previews.ktpPreview || null);
    const [pasporPreview, setPasporPreview] = useState<string | null>(previews.pasporPreview || null);
    const [touched, setTouched] = useState({
        ktpFile: false,
        pasporFile: false
    });
    const [fileErrors, setFileErrors] = useState({
        ktpFile: '',
        pasporFile: ''
    });

    // Update local state when previews from parent change
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

    const validateFile = (file: File): string | null => {
        // Validate file type
        if (!file.type.match('image/(jpeg|png|jpg)')) {
            return 'Hanya file gambar (JPEG/PNG/JPG) yang diperbolehkan';
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            return 'Ukuran file maksimal 2MB';
        }

        return null;
    };

    const handleImageChange = useCallback((
        e: ChangeEvent<HTMLInputElement>,
        type: 'ktpFile' | 'pasporFile'
    ) => {
        const file = e.target.files?.[0] || null;
        setTouched(prev => ({ ...prev, [type]: true }));

        // Clear previous error
        setFileErrors(prev => ({ ...prev, [type]: '' }));

        if (!file) {
            onChange?.(type, null);
            type === 'ktpFile' ? setKtpPreview(null) : setPasporPreview(null);
            return;
        }

        const validationError = validateFile(file);
        if (validationError) {
            setFileErrors(prev => ({ ...prev, [type]: validationError }));
            e.target.value = ''; // Clear the file input
            return;
        }

        onChange?.(type, file);
        const previewUrl = URL.createObjectURL(file);
        type === 'ktpFile' ? setKtpPreview(previewUrl) : setPasporPreview(previewUrl);
    }, [onChange]);

    const handleRemoveImage = useCallback((
        type: 'ktpFile' | 'pasporFile'
    ) => {
        onChange?.(type, null);
        type === 'ktpFile' ? setKtpPreview(null) : setPasporPreview(null);
        setTouched(prev => ({ ...prev, [type]: true }));
        setFileErrors(prev => ({ ...prev, [type]: '' }));
    }, [onChange]);

    const renderFileUpload = useCallback((
        type: 'ktpFile' | 'pasporFile',
        label: string,
        preview: string | null,
        setPreview: (value: string | null) => void
    ) => {
        const fieldName = type === 'ktpFile' ? 'KTP' : 'Paspor/KITAS';
        const errorMessage = fileErrors[type] || errors[type];
        const showError = (touched[type] || fileErrors[type] || errors[type]) && errorMessage;

        return (
            <div id={type} className='space-y-2'>
                <label className='block text-sm font-medium text-gray-700'>
                    {label} *
                </label>
                <div className='flex flex-col space-y-2'>
                    {preview ? (
                        <div className='relative group'>
                            <img
                                src={preview}
                                alt={`Preview ${label}`}
                                className='max-w-full h-auto max-h-64 rounded border border-gray-200'
                            />
                            <div className='absolute inset-0 bg-black/50 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100'>
                                <button
                                    type='button'
                                    className='bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors'
                                    onClick={() => handleRemoveImage(type)}
                                    aria-label={`Hapus ${label}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <label className={`flex flex-col items-center justify-center px-4 py-8 bg-white rounded-md border-2 border-dashed ${showError ? 'border-red-300' : 'border-gray-300'} cursor-pointer hover:bg-gray-50 transition-colors`}>
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
                                    id={type}
                                    name={type}
                                    type='file'
                                    accept='image/jpeg, image/png, image/jpg'
                                    className='hidden'
                                    onChange={(e) => handleImageChange(e, type)}
                                    disabled={processing}
                                    required
                                />
                            </label>
                        </>
                    )}
                    {showError && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-2">
                            <AlertCircle className="text-red-500 w-5 h-5" />
                            <span>{errorMessage}</span>
                        </p>
                    )}
                </div>
            </div>
        );
    }, [errors, fileErrors, handleImageChange, handleRemoveImage, processing, touched]);

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