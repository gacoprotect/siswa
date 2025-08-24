import { TagihanPageState } from '@/pages/Tagihan/Index';
import React from 'react'
import { FaFileInvoice, FaHistory } from 'react-icons/fa';
import { BillTagihan } from '@/types';
import { Button } from '../ui/button';

interface TagihanActionButtonProps {
    state: TagihanPageState;
    setState: (v: keyof TagihanPageState, value: boolean | BillTagihan[]) => void
}
const TagihanActionButton: React.FC<TagihanActionButtonProps> = ({ state, setState }) => {
    return (
        <div className="flex gap-3" >
            <Button

                size='sm'
                onClick={() => {
                    setState('riwayat', false);
                    setState('tambahTagihan', true);
                }}
                className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
                <FaFileInvoice />
                Buat Tagihan
            </Button>
            <Button
                size='sm'
                onClick={() => setState('riwayat', !state.riwayat)}
                className="bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
            >
                <FaHistory />
                Riwayat
            </Button>
        </div >
    )
}

export default TagihanActionButton