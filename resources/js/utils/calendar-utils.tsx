import dayjs from 'dayjs'
import type { EventInput } from '@fullcalendar/core'
import type { CalendarEvent } from '@/types/calendar'
import type { LocalExtendedProps } from '@/components/calendar/fcRenderers'

/**
 * Convert application calendar events to FullCalendar compatible format
 */
export const mapEventsToFullCalendar = (events: CalendarEvent[]): EventInput[] => {
    return events
        .filter((e) => e.start !== null)
        .map((e) => {
            const catColor = e.extendedProps?.category?.color ?? '#d1d5db'
            const item: EventInput = {
                id: String(e.id),
                title: e.title,
                start: e.start as string,
                end: e.end ?? undefined,
                allDay: e.allDay,
                display: 'block',
                backgroundColor: catColor,
                borderColor: catColor,
                extendedProps: e.extendedProps,
            }
            return item
        })
}

/**
 * Convert holiday data to FullCalendar compatible events
 */
export const mapHolidaysToFullCalendar = (
    holidayNames: Map<string, string>,
    rangeStart?: string,
    rangeEnd?: string
): EventInput[] => {
    if (!rangeStart || !rangeEnd) return []

    const start = dayjs(rangeStart)
    const end = dayjs(rangeEnd)

    return Array.from(holidayNames.entries())
        .filter(([d]) => {
            const dd = dayjs(d)
            return dd.isValid() && (dd.isSame(start) || dd.isAfter(start)) && dd.isBefore(end)
        })
        .map(([d, name]) => ({
            id: `holiday-${d}`,
            title: name,
            start: d,
            allDay: true,
            display: 'block',
            backgroundColor: '#fee2e2', // rose-200
            borderColor: '#fecaca',
            textColor: '#991b1b',
            extendedProps: { isHoliday: true, holidayName: name } as LocalExtendedProps,
        }))
}

/**
 * Get calendar class names for a day cell
 */
export const getDayCellClassNames = (date: Date, holidayDates: Set<string>): string[] => {
    const key = dayjs(date).format('YYYY-MM-DD')
    return holidayDates.has(key) ? ['fc-holiday-day'] : []
}

/**
 * Get event class names
 */
export const getEventClassNames = (props: LocalExtendedProps): string[] => {
    const classes: string[] = []
    if (props?.isImportant) classes.push('is-important')
    if (props?.isHoliday) classes.push('is-holiday')
    const slug = props?.category?.slug
    if (slug) classes.push(`cat-${slug}`)
    return classes
}
