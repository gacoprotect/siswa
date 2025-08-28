import React from 'react'
import { Calendar } from 'lucide-react'
import { CategoryFilter } from './CategoryFilter'
import { cn } from '@/lib/utils'

export type CalendarNavProps = {
    title: string
    isMobile: boolean
    onToday: () => void
    onPrev: () => void
    onNext: () => void
    onViewMonth: () => void
    onViewListDay: () => void
    isListDay: boolean
    categories: Array<{ id: number; slug: string; name: string; color: string; icon?: string | null }>
    activeSlugs: string[]
    onToggleCategory: (slug: string) => void
    onClearCategories: () => void
    onSelectAllCategories: () => void
}

export const CalendarNav: React.FC<CalendarNavProps> = ({
    title,
    isMobile,
    onToday,
    onPrev,
    onNext,
    onViewMonth,
    onViewListDay,
    isListDay,
    categories,
    activeSlugs,
    onToggleCategory,
    onClearCategories,
    onSelectAllCategories,
}) => {
    return (
        <div className="flex flex-wrap justify-between items-center gap-2 py-2 overflow-x-auto">
            {/* Left controls (Today + Grid icon) */}
            <div className="flex items-center gap-2 ">
                <button onClick={onToday} className="rounded border px-3 py-1 text-xs md:text-sm hover:bg-gray-50">Today</button>
                <button
                    onClick={onViewMonth}
                    className="rounded border px-2 py-1 text-xs md:text-sm hover:bg-gray-50 bg-white"
                    aria-pressed={!isListDay}
                >
                    <Calendar className={cn('w-4 h-4', !isListDay ? 'text-blue-500' : 'text-gray-500')} />
                </button>
            </div>

            {/* Center (Prev / Title / Next) */}
            {!isMobile && (
                <div className="flex items-center gap-2 justify-center">
                    <button onClick={onPrev} className="rounded border px-2 py-1 text-xs md:text-sm hover:bg-gray-50" aria-label="Previous">
                        <span className="w-4 h-4">‹</span>
                    </button>
                    <div className="text-sm md:text-lg font-semibold flex-1 text-center truncate">{title}</div>
                    <button onClick={onNext} className="rounded border px-2 py-1 text-xs md:text-sm hover:bg-gray-50" aria-label="Next">
                        <span className="w-4 h-4">›</span>
                    </button>
                </div>
            )}

            {/* Right (View toggle + Filter) */}
            <div className="flex items-center gap-2 justify-end">
                <button
                    onClick={onViewListDay}
                    className={`rounded border px-3 py-1 text-xs md:text-sm bg-white hover:bg-gray-50 ${isListDay && 'text-blue-500'}`}
                    aria-pressed={isListDay}
                >
                    Acara
                </button>

                <CategoryFilter
                    categories={categories}
                    activeSlugs={activeSlugs}
                    onToggle={onToggleCategory}
                    onClear={onClearCategories}
                    onSelectAll={onSelectAllCategories}
                />
            </div>
        </div>
    )
}

export default CalendarNav
