<?php

namespace App\Http\Controllers;

use App\Models\Admin\Tdaftarexcul;
use App\Models\Admin\Tkelas;
use App\Models\Admin\Tkelsis;
use App\Models\Admin\Tkelsis1;
use App\Models\Admin\Tstopexcul;
use App\Models\Datmas\Excul;
use App\Models\Datmas\Indentitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExculController extends Controller
{
    public function subs(Request $req, $nouid)
    {
        $v = $req->validate([
            'excul' => 'required|integer|exists:mai1.tkelas,id',
            'tgl' => 'required|date',
            'ket' => 'required|string',
        ]);
        logger("Request Subs Excul ", ['req' => $req->all()]);

        try {
            $ident = Indentitas::with('kelsis')->where('nouid', $nouid)->firstOrFail();

            // Cek apakah sudah terdaftar (baik aktif/waiting)
            $existingRegistration = Tkelsis1::where('ids', $ident->idok)
                ->where('idkel', $v['excul'])
                ->first();

            // Jika sudah terdaftar dengan status 0 atau 1
            if ($existingRegistration && in_array($existingRegistration->sta, [0, 1])) {
                return back(409)->with([
                    'success' => false,
                    'message' => 'Anda sudah terdaftar pada ekstrakurikuler ini.',
                ]);
            }

            // Jika registrasi ditolak sebelumnya (sta < 0)
            if ($existingRegistration && $existingRegistration->sta < 0) {
                DB::transaction(function () use ($existingRegistration, $ident, $v) {
                    $existingRegistration->update(['sta' => 0]);
                    Tdaftarexcul::create([
                        'tin' => $ident->kelsis->tin,
                        'idta' => $ident->kelsis->idta,
                        'idsis' => $ident->kelsis->ids,
                        'tgl' => $v['tgl'] ?? now(),
                        'idkel' => $v['excul'],
                        'ket' => $v['ket'],
                    ]);
                });

                return back()->with([
                    "success" => true,
                    "message" => "Pendaftaran ekstrakurikuler berhasil diaktifkan kembali"
                ]);
            }

            // Jika belum terdaftar sama sekali
            DB::transaction(function () use ($ident, $v) {
                Tkelsis1::create([
                    'tin' => $ident->kelsis->tin,
                    'idta' => $ident->kelsis->idta,
                    'ids' => $ident->kelsis->ids,
                    'idkel' => $v['excul'],
                    'idmen' => $ident->idmen,
                    'idtra' => random_int(1, 999),
                ]);

                Tdaftarexcul::create([
                    'tin' => $ident->kelsis->tin,
                    'idta' => $ident->kelsis->idta,
                    'idsis' => $ident->kelsis->ids,
                    'tgl' => $v['tgl'] ?? now(),
                    'idkel' => $v['excul'],
                    'ket' => $v['ket'],
                ]);
            });

            return back()->with([
                "success" => true,
                "message" => "Berhasil mendaftar ekstrakurikuler"
            ]);
        } catch (\Exception $e) {
            logger()->error("Error Menambahkan Excul", [
                'nouid' => $nouid,
                'excul' => $v['excul'] ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->with([
                'success' => false,
                'message' => "Terjadi kesalahan saat memproses pendaftaran"
            ]);
        }
    }

    public function unsubs(Request $req, $nouid)
    {
        $v = $req->validate([
            'excul' => 'required|integer|exists:mai1.tkelas,id',
            'tgl' => 'required|date',
            'ket' => 'required|string',
        ]);

        try {
            $ident = Indentitas::with('kelsis')->where('nouid', $nouid)->firstOrFail();
            $tkelsis = Tkelsis1::where('ids', $ident->idok)->where('idkel', $v['excul'])->firstOrFail();
            $daftarexcul = Tdaftarexcul::where('idsis', $ident->idok);
            // Jika ekskul belum terdaftar, kembalikan 409
            if (!$tkelsis) {
                return back(409)->with([
                    'success' => false,
                    'message' => 'Anda belum terdaftar.',
                ]);
            }

            DB::transaction(function () use ($tkelsis, $ident, $v, $daftarexcul) {
                $tkelsis->update(['sta' => -2]);
                $daftarexcul->update(['sta' => -2]);
                Tstopexcul::create([
                    'tin' => $ident->kelsis->tin,
                    'idta' => $ident->kelsis->idta,
                    'idsis' => $ident->kelsis->ids,
                    'tgl' => $v['tgl'] ?? now(),
                    'idkel' => $v['excul'],
                    'ala' => $v['ket'],
                    'idks1' => $tkelsis->id,
                    'tglex' => $v['tgl'] ?? now(),
                ]);
            });
            return back()->with([
                'success' => true,
                'message' => 'Berhasil membatalkan pendaftaran ekskul.',
            ]);
        } catch (\Exception $e) {
            logger("Error Membatalkan Excul", ['error' => $e->getMessage()]);
            return back()->with([
                'success' => false,
                'message' => 'Terjadi kesalahan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public static function Excul(int $ids)
    {
        try {
            $subscriptions = Tkelsis1::where('ids', $ids)->get();

            $sub = $subscriptions->whereIn('sta', 1)->pluck('idkel')->toArray();
            $waiting = $subscriptions->where('sta', 0)->pluck('idkel')->toArray();
            $rejected = $subscriptions->where('sta', -1)->pluck('idkel')->toArray();
            $exited = $subscriptions->where('sta', -2)->pluck('idkel')->toArray();
            $excul = Tkelas::with('jenis')
                ->whereHas('jenis', function ($q) {
                    $q->where('tip', 1)->where('sta', 0);
                })
                ->where('idta', idta()->id)
                ->select('id', 'nam as name', 'qty as quota')
                ->get()
                ->map(function ($item) {
                    $item->registered = 0;
                    return $item;
                });

            $registeredCounts = Tkelsis1::whereIn('idkel', $excul->pluck('id'))->whereIn('sta', [0, 1])
                ->select('idkel', DB::raw('count(*) as count'))
                ->groupBy('idkel')
                ->pluck('count', 'idkel');

            $excul = $excul->map(function ($item) use ($registeredCounts) {
                $item->registered = $registeredCounts[$item->id] ?? 0;
                return $item;
            });

            $data = [
                'excul' => $excul,
                'sub' => $sub,
                'waiting' => $waiting,
                'rejected' => $rejected,
                'exited' => $exited,
            ];

            return $data;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function simulasi(Request $req, $simulasi)
    {
        $v = $req->validate([
            'nouid' => 'required|exists:mai2.tindentitas,nouid',
            'excul' => 'required|integer|exists:mai1.tkelas,id',
        ]);

        $ident = Indentitas::with([
            'kelsis1' => function ($q) use ($v) {
                $q->where('idkel', $v['excul']);
            },
            'daftarexcul' => function ($q) use ($v) {
                $q->where('idkel', $v['excul']);
            },
            'stopexcul' => function ($q) use ($v) {
                $q->where('idkel', $v['excul']);
            }
        ])->where('nouid', $v['nouid'])->firstOrFail();

        return DB::transaction(function () use ($simulasi, $ident, $v) {
            $exculId = $v['excul'];

            switch ($simulasi) {
                case 'acc':
                    // Only update the specific extracurricular
                    $ident->kelsis1()->where('idkel', $exculId)->update(['sta' => 1]);
                    $ident->daftarexcul()->where('idkel', $exculId)->update(['sta' => 1]);
                    $ident->stopexcul()->where('idkel', $exculId)->update(['sta' => 1]);
                    break;

                case 'reject':
                    // Only update the specific extracurricular
                    $ident->kelsis1()->where('idkel', $exculId)->update(['sta' => -1]);
                    $ident->daftarexcul()->where('idkel', $exculId)->update(['sta' => -1]);
                    $ident->stopexcul()->where('idkel', $exculId)->update(['sta' => -1]);
                    break;

                default:
                    return back(400)->withErrors(['message' => 'Invalid simulation type']);
            }

            return redirect()->intended(route('siswa.index', [
                'nouid' => $v['nouid'],
                'page' => 'index',
                'tab' => 'kegiatan'
            ]));
        });
    }
}
