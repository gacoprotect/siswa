<?php

namespace App\Http\Controllers;

use App\Helpers\DataValidator;
use App\Models\Datmas\Indentitas;
use App\Models\Trx\Ttrx;
use App\Models\Spp\Tsalpenrut;
use App\Models\Trx\Tbalance;
use App\Models\Trx\Ttrxlog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
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
                $currentYear = date('Y');
                $currentMonth = date('n');

                // logger(['month' => $currentMonth]); // 7

                $query->whereIn('sta', [0, 1])
                    ->where(function ($query) use ($currentYear, $currentMonth) {
                        $query->where('tah', '<', $currentYear)
                            ->orWhere(function ($q) use ($currentYear, $currentMonth) {
                                $q->where('tah', $currentYear)
                                    ->where('bulid', '<=', $currentMonth);
                            });
                    })
                    ->orderBy('tah', 'desc')
                    ->orderBy('bulid', 'asc');
            }])
            ->firstOrFail();


        // Ambil tagihan dengan jen == 0 (SPP) dan jen == 1 (diskon atau jenis lain)
        $tagihanJen0 = $identitas->tagihan->where('jen', 0)->values();
        $tagihanJen1 = $identitas->tagihan->where('jen', 1)->values();

        $data = $tagihanJen0->map(function ($item) {
            return [
                'tah'    => $item->tah,
                'ket'    => $item->ket,
                'jumlah' => $item->jumlah,
                'bulan'  => $item->bulan,
            ];
        });

        $spr = $tagihanJen0->pluck('id')->values()->all();

        // Hanya isi jen1 jika ada tagihan jen == 0
        $jen1 = $tagihanJen0->isNotEmpty()
            ? $tagihanJen1->pluck('id')->values()->all()
            : [];

        $total_disc = $tagihanJen0->isNotEmpty()
            ? abs($tagihanJen1->sum('jumlah'))
            : 0;

        $totalTagihan = $tagihanJen0->sum('jumlah');
        $sisaTagihan = max(0, $totalTagihan - $total_disc);

        return response()->json([
            'status' => true,
            'data' => $data,
            'summary' => [
                'total_tagihan' => $totalTagihan,
                'total_disc'    => $total_disc,
                'sisa_tagihan'  => $sisaTagihan,
                'spr'           => $spr,
                'jen1'          => $jen1,
            ],
        ]);
    }

    public function show(Request $request, $nouid)
    {
        $request->validate([
            'bul' => 'required|string',
            'tah' => 'required|string',
        ]);
        try {

            $bulan = DB::connection('mai2')->table('tbulan')
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
            $spr = $identitas->tagihan->where('jen', 0)->pluck('id')->toArray();
            $tahTagihan = $identitas->tagihan->pluck('tah')->first();
            $totalTagihan = $identitas->tagihan->sum('jumlah');
            $identitas['total_tagihan'] = $totalTagihan;
            $identitas['tah_tagihan'] = $tahTagihan;
            $identitas['bulan_tagihan'] = $bulan->bul;
            $identitas['spr_tagihan'] = $spr;

            return Inertia::render('Transaction/Tagihan', ['data' => $identitas]);
        } catch (\Throwable $th) {
            return back()->with([
                'success' => false,
                'data' => []
            ]);
        }
    }

    public function handlePay(Request $request, $nouid)
    {
        try {
            // Validasi input
            $validated = $request->validate([
                'spr' => 'required|array',
                'spr.*' => 'integer|exists:mai3.tsalpenrut,id',
                'jen1' => 'sometimes|array',
                'jen1.*' => 'integer|exists:mai3.tsalpenrut,id',
                'payment_method' => 'required|in:va,cash,wallet',
                'amount' => 'required|numeric|min:1|max:100000000',
                'orderId' => 'required|string|max:255'
            ]);

            // Persiapan data transaksi
            $paymentTypes = [
                'va' => 1,
                'cash' => 2,
                'wallet' => 3
            ];

            $pt_id = $paymentTypes[$validated['payment_method']] ?? 0;
            if ($pt_id === 0) {
                throw new \InvalidArgumentException("Metode pembayaran tidak valid");
            }

            // Generate VA number jika metode VA
            $vaNumber = $validated['payment_method'] === 'va' ? generateVaNumber() : null;

            // Verifikasi identitas dan tagihan
            $identity = Indentitas::with(['siswa', 'tagihan' => function ($query) use ($validated) {
                $query->whereIn('id', $validated['spr'])
                    ->whereIn('sta', [0, 1]);
            }])->where('nouid', $nouid)
                ->firstOrFail();

            // Cek saldo jika metode wallet
            $currentBalance = Ttrxlog::where('nouid', $nouid)
                ->orderByDesc('id')
                ->value('ab') ?? 0;

            if ($pt_id === 3 && $currentBalance < $validated['amount']) {
                throw new \RuntimeException("Saldo tidak mencukupi");
            }

            // Siapkan data transaksi
            $dataTrx = [
                'siswa' => $identity->siswa,
                'ttrx' => [
                    'for' => 'tagihan',
                    'nouid' => $nouid,
                    'order_id' => $validated['orderId'],
                    'amount' => $validated['amount'],
                    'pt_id' => $pt_id,
                    'phone' => $identity->siswa->tel,
                    'va_number' => $vaNumber,
                    'status' => $pt_id === 3 ? 'success' : 'pending', // Langsung success untuk wallet
                    'type' => 'payment',
                    'note' => $identity->tagihan->pluck('ket')->implode(', '),
                    'expiry_time' => now()->addHours(6),
                    'spr_id' => $validated['spr'],
                    'jen1' => $validated['jen1'] ?? [],
                    'created_by' => 1,
                ],
            ];

            // Tambahkan data log jika bukan VA
            if ($pt_id !== 1) {
                $dataTrx['log'] = [
                    'nouid' => $nouid,
                    'nis' => $identity->siswa->nis,
                    'bb' => $currentBalance,
                    'ab' => $currentBalance - $validated['amount'],
                    'amount' => $validated['amount'],
                    'action' => 'decrease',
                    'created_by' => 1,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

            // Proses berdasarkan metode pembayaran
            switch ($validated['payment_method']) {
                case 'wallet':
                    return $this->processWallet((object)$dataTrx);
                case 'va':
                    return $this->processVa((object)$dataTrx);
                    // case 'cash':
                    //     return $this->processCashPayment((object)$dataTrx);
                default:
                    throw new \InvalidArgumentException("Metode pembayaran tidak didukung");
            }
        } catch (ValidationException $e) {
            return back()->withErrors($e->validator)->withInput();
        } catch (\Exception $e) {
            logger()->error('Payment processing failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'nouid' => $nouid,
                'input' => $request->all()
            ]);

            return back()->with([
                'success' => false,
                'message' => 'Pembayaran gagal: ' . $e->getMessage()
            ])->withInput();
        }
    }

    private function processWallet($dataTrx)
    {
        try {
            // Validasi data transaksi
            if (!isset($dataTrx->ttrx, $dataTrx->log)) {
                throw new \InvalidArgumentException("Data transaksi tidak valid");
            }

            // Validasi data menggunakan DataValidator
            $validatedTtrx = DataValidator::ttrx((array)$dataTrx->ttrx);

            $result = DB::transaction(function () use ($validatedTtrx, $dataTrx) {
                // Buat transaksi
                $trx = TransactionController::createTrx($validatedTtrx);
                if (!$trx) {
                    throw new \RuntimeException("Gagal membuat transaksi");
                }

                $trx = is_array($trx) ? (object)$trx : $trx;

                // Buat log transaksi
                $logData = array_merge($dataTrx->log, [
                    'trx_id' => $trx->id,
                    'description' => $trx->note ?? 'Pembayaran wallet'
                ]);

                $log = TransactionController::createTrxLog($logData);
                if (!$log) {
                    throw new \RuntimeException("Gagal membuat log transaksi");
                }

                // Update status tagihan
                if (!empty($validatedTtrx['spr_id'])) {
                    $updatedRows = Tsalpenrut::whereIn('id', $validatedTtrx['spr_id'])
                        ->update(['sta' => 2]);

                    if ($updatedRows === 0) {
                        throw new \RuntimeException("Gagal memperbarui status SPR");
                    }
                }

                return [
                    'transaction' => $trx,
                    'log' => $log
                ];
            });

            return redirect()->back()->with([
                'success' => true,
                'message' => 'Pembayaran wallet berhasil',
                'transaction' => $result['transaction']
            ]);
        } catch (\Exception $e) {
            logger()->error('#TagihanController::processWallet => Gagal memproses pembayaran wallet', [
                'error' => $e->getMessage(),
                'data' => $dataTrx,
                'trace' => $e->getTraceAsString()
            ]);

            throw $e;
        }
    }
    private function processVa($dataTrx)
    {
        try {
            if (!isset($dataTrx->ttrx)) {
                throw new \InvalidArgumentException("Invalid transaction data");
            }

            $validatedTtrx = DataValidator::ttrx((array) $dataTrx->ttrx);

            return DB::connection('mai4')->transaction(function () use ($validatedTtrx, $dataTrx) {
                $trx = TransactionController::createTrx($validatedTtrx);
                if (!$trx) {
                    throw new \RuntimeException("Failed to create transaction");
                }
                $trx = is_array($trx) ? (object) $trx : $trx;
                return redirect()->intended(route('payment.instruction', [
                    'nouid' => is_array($dataTrx->ttrx) ? $dataTrx->ttrx['nouid'] : $dataTrx->ttrx->nouid,
                    'orderId' => is_array($dataTrx->ttrx) ? $dataTrx->ttrx['order_id'] ?? null : $dataTrx->ttrx->order_id ?? null,
                ]));
            });
        } catch (\Exception $e) {
            logger()->error('VA payment processing failed', [
                'error' => $e->getMessage(),
                'data' => $dataTrx,
                'trace' => $e->getTraceAsString(),
            ]);

            throw $e;
        }
    }

    public function newTagihan(Request $req, $nouid)
    {
        try {
            if (!isset($nouid)) {
                throw new \InvalidArgumentException("Invalid transaction data");
            }
            $data = [
                'idset' => 'required|integer',
                'idsis' => 'required|integer',
                'bulid' => 'required|integer|min:0|max:255',
                'tah' => 'required|integer|digits:4',
                'nmr' => 'required|integer|min:0|max:255',
                'jen' => 'required|integer|min:0|max:255',
                'ket' => 'nullable|string|max:80',
                'jum' => 'required|numeric|min:0',
                'coapen' => 'required|integer',
                'coapiu' => 'nullable|integer',
                'coapendim' => 'nullable|integer',
                'coabelter' => 'nullable|integer',
                'sta' => 'required|integer|min:0|max:255',
                'islock' => 'required|integer|min:0|max:1',
                'idspr1' => 'required|integer',
                'idgru' => 'required|integer',
                'idpr' => 'required|integer',
                'createdby' => 'required|integer',
                'updatedby' => 'required|integer',
            ];
            $v = DataValidator::tsalpenrut((array) $data);

            return DB::connection('mai3')->transaction(function () use ($v, $data) {
                $trx = TransactionController::createBill($v);
                if (!$trx) {
                    throw new \RuntimeException("Gagal Membuat Tagihan");
                }
                $trx = is_array($trx) ? (object) $trx : $trx;
                return back()->with([
                    'success' => true,
                    'message' => 'Berhasil membuat tagihan'
                ]);
            });
        } catch (\Exception $e) {
            logger()->error('Gagal proses tagihan baru', [
                'error' => $e->getMessage(),
                'data' => $data,
                'trace' => $e->getTraceAsString(),
            ]);

            throw $e;
        }
    }
}
