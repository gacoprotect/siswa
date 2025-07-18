import React, { useCallback, useEffect, useRef, useState } from 'react'
import Section from './section'
import { countries } from 'countries-list'
import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'

interface PersonalFormProps {
    data: {
        warneg: string
        warnegName: string
        nama: string
        nik: string
        kk: string
        paspor: string
    }
    step: 'WNI' | 'WNA' | null
    setStep: (step: 'WNI' | 'WNA' | null) => void
    errors?: Record<string, string>;
    onChange?: (field: string, value: string) => void
}

type CountryOption = {
    code: string
    name: string
    native: string
}

const PersonalForm: React.FC<PersonalFormProps> = ({
    data,
    step,
    setStep,
    errors,
    onChange
}) => {
    const [isCountryOpen, setIsCountryOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [countryList, setCountryList] = useState<CountryOption[]>([])
    const [inputValue, setInputValue] = useState('')
    const dropdownRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Initialize country list and input value
    useEffect(() => {
        const countryArray = Object.entries(countries).map(([code, country]) => ({
            code,
            name: country.name,
            native: country.native
        })).sort((a, b) => a.name.localeCompare(b.name))

        setCountryList(countryArray)

        // Set initial input value based on selected country
        if (data.warneg) {
            const selectedCountry = countryArray.find(c => c.code === data.warneg)
            setInputValue(selectedCountry?.name || '')
        }
    }, [data.warneg])

    // Filter countries based on search term
    const filteredCountries = useCallback(() => {
        return countryList.filter(country =>
            `${country.name} ${country.native} ${country.code}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
    }, [countryList, searchTerm])

    // Handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsCountryOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Handle country selection
    const handleCountrySelect = (country: CountryOption) => {
        onChange?.('warneg', country.code)
        onChange?.('warnegName', country.name)
        setInputValue(country.name)
        setIsCountryOpen(false)
        setSearchTerm('')

        // Auto-set step based on selected country
        if (country.code === 'ID') {
            setStep('WNI')
        } else {
            setStep('WNA')
        }
    }

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
        setSearchTerm(value)
        setIsCountryOpen(true)

        // Clear selection if input doesn't match selected country
        if (data.warneg) {
            const selectedCountry = countryList.find(c => c.code === data.warneg)
            if (!selectedCountry || !value.includes(selectedCountry.name)) {
                onChange?.('warneg', '')
                onChange?.('warnegName', '')
                setStep(null)
            }
        }
    }

    // Handle key down events (backspace, delete)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Backspace' || e.key === 'Delete') && data.warneg) {
            // Allow editing only when the dropdown is open
            if (!isCountryOpen) {
                setIsCountryOpen(true)
                setSearchTerm('')
                setInputValue('')
                onChange?.('warneg', '')
                onChange?.('warnegName', '')
                setStep(null)
            }
        }
    }

    return (
        <Section title='Informasi Pribadi'>
            <div className='space-y-4 bg-gray-50 p-6 rounded-lg'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* Country Dropdown */}
                    <div className="space-y-1 relative">
                        <label
                            htmlFor="warneg"
                            className={cn(`block text-sm font-medium text-gray-700`, inputValue.trim() && !data.warneg && 'text-red-500')}
                        >
                            Kewarganegaraan *
                        </label>
                        <div className="relative" ref={dropdownRef}>
                            <input
                                id="warneg"
                                type="text"
                                ref={inputRef}
                                className={cn('w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary',
                                    errors?.warneg && 'border-red-500', inputValue.trim() && !data.warneg && 'border-2 border-red-500'
                                )}
                                value={inputValue || searchTerm}
                                onFocus={() => setIsCountryOpen(true)}
                                onChange={(e) => handleInputChange(e)}
                                onKeyDown={handleKeyDown}
                                placeholder="Pilih negara"
                                required
                            />

                            {/* Country Dropdown List */}
                            {isCountryOpen && (
                                <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                                    {filteredCountries().length > 0 ? (
                                        filteredCountries().map((country) => (
                                            <div
                                                key={country.code}
                                                className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${data.warneg === country.code ? 'bg-primary text-white' : ''
                                                    }`}
                                                onClick={() => handleCountrySelect(country)}
                                            >
                                                {country.name}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-3 py-2 text-gray-500">
                                            Tidak ditemukan
                                        </div>
                                    )}
                                </div>
                            )}
                            {errors?.warneg && (
                                <p className="flex items-center gap-2 text-xs text-red-500 mt-1">
                                    <AlertCircle className="text-red-500 w-4 h-4" />
                                    {errors?.warneg}
                                </p>
                            )}
                            {inputValue.trim() && !data.warneg && (
                                <p className="flex items-center gap-2 text-xs text-red-500 mt-1">
                                    <AlertCircle className="text-red-500 w-4 h-4" />
                                    Anda belum memilih Negara
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Name Input */}
                    {inputValue.trim() && data.warneg && (
                        <div className='space-y-1'>
                            <label
                                htmlFor="nama"
                                className={cn(`block text-sm font-medium text-gray-700`, errors?.nama && 'text-red-500')}
                            >
                                {step === 'WNI' ? 'Nama sesuai KTP' : 'Nama Lengkap'} *
                            </label>
                            <input
                                id="nama"
                                type='text'
                                className={cn('w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary',
                                    errors?.nama && 'border-red-500'
                                )}
                                value={data.nama}
                                onChange={e => {
                                    onChange?.('nama', e.target.value)
                                    onChange?.('nama', e.target.value)
                                }}
                                required
                            />
                            {errors?.nama && (
                                <p className="flex items-center gap-2 text-xs text-red-500 mt-1">
                                    <AlertCircle className="text-red-500 w-4 h-4" />
                                    {errors?.nama}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Conditional Fields based on Step */}
                {step !== null && (
                    step === 'WNI' ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-1'>
                                <label
                                    htmlFor="nik"
                                    className={cn(`block text-sm font-medium text-gray-700`, errors?.nik && 'text-red-500')}
                                >
                                    NIK *
                                </label>
                                <input
                                    id="nik"
                                    type='text'
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    className={cn('w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary',
                                        errors?.nik && 'border-red-500'
                                    )}
                                    value={data.nik}
                                    onChange={e => {
                                        if (/^\d*$/.test(e.target.value) && e.target.value.length <= 16) {
                                            onChange?.('nik', e.target.value)
                                        }
                                        onChange?.('nik', e.target.value)
                                    }}
                                    minLength={16}  // Minimum 16 karakter
                                    maxLength={16}  // Maksimum 16 karakter
                                    required={step === 'WNI'}
                                    title="NIK harus 16 digit angka"
                                />

                                {errors?.nik && (
                                    <p className="flex items-center gap-2 text-xs text-red-500 mt-1">
                                        <AlertCircle className="text-red-500 w-4 h-4" />
                                        {errors?.nik}
                                    </p>
                                )}
                            </div>

                            <div className='space-y-1'>
                                <label
                                    htmlFor="kk"
                                    className={cn(`block text-sm font-medium text-gray-700`, errors?.kk && 'text-red-500')}
                                >
                                    Nomor KK
                                </label>
                                <input
                                    id="kk"
                                    type='text'
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    className={cn('w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary',
                                        errors?.kk && 'border-red-500'
                                    )} value={data.kk}
                                    onChange={e => {
                                        if (/^\d*$/.test(e.target.value) && e.target.value.length <= 16) {
                                            onChange?.('kk', e.target.value)
                                        }
                                        onChange?.('kk', e.target.value)
                                    }}
                                    required={step === 'WNI'}
                                    minLength={16}  // Minimum 16 karakter
                                    maxLength={16}  // Maksimum 16 karakter
                                    title="Nomor KK harus 16 digit angka"
                                />
                                {errors?.kk && (
                                    <p className="flex items-center gap-2 text-xs text-red-500 mt-1">
                                        <AlertCircle className="text-red-500 w-4 h-4" />
                                        {errors?.kk}
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='space-y-1'>
                            <label
                                htmlFor="paspor"
                                className={cn(`block text-sm font-medium text-gray-700`, errors?.paspor && 'text-red-500')}
                            >
                                Nomor Paspor *
                            </label>
                            <input
                                id="paspor"
                                type='text'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                                value={data.paspor}
                                onChange={e => {
                                    onChange?.('paspor', e.target.value)
                                    onChange?.('paspor', e.target.value)
                                }}
                                required={step === 'WNA'}
                            />
                            {errors?.paspor && (
                                <p className="flex items-center gap-2 text-xs text-red-500 mt-1">
                                    <AlertCircle className="text-red-500 w-4 h-4" />
                                    {errors?.paspor}
                                </p>
                            )}
                        </div>
                    ))}
            </div>
        </Section>
    )
}

export default PersonalForm