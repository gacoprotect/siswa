<?php

use App\Models\Datmas\Indentitas;
use Illuminate\Support\Facades\DB;

use App\Models\Tsalpenrut;
use App\Models\Siswa;
use App\Models\Saving\Tpt;
use App\Models\Saving\Ttrx;
use App\Models\Saving\Ttrxlog;
use Illuminate\Validation\ValidationException;

function getSiswa($nouid)
{
    $indentitas = Indentitas::where('nouid', $nouid)->firstOrFail();
    $siswa = $indentitas->siswa()->first();
    return $siswa;
}

function getBulan()
{
    return DB::table('tbulan')->get();
}
function getBulanById($id)
{
    return DB::connection('mai2')->table('tbulan')->where('id', $id)->first();
}

function getTagihan(string $nouid)
{
    $identitas = Indentitas::select('idok')->where('nouid', $nouid)->with('tagihan')->first();
    $data = $identitas->tagihan;
    return $data;
}
function generateVaNumber()
{
    do {
        $prefix = 685210;
        $va = $prefix . str_pad(random_int(0, 999999999), 9, '0', STR_PAD_LEFT);
    } while (Ttrx::where('va_number', $va)->exists());

    return $va;
}

function trxlog(array $data): void
{
    Ttrxlog::create([
        'nouid'      => $data['nouid'],
        'trx_id'     => $data['trx_id'], // ID dari tabel transaksi utama
        'amount'     => $data['amount'],
        'action'     => $data['action'], // 'increase' atau 'decrease'
        'description' => $data['description'] ?? null,
    ]);
}

function getidTagihan($id, $orderId)
{
    // Format orderId: pay-PR20210804000589
    // Dimana:
    // - 2021 = tahun (tah)
    // - 08 = bulan (bulid)
    // - 04000589 = nis/nouid
    $cleanOrderId = str_replace('pay-PR', '', $orderId);

    $tah = substr($cleanOrderId, 0, 4);
    $bulid = substr($cleanOrderId, 4, 2);
    $nis = substr($cleanOrderId, 6);

    switch ($id) {
        case 'tah':
            return $tah;
        case 'bulid':
            return $bulid;
        case 'nis':
            return $nis;
        default:
            // Jika parameter tidak dikenali, return semua data sebagai array
            return [
                'tah' => $tah,
                'bulid' => $bulid,
                'nis' => $nis
            ];
    }
}
function getBulid($bul)
{
    $bulan = DB::connection('mai2')->table('tbulan')
        ->where('bul', $bul)
        ->first();
    return $bulan->bulid;
}
function getPtId($payment_type)
{
    // pt.code = va , cash, wallet
    $pt = Tpt::where('code', $payment_type)->first()->id;
    return $pt;
}

/**
 * Format Indonesian phone number to standard +62 format
 * 
 * Handles various input formats:
 * - 08123456789 → 628123456789
 * - +628123456789 → 628123456789
 * - 628123456789 → 628123456789
 * - 8123456789 → 628123456789
 * 
 * @param string $number Raw phone number input
 * @return string Formatted number in 628123456789 format
 * @throws ValidationException If number is invalid
 */

function formatPhoneNumber($number)
{
    if (empty($number)) {
        throw ValidationException::withMessages(['tel' => 'Nomor telepon tidak boleh kosong']);
    }
    // Remove all non-digit characters
    $number = preg_replace('/[^0-9]/', '', $number);

    // Remove leading 0 if present
    if (str_starts_with($number, '0')) {
        $number = substr($number, 1);
    }

    // Handle +62 or 62 prefix
    if (str_starts_with($number, '62')) {
        $number = substr($number, 2);
    }

    // Validate the remaining digits
    $number = '62' . $number;

    // Final validation
    if (!preg_match('/^628[1-9][0-9]{7,10}$/', $number)) {
        logger("formatPhoneNumber : ", ["number" => $number]);
        throw ValidationException::withMessages(['tel' => 'Nomor telepon tidak valid']);
    }

    return $number;
}

function idta()
{
    try {
       return DB::connection('mai1')->table('ttahunajaran')->where('staakt', 1)->firstOrFail();
    } catch (\Throwable $th) {
        throw $th;
    }
}
