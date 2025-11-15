import { PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react'
import React from 'react'

interface ServiceProps {
    nouid: string
}

const Service: React.FC<ServiceProps> = ({ nouid }) => {
    const { props } = usePage<PageProps>()
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const payload = {
        amount: 200000,
        va_number: 22220818
    }

    const fetchData = () => {
        setError(null)
        setLoading(true)

        router.post(route('test.service.post', nouid), payload, {
            preserveState: false,
            onSuccess: () => {
                setLoading(false)
            },
            onError: (errors) => {
                setError('Failed to fetch data: ' + JSON.stringify(errors))
                setLoading(false)
            },
            onFinish: () => {
                setLoading(false)
            },
        })
    }

    // Debug: log props untuk melihat apa yang diterima
    console.log('Current props:', props)
    console.log('Props.data:', props.data)

    if (loading) {
        return (
            <div className='bg-white min-h-screen flex items-center justify-center'>
                <div>Loading data...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='bg-white min-h-screen flex items-center justify-center'>
                <div className="text-red-500">{error}</div>
                <button
                    onClick={fetchData}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className='bg-white min-h-screen p-4' title='test service'>
            <h1 className="text-xl font-bold mb-4">Service Props</h1>
            <pre className="bg-gray-100 p-4 rounded">
                {JSON.stringify(props.data, null, 2)}
            </pre>
            <button
                onClick={fetchData}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            >
                Refresh Data
            </button>
        </div>
    )
}

export default Service