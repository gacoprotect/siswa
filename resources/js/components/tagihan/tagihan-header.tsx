import React from 'react'
import TagihanSummary from './tagihan-summary'
import { TagihanSummary as Summary } from '@/types'
import TagihanActionButton from './tagihan-action-button'
import { TagihanPageState } from '@/pages/Tagihan/Index';
import { BillTagihan } from '@/types';

interface TagihanHeaderProps {
  summary?: Summary;
  state: TagihanPageState;
  setState: (v: keyof TagihanPageState, value: boolean | BillTagihan[]) => void
}
const TagihanHeader: React.FC<TagihanHeaderProps> = ({ summary, state, setState }) => {
  return (
    <div className='space-y-4 border-b-2 pb-4'>
      <TagihanSummary summary={summary} />
      <TagihanActionButton state={state} setState={setState} />
    </div>
  )
}

export default TagihanHeader