export type CalendarCategory = {
    id: number;
    slug: string;
    name: string;
    color: string;
    icon?: string | null;
};

export type CalendarEvent = {
    id: number;
    title: string;
    start: string | null;
    end: string | null;
    allDay: boolean;
    extendedProps: {
        description?: string | null;
        location?: string | null;
        status: 'wajib' | 'opsional';
        isImportant: boolean;
        holidayName?: string | null;
        isHoliday?: boolean;
        category?: {
            slug?: string;
            name?: string;
            color?: string;
            icon?: string | null;
        };
    };
};

export type CalendarFilters = {
    start?: string | null;
    end?: string | null;
    search?: string | null;
    categories?: string[] | null;
};


