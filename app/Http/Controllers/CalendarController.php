<?php

namespace App\Http\Controllers;

use App\Services\CalendarService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CalendarController extends Controller
{
    public function __construct(private readonly CalendarService $calendar) {}

    public function index(string $nouid, Request $request): Response
    {
        $start = $request->has('start') ? (string) $request->input('start') : null;
        $end = $request->has('end') ? (string) $request->input('end') : null;
        $search = $request->has('search') ? (string) $request->input('search') : null;
        $categorySlugs = $request->has('categories') ? (array) $request->input('categories', []) : null;

        $categories = $this->calendar->getCategories();
        $events = $this->calendar->getEvents($nouid, $start, $end, $categorySlugs, $search);

        return Inertia::render('Calendar/Index', [
            'nouid' => $nouid,
            'filters' => [
                'start' => $start,
                'end' => $end,
                'search' => $search,
                'categories' => $categorySlugs,
            ],
            'categories' => $categories->map(fn ($c) => [
                'id' => $c->id,
                'slug' => $c->slug,
                'name' => $c->name,
                'color' => $c->color,
                'icon' => $c->icon,
            ]),
            'events' => $events->map(fn ($e) => [
                'id' => $e->id,
                'title' => $e->title,
                'start' => optional($e->start_at)->toIso8601String(),
                'end' => optional($e->end_at)->toIso8601String(),
                'allDay' => (bool) $e->all_day,
                'extendedProps' => [
                    'description' => $e->description,
                    'location' => $e->location,
                    'status' => $e->status,
                    'isImportant' => (bool) $e->is_important,
                    'category' => [
                        'slug' => $e->category?->slug,
                        'name' => $e->category?->name,
                        'color' => $e->category?->color,
                        'icon' => $e->category?->icon,
                    ],
                ],
            ]),
        ]);
    }
}
