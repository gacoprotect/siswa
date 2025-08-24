import React from 'react'
import { Badge } from '../ui/badge';
import { BillTagihan } from '@/types';

interface TagihanBadgeProps {
    data: BillTagihan[] | []
}
const TagihanBadge: React.FC<TagihanBadgeProps> = ({ data = [] }) => {
    const tagihanCount = data?.filter(t => t.jen === 0).length || 0;
    const bantuanCount = data?.filter(t => t.jen === 1).length || 0;
    const dendaCount = data?.filter(t => t.jen === 2).length || 0;
    const kurangCount = data?.filter(t => t.jen === 10).length || 0;

    return (
        <div className='space-x-2'>
            {tagihanCount > 0 && <Badge>{tagihanCount} Tagihan</Badge>}
            {bantuanCount > 0 && <Badge className='bg-emerald-500'>{bantuanCount} Bantuan</Badge>}
            {dendaCount > 0 && <Badge variant='destructive'>{dendaCount} Denda</Badge>}
            {kurangCount > 0 && <Badge variant='destructive'>{kurangCount} Kurang Bayar</Badge>}
        </div>
    )
}

export default TagihanBadge