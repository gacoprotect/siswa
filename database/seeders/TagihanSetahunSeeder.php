<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TagihanSetahunSeeder extends Seeder
{
    public function run(): void
    {
        $idsis = 3363; // ID siswa
        $idset = 1;  // ID setting tagihan
        $idgru = 1;  // ID group
        $created = Carbon::now();

        for ($tahun = 2025; $tahun < 2027; $tahun++) {
            $tahunAjaran = "{$tahun}/" . ($tahun + 1);

            // Semester 1: Juli - Desember di tahun pertama
            for ($bulan = 7; $bulan <= 12; $bulan++) {
                DB::connection('mai3')->table('tsalpenrut')->insert([
                    'idset'       => $idset,
                    'idsis'       => $idsis,
                    'bulid'       => $bulan,
                    'tah'         => $tahun,
                    'nmr'         => 0,
                    'jen'         => 0,
                    'ket'         => "SPP SMA TA $tahunAjaran - Semester 1",
                    'jum'         => 100000,
                    'coapen'      => 45,
                    'coapiu'      => 9,
                    'coapendim'   => 34,
                    'coabelter'   => 35,
                    'sta'         => 0,
                    'islock'      => 0,
                    'idspr1'      => 0,
                    'idgru'       => $idgru,
                    'idpr'        => 0,
                    'createdby'   => 0,
                    'updatedby'   => 0,
                    'createdat'   => $created,
                    'updatedat'   => $created,
                ]);
            }

            // Semester 2: Januari - Juni di tahun berikutnya
            for ($bulan = 1; $bulan <= 6; $bulan++) {
                DB::connection('mai3')->table('tsalpenrut')->insert([
                    'idset'       => $idset,
                    'idsis'       => $idsis,
                    'bulid'       => $bulan,
                    'tah'         => $tahun + 1,
                    'nmr'         => 0,
                    'jen'         => 0,
                    'ket'         => "SPP SMA TA $tahunAjaran - Semester 2",
                    'jum'         => 100000,
                    'coapen'      => 45,
                    'coapiu'      => 9,
                    'coapendim'   => 34,
                    'coabelter'   => 35,
                    'sta'         => 0,
                    'islock'      => 0,
                    'idspr1'      => 0,
                    'idgru'       => $idgru,
                    'idpr'        => 0,
                    'createdby'   => 0,
                    'updatedby'   => 0,
                    'createdat'   => $created,
                    'updatedat'   => $created,
                ]);
            }
        }
    }
}
