import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Tooltip from '@radix-ui/react-tooltip'
import { CalendarCategory } from '@/types/calendar'
import { Filter, FilterX } from 'lucide-react'

export type CategoryFilterProps = {
    categories: CalendarCategory[]
    activeSlugs: string[]
    onToggle: (slug: string) => void
    onClear?: () => void
    onSelectAll?: () => void
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeSlugs, onToggle, onClear, onSelectAll }) => {
    const isFiltered = activeSlugs.length > 0 && activeSlugs.length < categories.length
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className={`inline-flex items-center gap-2 rounded border px-3 py-1 text-sm hover:bg-gray-50 ${isFiltered ? 'border-blue-500 bg-blue-50 text-blue-700' : 'bg-white'}`}>
                    <Tooltip.Provider>
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <div className="flex items-center gap-2">
                                    {isFiltered ? (
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); onClear?.(); }}
                                            className="rounded p-0.5 hover:bg-red-50"
                                            title="Hapus filter"
                                        >
                                            <FilterX className="w-4 h-4 text-red-600" />
                                        </button>
                                    ) : (
                                        <Filter className="w-4 h-4" />
                                    )}
                                </div>
                            </Tooltip.Trigger>
                            <Tooltip.Content sideOffset={4} className="rounded bg-black text-white text-xs px-2 py-1">
                                {isFiltered ? 'Hapus filter' : 'Semua kategori ditampilkan'}
                            </Tooltip.Content>
                        </Tooltip.Root>
                    </Tooltip.Provider>
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content sideOffset={6} className="min-w-[220px] rounded border bg-white p-2 shadow-md z-50">
                    <div className="mb-2 flex items-center justify-between gap-2">
                        <button
                            onClick={() => onSelectAll?.()}
                            className="text-xs rounded border px-2 py-0.5 hover:bg-gray-50"
                            title="Pilih semua kategori"
                        >
                            Pilih semua
                        </button>
                        <button
                            onClick={() => onClear?.()}
                            className="text-xs rounded border px-2 py-0.5 hover:bg-gray-50"
                            title="Kosongkan filter (tampilkan semua)"
                        >
                            Kosongkan
                        </button>
                    </div>
                    <div className="max-h-60 overflow-auto">
                        {categories.map((c) => {
                            const checked = activeSlugs.length === 0 || activeSlugs.includes(c.slug)
                            return (
                                <DropdownMenu.CheckboxItem
                                    key={c.id}
                                    checked={checked}
                                    onCheckedChange={() => onToggle(c.slug)}
                                    className="flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-gray-100"
                                >
                                    <DropdownMenu.ItemIndicator>
                                        <span className="inline-block w-3 text-green-600">✓</span>
                                    </DropdownMenu.ItemIndicator>
                                    <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                                    {c.name}
                                </DropdownMenu.CheckboxItem>
                            )
                        })}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                            {activeSlugs.length === 0 ? 'Semua kategori aktif' : `Dipilih: ${categories.filter(c => activeSlugs.includes(c.slug)).map(c => c.name).join(', ')}`}
                        </span>
                        <button
                            onClick={() => onClear?.()}
                            className="text-xs text-red-600 hover:underline inline-flex items-center gap-1"
                            title="Hapus filter"
                        >
                            <FilterX className="w-3 h-3" /> Clear
                        </button>
                    </div>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}


