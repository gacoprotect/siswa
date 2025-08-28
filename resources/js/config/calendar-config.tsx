import idLocale from '@fullcalendar/core/locales/id'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { renderEventContent } from '@/components/calendar/fcRenderers'

export const calendarPlugins = [
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
    interactionPlugin
]

export const calendarConfig = {
    initialView: "dayGridMonth",
    headerToolbar: false,
    locales: [idLocale],
    locale: "id",
    height: 'auto',
    eventDisplay: "block",
    nowIndicator: true,
    selectable: true,
    dayMaxEventRows: 2,
    noEventsContent: <div className="p-3 text-sm text-gray-500">Tidak ada acara</div>,
    views: {
        listDay: {
            buttonText: 'Acara',
            listDayFormat: { weekday: 'long', day: 'numeric', month: 'long' },
            listDaySideFormat: false,
            // Kustomisasi tampilan list
            dayHeaderFormat: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
            // Format tanggal/waktu khusus untuk listDay
            eventTimeFormat: { hour: '2-digit', minute: '2-digit', meridiem: false },
            // Buat border menjadi lebih tipis
            listDayAltFormat: { month: 'long' },
        },
        // Konfigurasi untuk tampilan bulan
        dayGridMonth: {
            titleFormat: { year: 'numeric', month: 'long' },
            dayHeaderFormat: { weekday: 'short' },
        },
    },
    // Terjemahan untuk teks default
    buttonText: {
        today: 'Hari ini',
        month: 'Bulan',
        week: 'Minggu',
        day: 'Hari',
        list: 'Daftar'
    },
    allDayText: 'Sepanjang hari',
    moreLinkText: '{count} lagi',
    noEventsText: 'Tidak ada acara',
    eventContent: renderEventContent
}

// Styles for holidays
export const holidayStyles = {
    backgroundColor: '#fee2e2', // rose-200
    borderColor: '#fecaca',
    textColor: '#991b1b',
}
