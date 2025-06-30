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
                $query
                    // ->where(function ($query) {
                    //     $query->where('sta', 0)
                    //         ->orWhere('sta', 1);
                    // })
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

    public function pay(Request $request, $nouid)
    {
        DB::beginTransaction();

        try {
            // Validate input
            $validated = $request->validate([
                'spr' => 'required|array',
                'spr.*' => 'integer|exists:mai3.tsalpenrut,id',
                'tah' => 'required|string',
                'month' => 'required|string',
                'payment_method' => 'required|exists:mai3.tpt,code',
                'amount' => 'required|numeric|min:1'
            ]);

            // Get month data
            $bulan = DB::connection('mai2')->table('tbulan')
                ->where('bul', $validated['month'])
                ->firstOrFail();

            // Get student data with relations
            $identitas = Indentitas::with(['siswa', 'tagihan' => function ($q) use ($bulan, $validated) {
                $q->where('bulid', $bulan->bulid)
                    ->where('tah', $validated['tah']);
            }])
                ->where('nouid', $nouid)
                ->firstOrFail();

            // Generate order ID
            $orderId = 'pay-PR' . $validated['tah'] .
                str_pad($bulan->bulid, 2, '0', STR_PAD_LEFT) .
                $identitas->siswa->nis;
            // Prepare transaction data
            $dataTrx = [
                'phone' => $identitas->siswa->tel,
                'nouid' => $nouid,
                'order_id' => $orderId,
                'pt_id' => getPtId($validated['payment_method']),
                'amount' => $validated['amount'],
                'status' => 'pending',
                'type' => 'payment',
                'va_number' => $validated['payment_method'] === 'va' ? generateVaNumber() : null,
                'note' => $identitas->tagihan->where('jen', 0)->pluck('ket')->implode(', '),
                'expiry_time' => now()->addHours(6),
            ];

            // Create transaction
            $transaction = Ttrx::create($dataTrx);

            if ($validated['payment_method'] === 'va') {
                DB::commit();
                return redirect()->route('payment.instruction', [
                    'tah' => $request->tah,
                    'month' => $request->month,
                    'spr' => $request->spr,
                    'type' => 'payment',
                    'nouid' => $nouid,
                    'orderId' => $orderId
                ]);
            }
            // Get SPR details for reference
            $sprDetails = Tsalpenrut::whereIn('id', $validated['spr'])
                ->get(['id', 'ket', 'jum']); // Get needed fields

            // Update SPR status
            $updatedSprs = Tsalpenrut::whereIn('id', $validated['spr'])
                ->update(['sta' => 2]);

            if ($updatedSprs !== count($validated['spr'])) {
                throw new \Exception("Failed to update all SPR records");
            }

            $currentDate = now()->format('Y-m-d');
            $tprId = DB::connection('mai3')
                ->table('ttpenrut')
                ->insertGetId([
                    'nopr' => 'PR' . date('Y') . str_pad($transaction->id, 4, '0', STR_PAD_LEFT),
                    'tgl' => $currentDate,
                    'idsis' => $identitas->siswa->id,
                    'via' => 1,
                    'idkas' => 2,
                    'nova' => null,
                    'ket' => 'Pembayaran via ' . $validated['payment_method'],
                    'jum' => $validated['amount'],
                    'cat' => null,
                    'cet' => 0,
                    'dar' => 0,
                    'sta' => 0,
                    'stapos' => 0,
                    'rev' => 0,
                    'createdby' => 1,
                    'updatedby' => 0,
                ]);

            foreach ($sprDetails as $index => $spr) {
                DB::connection('mai3')
                    ->table('ttpenrut1')
                    ->insert([
                        'idpr' => $tprId,
                        'nmr' => $index + 1, // Sequential number
                        'idspr' => $spr->id, // Dynamic SPR ID
                        'ket' => $spr->ket ?? 'Pembayaran SPR ' . $spr->id,
                        'jum' => $spr->jum ?? $validated['amount'],
                        'idcoa' => 0,
                        'nolai' => null,
                        'salpr' => 0,
                        'sta' => null,
                        'stapos' => 0,
                        'createdby' =>  1,
                        'updatedby' => 0,
                    ]);
            }

            // Handle payment method
            if ($validated['payment_method'] === 'saldo') {
                // Validate sufficient balance
                if ($identitas->siswa->saldo < $validated['amount']) {
                    throw new \Exception("Insufficient balance");
                }
                $transaction->update(['status' => 'success']);

                DB::commit();

                return back()->withMessage(['success' => true, 'message' => 'Payment successful using balance']);
            }

            return redirect()->intended(route('siswa.index', $nouid))->withMessage([
                'success' => false,
                'message' => 'Payment Failed'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            logger()->error('Payment failed: ' . $e->getMessage(), [
                'exception' => $e,
                'request' => $request->all(),
                'nouid' => $nouid
            ]);

            return back()
                ->withInput()
                ->withErrors([
                    'message' => 'Payment processing failed: ' . $e->getMessage(),
                    'exception' => config('app.debug') ? $e->getMessage() : null,
                ]);
        }
    }
    public function handlePay(Request $request, $nouid)
    {
        try {
            $validated = $request->validate([
                'spr' => 'required|integer|exists:mai3.tsalpenrut,id',
                'jen1' => 'sometimes|array',
                'jen1.*' => 'integer|exists:mai3.tsalpenrut,id',
                'payment_method' => 'required|in:va,cash,wallet',
                'amount' => 'required|numeric|min:1|max:100000000',
                'orderId' => 'required|string|max:255'
            ]);
            $dataTrx = [];
            $paymentTypes = [
                'va' => 1,
                'cash' => 2,
                'wallet' => 3
            ];

            $pt_id = $paymentTypes[$validated['payment_method']] ?? 0;
            if ($pt_id === 0) {
                throw new \InvalidArgumentException("Invalid payment method");
            }

            $vaNumber = $validated['payment_method'] === 'va' ? generateVaNumber() : null;

            $identity = Indentitas::with(['siswa', 'tagihan' => function ($query) use ($validated) {
                $query->where('id', $validated['spr'])
                    ->whereIn('sta', [0, 1]);
            }])->where('nouid', $nouid)
                ->firstOrFail();

            $currentBalance = Ttrxlog::where('nouid', $nouid)
                ->orderByDesc('id')
                ->value('ab') ?? 0;
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
                    'status' => 'pending',
                    'type' => 'payment',
                    'note' => $identity->tagihan->pluck('ket')->implode(', '),
                    'expiry_time' => now()->addHours(6),
                    'spr_id' => $validated['spr'],
                    'jen1' => $validated['jen1'] ?? [],
                    'created_by' => 1,
                ],
            ];

            switch ($validated['payment_method']) {
                case 'wallet':
                    return $this->processWalletPayment((object)$dataTrx);
                case 'va':
                    return $this->processVa((object)$dataTrx);
                    // case 'cash':
                    //     return $this->processCashPayment((object)$dataTrx);
                default:
                    throw new \InvalidArgumentException("Unsupported payment method");
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

            return back()->withErrors(["message" => $e->getMessage()])->with([
                'success' => false,
                'message' => 'Payment failed: ' . $e->getMessage()
            ])->withInput();
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
    private function processWalletPayment($dataTrx)
    {
        try {
            if (!isset($dataTrx->ttrx, $dataTrx->log)) {
                throw new \InvalidArgumentException("Invalid transaction data");
            }

            $validatedTtrx = DataValidator::ttrx((array)$dataTrx->ttrx);

            $result = DB::transaction(function () use ($validatedTtrx, $dataTrx) {
                $trx = TransactionController::createTrx([
                    ...$validatedTtrx,
                    'status' => 'success'
                ]);
                if (!$trx) {
                    throw new \RuntimeException("Failed to create transaction");
                }

                $trx = is_array($trx) ? (object)$trx : $trx;

                $logData = array_merge($dataTrx->log, [
                    'trx_id' => $trx->id,
                    'description' => $trx->note ?? 'Wallet payment'
                ]);

                $log = TransactionController::createTrxLog($logData);
                if (!$log) {
                    throw new \RuntimeException("Failed to create transaction");
                }
                if (!empty($validatedTtrx['spr_id'])) {
                    $updatedRows = Tsalpenrut::where('id', $validatedTtrx['spr_id'])
                        ->update(['sta' => 2]);

                    if ($updatedRows === 0) {
                        throw new \RuntimeException("Failed to update SPR status");
                    }
                }

                return [
                    'transaction' => $trx,
                    'log' => $log
                ];
            });

            return redirect()->back()->with([
                'success' => true,
                'message' => 'Wallet payment successful',
                'transaction' => $result['transaction']
            ]);
        } catch (\Exception $e) {
            logger()->error('Wallet payment processing failed', [
                'error' => $e->getMessage(),
                'data' => $dataTrx,
                'trace' => $e->getTraceAsString()
            ]);

            throw $e;
        }
    }
    private function ttpenrut($data, $trx)
    {
        //db connection mai3
        $v = DataValidator::ttpenrut([
            'nopr' => 'PR' . date('Y') . str_pad($trx->id, 4, '0', STR_PAD_LEFT),
            'tgl' => now()->format('Y-m-d'),
            'idsis' => $data->siswa->id,
            'via' => 'required|integer|min:0|max:255', //1
            'idkas' => 'required|integer', // 2
            'nova' => 'nullable|string|max:30', // null
            'ket' => 'Pembayaran ' . $data->ttrx->note,
            'jum' => $data->ttrx->amount,
            'cat' => 'nullable|string|max:100', //null
            'cet' => 'required|integer|min:0|max:1', // 0
            'dar' => 'required|integer|min:0|max:255', // 0 
            'sta' => 'required|integer|min:0|max:255', // 0
            'stapos' => 'required|integer|min:0|max:255', // 0
            'rev' => 'required|integer|min:0|max:255', // 0
            'createdby' => 'required|integer', // 1
            'updatedby' => 'required|integer', // 0
        ]);
        $v1 = DataValidator::ttpenrut1([
            'idpr' => 'required|integer', // id ttpenrut
            'nmr' => 'required|integer|min:1|max:255',
            'idspr' => $data->ttrx->spr_id,
            'ket' => 'nullable|string|max:100',
            'jum' => $data->ttrx->amount,
            'idcoa' => 'required|integer', // 0
            'nolai' => 'nullable|string|max:20', // null
            'salpr' => 'required|integer|min:0|max:1', // 0
            'sta' => 'nullable|integer|min:0|max:255', // null
            'stapos' => 'required|integer|min:0|max:255', //0
            'createdby' => 'required|integer', // 1
            'updatedby' => 'required|integer', // 0
        ]);

        DB::transaction(function () use ($data) {});
    }
    private function va($data, $nouid)
    {
        /**
         * 'nouid' => 'required|string|max:50',
            'order_id' => 'required|string|max:255|unique:ttrx,order_id',
            'amount' => 'required|numeric|min:0',
            'bank_id' => 'nullable|integer|exists:tbank,id',
            'pt_id' => 'nullable|integer|exists:tpt,id',
            'phone' => 'required|string|max:255',
            'va_number' => 'nullable|string|max:255',
            'status' => 'required|in:pending,success,failed',
            'type' => 'required|in:topup,payment,withdraw,refund',
            'note' => 'nullable|string',
            'pay_data' => 'nullable|json',
            'failure_message' => 'nullable|string',
            'expiry_time' => 'nullable|date',
            'paid_at' => 'nullable|date',
            // Validasi field baru
            'spr_id' => 'nullable|json|exists:mai3.tsalpenrut,id',
            'jen1' => 'nullable|json',
            'created_by' => 'required|string|max:255',
         */
        $v = DataValidator::ttrx([$data]);
        DB::transaction(function () use ($data, $nouid) {});
    }
}
