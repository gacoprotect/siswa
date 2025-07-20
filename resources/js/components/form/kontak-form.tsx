import React from 'react'
import Section from './section'
import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'


interface KontakProps {
    data: {
        hub: string
        tel: string
        email: string
    }
    onChange: (key: string, value: string) => void
    errors?: Record<string, string>;
}
const KontakForm: React.FC<KontakProps> = ({ data, onChange, errors }) => {
    const [localValues, setLocalValues] = React.useState(data);

    // Sync dengan parent data
    React.useEffect(() => {
        setLocalValues(data);
    }, [data]);

    const handleLocalChange = (field: string, value: string) => {
        setLocalValues(prev => ({ ...prev, [field]: value }));
        onChange(field, value);
    };

    return (
        <Section title='Informasi Kontak'>
            <div className='space-y-4 bg-gray-50 p-6 rounded-lg'>
                {/* Input Hubungan */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                        <label htmlFor="hub" className={cn(`block text-sm font-medium`, errors?.hub && 'text-red-500')}>
                            Hubungan dengan Peserta Didik *
                        </label>
                        <select
                            id="hub"
                            className={cn('w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                                errors?.hub ? 'border-red-500' : 'border-gray-300 focus:ring-primary'
                            )}
                            value={localValues.hub}
                            onChange={e => handleLocalChange('hub', e.target.value)}
                            onBlur={() => !localValues.hub && onChange('hub', localValues.hub)}
                        >
                            <option value=''>Pilih</option>
                            <option value='0'>Ayah</option>
                            <option value='1'>Ibu</option>
                            <option value='2'>Wali</option>
                        </select>
                        {errors?.hub && (
                            <p className="flex items-center gap-2 text-xs text-red-500 mt-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.hub}
                            </p>
                        )}
                    </div>

                    {/* Input Telepon */}
                    <div className='space-y-1'>
                        <label htmlFor="tel" className={cn(`block text-sm font-medium`, errors?.tel && 'text-red-500')}>
                            Nomor WhatsApp *
                        </label>
                        <input
                            id="tel"
                            type='tel'
                            className={cn('w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                                errors?.tel ? 'border-red-500' : 'border-gray-300 focus:ring-primary'
                            )}
                            value={localValues.tel}
                            onChange={e => handleLocalChange('tel', e.target.value)}
                            onBlur={() => onChange('tel', localValues.tel)}
                        />
                        {errors?.tel && (
                            <p className="flex items-center gap-2 text-xs text-red-500 mt-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.tel}
                            </p>
                        )}
                    </div>
                </div>

                {/* Input Email */}
                <div className='space-y-1'>
                    <label htmlFor="email" className={cn(`block text-sm font-medium`, errors?.email && 'text-red-500')}>
                        Email *
                    </label>
                    <input
                        id="email"
                        type='email'
                        className={cn('w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
                            errors?.email ? 'border-red-500' : 'border-gray-300 focus:ring-primary'
                        )}
                        value={localValues.email}
                        onChange={e => handleLocalChange('email', e.target.value)}
                        onBlur={() => onChange('email', localValues.email)}
                    />
                    {errors?.email && (
                        <p className="flex items-center gap-2 text-xs text-red-500 mt-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                        </p>
                    )}
                </div>
            </div>
        </Section>
    );
};

export default KontakForm