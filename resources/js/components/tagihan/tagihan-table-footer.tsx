import { formatAccounting } from '@/lib/utils'
import React from 'react'

interface FooterProps {
    total: number
    totalDisc: number | null | undefined
    totalTagihan: number
}
const TagihanTableFooter: React.FC<FooterProps> = ({ totalTagihan, totalDisc, total }) => {
    return (
        <div className="flex flex-col justify-self-end">
            {totalDisc ? (
                <div className='border-b-2 border-dotted border-black'>
                    <div className="flex text-sm">
                        <div className="font-medium w-25">Total</div>
                        <div className="font-medium mx-1">:</div>
                        <div className="font-medium mr-2 text-red-600">Rp</div>
                        <div className="font-medium text-red-600 flex-1 text-right">{formatAccounting(total)}</div>
                    </div>
                    <div className="flex text-sm">
                        <div className="font-medium w-25">Potongan</div>
                        <div className="font-medium mx-1">:</div>
                        <div className="font-medium mr-2 text-red-600">Rp</div>
                        <div className="font-medium text-red-600 flex-1 text-right">{formatAccounting(totalDisc)}</div>
                    </div>
                </div>
            ) : null}
            <div className="flex text-sm font-semibold">
                <div className="font-semibold w-25">Total Tagihan</div>
                <div className="font-semibold mx-1">:</div>
                <div className="font-semibold mr-2 text-blue-600">Rp</div>
                <div className="font-semibold text-blue-600 flex-1 text-right">{formatAccounting(totalTagihan)        // "1.000.000"
                }</div>
            </div>
        </div>
    )
}

export default TagihanTableFooter