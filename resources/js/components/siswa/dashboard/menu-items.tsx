import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import { FaCalendarAlt, FaFileArchive, FaFileInvoiceDollar, FaFootballBall, FaUserGraduate } from "react-icons/fa";
import { MdMail } from "react-icons/md";


interface PropsComponent {
    nouid: string
    onItemClick: (index: number) => void;
}
const MenuItems: React.FC<PropsComponent> = ({ nouid, onItemClick }) => {
    const menu = useMemo(() => [
        {
            title: 'Tagihan',
            tab: 'tagihan',
            icon: <FaFileInvoiceDollar className="h-10 w-10 text-indigo-500" />,
            color: 'border-green-700 bg-green-50 hover:bg-green-100',
            uri: route('tagihan.index', nouid)
        },
        {
            title: 'Data Siswa',
            tab: 'siswa',
            icon: <FaUserGraduate className="h-10 w-10 text-indigo-500" />,
            color: 'border-amber-700 bg-amber-50 hover:bg-amber-100',
            uri: route('tagihan.index', nouid)
        },
        {
            title: 'Kegiatan',
            tab: 'kegiatan',
            icon: <FaFootballBall className="h-10 w-10 text-indigo-500" />,
            color: 'border-rose-700 bg-rose-50 hover:bg-rose-100',
            uri: route('tagihan.index', nouid)
        },
        {
            title: 'Izin',
            tab: 'izin',
            icon: <MdMail className="h-10 w-10 text-indigo-500" />,
            color: 'border-rose-700 bg-rose-50 hover:bg-rose-100',
            uri: route('tagihan.index', nouid)
        },
        {
            title: 'Pindah Sekolah',
            tab: 'pindah',
            icon: <FaFileArchive className="h-10 w-10 text-indigo-500 -indigo-500" />,
            color: 'border-rose-700 bg-rose-50 hover:bg-rose-100',
            uri: route('tagihan.index', nouid)
        },
        {
            title: 'Kalender',
            tab: 'calendar',
            icon: <FaCalendarAlt className="h-10 w-10 text-indigo-500" />,
            color: 'border-rose-700 bg-rose-50 hover:bg-rose-100',
            // uri: route('calendar.index', nouid)
        },
    ], [nouid]);
    return (
        <div className="mb-6 grid grid-cols-3 gap-4 px-4 sm:grid-cols-5">
            {menu.map((item, index) => (
                <button
                    key={index}
                    className={cn('flex flex-col items-center justify-center rounded-xl border-2 border-t-8 p-2 transition duration-200',
                        //  item.color
                        'border-indigo-700 bg-white hover:bg-indigo-50 cursor cursor-pointer'
                    )}
                    onClick={() => onItemClick(index)}
                >

                    <span className="text-center text-[12px] font-semibold text-indigo-800">{item.icon}</span>
                    <span className="text-center text-[12px] font-semibold text-indigo-800">{item.title}</span>
                </button>
            ))}
        </div>
    )
};
export default MenuItems;
