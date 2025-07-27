<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use App\Models\Admin\Tkelas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TestController extends Controller
{
    public function index(Request $req)
    {
        $mode = $req->query('mode'); // "admin"

        return Inertia::render('test/dashboard', [
            'message' => 'Selamat datang di Halaman Dashboard Test',
            'mode' => $mode,
            'user' => Auth::user(),
            'stats' => [
                'siswa' => 125,
                'guru' => 32,
            ],
            'waktu' => now()->toDateTimeString(),

            'activeTab' => $req->query('tab'),

            // props ini hanya dikirim jika diminta
            'infoUmum' => fn() => $req->query('tab') === 'infoUmum' ? $this->getInfo() : null,
            'grafik'   => fn() => $req->query('tab') === 'grafik' ? $this->getGrafik() : null,
            'riwayat'  => fn() => $req->query('tab') === 'riwayat' ? $this->getRiwayat($req->query('filter')) : null,

        ]);
    }
    public function home()
    {
        return Inertia::render('test/home');
    }
    public function filterRiwayat(Request $req)
    {
        $keyword = $req->query('filter');

        $riwayat = collect([
            ['id' => 1, 'nama' => 'SPP Januari', 'total' => 500000],
            ['id' => 2, 'nama' => 'SPP Februari', 'total' => 500000],
            ['id' => 3, 'nama' => 'Seragam', 'total' => 200000],
        ])->filter(fn($item) => !$keyword || str_contains(strtolower($item['nama']), strtolower($keyword)));

        return Inertia::render('Test/FilterRiwayat', [
            'filter' => $keyword,
            'riwayat' => $riwayat->values()->all(),
        ]);
    }


    private function getInfo()
    {
        return [
            'jumlahSiswa' => 120,
            'jumlahGuru' => 35,
        ];
    }

    private function getGrafik()
    {
        return [
            'labels' => ['Jan', 'Feb', 'Mar'],
            'values' => [30, 45, 60],
        ];
    }

    private function getRiwayat($keyword = null)
    {
        return collect([
            ['id' => 1, 'nama' => 'SPP Januari', 'total' => 500000],
            ['id' => 2, 'nama' => 'SPP Februari', 'total' => 500000],
            ['id' => 3, 'nama' => 'Seragam', 'total' => 200000],
        ])->filter(fn($item) => !$keyword || str_contains(strtolower($item['nama']), strtolower($keyword)))
            ->values()
            ->all();
    }

    public function listExcul()
    {
        $excul = Tkelas::with('jenis')
            ->whereHas('jenis', function ($q) {
                $q->where('tip', 1)->where('sta', 0);
            })
            ->where('idta', idta()->id)
            ->get();

        return response()->json($excul);
    }
}
