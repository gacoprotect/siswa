import React from 'react'
import { CalendarCategory } from '@/types/calendar'
import * as Lucide from 'lucide-react'
import { SelectInput } from '../SelectInput'

export type CategoryChipsProps = {
    categories: CalendarCategory[]
    activeSlugs: string[]
    onToggle: (slug: string) => void
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({ categories, activeSlugs, onToggle }) => {
    return (
        <div className="flex flex-wrap gap-2">
            <SelectInput
                name="categories"
                label="Filter"
                options={categories.map((c) => ({
                    label: c.name,
                    value: c.slug
                }))}
                onChange={(value) => onToggle(value)}
            />
            {categories.map((c) => {
                const isActive = activeSlugs.length === 0 || activeSlugs.includes(c.slug)
                const Icon = c.icon ? (Lucide as unknown as Record<string, React.ComponentType<any>>)[c.icon] : undefined
                return (
                    <button
                        key={c.id}
                        onClick={() => onToggle(c.slug)}
                        className={`flex items-center gap-1 rounded border px-2 py-1 text-sm ${isActive ? 'border-gray-300' : 'opacity-60'}`}
                        style={{ backgroundColor: `${c.color}22` }}
                        title={c.name}
                    >
                        <span className="inline-flex items-center gap-1">
                            {Icon ? <Icon size={14} /> : null}
                            {c.name}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}


