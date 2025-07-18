import SnkViewer from '@/components/SnkViewer'
import useDebugLogger from '@/hooks/use-debug-logger';
import { Flash, NestedData } from '@/types';
import { Head, usePage } from '@inertiajs/react'
import DOMPurify from 'dompurify';
import { useState } from 'react';



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

interface PropsData {
    version: string
    effective: string
    title: string
    summary: string
    points: SnkPoint[]
    qr_code_svg?: string
    sign?: string
    ortu?: string
    siswa?: string
    kota?: string
    nouid?: string;
    warneg?: string;
    nama?: string;
    nik?: string;
    paspor?: string;
    kabName?: string;
}
interface childData extends PropsData {
    nouid: string;
    [key: string]: NestedData | unknown
}
interface PageProps {
    data: PropsData
    errors: Record<string, string>
    flash: Flash
    [key: string]: NestedData | unknown
}
interface Props {
    isChild?: boolean
    childData?: childData

}

export default function Show({ isChild = false, childData }: Props) {
    const { data: propsData } = usePage<PageProps>().props
    const { log } = useDebugLogger();
    log("SNK DATA :", childData);

    // Initialize state without spreading props to avoid unnecessary updates
    const [data] = useState<PropsData>(() => ({
        ...propsData, ...(isChild ? { ...childData } : {})
    }));

    return (
        <>
            <Head title={`S&K`} />
            <div className="p-6 max-w-4xl mx-auto bg-white">
                <div className="flex flex-col text-blue-500 items-center">
                    <h1 className="text-2xl font-bold mb-1">{data.title}</h1>
                    <p className="text-gray-600 text-center text-sm italic mb-4">{data.summary}</p>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <span className='italic text-sm '>Versi {data.version}</span>
                    <span className='italic text-sm '>Efektif : {data.effective}</span>
                </div>
                <SnkViewer points={data.points} ortu={data.nama ?? data.ortu} siswa={data.siswa} />

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