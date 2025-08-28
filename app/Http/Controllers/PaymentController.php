<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display payment index page
     */
    public function index(Request $request, $nouid)
    {
        $dummyData = $this->getDummySiswaData($nouid);

        return Inertia::render('Payment/Index', [
            'auth' => $dummyData['auth'],
            'data' => $dummyData['data'],
        ]);
    }

    /**
     * Display invoice page
     */
    public function invoice(Request $request, $nouid)
    {
        $dummyData = $this->getDummySiswaData($nouid);

        return Inertia::render('Payment/Invoice', [
            'auth' => $dummyData['auth'],
            'data' => $dummyData['data'],
            'invoiceId' => 'INV-2024-001',
        ]);
    }

    /**
     * Display specific invoice detail
     */
    public function invoiceDetail(Request $request, $nouid, $invoiceId)
    {
        $dummyData = $this->getDummySiswaData($nouid);

        return Inertia::render('Payment/Invoice', [
            'auth' => $dummyData['auth'],
            'data' => $dummyData['data'],
            'invoiceId' => $invoiceId,
        ]);
    }

    /**
     * Display payment history page
     */
    public function history(Request $request, $nouid)
    {
        $dummyData = $this->getDummySiswaData($nouid);

        return Inertia::render('Payment/History', [
            'auth' => $dummyData['auth'],
            'data' => $dummyData['data'],
        ]);
    }

    /**
     * Display payment methods page
     */
    public function methods(Request $request, $nouid)
    {
        $dummyData = $this->getDummySiswaData($nouid);

        return Inertia::render('Payment/Methods', [
            'auth' => $dummyData['auth'],
            'data' => $dummyData['data'],
        ]);
    }

    /**
     * Display payment success page
     */
    public function success(Request $request, $nouid)
    {
        $dummyData = $this->getDummySiswaData($nouid);

        return Inertia::render('Payment/Success', [
            'auth' => $dummyData['auth'],
            'data' => $dummyData['data'],
        ]);
    }

    /**
     * Display VA payment page
     */
    public function vaPayment(Request $request, $nouid)
    {
        $dummyData = $this->getDummySiswaData($nouid);

        return Inertia::render('Payment/VAPayment', [
            'auth' => $dummyData['auth'],
            'data' => $dummyData['data'],
        ]);
    }

    /**
     * Download invoice PDF
     */
    public function downloadInvoice(Request $request, $nouid, $invoiceId): JsonResponse
    {
        // Simulate PDF generation
        return response()->json([
            'success' => true,
            'message' => 'Invoice downloaded successfully',
            'data' => [
                'invoiceId' => $invoiceId,
                'downloadUrl' => '/storage/invoices/'.$invoiceId.'.pdf',
            ],
        ]);
    }

    /**
     * Print invoice
     */
    public function printInvoice(Request $request, $nouid, $invoiceId): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Print dialog opened',
            'data' => [
                'invoiceId' => $invoiceId,
            ],
        ]);
    }

    /**
     * View invoice
     */
    public function viewInvoice(Request $request, $nouid, $invoiceId): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Invoice opened in new tab',
            'data' => [
                'invoiceId' => $invoiceId,
                'viewUrl' => '/invoice/'.$invoiceId.'/view',
            ],
        ]);
    }

    /**
     * Process payment
     */
    public function processPayment(Request $request, $nouid): JsonResponse
    {
        $method = $request->input('payment_method');
        $amount = $request->input('amount');

        // Simulate payment processing
        $success = rand(0, 1) === 1; // 50% success rate for testing

        if ($success) {
            return response()->json([
                'success' => true,
                'message' => 'Payment processed successfully',
                'data' => [
                    'transactionId' => 'TRX-'.time(),
                    'status' => 'success',
                    'redirectUrl' => '/payment/success',
                ],
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Payment failed. Please try again.',
                'errors' => [
                    'payment' => 'Insufficient balance or network error',
                ],
            ], 422);
        }
    }

    /**
     * Get dummy data for testing
     */
    private function getDummySiswaData($nouid): array
    {
        return [
            'auth' => [
                'user' => [
                    'id' => 1,
                    'nouid' => $nouid,
                    'namlen' => 'Ahmad Fadillah',
                    'email' => 'ahmad@example.com',
                    'phone' => '081234567890',
                ],
            ],
            'data' => [
                'idok' => 1,
                'active' => true,
                'nouid' => $nouid,
                'balance' => 2500000, // 2.5 juta saldo
                'siswa' => [
                    'id' => 1,
                    'nouid' => $nouid,
                    'namlen' => 'Ahmad Fadillah',
                    'email' => 'ahmad@example.com',
                    'phone' => '081234567890',
                    'kelas' => 'XI IPA 1',
                    'alamat' => 'Jl. Sudirman No. 123, Jakarta',
                ],
                'tagihan' => [
                    [
                        'id' => 1,
                        'tah' => '2024',
                        'jen' => 0,
                        'ket' => 'SPP Januari 2024',
                        'jumlah' => 500000,
                        'bulan' => 'Januari',
                        'sta' => 0, // 0 = belum dibayar
                    ],
                    [
                        'id' => 2,
                        'tah' => '2024',
                        'jen' => 0,
                        'ket' => 'SPP Februari 2024',
                        'jumlah' => 500000,
                        'bulan' => 'Februari',
                        'sta' => 0,
                    ],
                    [
                        'id' => 3,
                        'tah' => '2024',
                        'jen' => 1,
                        'ket' => 'Uang Makan Maret 2024',
                        'jumlah' => 750000,
                        'bulan' => 'Maret',
                        'sta' => 0,
                    ],
                    [
                        'id' => 4,
                        'tah' => '2024',
                        'jen' => 2,
                        'ket' => 'Uang Kegiatan April 2024',
                        'jumlah' => 300000,
                        'bulan' => 'April',
                        'sta' => 0,
                    ],
                ],
                'summary' => [
                    'total_tagihan' => 2050000,
                    'total_dibayar' => 0,
                    'total_belum_dibayar' => 2050000,
                    'exist_trx' => [
                        'exist' => false,
                        'uri' => null,
                    ],
                    'future_bills' => true,
                ],
            ],
        ];
    }
}
