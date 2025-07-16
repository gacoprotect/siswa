import React from 'react'
import Section from './section'


interface KontakProps {
    data: {
        hub: string
        tel: string
        email: string
    }
    setData: (key: string, value: string) => void    
    errors?: Record<string, string>;
}
const KontakForm: React.FC<KontakProps> = ({
    data,
    setData,
    errors
}) => {
    return (
        <Section title='Informasi Kontak'>
            <div className='space-y-4 bg-gray-50 p-6 rounded-lg'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                        <label
                            htmlFor="hubungan"
                            className='block text-sm font-medium text-gray-700'
                        >
                            Hubungan dengan Peserta Didik *
                        </label>
                        <select
                            id="hubungan"
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                            value={data.hub}
                            onChange={e => setData('hub', e.target.value)}
                            // required
                        >
                            <option value=''>Pilih</option>
                            <option value='Ayah'>Ayah</option>
                            <option value='Ibu'>Ibu</option>
                            <option value='Wali'>Wali</option>
                        </select>
                    </div>

                    <div className='space-y-1'>
                        <label
                            htmlFor="whatsapp"
                            className='block text-sm font-medium text-gray-700'
                        >
                            Nomor WhatsApp *
                        </label>
                        <input
                            id="whatsapp"
                            type='tel'
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                            value={data.tel}
                            onChange={e => setData('tel', e.target.value)}
                            // required
                        />
                    </div>
                </div>

                <div className='space-y-1'>
                    <label
                        htmlFor="email"
                        className='block text-sm font-medium text-gray-700'
                    >
                        Email *
                    </label>
                    <input
                        id="email"
                        type='email'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        // required
                    />
                </div>
            </div>
        </Section>
    )
}

export default KontakForm