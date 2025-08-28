import React from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { CalendarEvent } from '@/types/calendar'
import { Modal } from '../ui/Modal'
import { Calendar, MapPin, Tag, Star } from 'lucide-react'

// Set Indonesian locale
dayjs.locale('id')

export type EventDetailDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    event: CalendarEvent | null
}

// Helper function to format date and time
const formatEventDateTime = (event: CalendarEvent | null) => {
    if (!event?.start) return '-'

    try {
        const startDate = dayjs(event.start)
        const endDate = event.end ? dayjs(event.end) : null

        // Format date part
        const dateFormat = 'dddd, DD MMMM YYYY'
        const dateStr = startDate.format(dateFormat)

        // Handle different time conditions
        if (event.allDay) {
            // Full day event
            if (endDate && !startDate.isSame(endDate, 'day')) {
                // Multi-day event - adjust end date for display
                const displayEndDate = endDate.subtract(1, 'day')
                const endDateStr = displayEndDate.format('dddd, DD MMMM YYYY')
                return `${dateStr} - ${endDateStr} (seharian)`
            } else {
                // Single day event
                return `${dateStr} (seharian)`
            }
        } else {
            // Time-based event
            const startTime = startDate.format('HH.mm')

            if (endDate) {
                const endTime = endDate.format('HH.mm')

                if (startDate.isSame(endDate, 'day')) {
                    // Same day event
                    return `${dateStr}\npukul ${startTime} - ${endTime}`
                } else {
                    // Multi-day event with time
                    const endDateStr = endDate.format('DD MMMM YYYY')
                    const endTimeStr = endDate.format('HH.mm')
                    return `${dateStr} pukul ${startTime} - ${endDateStr} pukul ${endTimeStr}`
                }
            } else {
                // No end time
                return `${dateStr}\npukul ${startTime}`
            }
        }
    } catch (error) {
        console.error('Error formatting event date/time:', error)
        return 'Format tanggal tidak valid'
    }
}

export const EventDetailDialog: React.FC<EventDetailDialogProps> = ({ open, onOpenChange, event }) => {
    const isImportant = Boolean(event?.extendedProps?.isImportant)
    const catColor = event?.extendedProps?.category?.color ?? '#e5e7eb';
    const title = event?.extendedProps?.category?.name ?? (event?.extendedProps?.isHoliday ? 'Libur Nasional' : null);
    return (
        <Modal
            size='md'
            title={title}
            header={!!title}
            isOpen={open}
            onClose={() => onOpenChange(false)}
            className='px-4'
            footer={(
                <button
                    onClick={() => onOpenChange(false)}
                    className="px-4 py-2 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                    Kembali
                </button>
            )}
        >
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                    <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: catColor }} />
                    <span className="text-gray-600">{event?.title}</span>
                    {isImportant && (
                        <span className="ml-auto inline-flex items-center gap-1 rounded bg-yellow-100 text-yellow-700 px-2 py-0.5 text-xs">
                            <Star size={14} /> Penting
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                        <Calendar className="mt-0.5 h-4 w-4 text-gray-500" />
                        <div>
                            <div className="font-medium">Waktu</div>
                            <div className="text-gray-700 whitespace-pre-line">
                                {formatEventDateTime(event)}
                            </div>
                        </div>
                    </div>

                    {event?.extendedProps?.location && (
                        <div className="flex items-start gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 text-gray-500" />
                            <div>
                                <div className="font-medium">Lokasi</div>
                                <div className="text-gray-700">{event.extendedProps.location}</div>
                            </div>
                        </div>
                    )}

                    <div className="flex items-start gap-2">
                        <Tag className="mt-0.5 h-4 w-4 text-gray-500" />
                        <div>
                            <div className="font-medium">Status</div>
                            <div className="text-gray-700">{event?.extendedProps?.status === 'wajib' ? 'Wajib' : 'Opsional'}</div>
                        </div>
                    </div>
                </div>

                {event?.extendedProps?.description && (
                    <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-700 whitespace-pre-wrap">
                        {event.extendedProps.description}
                    </div>
                )}
            </div>
        </Modal>
    )
}


