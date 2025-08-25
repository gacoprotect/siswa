import React from 'react'
import dayjs from 'dayjs'
import { CalendarEvent } from '@/types/calendar'
import { Modal } from '../ui/Modal'
import { Calendar, MapPin, Tag, Star } from 'lucide-react'

export type EventDetailDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    event: CalendarEvent | null
}

export const EventDetailDialog: React.FC<EventDetailDialogProps> = ({ open, onOpenChange, event }) => {
    const isImportant = Boolean(event?.extendedProps?.isImportant)
    const catColor = event?.extendedProps?.category?.color ?? '#e5e7eb'

    return (
        <Modal
            size='md'
            title={event?.extendedProps?.category?.name}
            isOpen={open}
            onClose={() => onOpenChange(false)}
            footer={(
                <button
                    onClick={() => onOpenChange(false)}
                    className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700"
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
                            <div className="text-gray-700">
                                {event?.start ? dayjs(event.start).format('ddd, DD MMM YYYY HH:mm') : '-'}
                                {event?.end ? ` - ${dayjs(event.end).format('DD MMM YYYY HH:mm')}` : ''}
                                {event?.allDay ? ' (seharian)' : ''}
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


