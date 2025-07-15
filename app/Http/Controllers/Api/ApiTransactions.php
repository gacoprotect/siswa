<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Datmas\Indentitas;
use App\Models\Spp\Tsalpenrut;
use App\Models\Saving\Ttrx;
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
                'tagihan' => 'required|numeric|min:10000',
            ]);

            $identitas = Indentitas::with('siswa')->where('nouid', $nouid)->firstOrFail();
            $sprRecords = Tsalpenrut::whereIn('id', $validated['spr'])
                ->get();

            $totalTagihan = $sprRecords->sum('jumlah');
            $totalDiskon = !empty($validated['jen1'])
                ? Tsalpenrut::whereIn('id', $validated['jen1'])->sum('jum')
                : 0;
            $orderId = 'pay-PR' . $identitas->siswa->nis . str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            $data = [
                'items' => $sprRecords,
                'total_tagihan' => $totalTagihan,
                'total_diskon' => abs($totalDiskon),
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
    public function getExistTagihan(Request $request, $nouid)
    {
        $identitas = Indentitas::with(['tagihan' => function ($q) {
            $currentYear = date('Y');
            $currentMonth = date('n');
            $q->whereIn('sta', [0, 1])
                ->where(function ($q) use ($currentYear, $currentMonth) {
                    $q->where('tah', '>', $currentYear)
                        ->orWhere(function ($q) use ($currentYear, $currentMonth) {
                            $q->where('tah', $currentYear)
                                ->where('bulid', '>', $currentMonth);
                        });
                })
                ->orderBy('tah', 'desc')
                ->orderBy('bulid', 'asc');
        }])->where('nouid', $nouid)->first();

        // Siapkan array hasil
        $result = [];

        if ($identitas && $identitas->tagihan) {
            foreach ($identitas->tagihan as $tagihan) {
                $tahun = $tagihan->tah;
                $bulan = (int) $tagihan->bulid; // pastikan integer

                if (!isset($result[$tahun])) {
                    $result[$tahun] = [];
                }

                if (!in_array($bulan, $result[$tahun])) {
                    $result[$tahun][] = $bulan;
                }
            }

            foreach ($result as &$bulanList) {
                sort($bulanList);
            }

            ksort($result);
        }

        return response()->json([
            'success' => true,
            'data' => $result
        ]);
    }

    public function getTambahTagihan(Request $req, $nouid)
    {
        try {
            $messages = [
                't.required' => 'Tahun harus diisi',
                't.digits'   => 'Tahun harus 4 digit',
                'b.between'  => 'Bulan harus antara 1-12',
            ];

            $v = $req->validate([
                't' => 'required|numeric|digits:4|min:1900|max:' . (date('Y') + 5),
                'b' => 'required|numeric|between:1,12',
            ], $messages);

            // Ambil data identitas & tagihan yang lebih baru dari (t, b)
            $identitas = Indentitas::with(['tagihan' => function ($q) use ($v) {
                $currentYear = date('Y');
                $currentMonth = date('n');
                 $q->where(function ($q) use ($currentYear, $currentMonth) {
                    $q->where('tah', '>', $currentYear)
                        ->orWhere(function ($q) use ($currentYear, $currentMonth) {
                            $q->where('tah', $currentYear)
                                ->where('bulid', '>', $currentMonth);
                        });
                })
                ->whereIn('sta', [0, 1])
                    ->where(function ($q) use ($v) {
                        $q->where('tah', '<', $v['t'])
                            ->orWhere(function ($q) use ($v) {
                                $q->where('tah', $v['t'])
                                    ->where('bulid', '<=', $v['b']);
                            });
                    })
                    ->orderBy('tah')
                    ->orderBy('bulid');
            }])->where('nouid', $nouid)->first();

            if (!$identitas || $identitas->tagihan->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tagihan belum tersedia.',
                    'data' => null,
                ], 404);
            }

            $spr = [];
            $items = [];
            $years = [];
            $months = [];

            foreach ($identitas->tagihan as $tagihan) {
                $spr[] = $tagihan->id;
                $years[] = (int) $tagihan->tah;
                $months[] = (int) $tagihan->bulid;

                $items[] = [
                    'id'     => $tagihan->id,
                    'tah'    => $tagihan->tah,
                    'bulid'  => $tagihan->bulid,
                    'bulan'  => strtolower(\Carbon\Carbon::create()->month($tagihan->bulid)->translatedFormat('F')),
                    'jumlah' => $tagihan->jumlah,
                    'ket'    => $tagihan->ket,
                    'jen'    => $tagihan->jen,
                    'sta'    => $tagihan->sta,
                ];
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'spr'   => $spr,
                    'data'  => $items,
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
