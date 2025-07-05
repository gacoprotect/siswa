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
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
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
            $validated = $request->validate([
                'spr' => 'required|array|min:1',
                'spr.*' => 'required|integer|exists:mai3.tsalpenrut,id',
                'jen1' => 'nullable|array',
                'jen1.*' => 'integer|exists:mai3.tsalpenrut,id',
                'tagihan' => 'required|numeric|min:10000',
            ]);

            $identitas = Indentitas::with('siswa')->where('nouid', $nouid)->firstOrFail();
            $sprRecords = Tsalpenrut::whereIn('id', $validated['spr'])
                ->get();

            $totalTagihan = $sprRecords->where('jen', 0)->sum('jum');
            $totalDiskon = !empty($validated['jen1'])
                ? Tsalpenrut::whereIn('id', $validated['jen1'])->sum('jum')
                : 0;
            $orderId = 'pay-PR' . $identitas->siswa->nis . str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            $data = [
                'items' => $sprRecords,
                'total_tagihan' => $totalTagihan,
                'total_diskon' => abs($totalDiskon),
                'sisa_tagihan' => $totalTagihan - abs($totalDiskon),
                'orderId' => $orderId
            ];
            $trx = Ttrx::where('order_id', $orderId)->orWhere(function ($q) use ($nouid) {
                $q->where('nouid', $nouid)->where('status', 'pending');
            })->first();
            if ($trx) {
                if ($trx->status === 'pending') {
                    return response()->json([
                        'success' => true,
                        'redirect' => route('payment.instruction', [
                            'nouid' => $nouid,
                            'orderId' => $trx->order_id,
                        ]),
                        'data' => $data,
                    ]);
                }
            }
            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Tagihan Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan sistem'
            ], 500);
        }
    }
    public function getTambahTagihan(Request $req, $nouid)
    {
        try {
            $identitas = Indentitas::with(['tagihan' => function ($q) {
                $currentYear = date('Y');
                $currentMonth = date('n');
                $q->whereIn('sta', [0, 1])
                    ->where(function ($q) use ($currentYear, $currentMonth) {
                        $q->where('tah', '>=', $currentYear)
                            ->orWhere(function ($q) use ($currentYear, $currentMonth) {
                                $q->where('tah', $currentYear)
                                    ->where('bulid', '>', $currentMonth);
                            });
                    })
                    ->orderBy('tah', 'desc')
                    ->orderBy('bulid', 'asc');
            }])->where('nouid', $nouid)->first();

            if (!$identitas || $identitas->tagihan->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tagihan belum tersedia.',
                    'data' => null,
                ], 404);
            }

            $grouped = [];

            foreach ($identitas->tagihan as $tagihan) {
                $tahun = $tagihan->tah;
                $namaBulan = strtolower(\Carbon\Carbon::create()->month($tagihan->bulid)->translatedFormat('F'));

                if (!isset($grouped[$tahun])) {
                    $grouped[$tahun] = [];
                }

                if (!isset($grouped[$tahun][$namaBulan])) {
                    $grouped[$tahun][$namaBulan] = [];
                }

                $grouped[$tahun][$namaBulan][] = [
                    'id'     => $tagihan->id,
                    'tah'    => $tagihan->tah,
                    'bulid'  => $tagihan->bulid,
                    'jumlah' => $tagihan->jumlah,
                    'ket'    => $tagihan->ket,
                    'jen'    => $tagihan->jen,
                    'sta'    => $tagihan->sta,
                ];
            }

            return response()->json([
                'success' => true,
                'data' => $grouped
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
