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
            // Validasi request
            $v = $request->validate([
                'spr' => 'required|array',
                'spr.*' => 'required|integer|exists:mai3.tsalpenrut,id',
                'jen1' => 'sometimes|array',
                'jen1.*' => 'integer|exists:mai3.tsalpenrut,id',
                'tagihan' => 'required|integer',
            ]);

            $sprIds = $v['spr'];
            $spr = Tsalpenrut::whereIn('id', $sprIds)->get();
            if (!$spr) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data SPR tidak ditemukan.',
                    'data' => []
                ], 404);
            }

            // Cek jika jen1 digunakan (sudah pernah bayar)
            $jen1Used = !empty($v['jen1']) && Ttrx::whereIn('jen1', $v['jen1'])->exists();

            // Ambil identitas siswa beserta tagihan yang belum dibayar
            $identitas = Indentitas::with([
                'siswa',
                'tagihan' => function ($q) use ($v, $jen1Used) {
                    if ($jen1Used) {
                        $q->whereNotIn('id', $v['jen1']);
                    }
                }
            ])->where('nouid', $nouid)->firstOrFail();

            // Hitung total tagihan
            $totalTagihan = $identitas->tagihan->sum('jumlah');

            // Siapkan response dasar
            $response = $identitas->toArray();
            $response['jen1'] = $v['jen1'];
            $response['total_tagihan'] = $totalTagihan;
            // $response['tah_tagihan'] = $spr->tah;
            // $response['bulan_tagihan'] = $spr->bulid;
            $response['spr_tagihan'] = $v['spr'];

            // Generate order ID
            $orderId = 'pay-PR' . $identitas->siswa->nis . str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            $response['orderId'] = $orderId;

            // Cek jika sudah ada transaksi sebelumnya
            $trx = Ttrx::where('order_id', $orderId)->first();
            if ($trx) {
                if ($trx->status === 'pending') {
                    return response()->json([
                        'success' => true,
                        'redirect' => route('payment.instruction', [
                            'nouid' => $nouid,
                            'orderId' => $orderId,
                        ]),
                        'data' => $response,
                    ]);
                } elseif ($trx->status !== 'success') {
                    $trx->delete(); // hapus transaksi gagal
                }
            }

            return response()->json([
                'success' => true,
                'data' => $response,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $th->getMessage(),
                'data' => []
            ], 500);
        }
    }

    public function getLastTagihan(Request $req, $nouid)
    {
        try {
            $identitas = Indentitas::with(['tagihan' => function ($q) {
                $q->where('sta', 2)
                    ->orderByDesc('tah')
                    ->orderByDesc('bulid');
            }])->where('nouid', $nouid)->first();

            if (!$identitas || $identitas->tagihan->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tagihan belum tersedia.',
                    'data' => null,
                ], 404);
            }

            $last = $identitas->tagihan->first(); // tagihan terakhir
            $tahun = $last->tah;
            $bulan = str_pad($last->bulid, 2, '0', STR_PAD_LEFT); // pastikan 2 digit
            $tanggal = \Carbon\Carbon::createFromFormat('Y-m', "$tahun-$bulan");

            $nextMonth = $tanggal->addMonth()->startOfMonth();
            $timestamp = $nextMonth->timestamp * 1000;

            return response()->json([
                'success' => true,
                'data' => [
                    'bul' => $bulan.'-'.$tahun,
                    'month' => $timestamp,
                ]
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $th->getMessage(),
                'data' => null,
            ], 500);
        }
    }
}
