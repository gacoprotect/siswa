<?php

namespace App\Http\Controllers;

use App\Helpers\MaskingHelper;
use App\Models\Datmas\Indentitas;
use App\Models\Saving\Tsisreqdata;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class SiswaController extends Controller
{
    public function index(Request $request)
    {
        $nouid = $request->route('nouid');

        $ident = Indentitas::with(['siswa.safe' => function ($qu) {
            $qu->select('ids', 'ala', 'rt', 'rw', 'cam', 'lur', 'kodpos', 'dusun', 'temtin', 'sakit');
        }])->where('nouid', $nouid)->firstOrFail();
        if (!$ident) {
            abort(404, 'Data siswa tidak ditemukan');
        }

        if (session()->has('current_nouid') && session('current_nouid') !== $nouid) {
            Auth::guard('siswa')->logout();
            session()->forget('current_nouid');
            return Inertia::location(route('siswa.index', ['nouid' => $nouid]));
        }

        // Jika sudah login
        if (Auth::guard('siswa')->check()) {
            // Set session current_nouid jika belum ada
            if (!session()->has('current_nouid')) {
                session(['current_nouid' => $nouid]);
            }

            return Inertia::render('Siswa/Index', [
                'data' => $ident,
                'summary' => $ident->summary(),
            ]);
        }
        session(['current_nouid' => $nouid]);
        // Jika belum login, tampilkan form PIN
        return Inertia::render('Siswa/Index', [
            'data' => [
                ...$ident->toArray(),
                'summary' => $ident->summary(['sign', 'version']),
                'siswa' => $ident->siswa->masked(),
            ]
        ]);
    }


    public function logout(Request $request, $nouid)
    {
        Auth::guard('siswa')->logout();
        return redirect()->route('siswa.index', ['nouid' => $nouid]);
    }

    public function blocked(Request $request, $nouid): RedirectResponse
    {
        try {
            $identitas = Indentitas::where('nouid', $nouid)->first()->update(['sta' => -1]);

            return redirect()->intended(route('siswa.index', ['nouid' => $nouid]));
        } catch (\Throwable $th) {

            return back()->withErrors(['message' => 'Failed to block the user'])->with([
                'success' => false,
                'message' => 'Gagal Blokir Kartu'
            ]);
        }
    }

    public function update(Request $request, $nouid)
    {
        logger()->info('Memulai update data siswa', [
            'student_uid' => $nouid,
            'user_id' => Auth::guard('siswa')->id() ?? 'guest'
        ]);

        DB::beginTransaction();

        try {
            $validated = $request->validate([
                'nis' => 'sometimes|string|max:20',
                'namlen' => 'sometimes|string|max:100',
                'kel' => 'nullable|string|max:10',
                'tel' => 'sometimes|string|max:20',
                'ttl' => 'sometimes|string|max:100',
                'email' => 'nullable|email|max:100',
                'safe.ala' => 'sometimes|string|max:255',
                'safe.rt' => 'sometimes|string|max:10',
                'safe.rw' => 'sometimes|string|max:10',
                'safe.cam' => 'sometimes|string|max:100',
                'safe.lur' => 'sometimes|string|max:100',
                'safe.kodpos' => 'nullable|string|max:10',
                'safe.dusun' => 'nullable|string|max:100',
                'safe.temtin' => 'nullable|string|max:100',
                'safe.sakit' => 'nullable|array',
                'wali.nama' => 'nullable|string|max:100',
                'wali.tel' => 'nullable|string|max:20',
                'wali.hub' => 'nullable|string|max:50',
            ]);

            $ori = Indentitas::with('siswa.safe')->where('nouid', $nouid)->firstOrFail()->siswa;
            $oldDataArray = $ori->toArray();  // penting
            $newDataArray = $request->all();
            $diff = self::arrayDiffRecursive($oldDataArray, $newDataArray);

            logger()->debug('Data yang berubah saja:', $diff);
            logger()->debug('DEBUG CEK : ', [
                'old_data' => $oldDataArray,
                'req_data' => $newDataArray,

                'DEBUGfromData' => self::extractDiff($diff, 'from'),
                'DEBUGtoData' => self::extractDiff($diff, 'to'),

            ]);




            $reqUpdate = Tsisreqdata::create([
                'idsis' => $ori->id,
                'old_data' => self::extractDiff($diff, 'from'),
                'new_data' => self::extractDiff($diff, 'to'),

                'status' => 0,
                'requested_at' => now(),
                'requested_by' => Auth::guard('siswa')->id(),
            ]);

            DB::commit();

            return back()->with([
                'success' => true,
                'message' => 'Permintaan perubahan berhasil dikirim',
                'request_id' => $reqUpdate->id,
            ]);
        } catch (ValidationException $e) {
            DB::rollBack();
            return back()->withErrors($e->validator)->withInput();
        } catch (\Exception $e) {
            DB::rollBack();
            logger()->error('Update gagal: ' . $e->getMessage());
            return back()->with('error', 'Terjadi kesalahan');
        }
    }

    public static function arrayDiffRecursive(array $old, array $new): array
    {
        $diff = [];

        foreach ($new as $key => $newValue) {
            $oldValue = $old[$key] ?? null;

            if (is_array($newValue) && is_array($oldValue)) {
                $nestedDiff = self::arrayDiffRecursive($oldValue, $newValue);
                if (!empty($nestedDiff)) {
                    $diff[$key] = $nestedDiff;
                }
            } elseif (is_array($newValue) || is_array($oldValue)) {
                // Salah satu array tapi bukan keduanya → anggap berubah
                $diff[$key] = [
                    'from' => $oldValue,
                    'to' => $newValue,
                ];
            } elseif ($newValue !== $oldValue) {
                $diff[$key] = [
                    'from' => $oldValue,
                    'to' => $newValue,
                ];
            }
        }

        return $diff;
    }

    public static function extractDiff(array $diff, string $direction = 'from'): array
    {
        $result = [];

        foreach ($diff as $key => $value) {
            if (is_array($value) && array_key_exists('from', $value) && array_key_exists('to', $value)) {
                $result[$key] = $value[$direction];
            } elseif (is_array($value)) {
                $nested = self::extractDiff($value, $direction);
                if (!empty($nested)) {
                    $result[$key] = $nested;
                }
            }
        }

        return $result;
    }



    public function test(Request $request, $nouid)
    {
        $test = Indentitas::with(['siswa.safe'])->where('nouid', $nouid)->firstOrFail();
        $siswa = Indentitas::with(['siswa.safe' => function ($qu) {
            $qu->select('ids', 'ala', 'rt', 'rw', 'cam', 'lur', 'kodpos', 'dusun', 'temtin', 'sakit');
        }])->where('nouid', $nouid)->firstOrFail();
        return response()->json([
            'success' => true,
            'data' => $siswa
        ]);
    }
}
