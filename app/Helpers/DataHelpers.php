<?php

use App\Models\Datmas\Indentitas;
use Illuminate\Support\Facades\DB;

use App\Models\Tsalpenrut;
use App\Models\Siswa;
use App\Models\Trx\Ttrx;

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
    return DB::table('tbulan')->where('id', $id)->first();
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
