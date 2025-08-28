<?php

namespace App\Http\Controllers;

use App\Services\CalendarService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CalendarController extends Controller
{
    public function __construct(private readonly CalendarService $calendar) {}

    public function index(Request $request, string $nouid): Response
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
                'id' => (int) $c->id,
                'slug' => (string) ($c->slug ?? ''),
                'name' => (string) ($c->name ?? ''),
                'color' => (string) ($c->color ?? '#d1d5db'),
                'icon' => $c->icon ? (string) $c->icon : null,
            ]),
            'events' => $events->map(fn ($e) => [
                'id' => (int) $e->id,
                'title' => (string) ($e->judul ?? ''),
                'start' => $e->start_at ? (string) $e->start_at->toIso8601String() : null,
                'end' => $e->end_at ? (string) $e->end_at->toIso8601String() : null,
                'allDay' => (bool) $e->fullday,
                'extendedProps' => [
                    'description' => $e->desk ? (string) $e->desk : null,
                    'location' => $e->lokasi ? (string) $e->lokasi : null,
                    'status' => (string) ($e->sifat_label ?? 'opsional'),
                    'isImportant' => (bool) $e->penting,
                    'category' => $e->category ? [
                        'slug' => (string) ($e->category->slug ?? ''),
                        'name' => (string) ($e->category->name ?? ''),
                        'color' => (string) ($e->category->color ?? '#d1d5db'),
                        'icon' => $e->category->icon ? (string) $e->category->icon : null,
                    ] : null,
                ],
            ]),
        ]);
    }
}
