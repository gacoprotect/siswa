<?php

namespace App\Http\Controllers;

use App\Models\Indentitas;
use App\Models\Transaction;
use App\Models\Tsalpenrut;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TagihanController extends Controller
{
    public function index(Request $request, $nouid)
    {
        if (!Auth::check()) {
            return redirect()->intended(route('siswa.index', $nouid));
        }
        $identitas = Indentitas::select('idok')
            ->where('nouid', $nouid)
            ->with(['tagihan' => function ($query) {
                $query
                    ->where(function ($query) {
                        $query->where('sta', 0)
                            ->orWhere('sta', 1);
                    })
                    ->where(function ($query) {
                        $currentYear = date('Y');
                        $currentMonth = date('n');

                        $query->where('tah', '<', $currentYear)
                            ->orWhere(function ($q) use ($currentYear, $currentMonth) {
                                $q->where('tah', $currentYear)
                                    ->where('bulid', '<=', $currentMonth);
                            });
                    })
                    ->orderBy('tah', 'desc')
                    ->orderBy('bulid', 'desc');
            }])
            ->firstOrFail();

        // Group and format data
        $groupedData = [];
        foreach ($identitas->tagihan as $item) {
            $year = $item->tah;
            $month = $item->bulan;

            if (!isset($groupedData[$year][$month])) {
                $groupedData[$year][$month] = [
                    'tagihan' => 0,
                    'transactions' => []
                ];
            }

            // Calculate monthly total (only for charges, jen=0)
            if ($item->jen === 0) {
                $groupedData[$year][$month]['tagihan'] += $item->jumlah;
            } else {
                $groupedData[$year][$month]['tagihan'] -= abs($item->jumlah);
            }

            $groupedData[$year][$month]['transactions'][] = [
                'spr' => $item->id,
                'tah' => $item->tah,
                'jen' => $item->jen,
                'ket' => $item->ket,
                'jumlah' => $item->jumlah,
                'bulan' => $item->bulan,
                'sta' => $item->sta ?? 0 // Default 0 jika tidak ada status
            ];
        }
        $totalTagihan = $identitas->tagihan->where('jen', 0)->sum('jumlah');
        $totalPembayaran = $identitas->tagihan->where('jen', 1)->sum('jumlah');
        $sisaTagihan = $totalTagihan - abs($totalPembayaran);
        return response()->json([
            'data' => $groupedData,
            'summary' => [
                'total_tagihan' => $totalTagihan,
                'total_pembayaran' => abs($totalPembayaran),
                'sisa_tagihan' => $sisaTagihan
            ],
            'status' => 'success'
        ]);
    }

    public function show(Request $request, $nouid)
    {
        $request->validate([
            'bul' => 'required|string',
            'tah' => 'required|string',
        ]);
        $bulan = DB::connection('mysql')->table('tbulan')
            ->where('bul', $request->bul)
            ->first();
        $identitas = Indentitas::with('siswa')->with([
            'tagihan' => function ($q) use ($bulan, $request) {
                $q->where('bulid', $bulan->bulid)->where('tah', $request->tah);
            }
        ])->where('nouid', $nouid)->firstOrFail();
        if (!$identitas) {
            abort(404, 'Tagihan tidak ditemukan');
        }

        $totalTagihan = $identitas->tagihan->where('jen', 0)->sum('jumlah');
        $identitas['total_tagihan'] = $totalTagihan;
        return Inertia::render('Transaction/Tagihan', ['data' => $identitas]);
    }

    public function pay(Request $request)
    {
        $request->validate([
            'month' => 'required|string',
            'payment_method' => 'required|in:balance,virtual_account',
            'amount' => 'required|numeric|min:1'
        ]);

        // Proses pembayaran disini
        // ...

        return redirect()->back()->with('success', 'Pembayaran berhasil diproses');
    }
}
