import SnkViewer from '@/components/SnkViewer'
import { useLogger } from '@/contexts/logger-context';
import { Head, usePage } from '@inertiajs/react'
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';



interface SnkContentItem {
    label?: string;
    description?: string;
    items?: SnkContentItem[];
}

interface SnkContent {
    intro?: string;
    title: string;
    items: SnkContentItem[];
}

interface SnkPoint {
    nmr: number;
    title: string;
    content: SnkContent;
}
interface SnkProps {
    version: string
    effective: string
    title: string
    summary: string
    points: SnkPoint[]
}

interface Agreement {
    payload: string;
    sign: string;
    qr_code_svg: string;
    ortu: string;
    siswa: string;
    kota: string;
    snk: SnkProps
}
interface Props {
    isChild?: boolean
    childData?: Agreement;
}

export default function Show({ isChild = false, childData }: Props) {
    const { log } = useLogger();
    const { agreement } = usePage<{ agreement: Agreement }>().props
    const [data] = useState<Agreement>(() => ({
        ...agreement, ...(isChild ? { ...childData } : {})
    }));
    useEffect(() => {
        log("AGREEMENT DATA :", data);
    }, [log, data])
    return (
        <>
            <Head title={`S&K`} />
            <div className="p-6 max-w-4xl mx-auto bg-white">
                <div className="flex flex-col text-blue-500 items-center">
                    <h1 className="text-2xl font-bold mb-1">{data.snk.title}</h1>
                    <p className="text-gray-600 text-center text-sm italic mb-4">{data.snk.summary}</p>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <span className='italic text-sm '>Versi {data.snk.version}</span>
                    <span className='italic text-sm '>Efektif : {data.snk.effective}</span>
                </div>
                <SnkViewer points={data.snk.points} ortu={data.ortu} siswa={data.siswa} />

                {(data.ortu || data.siswa) && (
                    <div className="mt-10 space-y-2 text-sm">
                        {data.kota && <p className="italic font-bold">{data.kota}</p>}
                        {data.qr_code_svg && (
                            <div
                                className="my-4"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.qr_code_svg) }}
                            />
                        )}
                        {data.sign && <p className="text-xs text-gray-400 break-all">Signature: {data.sign}</p>}
                    </div>
                )}
            </div>
        </>
    )
}