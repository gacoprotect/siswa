import React, { useState, useEffect, useCallback, useRef } from 'react';
import Section from './section';
import axios from 'axios';

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
    setData: (key: string, value: string | Address) => void;
    errors?: Record<string, string>;
}

interface RegionOption {
    id: string;
    nama: string;
}
interface InputFieldProps {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    required?: boolean;
    type?: string;
    error?: string;
    touched?: boolean;
    validation?: {
        max?: number;
        min?: number;
        maxLength?: number;
        minLength?: number;
        pattern?: string;
    };
}

const InputField: React.FC<InputFieldProps> = React.memo(({
    id,
    label,
    placeholder,
    value,
    onChange,
    onBlur,
    required = false,
    type = 'text',
    error,
    touched,
    validation
}) => {
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;

        // Validasi khusus untuk tipe number
        if (type === 'number') {
            // Hanya menerima angka
            newValue = newValue.replace(/\D/g, '');

            // Validasi maxLength jika ada
            if (validation?.maxLength && newValue.length > validation.maxLength) {
                return;
            }

            // Validasi min/max jika ada
            if (validation?.min !== undefined && parseInt(newValue) < validation.min) {
                newValue = validation.min.toString();
            }
            if (validation?.max !== undefined && newValue && parseInt(newValue) > validation.max) {
                newValue = validation.max.toString();
            }
        }

        setLocalValue(newValue);
        onChange(newValue);
    };

    const showError = touched && error;

    return (
        <div className='space-y-1'>
            <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
                {label} {required && '*'}
            </label>
            <input
                ref={inputRef}
                id={id}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border ${showError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                value={localValue}
                onChange={handleChange}
                onBlur={onBlur}
                required={required}
                type={type === 'number' ? 'text' : type} // Gunakan type text untuk number agar bisa validasi length
                inputMode={type === 'number' ? 'numeric' : undefined}
                maxLength={validation?.maxLength}
                minLength={validation?.minLength}
                pattern={validation?.pattern}
            />
            {showError && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
});

const AlamatForm: React.FC<AlamatProps> = ({ step, data, setData, errors = {} }) => {
    const [loading, setLoading] = useState({
        prov: false,
        kab: false,
        kec: false,
        desa: false
    });
    const [regions, setRegions] = useState({
        provinsi: [] as RegionOption[],
        kabupaten: [] as RegionOption[],
        kecamatan: [] as RegionOption[],
        kelurahan: [] as RegionOption[]
    });
    const [currentAddressType, setCurrentAddressType] = useState<'alamat1' | 'alamat2'>('alamat1');
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

    useEffect(() => {
        fetchRegions('provinsi');
    }, []);
    useEffect(() => {
        if (step === 'WNA') {
            setData('temtin', '0');
            setTouchedFields(prev => ({ ...prev, temtin: true }));
        }
    }, [step, setData]);
    const fetchRegions = async (level: 'provinsi' | 'kabupaten' | 'kecamatan' | 'kelurahan', parentId?: string) => {
        const key = level === 'provinsi' ? 'prov' :
            level === 'kabupaten' ? 'kab' :
                level === 'kecamatan' ? 'kec' : 'desa';

        setLoading(prev => ({ ...prev, [key]: true }));

        try {
            const params = parentId ? { kod: parentId } : {};
            const response = await axios.get(route('api.wilayah', params));

            if (response.data.success) {
                const newRegions = Array.isArray(response.data.data)
                    ? response.data.data.map((item: any) => ({ id: item.id, nama: item.nama }))
                    : [];

                setRegions(prev => ({
                    ...prev,
                    [level]: newRegions
                }));
            }
        } catch (error) {
            console.error(`Error fetching ${level}:`, error);
        } finally {
            setLoading(prev => ({ ...prev, [key]: false }));
        }
    };

    const handleRegionChange = useCallback(async (
        addressType: 'alamat1' | 'alamat2',
        level: 'prov' | 'kab' | 'kec' | 'desa',
        value: string,
        name?: string
    ) => {
        setCurrentAddressType(addressType);
        setTouchedFields(prev => ({ ...prev, [`${addressType}.${level}`]: true }));

        const updatedAddress = {
            ...data[addressType],
            [level]: value,
            ...(name && { [`${level}Name`]: name })
        };

        setData(addressType, updatedAddress);

        if (level === 'prov') {
            setData(addressType, {
                ...updatedAddress,
                kab: '',
                kec: '',
                desa: '',
            });
            setRegions(prev => ({ ...prev, kabupaten: [], kecamatan: [], kelurahan: [] }));
            if (value) await fetchRegions('kabupaten', value);
        }
        else if (level === 'kab') {
            setData(addressType, {
                ...updatedAddress,
                kec: '',
                desa: '',
            });
            setRegions(prev => ({ ...prev, kecamatan: [], kelurahan: [] }));
            if (value) await fetchRegions('kecamatan', value);
        }
        else if (level === 'kec') {
            setData(addressType, {
                ...updatedAddress,
                desa: '',
            });
            setRegions(prev => ({ ...prev, kelurahan: [] }));
            if (value) await fetchRegions('kelurahan', value);
        }
    }, [data, setData]);

    const handleAddressChange = useCallback((
        addressType: 'alamat1' | 'alamat2',
        field: keyof Address,
        value: string
    ) => {
        setTouchedFields(prev => ({ ...prev, [`${addressType}.${field}`]: true }));
        setData(addressType, {
            ...data[addressType],
            [field]: value
        });
    }, [data, setData]);

    const renderRegionSelect = useCallback((
        addressType: 'alamat1' | 'alamat2',
        level: 'prov' | 'kab' | 'kec' | 'desa',
        label: string,
        options: RegionOption[],
        required = false
    ) => {
        const value = data[addressType][level] || '';
        const isLoading = loading[level as keyof typeof loading];
        const disabled = isLoading ||
            (level === 'kab' && !data[addressType].prov) ||
            (level === 'kec' && !data[addressType].kab) ||
            (level === 'desa' && !data[addressType].kec);

        const fieldKey = `${addressType}.${level}`;
        const showError = touchedFields[fieldKey] && errors[fieldKey];

        return (
            <div className='space-y-1'>
                <label className='block text-sm font-medium text-gray-700'>
                    {label} {required && '*'}
                </label>
                <select
                    className={`w-full px-3 py-2 text-sm border ${showError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50`}
                    value={value}
                    onChange={(e) => {
                        const selectedOption = options.find(opt => opt.id === e.target.value);
                        handleRegionChange(
                            addressType,
                            level,
                            e.target.value,
                            selectedOption?.nama
                        );
                    }}
                    disabled={disabled}
                    required={required}
                    onBlur={() => setTouchedFields(prev => ({ ...prev, [fieldKey]: true }))}
                >
                    <option className='text-sm' value=''>-- Pilih {label} --</option>
                    {isLoading ? (
                        <option>Memuat...</option>
                    ) : (
                        options.map(option => (
                            <option className='text-sm' key={option.id} value={option.id}>
                                {option.nama}
                            </option>
                        ))
                    )}
                </select>
                {showError && (
                    <p className="text-xs text-red-500 mt-1">{errors[fieldKey]}</p>
                )}
            </div>
        );
    }, [data, loading, touchedFields, errors, handleRegionChange]);

    const renderAddressFields = useCallback((
        prefix: string,
        addressType: 'alamat1' | 'alamat2',
        title?: string
    ) => {
        const required = title?.includes('*');
        const currentRegions = addressType === currentAddressType ? regions : {
            provinsi: regions.provinsi,
            kabupaten: data[addressType].prov ? regions.kabupaten : [],
            kecamatan: data[addressType].kab ? regions.kecamatan : [],
            kelurahan: data[addressType].kec ? regions.kelurahan : []
        };

        return (
            <div className='bg-gray-50 p-4 rounded-lg space-y-4'>
                {title && <h3 className='font-bold text-sm text-red-700'>{title}</h3>}

                <div className='grid grid-cols-2 gap-4'>
                    {renderRegionSelect(
                        addressType,
                        'prov',
                        'Provinsi',
                        currentRegions.provinsi,
                        // required
                    )}
                    {renderRegionSelect(
                        addressType,
                        'kab',
                        'Kabupaten/Kota',
                        currentRegions.kabupaten,
                        // required
                    )}
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    {renderRegionSelect(
                        addressType,
                        'kec',
                        'Kecamatan',
                        currentRegions.kecamatan,
                        // required
                    )}
                    {renderRegionSelect(
                        addressType,
                        'desa',
                        'Desa/Kelurahan',
                        currentRegions.kelurahan,
                        // required
                    )}
                </div>

                <InputField
                    id={`${prefix}-addr`}
                    label="Alamat Lengkap"
                    placeholder="Jl. Contoh No. 123"
                    value={data[addressType].addr}
                    onChange={(value) => handleAddressChange(addressType, 'addr', value)}
                    onBlur={() => setTouchedFields(prev => ({ ...prev, [`${addressType}.addr`]: true }))}
                    // required={required}
                    type="text"
                    error={errors[`${addressType}.addr`]}
                    touched={touchedFields[`${addressType}.addr`]}
                />

                <div className='grid grid-cols-3 gap-3'>
                    <InputField
                        id={`${prefix}-rt`}
                        label="RT"
                        placeholder="001"
                        value={data[addressType].rt}
                        onChange={(value) => handleAddressChange(addressType, 'rt', value)}
                        onBlur={() => setTouchedFields(prev => ({ ...prev, [`${addressType}.rt`]: true }))}
                        // required={required}
                        type="number"
                        error={errors[`${addressType}.rt`]}
                        touched={touchedFields[`${addressType}.rt`]}
                        validation={{
                            max: 999,
                            minLength: 3,
                            maxLength: 3
                        }}
                    />

                    <InputField
                        id={`${prefix}-rw`}
                        label="RW"
                        placeholder="002"
                        value={data[addressType].rw}
                        onChange={(value) => handleAddressChange(addressType, 'rw', value)}
                        onBlur={() => setTouchedFields(prev => ({ ...prev, [`${addressType}.rw`]: true }))}
                        // required={required}
                        type="number"
                        error={errors[`${addressType}.rw`]}
                        touched={touchedFields[`${addressType}.rw`]}
                        validation={{
                            max: 999,
                            minLength: 3,
                            maxLength: 3
                        }}
                    />

                    <InputField
                        id={`${prefix}-kodpos`}
                        label="Kode Pos"
                        placeholder="12345"
                        value={data[addressType].kodpos}
                        onChange={(value) => handleAddressChange(addressType, 'kodpos', value)}
                        onBlur={() => setTouchedFields(prev => ({ ...prev, [`${addressType}.kodpos`]: true }))}
                        // required={required}
                        type="number"
                        error={errors[`${addressType}.kodpos`]}
                        touched={touchedFields[`${addressType}.kodpos`]}
                        validation={{
                            minLength: 5,
                            maxLength: 5
                        }}
                    />
                </div>
            </div>
        );
    }, [currentAddressType, data, errors, handleAddressChange, regions, renderRegionSelect, touchedFields]);

    return (
        <Section title='Alamat'>
            <div className='space-y-4'>
                {step === 'WNI' && (
                    <div className='space-y-1'>
                        <label
                            htmlFor="tempat-tinggal"
                            className='block text-sm font-medium text-gray-700'
                        >
                            Dimana Anda Tinggal? *
                        </label>
                        <select
                            id="tempat-tinggal"
                            className={`w-full px-3 py-2 border ${errors['temtin'] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                            value={data.temtin}
                            onChange={(e) => {
                                setTouchedFields(prev => ({ ...prev, temtin: true }));
                                setData('temtin', e.target.value);
                            }}
                            // required
                            onBlur={() => setTouchedFields(prev => ({ ...prev, temtin: true }))}
                        >
                            <option value=''>--Pilih--</option>
                            <option value='0'>Sesuai KTP</option>
                            <option value='1'>Alamat Lain</option>
                        </select>
                        {errors['temtin'] && (
                            <p className="text-xs text-red-500 mt-1">{errors['temtin']}</p>
                        )}
                    </div>
                )}
                {
                    step === 'WNA' ?
                        renderAddressFields('alamat-domisili', 'alamat1', 'Alamat Domisili *') :
                        data.temtin !== '' && (renderAddressFields('alamat-ktp', 'alamat1', '*Alamat Sesuai KTP'))}

                {data.temtin === '1' &&
                    renderAddressFields('alamat-tinggal', 'alamat2', '*Alamat Tempat Tinggal')}
            </div>
        </Section>
    );
};

export default AlamatForm;