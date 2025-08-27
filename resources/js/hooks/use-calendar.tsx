import { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import { router } from '@inertiajs/react'
import dayjs from 'dayjs'
import type { CalendarEvent, CalendarFilters } from '@/types/calendar'
import type { DatesSetArg, ViewApi } from '@fullcalendar/core'

// Extend Window interface untuk route function
declare global {
    interface Window {
        route?: (name: string, params?: Record<string, unknown>) => string
    }
}

// Type untuk route function
type RouteFunction = (name: string, params?: Record<string, unknown>) => string

type HolidayApiItem = {
    is_national_holiday?: boolean
    isNationalHoliday?: boolean
    holiday_date?: string
    tanggal?: string
    date?: string
    iso?: string
    holiday_name?: string
    keterangan?: string
    name?: string
    summary?: string
}

type UseCalendarProps = {
    nouid: string
    initialEvents: CalendarEvent[]
    initialFilters: CalendarFilters
}

type HolidayData = {
    dates: Set<string>
    names: Map<string, string>
}

export const useCalendar = ({ nouid, initialEvents, initialFilters }: UseCalendarProps) => {
    const [title, setTitle] = useState<string>('')
    const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)
    const [search] = useState(initialFilters.search ?? '')
    const [activeCats, setActiveCats] = useState<string[]>(initialFilters.categories ?? [])
    const [holidayData, setHolidayData] = useState<HolidayData>({
        dates: new Set<string>(),
        names: new Map<string, string>()
    })

    const lastFetchRef = useRef<{ start: string; end: string; catsKey: string; search: string } | null>(null)
    const rangeRef = useRef<{ start: string; end: string } | null>(null)
    const didInitRef = useRef(false)

    // Filter events based on active categories and search
    const filteredEvents = useMemo<CalendarEvent[]>(() => {
        const base: CalendarEvent[] = Array.isArray(events) ? events : []
        return base.filter((e) => {
            const byCat = activeCats?.length
                ? activeCats.includes(e.extendedProps.category?.slug ?? '')
                : true
            const bySearch = search
                ? [e.title, e.extendedProps.description, e.extendedProps.location]
                    .filter(Boolean)
                    .some((t) => (t ?? '').toLowerCase().includes(search.toLowerCase()))
                : true
            return byCat && bySearch
        })
    }, [events, activeCats, search])

    // Track important dates for highlighting
    const importantDates = useMemo<Set<string>>(() => {
        const s = new Set<string>()
        filteredEvents.forEach((e) => {
            if (e.extendedProps?.isImportant && e.start) {
                s.add(dayjs(e.start).format('YYYY-MM-DD'))
            }
        })
        return s
    }, [filteredEvents])

    // Fetch calendar data when filters or date range changes
    const fetchCalendarData = useCallback((start: string, end: string, cats: string[], q: string) => {
        const catsSorted = cats.length ? [...cats].sort() : []
        const catsKey = catsSorted.length ? catsSorted.join(',') : 'ALL'
        const searchKey = q || ''
        const last = lastFetchRef.current
        if (last && last.start === start && last.end === end && last.catsKey === catsKey && last.search === searchKey) return
        lastFetchRef.current = { start, end, catsKey, search: searchKey }

        // Pastikan router dan route tersedia sebelum menggunakannya
        if (typeof router !== 'undefined' && router.get && (typeof route !== 'undefined' || typeof window.route !== 'undefined')) {
            try {
                const routeFn: RouteFunction = typeof route !== 'undefined' ? route : window.route!
                const opts = { preserveScroll: true, preserveState: true, replace: true }
                const url = routeFn('calendar.index', { nouid })
                router.get(url, { start, end, search: q, categories: catsSorted }, opts)
            } catch (error) {
                console.warn('Failed to fetch calendar data:', error)
            }
        }
    }, [nouid])

    // Load holidays from API
    const loadHolidays = async (start: string, end: string) => {
        try {
            const startYear = dayjs(start).year()
            const endYear = dayjs(end).year()
            const years = Array.from(new Set([startYear, endYear]))
            const results = await Promise.all(
                years.map(async (y) => {
                    const res = await fetch(`https://api-harilibur.vercel.app/api?year=${y}`)
                    if (!res.ok) return [] as HolidayApiItem[]
                    return (await res.json()) as unknown as HolidayApiItem[]
                })
            )
            const merged: HolidayApiItem[] = results.flat()
            const dates = new Set<string>()
            const names = new Map<string, string>()

            merged.forEach((item: HolidayApiItem) => {
                const isNational = item?.is_national_holiday ?? item?.isNationalHoliday ?? true
                if (!isNational) return
                const raw = item?.holiday_date || item?.tanggal || item?.date || item?.iso
                const label = item?.holiday_name || item?.keterangan || item?.name || item?.summary || 'Libur Nasional'
                const d = raw ? dayjs(raw) : null
                if (d && d.isValid()) {
                    const key = d.format('YYYY-MM-DD')
                    dates.add(key)
                    if (!names.has(key)) names.set(key, label)
                }
            })

            setHolidayData({ dates, names })
        } catch {
            // ignore network errors; leave holidays empty
        }
    }

    // Handle calendar dates change
    const handleDatesSet = (arg: DatesSetArg) => {
        if (!arg) return
        const viewTitle = (arg.view as ViewApi | undefined)?.title
        if (viewTitle) setTitle(viewTitle)
        if (!arg.start || !arg.end || !nouid) return

        const start = dayjs(arg.start).format('YYYY-MM-DD')
        const end = dayjs(arg.end).format('YYYY-MM-DD')
        rangeRef.current = { start, end }

        // load holidays whenever range changes
        void loadHolidays(start, end)

        if (!didInitRef.current) { // avoid first mount auto-call
            didInitRef.current = true
            return
        }

        // Delay fetch untuk memastikan router sudah siap
        setTimeout(() => {
            fetchCalendarData(start, end, activeCats, search)
        }, 200)
    }

    // Update events data when props change
    useEffect(() => {
        setEvents(initialEvents)
    }, [initialEvents])

    // Fetch data when filters change
    useEffect(() => {
        if (!nouid || !rangeRef.current) return
        // Delay fetch untuk memastikan router sudah siap
        const timeoutId = setTimeout(() => {
            if (rangeRef.current) {
                fetchCalendarData(rangeRef.current.start, rangeRef.current.end, activeCats, search)
            }
        }, 200)

        return () => clearTimeout(timeoutId)
    }, [activeCats, search, fetchCalendarData, nouid])

    return {
        title,
        filteredEvents,
        holidayData,
        importantDates,
        activeCats,
        search,
        setActiveCats,
        handleDatesSet,
        rangeRef
    }
}
