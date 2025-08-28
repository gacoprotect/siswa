import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type FullCalendar from '@fullcalendar/react'

type MobileNavigationProps = {
    title: string
    calendarRef: React.RefObject<FullCalendar | null>
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ title, calendarRef }) => {
    return (
        <div className="flex items-center gap-2 justify-center">
            <button
                onClick={() => calendarRef.current?.getApi().prev()}
                className="rounded border px-2 py-1 text-xs md:text-sm hover:bg-gray-50"
                aria-label="Previous"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-sm md:text-lg font-semibold flex-1 text-center truncate">
                {title}
            </div>
            <button
                onClick={() => calendarRef.current?.getApi().next()}
                className="rounded border px-2 py-1 text-xs md:text-sm hover:bg-gray-50"
                aria-label="Next"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    )
}

export default MobileNavigation
