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
        $spr = $identitas->tagihan->where('jen', 0)->pluck('id')->toArray();
        $tahTagihan = $identitas->tagihan->pluck('tah')->first();
        $totalTagihan = $identitas->tagihan->sum('jumlah');
        $identitas['total_tagihan'] = $totalTagihan;
        $identitas['tah_tagihan'] = $tahTagihan;
        $identitas['bulan_tagihan'] = $bulan->bul;
        $identitas['spr_tagihan'] = $spr;
        return Inertia::render('Transaction/Tagihan', ['data' => $identitas]);
    }

    public function pay(Request $request, $nouid)
    {
        DB::beginTransaction();

        try {
            // Validate input
            $validated = $request->validate([
                'spr' => 'required|array',
                'spr.*' => 'integer|exists:mysql2.tsalpenrut,id',
                'tah' => 'required|string',
                'month' => 'required|string',
                'payment_method' => 'required|in:saldo,virtual_account',
                'amount' => 'required|numeric|min:1'
            ]);

            // Get month data
            $bulan = DB::connection('mysql')->table('tbulan')
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
            $transactionData = [
                'phone' => $identitas->siswa->tel,
                'nouid' => $nouid,
                'order_id' => $orderId,
                'amount' => $validated['amount'],
                'status' => 'pending',
                'type' => 'payment',
                'payment_type' => $validated['payment_method'],
                'va_number' => $validated['payment_method'] === 'virtual_account' ? generateVaNumber() : null,
                'note' => $identitas->tagihan->where('jen', 0)->pluck('ket')->implode(', '),
                'expiry_time' => now()->addHours(6),
            ];

            // Create transaction
            $transaction = Transaction::create($transactionData);

            if ($validated['payment_method'] === 'virtual_account') {
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

            // Prepare payment data for mysql2
            $currentDate = now()->format('Y-m-d');
            $tprId = DB::connection('mysql2')
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

            // Insert payment details for each SPR
            foreach ($sprDetails as $index => $spr) {
                DB::connection('mysql2')
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
}
