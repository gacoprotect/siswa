import React from 'react'
import type { EventContentArg } from '@fullcalendar/core'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CalendarEvent } from '@/types/calendar'

export type LocalExtendedProps = CalendarEvent['extendedProps'] & {
    isHoliday?: boolean
    holidayName?: string
}

export const renderEventContent = (arg: EventContentArg) => {
    const props = arg.event.extendedProps as LocalExtendedProps

    const isHoliday = Boolean(props.isHoliday)
    const chipLabel = isHoliday ? (props.holidayName || arg.event.title) : props.category?.name
    const chipStyle: React.CSSProperties | undefined = chipLabel
        ? {
            backgroundColor: isHoliday ? '#fee2e2' : `${(props.category?.color || '#000000')}22`,
            color: isHoliday ? '#991b1b' : '#374151',
            border: `1px solid ${isHoliday ? '#fecaca' : (props.category?.color || '#e5e7eb')}`,
        }
        : undefined

    if (arg.view.type.startsWith('list')) {
        const isImportant = Boolean(props.isImportant) && !isHoliday
        const details = isHoliday ? '' : [arg.timeText, props.location].filter(Boolean).join(' • ')
        return (
            <div className="flex flex-col gap-1 py-1">
                <div className="flex items-center gap-2">
                    {isImportant && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                    <span className="text-sm font-medium text-gray-900">{arg.event.title}</span>
                    {chipLabel && (
                        <span
                            className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                            style={chipStyle}
                        >
                            {chipLabel}
                        </span>
                    )}
                </div>
                {details && (
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                        {details}
                    </div>
                )}
                {!isHoliday && props.description && (
                    <div className="text-xs text-gray-600 line-clamp-2 pl-2 border-l-2 border-gray-200 ml-1">
                        {props.description}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={cn('overflow-hidden px-1 rounded-md max-w-full cursor-pointer')}>
            <span className="inline-flex items-center gap-1 text-[11px] leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                <span className="truncate" title={arg.event.title}>{arg.event.title}</span>
            </span>
        </div>
    )
}
