import React from 'react'



interface TagihanParam {
    nouid: string | null;
    spr: number | null;
    jen1: number[] | [];
    tagihan: number;
}
const Tagihan = ({ nouid, setTagihanParam }: { nouid: string; setTagihanParam: (v: TagihanParam) => void }) => {
  return (
    <div>Tagihan</div>
  )
}

export default Tagihan