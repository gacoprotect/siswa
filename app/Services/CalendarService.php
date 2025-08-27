<?php

namespace App\Services;

use App\Models\Admin\Event;
use App\Models\Admin\EventCategory;
use App\Models\Admin\EventTarget;
use App\Models\Datmas\Indentitas;
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
     * Fetch events for a student with optional filters.
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
        $idsis = Indentitas::where('nouid', $nouid)->firstOrFail()->idok;
        $query = Event::query()
            ->with('category')
            ->where('sta', true) // Only active events
            ->orderBy('start_at');

        // Filter by student access through EventTarget
        $query->where(function (Builder $q) use ($idsis) {
            $q->whereHas('targets', function (Builder $targetQuery) use ($idsis) {
                $targetQuery->where(function (Builder $tq) use ($idsis) {
                    // Global events (target_type = 0)
                    $tq->where('target_type', 0)
                        // Or student-specific events (target_type = 4, target_id = student_id)
                        ->orWhere(function (Builder $stq) use ($idsis) {
                            $stq->where('target_type', 4)
                                ->where('target_id', $idsis);
                        });
                });
            });
        });

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
                $q->where('judul', 'like', $like)
                    ->orWhere('desk', 'like', $like)
                    ->orWhere('lokasi', 'like', $like);
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
