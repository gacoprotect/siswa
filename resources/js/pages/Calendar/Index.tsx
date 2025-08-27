import React, { useRef, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { useIsMobile } from '@/hooks/use-mobile'
import 'dayjs/locale/id'
import type { CalendarCategory, CalendarEvent, CalendarFilters } from '@/types/calendar'
import { CalendarNav } from '@/components/calendar/CalendarNav'
import { EventDetailDialog } from '@/components/calendar/EventDetailDialog'
import MenuLayout from '@/Layout/menu-layout'
import { useCalendar } from '@/hooks/use-calendar'
import { mapEventsToFullCalendar, mapHolidaysToFullCalendar } from '@/utils/calendar-utils'
import MainCalendar from '@/components/calendar/MainCalendar'
import MobileNavigation from '@/components/calendar/MobileNavigation'
import type FullCalendar from '@fullcalendar/react'



// using LocalExtendedProps imported from fcRenderers

type PageProps = {
    nouid: string
    categories: CalendarCategory[]
    events: CalendarEvent[]
    filters: CalendarFilters
}

const CalendarIndex: React.FC = () => {
    const { nouid, categories, events: eventsData, filters } = usePage<PageProps>().props
    const isMobile = useIsMobile()
    const calendarRef = useRef<FullCalendar>(null)
    const [detailOpen, setDetailOpen] = useState(false)
    const [selected, setSelected] = useState<CalendarEvent | null>(null)

    // Use custom calendar hook
    const {
        title,
        filteredEvents,
        holidayData,
        importantDates,
        activeCats,
        setActiveCats,
        handleDatesSet,
        rangeRef
    } = useCalendar({
        nouid,
        initialEvents: eventsData,
        initialFilters: filters
    })

    // Process events for FullCalendar
    const fcEvents = mapEventsToFullCalendar(filteredEvents)

    // Process holidays for FullCalendar
    const holidayEvents = mapHolidaysToFullCalendar(
        holidayData.names,
        rangeRef.current?.start,
        rangeRef.current?.end
    )

    // Combine regular events and holiday events
    const allEvents = [...holidayEvents, ...fcEvents]

    // Handle event click
    const handleEventClick = (event: CalendarEvent) => {
        setSelected(event)
        setDetailOpen(true)
    }

    return (
        <MenuLayout title="Kalender">
            <div className="p-3 space-y-3">
                <CalendarNav
                    title={title}
                    isMobile={isMobile}
                    onToday={() => calendarRef.current?.getApi().today()}
                    onPrev={() => calendarRef.current?.getApi().prev()}
                    onNext={() => calendarRef.current?.getApi().next()}
                    onViewMonth={() => calendarRef.current?.getApi().changeView('dayGridMonth')}
                    onViewListDay={() => calendarRef.current?.getApi().changeView('listDay')}
                    isListDay={calendarRef.current?.getApi().view?.type === 'listDay'}
                    categories={categories}
                    activeSlugs={activeCats}
                    onToggleCategory={(slug) => setActiveCats((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])}
                    onClearCategories={() => setActiveCats([])}
                    onSelectAllCategories={() => setActiveCats(categories.map(c => c.slug))}
                />

                {isMobile && (
                    <MobileNavigation title={title} calendarRef={calendarRef} />
                )}

                <div className="rounded border bg-white">
                    <MainCalendar
                        ref={calendarRef}
                        events={allEvents}
                        importantDates={importantDates}
                        holidayDates={holidayData.dates}
                        onDatesSet={handleDatesSet}
                        onEventClick={handleEventClick}
                    />
                </div>

                <EventDetailDialog open={detailOpen} onOpenChange={setDetailOpen} event={selected} />
            </div>
        </MenuLayout>
    )
}

export default CalendarIndex


