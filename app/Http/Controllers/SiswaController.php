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
            return Inertia::render('Siswa/Index', [
                'data' => $ident
            ]);
        }

        // Jika sudah login
        if (Auth::guard('siswa')->check()) {
            // Set session current_nouid jika belum ada
            if (!session()->has('current_nouid')) {
                session(['current_nouid' => $nouid]);
            }

            return Inertia::render('Siswa/Index', [
                'data' => $ident
            ]);
        }
        session(['current_nouid' => $nouid]);
        // Jika belum login, tampilkan form PIN
        return Inertia::render('Siswa/Index', [
            'data' => [
                ...$ident->toArray(),
                'siswa' => $ident->siswa->masked(), // timpa siswa asli dengan versi masked
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
            $identitas = Indentitas::where('nouid', $nouid)->update(['sta' => -1]);

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
        DB::beginTransaction();

        try {
            // Validasi input
            $validated = $request->validate([
                'nis' => 'sometimes|string',
                'namlen' => 'sometimes|string',
                'kel' => 'nullable|string',
                'tel' => 'sometimes|string',
                'ttl' => 'sometimes|string',
                'email' => 'nullable|email',
                'safe.ala' => 'sometimes|string',
                'safe.rt' => 'sometimes|string',
                'safe.rw' => 'sometimes|string',
                'safe.cam' => 'sometimes|string',
                'safe.lur' => 'sometimes|string',
                'safe.kodpos' => 'nullable|string',
                'safe.dusun' => 'nullable|string',
                'safe.temtin' => 'nullable|string',
                'safe.sakit' => 'nullable|array',
                'wali.nama' => 'nullable|string',
                'wali.tel' => 'nullable|string',
                'wali.hub' => 'nullable|string',
            ]);

            // Ambil data original
            $ori = Indentitas::with(['siswa.safe'])
                ->where('nouid', $nouid)
                ->firstOrFail();

            $newData = $request->except(['_token', '_method']);
            $oldData = $ori->toArray();

            // Fungsi khusus untuk membandingkan data siswa
            function compareStudentData($new, $old)
            {
                $changes = [];

                // Bandingkan field langsung
                $directFields = ['nis', 'namlen', 'kel', 'tel', 'ttl', 'email'];
                foreach ($directFields as $field) {
                    if (array_key_exists($field, $new) && $new[$field] != ($old['siswa'][$field] ?? null)) {
                        $changes[$field] = $new[$field];
                    }
                }

                // Bandingkan data safe
                if (isset($new['safe'])) {
                    $safeChanges = [];
                    $safeFields = ['ala', 'rt', 'rw', 'kodpos', 'dusun', 'temtin', 'sakit'];

                    foreach ($safeFields as $field) {
                        $newValue = $new['safe'][$field] ?? null;
                        $oldValue = $old['siswa']['safe'][$field] ?? null;

                        // Penanganan khusus untuk array sakit
                        if ($field === 'sakit') {
                            if ((is_null($oldValue) && (is_array($newValue) && empty($newValue)))) {
                                continue; // Skip perubahan null -> []
                            }
                        }

                        if ($newValue != $oldValue) {
                            $safeChanges[$field] = $newValue;
                        }
                    }

                    if (!empty($safeChanges)) {
                        $changes['safe'] = $safeChanges;

                        // Tambahkan wilayah jika ada perubahan safe
                        if (isset($new['safe']['wilayah'])) {
                            $changes['safe']['wilayah'] = $new['safe']['wilayah'];
                        }
                    }
                }

                // Bandingkan data wali
                if (isset($new['wali'])) {
                    $waliChanges = [];
                    $waliFields = ['nama', 'tel', 'hub'];

                    foreach ($waliFields as $field) {
                        if (isset($new['wali'][$field]) && $new['wali'][$field] != ($old['siswa']['wali'][$field] ?? null)) {
                            $waliChanges[$field] = $new['wali'][$field];
                        }
                    }

                    if (!empty($waliChanges)) {
                        $changes['wali'] = $waliChanges;
                    }
                }

                return $changes;
            }

            $realChanges = compareStudentData($newData, $oldData);

            if (empty($realChanges)) {
                return back()->with('info', 'Tidak ada perubahan data yang diajukan');
            }

            // Buat request update
            $reqUpdate = Tsisreqdata::create([
                'idsis' => $ori->idok,
                'old_data' => $this->extractOldData($oldData, $realChanges),
                'new_data' => $realChanges,
                'status' => 0,
                'requested_at' => now(),
                'requested_by' => Auth::guard('siswa')->user()->nis,
            ]);

            DB::commit();
            logger('Permintaan update berhasil', [
                'request_id' => $reqUpdate->id,
                'student_id' => $ori->idok,
                'old' => $oldData,
                'new' => $newData,
                'changes' => $realChanges,
                'user' => Auth::guard('siswa')->user()->nis
            ]);
            return back()->with([
                'success' => true,
                'message' => 'Permintaan perubahan berhasil dikirim',
                'changes' => array_keys($realChanges) // Field yang berubah saja
            ]);
        } catch (ValidationException $e) {
            DB::rollBack();
            return back()->withErrors($e->validator)->withInput();
        } catch (\Throwable $e) {
            DB::rollBack();
            logger()->error('Gagal membuat permintaan update', [
                'error' => $e->getMessage(),
                'student' => $nouid,
                'user' => Auth::guard('siswa')->user()->nis ?? 'guest'
            ]);

            return back()->withErrors([
                'update_error' => env('APP_DEBUG')
                    ? $e->getMessage()
                    : 'Terjadi kesalahan. Silakan coba lagi.'
            ])->withInput();
        }
    }
    protected function extractOldData($oldData, $changes)
    {
        $result = [];

        // Field langsung
        $directFields = ['nis', 'namlen', 'kel', 'tel', 'ttl', 'email'];
        foreach ($directFields as $field) {
            if (isset($changes[$field])) {
                $result[$field] = $oldData['siswa'][$field] ?? null;
            }
        }

        // Data safe
        if (isset($changes['safe'])) {
            $result['safe'] = [];
            foreach ($changes['safe'] as $field => $value) {
                if ($field !== 'wilayah') {
                    $result['safe'][$field] = $oldData['siswa']['safe'][$field] ?? null;
                }
            }

            if (isset($changes['safe']['wilayah'])) {
                $result['safe']['wilayah'] = $oldData['siswa']['safe']['wilayah'] ?? null;
            }
        }

        // Data wali
        if (isset($changes['wali'])) {
            $result['wali'] = [];
            foreach ($changes['wali'] as $field => $value) {
                $result['wali'][$field] = $oldData['siswa']['wali'][$field] ?? null;
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
