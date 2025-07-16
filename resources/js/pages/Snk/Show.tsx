import SnkViewer from '@/components/SnkViewer'
import { Head } from '@inertiajs/react'
import DOMPurify from 'dompurify';

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


interface Props {
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
}
export default function Show({ version,
    effective,
    title,
    summary,
    points,
    qr_code_svg,
    sign,
    ortu,
    siswa,
    kota, }: Props) {
    console.log(typeof qr_code_svg); // ✅ harus "string"

    return (
        <>
            <Head title={`S&K`} />
            <div className="p-6 max-w-4xl mx-auto bg-white">
                <div className="flex flex-col text-blue-500 items-center">
                    <h1 className="text-2xl font-bold mb-1">{title}</h1>
                    <p className="text-gray-600 text-center text-sm italic mb-4">{summary}</p>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <span className='italic text-sm '>Versi {version}</span>
                    <span className='italic text-sm '>Efektif : {effective}</span>
                </div>
                <SnkViewer points={points} ortu={ortu} siswa={siswa} />

                {(ortu || siswa) && (
                    <div className="mt-10 space-y-2 text-sm">
                        <p>
                            Saya yang bertanda tangan di bawah ini <strong>{ortu}</strong> menyatakan telah membaca,
                            memahami, dan menyetujui seluruh ketentuan di atas terkait Kartu Pelajar atas nama <strong>{siswa}</strong>.
                        </p>
                        {kota && <p className="italic">{kota}</p>}
                        {qr_code_svg && (
                            <div
                                className="my-4"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(qr_code_svg) }}
                            />
                        )}
                        {sign && <p className="text-xs text-gray-400 break-all">Signature: {sign}</p>}
                    </div>
                )}

            </div>
        </>
    )
}
