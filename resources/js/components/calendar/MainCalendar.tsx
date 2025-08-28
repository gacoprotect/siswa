import React, { forwardRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import type { DatesSetArg, DayCellContentArg, DayHeaderContentArg, EventClickArg, EventInput } from '@fullcalendar/core'
import type { CalendarEvent } from '@/types/calendar'
import { calendarPlugins, calendarConfig } from '@/config/calendar-config'
import { CalendarDayContent, CalendarDayHeaderContent } from '@/components/calendar/CalendarDayContent'
import { getDayCellClassNames, getEventClassNames } from '@/utils/calendar-utils'
import type { LocalExtendedProps } from '@/components/calendar/fcRenderers'
import ListDayStyles from './ListDayStyles'
// Kita tidak menggunakan ListDayHeader untuk menghindari error

type MainCalendarProps = {
    events: EventInput[]
    importantDates: Set<string>
    holidayDates: Set<string>
    onDatesSet: (arg: DatesSetArg) => void
    onEventClick: (event: CalendarEvent) => void
}

const MainCalendar = forwardRef<FullCalendar, MainCalendarProps>(
    function MainCalendar(props, ref) {
        const { events, importantDates, holidayDates, onDatesSet, onEventClick } = props;
        const [currentViewType, setCurrentViewType] = useState<string>('dayGridMonth');

        const handleEventClick = (info: EventClickArg) => {
            const data: CalendarEvent = {
                id: Number(info.event.id),
                title: info.event.title ?? '',
                start: info.event.startStr || null,
                end: info.event.endStr || null,
                allDay: Boolean(info.event.allDay),
                extendedProps: (info.event.extendedProps ?? {}) as CalendarEvent['extendedProps'],
            }
            onEventClick(data)
        }

        // Fungsi handler untuk meng-update currentViewType saat tampilan berubah
        const handleViewChange = (viewType: string) => {
            setCurrentViewType(viewType)
        }

        return (
            <>
                {/* Tambahkan ListDayStyles komponen hanya ketika tampilan adalah listDay */}
                {currentViewType === 'listDay' && <ListDayStyles />}
                <FullCalendar
                    ref={ref}
                    plugins={calendarPlugins}
                    initialView={calendarConfig.initialView}
                    headerToolbar={false}
                    locales={calendarConfig.locales}
                    locale={calendarConfig.locale}
                    height={calendarConfig.height}
                    eventDisplay={calendarConfig.eventDisplay}
                    nowIndicator={calendarConfig.nowIndicator}
                    selectable={calendarConfig.selectable}
                    dayMaxEventRows={calendarConfig.dayMaxEventRows}
                    views={{
                        dayGridMonth: {},
                        timeGridWeek: {},
                        timeGridDay: {},
                        listDay: {
                            buttonText: 'Acara',
                            titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
                        }
                    }}
                    noEventsContent={calendarConfig.noEventsContent}
                    events={events}
                    datesSet={(arg) => {
                        // Perbarui currentViewType saat tampilan berubah
                        if (arg.view.type) {
                            handleViewChange(arg.view.type)
                        }
                        // Panggil handler asli
                        onDatesSet(arg)
                    }}
                    dayHeaderContent={(arg: DayHeaderContentArg) => (
                        <CalendarDayHeaderContent arg={arg} importantDates={importantDates} />
                    )}
                    dayCellContent={(arg: DayCellContentArg) => (
                        <CalendarDayContent arg={arg} importantDates={importantDates} />
                    )}
                    dayCellClassNames={(arg) => getDayCellClassNames(arg.date, holidayDates)}
                    eventClassNames={(arg) => getEventClassNames(arg.event.extendedProps as LocalExtendedProps)}
                    eventDidMount={(arg) => {
                        if (arg.view.type.startsWith('list')) {
                            const props = arg.event.extendedProps as LocalExtendedProps
                            const color = props?.isHoliday
                                ? '#fecaca'
                                : (props?.category?.color as string) || ''
                            const tr = arg.el.closest('tr') as HTMLElement | null
                            if (tr && color) {
                                tr.style.backgroundColor = `${color}22`
                                tr.style.borderLeft = `3px solid ${color}`
                            }
                        }
                    }}
                    eventClick={handleEventClick}
                    eventTimeFormat={{ hour: "2-digit", minute: "2-digit" }}
                    eventContent={calendarConfig.eventContent}
                    slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        omitZeroMinute: false,
                        meridiem: 'short'
                    }}
                    allDayText="Sepanjang hari"
                    moreLinkText="+{count} lagi"
                    noEventsText="Tidak ada acara"
                />
            </>
        )
    }
)

export default MainCalendar