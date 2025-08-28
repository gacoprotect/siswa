import dayjs from 'dayjs'
import 'dayjs/locale/id'
import type { EventInput } from '@fullcalendar/core'
import type { CalendarEvent } from '@/types/calendar'
import type { LocalExtendedProps } from '@/components/calendar/fcRenderers'

// Set Indonesian locale
dayjs.locale('id')

/**
 * Convert application calendar events to FullCalendar compatible format
 */
export const mapEventsToFullCalendar = (events: CalendarEvent[]): EventInput[] => {
    try {
        if (!Array.isArray(events)) {
            console.warn('mapEventsToFullCalendar: events is not an array', events)
            return []
        }

        return events
            .filter((e) => {
                if (!e || typeof e !== 'object') {
                    console.warn('mapEventsToFullCalendar: invalid event object', e)
                    return false
                }
                return e.start !== null && e.start !== undefined
            })
            .map((e) => {
                try {
                    const catColor = e.extendedProps?.category?.color ?? '#d1d5db'

                    // Handle end date for allDay events
                    let endDate = e.end
                    if (e.allDay && e.end) {
                        // For allDay events, FullCalendar expects exclusive end date
                        // So we add one day to make it inclusive
                        const endDay = dayjs(e.end)
                        if (endDay.isValid()) {
                            endDate = endDay.add(1, 'day').format('YYYY-MM-DD')
                        }
                    }

                    const item: EventInput = {
                        id: String(e.id || ''),
                        title: e.title || '',
                        start: e.start as string,
                        end: endDate ?? undefined,
                        allDay: Boolean(e.allDay),
                        display: 'block',
                        backgroundColor: catColor,
                        borderColor: catColor,
                        extendedProps: e.extendedProps || {},
                    }
                    return item
                } catch (error) {
                    console.error('Error processing event:', e, error)
                    return null
                }
            })
            .filter((item): item is EventInput => item !== null)
    } catch (error) {
        console.error('Error in mapEventsToFullCalendar:', error)
        return []
    }
}

/**
 * Convert holiday data to FullCalendar compatible events
 */
export const mapHolidaysToFullCalendar = (
    holidayNames: Map<string, string>,
    rangeStart?: string,
    rangeEnd?: string
): EventInput[] => {
    try {
        if (!rangeStart || !rangeEnd) return []

        const start = dayjs(rangeStart)
        const end = dayjs(rangeEnd)

        if (!start.isValid() || !end.isValid()) {
            console.warn('Invalid date range:', { rangeStart, rangeEnd })
            return []
        }

        return Array.from(holidayNames.entries())
            .filter(([d]) => {
                const dd = dayjs(d)
                return dd.isValid() && (dd.isSame(start) || dd.isAfter(start)) && dd.isBefore(end)
            })
            .map(([d, name]) => ({
                id: `holiday-${d}`,
                title: name || 'Libur Nasional',
                start: d,
                allDay: true,
                display: 'block',
                backgroundColor: '#fee2e2', // rose-200
                borderColor: '#fecaca',
                textColor: '#991b1b',
                extendedProps: { isHoliday: true, holidayName: name } as LocalExtendedProps,
            }))
    } catch (error) {
        console.error('Error in mapHolidaysToFullCalendar:', error)
        return []
    }
}

/**
 * Get calendar class names for a day cell
 */
export const getDayCellClassNames = (date: Date, holidayDates: Set<string>): string[] => {
    try {
        if (!date || !(date instanceof Date)) {
            console.warn('getDayCellClassNames: invalid date', date)
            return []
        }

        const key = dayjs(date).format('YYYY-MM-DD')
        const classes: string[] = []

        // Add holiday class
        if (holidayDates.has(key)) {
            classes.push('fc-holiday-day')
        }

        // Add Sunday class
        if (dayjs(date).day() === 0) {
            classes.push('fc-sunday-day')
        }

        return classes
    } catch (error) {
        console.error('Error in getDayCellClassNames:', error)
        return []
    }
}

/**
 * Get event class names
 */
export const getEventClassNames = (props: LocalExtendedProps): string[] => {
    try {
        const classes: string[] = []
        if (props?.isImportant) classes.push('is-important')
        if (props?.isHoliday) classes.push('is-holiday')
        const slug = props?.category?.slug
        if (slug) classes.push(`cat-${slug}`)
        return classes
    } catch (error) {
        console.error('Error in getEventClassNames:', error)
        return []
    }
}
