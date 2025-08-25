<?php

namespace App\Services;

use App\Models\Admin\Event;
use App\Models\Admin\EventCategory;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class CalendarService
{
    /**
     * Fetch categories with optional whitelist filter.
     */
    public function getCategories(?array $onlySlugs = null): Collection
    {
        $query = EventCategory::query()->orderBy('name');
        if (! empty($onlySlugs)) {
            $query->whereIn('slug', $onlySlugs);
        }

        return $query->get();
    }

    /**
     * Fetch events for a nouid with optional filters.
     * - date range (start..end)
     * - category slugs
     * - search (title/description)
     */
    public function getEvents(
        string $nouid,
        ?string $start = null,
        ?string $end = null,
        ?array $categorySlugs = null,
        ?string $search = null
    ): Collection {
        $query = Event::query()
            ->with('category')
            ->where('nouid', $nouid)
            ->orderBy('start_at');

        if ($start || $end) {
            $this->applyRangeFilter($query, $start, $end);
        }

        if (! empty($categorySlugs)) {
            $query->whereHas('category', function (Builder $q) use ($categorySlugs) {
                $q->whereIn('slug', $categorySlugs);
            });
        }

        if (! empty($search)) {
            $like = '%'.str_replace(['%', '_'], ['\\%', '\\_'], $search).'%';
            $query->where(function (Builder $q) use ($like) {
                $q->where('title', 'like', $like)
                    ->orWhere('description', 'like', $like)
                    ->orWhere('location', 'like', $like);
            });
        }

        return $query->get();
    }

    protected function applyRangeFilter(Builder $query, ?string $start, ?string $end): void
    {
        $startAt = $start ? CarbonImmutable::parse($start)->startOfDay() : null;
        $endAt = $end ? CarbonImmutable::parse($end)->endOfDay() : null;

        // Overlap condition: (start <= endRange) AND (end IS NULL OR end >= startRange)
        if ($startAt && $endAt) {
            $query->where(function (Builder $q) use ($startAt, $endAt) {
                $q->where('start_at', '<=', $endAt)
                    ->where(function (Builder $q2) use ($startAt) {
                        $q2->whereNull('end_at')->orWhere('end_at', '>=', $startAt);
                    });
            });
        } elseif ($startAt) {
            $query->where(function (Builder $q) use ($startAt) {
                $q->whereNull('end_at')->orWhere('end_at', '>=', $startAt);
            });
        } elseif ($endAt) {
            $query->where('start_at', '<=', $endAt);
        }
    }
}
