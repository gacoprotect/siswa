<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Datmas\Indentitas;
use App\Models\Trx\Ttrx;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class ApiTransactions extends Controller
{
    public function reqVA()
    {
        $va = generateVaNumber();
        return response()->json([
            'success' => true,
            'va_number' => $va
        ]);
    }

    public function tagihan(Request $request, $nouid)
    {
        try {
            $v = $request->validate([
                'bul' => 'required|string',
                'tah' => 'required|string',
            ]);

            $bulan = getBulid($v['bul']);
            if (!$bulan) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bulan tidak ditemukan.',
                    'data' => []
                ], 404);
            }

            $identitas = Indentitas::with('siswa')
                ->with(['tagihan' => function ($q) use ($bulan, $v) {
                    $q->where('bulid', $bulan)->where('tah', $v['tah']);
                }])
                ->where('nouid', $nouid)
                ->firstOrFail();

            $spr = $identitas->tagihan->where('jen', 0)->pluck('id')->toArray();
            $tahTagihan = $identitas->tagihan->pluck('tah')->first();
            $totalTagihan = $identitas->tagihan->sum('jumlah');

            $identitas['total_tagihan'] = $totalTagihan;
            $identitas['tah_tagihan'] = $tahTagihan;
            $identitas['bulan_tagihan'] = $v['bul'];
            $identitas['spr_tagihan'] = $spr;

            $orderId = 'pay-PR' . $v['tah'] .
                str_pad($bulan, 2, '0', STR_PAD_LEFT) .
                $identitas->siswa->nis;

            $trx = Ttrx::where('order_id', $orderId)->first();

            if ($trx && $trx->status !== 'success') {
                // Jika kadaluarsa
                if ($trx->expiry_time < now()) {
                    $trx->update([
                        'va_number' => generateVaNumber(),
                        'status' => 'pending',
                        'failure_message' => null,
                        'expiry_time' => now(),
                    ]);
                }

                return response()->json([
                    'success' => true,
                    'redirect' => route('payment.instruction', [
                        'nouid' => $nouid,
                        'orderId' => $orderId,
                    ]),
                    'data' => $identitas,
                ]);
            }

            // Jika tidak ada trx atau status success
            return response()->json([
                'success' => true,
                'data' => $identitas,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
                'data' => []
            ], 500);
        }
    }
}
