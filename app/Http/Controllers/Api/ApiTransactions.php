<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Datmas\Indentitas;
use App\Models\Spp\Tsalpenrut;
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
                'nouid' => 'required|string',
                'spr' => 'required|integer|exists:mai3.tsalpenrut,id',
                'jen1' => 'sometimes|array',
                'jen1.*' => 'integer|exists:mai3.tsalpenrut,id',
                'tagihan' => 'required|integer',
            ]);
            $v['jen1'] = $v['jen1'] ?? [];

            $jen1Used = !empty($v['jen1']) && Ttrx::whereIn('jen1', $v['jen1'])->exists();

            $spr = Tsalpenrut::findOrFail($v['spr']);
            if (!$spr) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data tidak ditemukan.',
                    'data' => []
                ], 404);
            }

            $identitas = Indentitas::with(['siswa', 'tagihan' => function ($q) use ($spr, $v, $jen1Used) {
                $q->where('bulid', $spr->bulid)
                    ->where('tah', $spr->tah);

                if ($jen1Used && !empty($v['jen1'])) {
                    $q->whereNotIn('id', $v['jen1']);
                }
            }])->where('nouid', $v['nouid'])->firstOrFail();

            $totalTagihan = $identitas->tagihan->sum('jumlah');
            $response = $identitas->toArray();
            $response['jen1'] = $v['jen1'];
            $response['total_tagihan'] = $totalTagihan;
            $response['tah_tagihan'] = $spr->tah;
            $response['bulan_tagihan'] =  $spr->bulid;
            $response['spr_tagihan'] = $spr->id;

            $orderId = 'pay-PR' .  $spr->tah .
                str_pad($spr->id, 2, '0', STR_PAD_LEFT) .
                $identitas->siswa->nis;
            $response['orderId'] = $orderId;

            $trx = Ttrx::where('order_id', $orderId)->first();

            if ($trx && $trx->status === 'pending') {
                return response()->json([
                    'success' => true,
                    'redirect' => route('payment.instruction', [
                        'nouid' => $nouid,
                        'orderId' => $orderId,
                    ]),
                    'data' => $response,
                ]);
            }
            if ($trx && $trx->status !== 'success') {
                $trx->delete();
            }
            return response()->json([
                'success' => true,
                'data' => $response,
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
