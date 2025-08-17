<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Tizin;
use App\Models\Datmas\Indentitas;
use App\Services\DataValidatorService;
use App\Services\IzinService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class IzinController extends Controller
{
    protected IzinService $izinService;
    protected DataValidatorService $validator;

    public function __construct(IzinService $izinService, DataValidatorService $validator)
    {
        $this->izinService = $izinService;
        $this->validator = $validator;
    }

    /**
     * Store a new izin record
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, $nouid)
    {
        try {
            $ident = Indentitas::where('nouid', $nouid)->firstOrFail();
            $request['idsis'] = $ident->idok;
            $validated = $this->validator->tizin($request->all());
            $files = $request->hasFile('dok') ? $request->file('dok') : null;

            $this->izinService->create($validated, $files);

            return back()->withMessage([
                'success' => true,
                'message' => 'Izin berhasil diajukan!',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            $errorMessages = collect($e->errors())->flatten()->implode(' ');
            logger('Validation Error', [$errorMessages]);
            return back()->withErrors($e->validator)
                ->withInput()
                ->withErrors([
                    'message' => 'Data tidak valid',
                    ...(isdebug() ? ['trace' => $errorMessages] : [])
                ]);
        } catch (\Exception $e) {
            logger('Validation Error', ['Error' => $e->getMessage()]);

            return back()->withInput()
                ->withErrors([
                    'message' => 'Terjadi kesalahan server',
                    ...(isdebug() ? ['trace' => $e->getMessage()] : [])
                ]);
        }
    }
    function cancel(Request $req, $nouid)
    {
        $v = $req->validate([
            'id' => 'required|integer|exists:mai1.tizin,id'
        ]);
        try {
            DB::transaction(function () use ($v, $nouid) {
                Tizin::where('id', $v['id'])->update(['sta' => -2]);
                return back()->withMessage([
                    'success' => true,
                    'message' => 'Izin berhasil dibatalkan!',
                ]);
            });
        } catch (\Illuminate\Validation\ValidationException $e) {
            $errorMessages = collect($e->errors())->flatten()->implode(' ');
            logger('Validation Error', [$errorMessages]);
            return back()->withErrors($e->validator)
                ->withInput()
                ->withErrors([
                    'message' => 'Data tidak valid',
                    ...(isdebug() ? ['trace' => $errorMessages] : [])
                ]);
        } catch (\Exception $e) {
            logger('Validation Error', ['Error' => $e->getMessage()]);

            return back()->withInput()
                ->withErrors([
                    'message' => 'Terjadi kesalahan server',
                    ...(isdebug() ? ['trace' => $e->getMessage()] : [])
                ]);
        }
    }
}
