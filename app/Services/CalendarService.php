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
        try {
            $ident = Indentitas::with(['kelsis' => function ($q) {
                $q->where('idta', idta()->id);
            }])->where('nouid', $nouid)->firstOrFail();
            $idsis = $ident->idok;
            $kelsis = $ident->kelsis;

            $tin = $kelsis?->tin ?? null;
            $idkel = $kelsis?->idkel ?? null;

            $query = Event::query()
                ->with('category')
                ->where('sta', true) // Only active events
                ->orderBy('start_at');

            // Filter by student access through EventTarget
            // Hierarchy: Global (0) → Level/Tingkatan (1) → Class/Kelas (3) → Student/Siswa (4)
            $query->where(function (Builder $q) use ($idsis, $tin, $idkel) {
                $q->whereHas('targets', function (Builder $targetQuery) use ($idsis, $tin, $idkel) {
                    $targetQuery->where(function (Builder $tq) use ($idsis, $tin, $idkel) {
                        // Global events (target_type = 0) - visible to all
                        $tq->where('target_type', 0);

                        // Level/tingkatan events (target_type = 1, target_id = tingkatan_id)
                        if ($tin) {
                            $tq->orWhere(function (Builder $levelQuery) use ($tin) {
                                $levelQuery->where('target_type', 1)
                                    ->where('target_id', $tin);
                            });
                        }

                        // Class/kelas events (target_type = 3, target_id = class_id)
                        if ($idkel) {
                            $tq->orWhere(function (Builder $classQuery) use ($idkel) {
                                $classQuery->where('target_type', 3)
                                    ->where('target_id', $idkel);
                            });
                        }

                        // Student-specific events (target_type = 4, target_id = student_id)
                        $tq->orWhere(function (Builder $studentQuery) use ($idsis) {
                            $studentQuery->where('target_type', 4)
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
        } catch (\Exception $e) {
            // Return empty collection if there's an error
            return collect();
        }
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
