import React, { useMemo, useRef, useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import { useIsMobile } from '@/hooks/use-mobile'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import FullCalendar from '@fullcalendar/react'
import idLocale from '@fullcalendar/core/locales/id'
import type { EventSourceInput, DatesSetArg, EventClickArg, EventContentArg, ViewApi } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { CalendarCategory, CalendarEvent, CalendarFilters } from '@/types/calendar'
import { CalendarToolbar } from '@/components/calendar/CalendarToolbar'
import { CategoryFilter } from '@/components/calendar/CategoryFilter'
import { EventDetailDialog } from '@/components/calendar/EventDetailDialog'
import MenuLayout from '@/Layout/menu-layout'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type PageProps = {
    nouid: string
    categories: CalendarCategory[]
    events: CalendarEvent[]
    filters: CalendarFilters
}

const CalendarIndex: React.FC = () => {
    const page = usePage<PageProps>()
    const nouid = page?.props?.nouid ?? ''
    const categories = page?.props?.categories ?? []
    const events = page?.props?.events ?? []
    const filters = page?.props?.filters ?? {}
    const isMobile = useIsMobile()
    const calendarRef = useRef<FullCalendar | null>(null)
    const [title, setTitle] = useState<string>('')
    const lastFetchRef = useRef<{ start: string; end: string; catsKey: string; search: string } | null>(null)
    const rangeRef = useRef<{ start: string; end: string } | null>(null)

    const [search, setSearch] = useState(filters.search ?? '')
    const [activeCats, setActiveCats] = useState<string[]>(filters.categories ?? [])
    const [detailOpen, setDetailOpen] = useState(false)
    const [selected, setSelected] = useState<CalendarEvent | null>(null)

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

    const didInitRef = React.useRef(false)
    const fetchIfChanged = (start: string, end: string, cats: string[], q: string) => {
        const catsSorted = cats.length ? [...cats].sort() : []
        const catsKey = catsSorted.length ? catsSorted.join(',') : 'ALL'
        const searchKey = q || ''
        const last = lastFetchRef.current
        if (last && last.start === start && last.end === end && last.catsKey === catsKey && last.search === searchKey) return
        lastFetchRef.current = { start, end, catsKey, search: searchKey }
        const hasPage = !!((router as unknown as { page?: { component?: string } }).page?.component)
        const opts = hasPage
            ? { preserveScroll: true, preserveState: true, only: ['events', 'filters'] as string[], replace: true }
            : { preserveScroll: true, preserveState: true, replace: true }
        router.get(route('calendar.index', { nouid }), { start, end, search: q, categories: catsSorted }, opts)
    }
    const onDatesSet = (arg: DatesSetArg) => {
        if (!arg) return
        const viewTitle = (arg.view as ViewApi | undefined)?.title
        if (viewTitle) setTitle(viewTitle)
        if (!arg.start || !arg.end || !nouid) return
        const start = dayjs(arg.start).format('YYYY-MM-DD')
        const end = dayjs(arg.end).format('YYYY-MM-DD')
        rangeRef.current = { start, end }
        if (!didInitRef.current) { // avoid first mount auto-call
            didInitRef.current = true
            return
        }
        fetchIfChanged(start, end, activeCats, search)
    }

    React.useEffect(() => {
        if (!nouid) return
        if (!rangeRef.current) return
        fetchIfChanged(rangeRef.current.start, rangeRef.current.end, activeCats, search)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCats, search])

    return (
        <MenuLayout title="Kalender">
            <div className="p-3 space-y-3">
                {/* <div className="flex flex-col gap-2">
                    <CalendarToolbar
                        search={search}
                        onSearchChange={setSearch}
                        onSubmit={() => {
                            if (!nouid) return
                            router.get(route('calendar.index', { nouid }), { search, categories: activeCats }, { preserveScroll: true, preserveState: true, only: ['events', 'filters'] })
                        }}
                    />
                </div> */}

                {/* Custom navigation toolbar */}
                <div className="flex flex-wrap justify-between items-center gap-2 py-2 overflow-x-auto">
                    {/* Left controls (Today + Grid icon) */}
                    <div className="flex items-center gap-2 ">
                        <button onClick={() => calendarRef.current?.getApi().today()} className="rounded border px-3 py-1 text-xs md:text-sm hover:bg-gray-50">Today</button>
                        <button
                            onClick={() => calendarRef.current?.getApi().changeView('dayGridMonth')}
                            className="rounded border px-2 py-1 text-xs md:text-sm hover:bg-gray-50 bg-white"
                            aria-pressed={calendarRef.current?.getApi().view?.type === 'dayGridMonth'}
                        >
                            <Calendar className={cn("w-4 h-4", calendarRef.current?.getApi().view?.type === 'dayGridMonth' ? 'text-blue-500' : 'text-gray-500')} />
                        </button>
                    </div>

                    {/* Center (Prev / Title / Next) */}
                    {!isMobile && (
                        <div className="flex items-center gap-2 justify-center">
                            <button onClick={() => calendarRef.current?.getApi().prev()} className="rounded border px-2 py-1 text-xs md:text-sm hover:bg-gray-50" aria-label="Previous">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <div className="text-sm md:text-lg font-semibold flex-1 text-center truncate">{title}</div>
                            <button onClick={() => calendarRef.current?.getApi().next()} className="rounded border px-2 py-1 text-xs md:text-sm hover:bg-gray-50" aria-label="Next">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Right (View toggle + Filter) */}
                    <div className="flex items-center gap-2 justify-end">
                        <button
                            onClick={() => calendarRef.current?.getApi().changeView('listWeek')}
                            className={`rounded border px-3 py-1 text-xs md:text-sm bg-white hover:bg-gray-50 ${calendarRef.current?.getApi().view?.type === 'listWeek' && 'text-blue-500'}`}
                            aria-pressed={calendarRef.current?.getApi().view?.type === 'listWeek'}
                        >
                            Acara
                        </button>

                        <CategoryFilter
                            categories={categories}
                            activeSlugs={activeCats}
                            onToggle={(slug) => setActiveCats((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])}
                            onClear={() => setActiveCats([])}
                            onSelectAll={() => setActiveCats(categories.map(c => c.slug))}
                        />
                    </div>
                </div>

                {isMobile && (
                    <div className="flex items-center gap-2 justify-center">
                        <button onClick={() => calendarRef.current?.getApi().prev()} className="rounded border px-2 py-1 text-xs md:text-sm hover:bg-gray-50" aria-label="Previous">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="text-sm md:text-lg font-semibold flex-1 text-center truncate">{title}</div>
                        <button onClick={() => calendarRef.current?.getApi().next()} className="rounded border px-2 py-1 text-xs md:text-sm hover:bg-gray-50" aria-label="Next">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

                <div className="rounded border bg-white">
                    {(() => {
                        const fcEvents: EventSourceInput = filteredEvents
                            .filter((e) => e.start !== null)
                            .map((e) => ({
                                id: String(e.id),
                                title: e.title,
                                start: e.start as string,
                                end: e.end ?? undefined,
                                allDay: e.allDay,
                                extendedProps: e.extendedProps,
                            }))
                        return (
                            <FullCalendar
                                ref={calendarRef}
                                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                headerToolbar={false}
                                locales={[idLocale]}
                                locale="id"
                                height={isMobile ? 'auto' : 'calc(100vh - 220px)'}
                                events={fcEvents}
                                nowIndicator={true}
                                selectable={true}
                                dayMaxEventRows={2}
                                datesSet={onDatesSet}
                                eventClick={(info: EventClickArg) => {
                                    const data: CalendarEvent = {
                                        id: Number(info.event.id),
                                        title: info.event.title ?? '',
                                        start: info.event.startStr || null,
                                        end: info.event.endStr || null,
                                        allDay: Boolean(info.event.allDay),
                                        extendedProps: (info.event.extendedProps ?? {}) as CalendarEvent['extendedProps'],
                                    }
                                    setSelected(data)
                                    setDetailOpen(true)
                                }}
                                eventContent={(arg: EventContentArg) => {
                                    const cat = arg.event.extendedProps.category as CalendarCategory | undefined
                                    const isImportant = Boolean(arg.event.extendedProps.isImportant)
                                    return {
                                        html: `<div class="fc-event-custom ${isImportant ? 'border border-yellow-500' : ''} overflow-hidden" style="background-color:${cat?.color ?? '#d1d5db'}33; padding:2px 4px; border-radius:4px; max-width:100%;">`
                                            + `<span class="inline-flex items-center gap-1 text-[11px] leading-tight" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%;">`
                                            + `${arg.event.title}`
                                            + `</span>`
                                            + `</div>`
                                    }
                                }}
                            />
                        )
                    })()}
                </div>

                <EventDetailDialog open={detailOpen} onOpenChange={setDetailOpen} event={selected} />
            </div>
        </MenuLayout>
    )
}

export default CalendarIndex


