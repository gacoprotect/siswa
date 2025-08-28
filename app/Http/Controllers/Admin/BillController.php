<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Spp\Tsalpenrut;
use App\Services\TagihanService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req, TagihanService $tagihanService, string $nouid)
    {
        logger('Request', ['req' => $req->all(), 'nouid' => $nouid]);

        $v = $req->validate([
            'tab' => 'sometimes|in:0,1',
            't' => 'sometimes|integer',
            'b' => 'sometimes|integer',
        ]);
        $t = $v['t'] ?? null;
        $b = $v['b'] ?? null;
        $data = [
            ...$tagihanService->getTagihan($nouid, $t, $b),
            ...(isset($v['tab'])) ? self::tab($nouid, $v['tab'], $tagihanService, $t, $b) : [],
        ];

        return Inertia::render('Tagihan/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $nouid, Request $req, TagihanService $tagihanService)
    {
        logger('Request', ['req' => $req->all(), 'nouid' => $nouid]);

        $v = $req->validate([
            'tab' => 'sometimes|in:0,1',
            't' => 'sometimes|integer',
            'b' => 'sometimes|integer',
        ]);
        $t = $v['t'] ?? null;
        $b = $v['b'] ?? null;
        $data = [
            ...$tagihanService->getTagihan($nouid, $t, $b),
            ...(isset($v['tab'])) ? self::tab($nouid, $v['tab'], $tagihanService, $t, $b) : [],
        ];

        return Inertia::render('Tagihan/detail', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Tsalpenrut $tsalpenrut)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tsalpenrut $tsalpenrut)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tsalpenrut $tsalpenrut)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tsalpenrut $tsalpenrut)
    {
        //
    }

    private function tab(string $nouid, int $tab, TagihanService $tagihanService, ?int $t = null, ?int $b = null): array
    {

        try {
            switch ($tab) {
                case '0':
                    return [...$tagihanService->getTagihan($nouid, $t, $b), ...$tagihanService->getExistTagihan($nouid)];
                    break;
                case '1':
                    return $tagihanService->history($nouid);
                    break;

                default:
                    return [];
            }
        } catch (\Throwable $th) {
            return [];
        }
    }
}
