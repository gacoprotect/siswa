import React from 'react'
import dayjs from 'dayjs'
import { Star } from 'lucide-react'
import type { DayCellContentArg, DayHeaderContentArg } from '@fullcalendar/core'

type DayContentProps = {
    arg: DayCellContentArg
    importantDates: Set<string>
}

type HeaderContentProps = {
    arg: DayHeaderContentArg
    importantDates: Set<string>
}

export const CalendarDayContent: React.FC<DayContentProps> = ({ arg, importantDates }) => {
    const key = dayjs(arg.date).format('YYYY-MM-DD')
    const show = importantDates.has(key)

    return (
        <div className="flex items-center justify-between w-full">
            <div className="inline-flex items-center gap-1">
                {show && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                <span>{arg.dayNumberText}</span>
            </div>
        </div>
    )
}

export const CalendarDayHeaderContent: React.FC<HeaderContentProps> = ({ arg, importantDates }) => {
    const key = dayjs(arg.date).format('YYYY-MM-DD')
    const show = importantDates.has(key)

    return (
        <div className="flex items-center gap-2">
            {show && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
            <span>{arg.text}</span>
        </div>
    )
}
