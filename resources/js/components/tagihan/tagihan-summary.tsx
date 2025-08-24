import React from 'react'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import { formatCurrency } from '@/lib/utils'
import { TagihanSummary as Summary } from '@/types'

const TagihanSummary = ({ summary }: { summary?: Summary }) => {
    return (
        <div className="grid gap-4 md:grid-cols-2" >
            <div className="rounded-lg bg-green-50 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Tagihan</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">{formatCurrency(summary?.total_tagihan ?? 0)}</p>
                    </div>
                    <div className="rounded-full bg-white p-3">
                        <FaFileInvoiceDollar className="text-green-500" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TagihanSummary