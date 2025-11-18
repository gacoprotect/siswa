import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import InputGroup from '../InputGroup';
import { SelectInput } from '../SelectInput';
import Section from './section';

interface Address {
    addr: string;
    rt: string;
    rw: string;
    kec: string;
    desa: string;
    kodpos: string;
    prov: string;
    kab: string;
}

interface AlamatProps {
    data: {
        temtin: string;
        alamat1: Address;
        alamat2: Address;
    };
    step: 'WNI' | 'WNA' | null;
    onChange: (key: string, value: string | Address) => void;
    errors?: Record<string, string>;
}

interface RegionOption {
    id: string;
    nama: string;
}

type AddressType = 'alamat1' | 'alamat2';
type RegionLevel = 'prov' | 'kab' | 'kec' | 'desa';
type RegionApiLevel = 'provinsi' | 'kabupaten' | 'kecamatan' | 'kelurahan';

const REGION_HIERARCHY: Record<RegionLevel, RegionApiLevel | null> = {
    prov: 'provinsi',
    kab: 'kabupaten',
    kec: 'kecamatan',
    desa: 'kelurahan',
};


const AlamatForm: React.FC<AlamatProps> = ({ step, data, onChange, errors }) => {
    const [loading, setLoading] = useState<Map<string, boolean>>(new Map());

    const [regions, setRegions] = useState<Record<RegionApiLevel, RegionOption[]>>({
        provinsi: [],
        kabupaten: [],
        kecamatan: [],
        kelurahan: [],
    });

    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
    const regionCache = useRef<Map<string, RegionOption[]>>(new Map());
    const abortControllers = useRef<Map<string, AbortController>>(new Map());

    // Initialize provinces on mount
    useEffect(() => {
        fetchRegions('provinsi');

        return () => {
            // Cleanup: abort all pending requests
            const controllers = abortControllers.current;
            controllers.forEach((controller) => controller.abort());
            controllers.clear();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Fetch regions from API with caching and error handling
     */
    const fetchRegions = useCallback(async (level: RegionApiLevel, parentId?: string): Promise<void> => {
        const cacheKey = parentId ? `${level}-${parentId}` : level;

        // Check cache first
        if (regionCache.current.has(cacheKey)) {
            const cached = regionCache.current.get(cacheKey)!;
            // Only update regions state for provinsi (no parentId)
            // Child regions are accessed via cache lookup in getRegionsForAddress
            if (!parentId) {
                setRegions((prev) => ({ ...prev, [level]: cached }));
            }
            return;
        }

        // Abort previous request for this cacheKey if exists
        const prevController = abortControllers.current.get(cacheKey);
        if (prevController) {
            prevController.abort();
        }

        // Create new abort controller
        const controller = new AbortController();
        abortControllers.current.set(cacheKey, controller);

        // Set loading state for this specific cacheKey (not just level)
        setLoading((prev) => {
            const newMap = new Map(prev);
            newMap.set(cacheKey, true);
            return newMap;
        });

        try {
            const params = parentId ? { kod: parentId } : {};
            const response = await axios.get(route('api.data.wilayah', params), {
                signal: controller.signal,
            });

            if (response.data?.success && Array.isArray(response.data.data)) {
                const newRegions: RegionOption[] = response.data.data.map((item: RegionOption) => ({
                    id: String(item.id),
                    nama: String(item.nama),
                }));

                // Always cache the result
                regionCache.current.set(cacheKey, newRegions);

                // Only update regions state for provinsi (root level, no parentId)
                // Child regions (kabupaten, kecamatan, kelurahan) are accessed via cache lookup
                // This prevents cross-address interference
                if (!parentId) {
                    setRegions((prev) => ({
                        ...prev,
                        [level]: newRegions,
                    }));
                }
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                return; // Request was cancelled, ignore
            }
            console.error(`Error fetching ${level}:`, error);
            // Optionally set error state here for UI feedback
        } finally {
            abortControllers.current.delete(cacheKey);
            // Clear loading state for this specific cacheKey
            setLoading((prev) => {
                const newMap = new Map(prev);
                newMap.delete(cacheKey);
                return newMap;
            });
        }
    }, []);

    /**
     * Mark field as touched
     */
    const markTouched = useCallback((field: string) => {
        setTouchedFields((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
    }, []);

    /**
     * Convert error string to InputGroup error format
     */
    const getInputGroupError = useCallback((errorKey: string, error?: string): Record<string, string[]> | undefined => {
        return error ? { [errorKey]: [error] } : undefined;
    }, []);

    /**
     * Handle region selection change
     */
    const handleRegionChange = useCallback(
        (addressType: AddressType, level: RegionLevel, value: string) => {
            markTouched(`${addressType}.${level}`);

            const currentAddress = data[addressType];
            const updatedAddress: Address = { ...currentAddress, [level]: value };

            // Reset dependent levels based on hierarchy
            // Only reset address data, don't reset regions state globally
            // Regions will be filtered in getRegionsForAddress based on parent ID
            const resetLevels: Record<RegionLevel, RegionLevel[]> = {
                prov: ['kab', 'kec', 'desa'],
                kab: ['kec', 'desa'],
                kec: ['desa'],
                desa: [],
            };

            resetLevels[level].forEach((resetLevel) => {
                updatedAddress[resetLevel] = '';
            });

            // Update UI immediately (optimistic update)
            onChange(addressType, updatedAddress);

            // Fetch next level in background (non-blocking)
            // Regions will be cached and available for both addresses
            if (value) {
                const nextLevel: Record<RegionLevel, RegionApiLevel | null> = {
                    prov: 'kabupaten',
                    kab: 'kecamatan',
                    kec: 'kelurahan',
                    desa: null,
                };

                const fetchLevel = nextLevel[level];
                if (fetchLevel) {
                    // Don't await - let it run in background
                    fetchRegions(fetchLevel, value).catch((error) => {
                        // Only log if not cancelled
                        if (!axios.isCancel(error)) {
                            console.error(`Error fetching ${fetchLevel}:`, error);
                        }
                    });
                }
            }
        },
        [data, onChange, fetchRegions, markTouched],
    );

    /**
     * Handle address field changes
     */
    const handleAddressChange = useCallback(
        (addressType: AddressType, field: keyof Address, value: string) => {
            markTouched(`${addressType}.${field}`);
            onChange(addressType, {
                ...data[addressType],
                [field]: value,
            });
        },
        [data, onChange, markTouched],
    );

    /**
     * Get regions for specific address type
     * Uses cache lookup based on parent ID to prevent cross-address interference
     */
    const getRegionsForAddress = useCallback(
        (addressType: AddressType) => {
            const address = data[addressType];

            // Get provinsi from shared state (always same)
            const provinsiOptions = regions.provinsi;

            // Get child regions from cache based on parent ID
            // This ensures alamat1 and alamat2 don't interfere with each other
            const getCachedRegions = (level: RegionApiLevel, parentId?: string): RegionOption[] => {
                if (!parentId) return [];
                const cacheKey = `${level}-${parentId}`;
                // Only use cache, don't fallback to shared regions state
                // This prevents cross-address interference
                return regionCache.current.get(cacheKey) || [];
            };

            return {
                provinsi: provinsiOptions,
                kabupaten: address.prov ? getCachedRegions('kabupaten', address.prov) : [],
                kecamatan: address.kab ? getCachedRegions('kecamatan', address.kab) : [],
                kelurahan: address.kec ? getCachedRegions('kelurahan', address.kec) : [],
            };
        },
        [data, regions],
    );

    /**
     * Check if region field should be disabled
     */
    const isRegionDisabled = useCallback(
        (addressType: AddressType, level: RegionLevel): boolean => {
            const address = data[addressType];

            // Check loading state for this specific address's parent context
            const getLoadingKey = (): string | null => {
                if (level === 'prov') return 'provinsi';
                if (level === 'kab' && address.prov) return `kabupaten-${address.prov}`;
                if (level === 'kec' && address.kab) return `kecamatan-${address.kab}`;
                if (level === 'desa' && address.kec) return `kelurahan-${address.kec}`;
                return null;
            };

            const loadingKey = getLoadingKey();
            if (loadingKey && loading.get(loadingKey)) return true;

            const dependencies: Record<RegionLevel, RegionLevel | null> = {
                prov: null,
                kab: 'prov',
                kec: 'kab',
                desa: 'kec',
            };

            const dependency = dependencies[level];
            return dependency ? !address[dependency] : false;
        },
        [data, loading],
    );

    /**
     * Render region select input
     */
    const renderRegionSelect = useCallback(
        (addressType: AddressType, level: RegionLevel, label: string, required = false) => {
            const value = data[addressType][level] || '';
            const addressRegions = getRegionsForAddress(addressType);
            const apiLevel = REGION_HIERARCHY[level]!;
            const options = addressRegions[apiLevel];

            // Check loading state for this specific address's parent context
            const address = data[addressType];
            const getLoadingKey = (): string | null => {
                if (level === 'prov') return 'provinsi';
                if (level === 'kab' && address.prov) return `kabupaten-${address.prov}`;
                if (level === 'kec' && address.kab) return `kecamatan-${address.kab}`;
                if (level === 'desa' && address.kec) return `kelurahan-${address.kec}`;
                return null;
            };

            const loadingKey = getLoadingKey();
            const isLoading = loadingKey ? loading.get(loadingKey) || false : false;
            const disabled = isRegionDisabled(addressType, level);
            const fieldKey = `${addressType}.${level}`;

            const selectOptions = options.map((option) => ({
                value: option.id,
                label: option.nama,
            }));

            return (
                <SelectInput
                    name={fieldKey}
                    id={`${addressType}-${level}`}
                    allowEmpty
                    label={label}
                    value={value}
                    onChange={(val) => handleRegionChange(addressType, level, val)}
                    options={isLoading ? [] : selectOptions}
                    placeholder={isLoading ? 'Loading...' : '-- Pilih --'}
                    disabled={disabled}
                    required={required}
                    errors={errors}
                />
            );
        },
        [data, loading, errors, getRegionsForAddress, isRegionDisabled, handleRegionChange],
    );

    /**
     * Render address fields section
     */
    const renderAddressFields = useCallback(
        (prefix: string, addressType: AddressType, title?: string) => {
            const required = Boolean(title?.includes('*'));

            return (
                <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                    {title && <h3 className="text-sm font-bold text-red-700">{title}</h3>}

                    <div className="grid grid-cols-2 gap-4">
                        {renderRegionSelect(addressType, 'prov', 'Provinsi', required)}
                        {renderRegionSelect(addressType, 'kab', 'Kabupaten/Kota', required)}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {renderRegionSelect(addressType, 'kec', 'Kecamatan', required)}
                        {renderRegionSelect(addressType, 'desa', 'Desa/Kelurahan', required)}
                    </div>

                    <InputGroup
                        name={`${addressType}.addr`}
                        id={`${prefix}-addr`}
                        label="Alamat Lengkap"
                        placeholder="Jl. Contoh No. 123"
                        value={data[addressType].addr}
                        onChange={(value) => handleAddressChange(addressType, 'addr', value as string)}
                        onBlur={() => markTouched(`${addressType}.addr`)}
                        required={required}
                        type="text"
                        errors={getInputGroupError(`${addressType}.addr`, errors?.[`${addressType}.addr`])}
                        touched={touchedFields[`${addressType}.addr`]}
                    />

                    <div className="grid grid-cols-3 gap-3">
                        <InputGroup
                            name={`${addressType}.rt`}
                            id={`${prefix}-rt`}
                            label="RT"
                            placeholder="001"
                            value={data[addressType].rt}
                            onChange={(value) => handleAddressChange(addressType, 'rt', value as string)}
                            onBlur={() => markTouched(`${addressType}.rt`)}
                            required={required}
                            type="number"
                            errors={getInputGroupError(`${addressType}.rt`, errors?.[`${addressType}.rt`])}
                            touched={touchedFields[`${addressType}.rt`]}
                            maxLength={3}
                            max={3}
                        />

                        <InputGroup
                            name={`${addressType}.rw`}
                            id={`${prefix}-rw`}
                            label="RW"
                            placeholder="002"
                            value={data[addressType].rw}
                            onChange={(value) => handleAddressChange(addressType, 'rw', value as string)}
                            onBlur={() => markTouched(`${addressType}.rw`)}
                            required={required}
                            type="number"
                            errors={getInputGroupError(`${addressType}.rw`, errors?.[`${addressType}.rw`])}
                            touched={touchedFields[`${addressType}.rw`]}
                            maxLength={3}
                            max={3}
                        />

                        <InputGroup
                            name={`${addressType}.kodpos`}
                            id={`${prefix}-kodpos`}
                            label="Kode Pos"
                            placeholder="12345"
                            value={data[addressType].kodpos}
                            onChange={(value) => handleAddressChange(addressType, 'kodpos', value as string)}
                            onBlur={() => markTouched(`${addressType}.kodpos`)}
                            required={required}
                            type="number"
                            errors={getInputGroupError(`${addressType}.kodpos`, errors?.[`${addressType}.kodpos`])}
                            touched={touchedFields[`${addressType}.kodpos`]}
                            maxLength={5}
                            max={99999}
                        />
                    </div>
                </div>
            );
        },
        [data, errors, touchedFields, renderRegionSelect, handleAddressChange, markTouched, getInputGroupError],
    );

    // Memoize residence options
    const residenceOptions = useMemo(
        () => [
            { value: '0', label: 'Sesuai KTP' },
            { value: '1', label: 'Alamat Lain' },
        ],
        [],
    );

    // Memoize should show address 1
    const shouldShowAddress1 = useMemo(() => {
        if (step === 'WNA') return true;
        return data.temtin !== '';
    }, [step, data.temtin]);

    // Memoize address 1 title
    const address1Title = useMemo(() => {
        return step === 'WNA' ? 'Alamat Domisili *' : '*Alamat Sesuai KTP';
    }, [step]);

    return (
        <Section title="Alamat">
            <div className="space-y-4">
                {shouldShowAddress1 && renderAddressFields(step === 'WNA' ? 'alamat-domisili' : 'alamat-ktp', 'alamat1', address1Title)}

                {step === 'WNI' && (
                    <SelectInput
                        name="temtin"
                        id="tempat-tinggal"
                        allowEmpty
                        label="Dimana Anda Tinggal?"
                        value={data.temtin}
                        onChange={(value) => {
                            markTouched('temtin');
                            onChange('temtin', value);
                        }}
                        placeholder="-- Pilih --"
                        options={residenceOptions}
                        required
                        errors={errors}
                        triggerClassName={errors?.['temtin'] ? 'border-destructive' : ''}
                    />
                )}

                {data.temtin === '1' && renderAddressFields('alamat-tinggal', 'alamat2', '*Alamat Tempat Tinggal')}
            </div>
        </Section>
    );
};

export default AlamatForm;
