import React from 'react'

export type CalendarToolbarProps = {
    search: string
    onSearchChange: (value: string) => void
    onSubmit: () => void
}

export const CalendarToolbar: React.FC<CalendarToolbarProps> = ({ search, onSearchChange, onSubmit }) => {
    return (
        <div className="flex-1 flex items-center gap-2">
            <input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari judul / deskripsi / lokasi"
                className="w-full md:w-96 rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={onSubmit} className="rounded bg-blue-600 hover:bg-blue-700 text-white px-3 py-2">
                Cari
            </button>
        </div>
    )
}


