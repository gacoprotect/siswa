import React, { useState, useEffect, useCallback } from 'react';
import Section from './section';
import axios from 'axios';
import InputGroup from '../InputGroup';
import { SelectInput } from '../SelectInput';

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

const AlamatForm: React.FC<AlamatProps> = ({ step, data, onChange, errors }) => {
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

        // Mulai dengan update dasar
        let updatedAddress: Address = {
            ...data[addressType],
            [level]: value,
            ...(name ? { [`${level}Name`]: name } : {})
        };

        // Reset child levels
        if (level === 'prov') {
            updatedAddress = { ...updatedAddress, kab: '', kec: '', desa: '' };
            setRegions(prev => ({ ...prev, kabupaten: [], kecamatan: [], kelurahan: [] }));
            if (value) await fetchRegions('kabupaten', value);
        }
        else if (level === 'kab') {
            updatedAddress = { ...updatedAddress, kec: '', desa: '' };
            setRegions(prev => ({ ...prev, kecamatan: [], kelurahan: [] }));
            if (value) await fetchRegions('kecamatan', value);
        }
        else if (level === 'kec') {
            updatedAddress = { ...updatedAddress, desa: '' };
            setRegions(prev => ({ ...prev, kelurahan: [] }));
            if (value) await fetchRegions('kelurahan', value);
        }

        // Hanya panggil onChange sekali
        onChange(addressType, updatedAddress);
    }, [data, onChange]);


    const handleAddressChange = useCallback((
        addressType: 'alamat1' | 'alamat2',
        field: keyof Address,
        value: string
    ) => {
        setTouchedFields(prev => ({ ...prev, [`${addressType}.${field}`]: true }));
        onChange(addressType, {
            ...data[addressType],
            [field]: value
        });
    }, [data, onChange]);

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
        // const showError = touchedFields[fieldKey] || errors?.[fieldKey];

        const selectOptions = options.map(option => ({
            value: option.id,
            label: option.nama,
            disabled: false
        }));

        return (
            <SelectInput
                name={fieldKey}
                id={`${addressType}-${level}`}
                allowEmpty
                label={label}
                value={value}
                onChange={(val) => {
                    const selectedOption = options.find(opt => opt.id === val);
                    handleRegionChange(
                        addressType,
                        level,
                        val,
                        selectedOption?.nama
                    );
                }}
                options={isLoading ? [] : selectOptions}
                placeholder={isLoading ? 'Loading...' : `-- Pilih --`}
                disabled={disabled}
                required={required}
                errors={errors}
            // triggerClassName={showError ? 'border-destructive' : ''}
            // onBlur={() => setTouchedFields(prev => ({ ...prev, [fieldKey]: true }))}
            />
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
                        required
                    )}
                    {renderRegionSelect(
                        addressType,
                        'kab',
                        'Kabupaten/Kota',
                        currentRegions.kabupaten,
                        required
                    )}
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    {renderRegionSelect(
                        addressType,
                        'kec',
                        'Kecamatan',
                        currentRegions.kecamatan,
                        required
                    )}
                    {renderRegionSelect(
                        addressType,
                        'desa',
                        'Desa/Kelurahan',
                        currentRegions.kelurahan,
                        required
                    )}
                </div>

                <InputGroup
                    name={`${addressType}.addr`}
                    id={`${prefix}-addr`}
                    label="Alamat Lengkap"
                    placeholder="Jl. Contoh No. 123"
                    value={data[addressType].addr}
                    onChange={(value) => handleAddressChange(addressType, 'addr', value as string)}
                    onBlur={() => setTouchedFields(prev => ({ ...prev, [`${addressType}.addr`]: true }))}
                    required={required}
                    type="text"
                    error={errors?.[`${addressType}.addr`]}
                    touched={touchedFields[`${addressType}.addr`]}
                />

                <div className='grid grid-cols-3 gap-3'>
                    <InputGroup
                        name={`${addressType}.rt`}
                        id={`${prefix}-rt`}
                        label="RT"
                        placeholder="001"
                        value={data[addressType].rt}
                        onChange={(value) => handleAddressChange(addressType, 'rt', value as string)}
                        onBlur={() => setTouchedFields(prev => ({ ...prev, [`${addressType}.rt`]: true }))}
                        required={required}
                        type="number"
                        error={errors?.[`${addressType}.rt`]}
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
                        onBlur={() => setTouchedFields(prev => ({ ...prev, [`${addressType}.rw`]: true }))}
                        required={required}
                        type="number"
                        error={errors?.[`${addressType}.rw`]}
                        touched={touchedFields[`${addressType}.rw`]}
                        max={3}
                    />

                    <InputGroup
                        name={`${addressType}.kodpos`}
                        id={`${prefix}-kodpos`}
                        label="Kode Pos"
                        placeholder="12345"
                        value={data[addressType].kodpos}
                        onChange={(value) => handleAddressChange(addressType, 'kodpos', value as string)}
                        onBlur={() => setTouchedFields(prev => ({ ...prev, [`${addressType}.kodpos`]: true }))}
                        required={required}
                        type="number"
                        error={errors?.[`${addressType}.kodpos`]}
                        touched={touchedFields[`${addressType}.kodpos`]}
                        max={3}
                    />
                </div>
            </div>
        );
    }, [currentAddressType, data, errors, handleAddressChange, regions, renderRegionSelect, touchedFields]);

    return (
        <Section title='Alamat'>
            <div className='space-y-4'>

                {step === 'WNA' ? renderAddressFields('alamat-domisili', 'alamat1', 'Alamat Domisili *') :
                    data.temtin !== '' && (renderAddressFields('alamat-ktp', 'alamat1', '*Alamat Sesuai KTP'))}
                {step === 'WNI' && (
                    <SelectInput
                        name='temtin'
                        id="tempat-tinggal"
                        allowEmpty
                        label="Dimana Anda Tinggal?"
                        value={data.temtin}
                        onChange={(value) => {
                            setTouchedFields(prev => ({ ...prev, temtin: true }));
                            onChange('temtin', value);
                        }}
                        placeholder='-- Pilih --'
                        options={[
                            { value: '0', label: 'Sesuai KTP' },
                            { value: '1', label: 'Alamat Lain' }
                        ]}
                        required
                        errors={errors}
                        triggerClassName={errors?.['temtin'] ? 'border-destructive' : ''}
                    // onBlur={() => setTouchedFields(prev => ({ ...prev, temtin: true }))}
                    />
                )}
                {data.temtin === '1' &&
                    renderAddressFields('alamat-tinggal', 'alamat2', '*Alamat Tempat Tinggal')}
            </div>
        </Section>
    );
};

export default AlamatForm;