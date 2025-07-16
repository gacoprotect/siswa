import React, { useCallback, useEffect, useRef, useState } from 'react'
import Section from './section'
import { countries } from 'countries-list'
import { cn } from '@/lib/utils'

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
    setData: (field: string, value: string) => void
    setStep: (step: 'WNI' | 'WNA' | null) => void
    errors?: Record<string, string>;
}

type CountryOption = {
    code: string
    name: string
    native: string
}

const PersonalForm: React.FC<PersonalFormProps> = ({
    data,
    step,
    setData,
    setStep,
    errors
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
        setData('warneg', country.code)
        setData('warnegName', country.name)
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
                setData('warneg', '')
                setData('warnegName', '')
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
                setData('warneg', '')
                setData('warnegName', '')
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
                            className="block text-sm font-medium text-gray-700"
                        >
                            Kewarganegaraan *
                        </label>
                        <div className="relative" ref={dropdownRef}>
                            <input
                                id="warneg"
                                type="text"
                                ref={inputRef}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                value={inputValue || searchTerm}
                                onFocus={() => setIsCountryOpen(true)}
                                onChange={handleInputChange}
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
                        </div>
                    </div>

                    {/* Name Input */}
                    {step !== null && (
                        <div className='space-y-1'>
                            <label
                                htmlFor="nama"
                                className='block text-sm font-medium text-gray-700'
                            >
                                {step === 'WNI' ? 'Nama sesuai KTP' : 'Nama Lengkap'} *
                            </label>
                            <input
                                id="nama"
                                type='text'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                                value={data.nama}
                                onChange={e => setData('nama', e.target.value)}
                                // required
                            />
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
                                    className='block text-sm font-medium text-gray-700'
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
                                            setData('nik', e.target.value)
                                        }
                                    }}
                                    minLength={16}  // Minimum 16 karakter
                                    maxLength={16}  // Maksimum 16 karakter
                                    // required
                                    title="NIK harus 16 digit angka"
                                />
                                {data.nik.length > 0 && data.nik.length < 16 && (
                                    <p className="text-xs text-red-500 mt-1">NIK harus 16 digit</p>
                                )}
                                {errors?.nik && (
                                    <p className="text-xs text-red-500 mt-1">errors?.nik</p>
                                )}
                            </div>

                            <div className='space-y-1'>
                                <label
                                    htmlFor="kk"
                                    className='block text-sm font-medium text-gray-700'
                                >
                                    Nomor KK
                                </label>
                                <input
                                    id="kk"
                                    type='text'
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                                    value={data.kk}
                                    onChange={e => {
                                        if (/^\d*$/.test(e.target.value) && e.target.value.length <= 16) {
                                            setData('kk', e.target.value)
                                        }
                                    }}
                                    // required
                                    minLength={16}  // Minimum 16 karakter
                                    maxLength={16}  // Maksimum 16 karakter
                                    title="Nomor KK harus 16 digit angka"
                                />
                                {data.kk.length > 0 && data.kk.length < 16 && (
                                    <p className="text-xs text-red-500 mt-1">No.KK harus 16 digit</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='space-y-1'>
                            <label
                                htmlFor="paspor"
                                className='block text-sm font-medium text-gray-700'
                            >
                                Nomor Paspor *
                            </label>
                            <input
                                id="paspor"
                                type='text'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                                value={data.paspor}
                                onChange={e => setData('paspor', e.target.value)}
                                // required={step === 'WNA'}
                            />
                        </div>
                    ))}
            </div>
        </Section>
    )
}

export default PersonalForm