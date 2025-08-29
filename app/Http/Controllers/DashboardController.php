<?php

namespace App\Http\Controllers;

use App\Models\Datmas\Indentitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $req, string $nouid)
    {
        logger('Request Index', ['nouid' => $nouid, 'req' => $req->all()]);
        try {

            $ident = Indentitas::with(['registrasi', 'siswa'])->where('nouid', $nouid)->firstOrFail();

            if (! $ident) {
                return abort(404, 'Data siswa tidak ditemukan');
            }
            if (! $ident->registrasi) {
                $reg = \App\Models\Saving\Tregistrasi::where('nouid', $nouid)->first();

                if ($reg && in_array($reg->sta, [-2, -1, 0, 1])) {
                    logger('User has registration record in Tregistrasi', [
                        'nouid' => $nouid,
                        'reg_status' => $reg->sta,
                    ]);
                } else {
                    Auth::guard('siswa')->logout();

                    return Inertia::location(route('register.create', ['nouid' => $nouid]));
                }
            }
            if ($ident->registrasi->sta === 0 || session()->has('current_nouid') && session('current_nouid') !== $nouid) {
                Auth::guard('siswa')->logout();
            }
            if (! $ident->active) {
                Auth::guard('siswa')->logout();

                return Inertia::render('Siswa/Blokir', [
                    'data' => [
                        'nouid' => $nouid,
                        'summary' => $ident->summary(),
                    ],
                ]);
            }
            $isLogin = Auth::guard('siswa')->check();
            $page = $req->query('page') ?? 'index';
            $tab = $req->query('tab');
            $siswa = $ident->siswa;
            // Jika sudah login
            if ($isLogin) {
                $data = [
                    'page' => $page,
                    'tab' => $tab ?? null,
                    'data' => [
                        ...$ident->toArray(),
                        'balance' => $siswa->balance,
                        'summary' => $ident->summary(),
                    ],
                ];
            } else {
                $data = [
                    'data' => [
                        ...$ident->toArray(),
                        'siswa' => $siswa->masked(),
                        'summary' => $ident->summary(['sign', 'version']),
                    ],
                ];
            }

            session(['current_nouid' => $nouid]);

            return Inertia::render('Dashboard/Index', $data);
        } catch (ValidationException $e) {
            if (config('app.debug')) {
                dd($e);
            }

            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            if (config('app.debug')) {
                dd($e);
            }

            return abort(404, 'Data siswa tidak ditemukan');
        }

    }
}
