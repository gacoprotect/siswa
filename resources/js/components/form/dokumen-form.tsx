import { AlertCircle } from 'lucide-react';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import Section from './section';

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

type FileType = 'ktpFile' | 'pasporFile';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const DokFormComponent: React.FC<DokFormProps> = ({ step, processing, errors = {}, previews = {}, onChange }) => {
    const [previewsState, setPreviewsState] = useState<Record<FileType, string | null>>({
        ktpFile: previews.ktpPreview || null,
        pasporFile: previews.pasporPreview || null,
    });

    const [touched, setTouched] = useState<Record<FileType, boolean>>({
        ktpFile: false,
        pasporFile: false,
    });

    const [fileErrors, setFileErrors] = useState<Record<FileType, string>>({
        ktpFile: '',
        pasporFile: '',
    });

    // Store files locally to persist on error
    const filesRef = useRef<Record<FileType, File | null>>({
        ktpFile: null,
        pasporFile: null,
    });

    // Sync previews from parent - prioritize parent's preview if it exists
    // Otherwise keep local preview for instant feedback
    useEffect(() => {
        setPreviewsState((prev) => {
            const newState = { ...prev };

            // Only update if parent has a preview (parent preview takes priority)
            if (previews.ktpPreview !== undefined) {
                // Revoke old local preview if different from parent
                if (prev.ktpFile && prev.ktpFile !== previews.ktpPreview && prev.ktpFile.startsWith('blob:')) {
                    URL.revokeObjectURL(prev.ktpFile);
                }
                newState.ktpFile = previews.ktpPreview || null;
            }

            if (previews.pasporPreview !== undefined) {
                // Revoke old local preview if different from parent
                if (prev.pasporFile && prev.pasporFile !== previews.pasporPreview && prev.pasporFile.startsWith('blob:')) {
                    URL.revokeObjectURL(prev.pasporFile);
                }
                newState.pasporFile = previews.pasporPreview || null;
            }

            return newState;
        });
    }, [previews.ktpPreview, previews.pasporPreview]);

    // Clean up object URLs on unmount only (parent manages lifecycle)
    useEffect(() => {
        return () => {
            // Only cleanup if previews are from our local state (shouldn't happen but safety)
            setPreviewsState((prev) => {
                Object.values(prev).forEach((preview) => {
                    if (preview && preview.startsWith('blob:') && !previews.ktpPreview && !previews.pasporPreview) {
                        URL.revokeObjectURL(preview);
                    }
                });
                return prev;
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Validate file type and size
     */
    const validateFile = useCallback((file: File): string | null => {
        if (!ALLOWED_TYPES.includes(file.type)) {
            return 'Hanya file gambar (JPEG/PNG/JPG) yang diperbolehkan';
        }

        if (file.size > MAX_FILE_SIZE) {
            return 'Ukuran file maksimal 2MB';
        }

        return null;
    }, []);

    /**
     * Handle file selection
     * Create local preview immediately for better UX, parent will also create one
     */
    const handleImageChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>, type: FileType) => {
            const file = e.target.files?.[0] || null;

            setTouched((prev) => ({ ...prev, [type]: true }));
            setFileErrors((prev) => ({ ...prev, [type]: '' }));

            if (!file) {
                filesRef.current[type] = null;
                // Clear preview if no file
                setPreviewsState((prev) => ({ ...prev, [type]: null }));
                onChange?.(type, null);
                return;
            }

            const validationError = validateFile(file);
            if (validationError) {
                setFileErrors((prev) => ({ ...prev, [type]: validationError }));
                e.target.value = '';
                return;
            }

            // Store file reference for persistence
            filesRef.current[type] = file;

            // Create local preview immediately for instant feedback
            // Parent will also create one, but this ensures preview shows right away
            const localPreviewUrl = URL.createObjectURL(file);
            setPreviewsState((prev) => ({ ...prev, [type]: localPreviewUrl }));

            // Notify parent - parent will create blob URL and update preview
            // When parent updates, useEffect will sync and may replace local preview
            onChange?.(type, file);
        },
        [onChange, validateFile],
    );

    /**
     * Handle file removal
     * Clean up local preview and notify parent
     */
    const handleRemoveImage = useCallback(
        (type: FileType) => {
            // Revoke local preview URL if exists
            const currentPreview = previewsState[type];
            if (currentPreview && currentPreview.startsWith('blob:')) {
                URL.revokeObjectURL(currentPreview);
            }

            // Clear local state
            setFileErrors((prev) => ({ ...prev, [type]: '' }));
            setPreviewsState((prev) => ({ ...prev, [type]: null }));
            filesRef.current[type] = null;

            // Notify parent - parent will handle blob URL cleanup and preview update
            onChange?.(type, null);
        },
        [onChange, previewsState],
    );

    /**
     * Format file size with 2 decimal places
     * Returns size in KB or MB based on file size
     */
    const formatFileSize = useCallback((bytes: number): string => {
        if (bytes >= 1024 * 1024) {
            // >= 1 MB
            const mb = bytes / (1024 * 1024);
            return `${mb.toFixed(2)} MB`;
        }
        // < 1 MB
        const kb = bytes / 1024;
        return `${kb.toFixed(2)} KB`;
    }, []);

    /**
     * Get configuration for file type
     */
    const getFileConfig = useCallback((type: FileType) => {
        return {
            ktpFile: {
                label: 'Foto KTP',
                fieldName: 'KTP',
            },
            pasporFile: {
                label: 'Paspor/KITAS',
                fieldName: 'Paspor/KITAS',
            },
        }[type];
    }, []);

    /**
     * Render file upload component
     */
    const renderFileUpload = useCallback(
        (type: FileType, currentPreview: string | null) => {
            const { label, fieldName } = getFileConfig(type);
            const errorMessage = fileErrors[type] || errors?.[type] || '';
            const showError = (touched[type] || errorMessage) && Boolean(errorMessage);

            return (
                <div id={type} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">{label} *</label>
                    <div className="flex flex-col space-y-2">
                        {currentPreview || filesRef.current[type] ? (
                            <div className="space-y-2">
                                <div className="group relative flex min-h-[256px] items-center justify-center overflow-hidden rounded border border-gray-200 bg-gray-50">
                                    {currentPreview ? (
                                        <img
                                            src={currentPreview}
                                            alt={`Preview ${label}`}
                                            className="h-auto max-h-64 max-w-full object-contain"
                                            onError={() => {
                                                // Fallback if preview fails to load - don't remove, just log
                                                console.warn('Preview image failed to load:', currentPreview);
                                                // Set error state instead of removing
                                                setFileErrors((prev) => ({
                                                    ...prev,
                                                    [type]: 'Gagal memuat preview gambar. Silakan coba unggah ulang.',
                                                }));
                                            }}
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-12 w-12 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <p className="mt-2 text-sm text-gray-500">Mempersiapkan preview...</p>
                                        </div>
                                    )}
                                    <div className="bg-opacity-0 group-hover:bg-opacity-30 absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-all duration-200 group-hover:opacity-100">
                                        <button
                                            type="button"
                                            className="rounded-full bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
                                            onClick={() => handleRemoveImage(type)}
                                            disabled={processing}
                                            aria-label={`Hapus ${label}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                {filesRef.current[type] && (
                                    <div className="rounded bg-blue-50 p-2">
                                        <p className="text-xs font-medium text-blue-900">File dipilih:</p>
                                        <p className="text-xs break-all text-blue-700">{filesRef.current[type]?.name}</p>
                                        <p className="mt-1 text-xs text-blue-600">{formatFileSize(filesRef.current[type]?.size || 0)}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <label
                                className={`flex flex-col items-center justify-center rounded-md border-2 border-dashed bg-white px-4 py-8 ${
                                    showError ? 'border-red-300' : 'border-gray-300'
                                } ${processing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50'} transition-colors`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <span className="mt-2 text-sm font-medium text-gray-700">Upload {fieldName}</span>
                                <span className="mt-1 text-xs text-gray-500">Format: JPG/PNG, maksimal 2MB</span>
                                <input
                                    id={type}
                                    name={type}
                                    type="file"
                                    accept={ALLOWED_TYPES.join(', ')}
                                    className="hidden"
                                    onChange={(e) => handleImageChange(e, type)}
                                    disabled={processing}
                                    required
                                />
                            </label>
                        )}
                        {showError && (
                            <p className="mt-1 flex items-center gap-2 text-xs text-red-500">
                                <AlertCircle className="h-5 w-5 text-red-500" />
                                <span>{errorMessage}</span>
                            </p>
                        )}
                    </div>
                </div>
            );
        },
        [errors, fileErrors, formatFileSize, getFileConfig, handleImageChange, handleRemoveImage, processing, touched],
    );

    const fileType: FileType | null = step === 'WNI' ? 'ktpFile' : step === 'WNA' ? 'pasporFile' : null;

    if (!fileType) {
        return null;
    }

    return (
        <Section title="Upload Dokumen">
            <div className="space-y-6 rounded-lg bg-gray-50 p-6">{renderFileUpload(fileType, previewsState[fileType])}</div>
        </Section>
    );
};

DokFormComponent.displayName = 'DokForm';

// Custom comparison function to ensure re-render when previews change
const DokForm = React.memo(DokFormComponent, (prevProps, nextProps) => {
    // Re-render if previews changed
    if (
        prevProps.previews?.ktpPreview !== nextProps.previews?.ktpPreview ||
        prevProps.previews?.pasporPreview !== nextProps.previews?.pasporPreview
    ) {
        return false; // Re-render
    }

    // Re-render if other props changed
    if (prevProps.step !== nextProps.step || prevProps.processing !== nextProps.processing || prevProps.errors !== nextProps.errors) {
        return false; // Re-render
    }

    return true; // Don't re-render
});

export default DokForm;
