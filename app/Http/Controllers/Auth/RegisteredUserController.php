<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Datmas\Indentitas;
use App\Models\Saving\Timagable;
use App\Models\Saving\Tregistrasi;
use App\Models\Saving\Tsignsnk;
use App\Models\Saving\Tsnk;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(Request $req, $nouid)
    {
        $snk = Tsnk::with(['points' => fn($q) => $q->orderBy('nmr')])
            ->where('is_active', true)
            ->latest('version')
            ->first();
        $siswa = Indentitas::with('siswa')->where('nouid', $nouid)->first()->siswa;
        return Inertia::render('Register/Register', [
            'nouid' => $nouid,
            'siswa' => $siswa->namlen,
            'snk' => [
                'version' => $snk->version,
                'effective' => $snk->effective,
                'title' => $snk->title,
                'summary' => $snk->summary,
                'points' => $snk->points->map(fn($point) => [
                    'nmr' => $point->nmr,
                    'title' => $point->title,
                    'content' => $point->content,
                ]),
            ],
        ]);
    }


    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */

    public function store(Request $req, $nouid)
    {
        logger('REGISTRATION REQUEST', ['data' => $req->all()]);

        try {
            return DB::transaction(function () use ($req, $nouid) {

                // Validasi dasar
                $validated = $req->validate([
                    "nama" => "required|string|max:100",
                    "warneg" => "required|string|max:100",
                    "warnegName" => "required|string|max:100",
                    "nik" => "nullable|numeric|digits:16",
                    "kk" => "nullable|numeric|digits:16",
                    "ktpFile" => "nullable|file|mimes:jpg,jpeg,png,pdf|max:2048",
                    "paspor" => "nullable|string|max:50",
                    "pasporFile" => "nullable|file|mimes:jpg,jpeg,png,pdf|max:2048",
                    "alamat1" => "required|array",
                    "alamat1.addr" => "required|string|max:255",
                    "alamat1.rt" => "required|string|max:10",
                    "alamat1.rw" => "required|string|max:10",
                    "alamat1.kec" => "required|string|max:20",
                    "alamat1.desa" => "required|string|max:20",
                    "alamat1.kodpos" => "required|string|max:10",
                    "alamat1.prov" => "required|string|max:10",
                    "alamat1.kab" => "required|string|max:10",
                    "temtin" => "required|in:0,1",
                    "alamat2" => "required_if:temtin,1|array",
                    "alamat2.addr" => "required_if:temtin,1|string|max:255",
                    "alamat2.rt" => "required_if:temtin,1|string|max:10",
                    "alamat2.rw" => "required_if:temtin,1|string|max:10",
                    "alamat2.kec" => "required_if:temtin,1|string|max:20",
                    "alamat2.desa" => "required_if:temtin,1|string|max:20",
                    "alamat2.kodpos" => "required_if:temtin,1|string|max:10",
                    "alamat2.prov" => "required_if:temtin,1|string|max:10",
                    "alamat2.kab" => "required_if:temtin,1|string|max:10",
                    "hub" => "required|string|in:0,1,2",
                    "tel" => "required|string|max:16",
                    "email" => "required|email|max:100",
                    "sign" => "required|string",
                    "payload" => "required|string",
                ]);

                // Validasi khusus WNI/WNA
                if ($req->warneg === 'ID') {
                    $req->validate([
                        'nik' => 'required|numeric|digits:16',
                        'kk' => 'required|numeric|digits:16',
                        'ktpFile' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
                    ]);
                } else {
                    $req->validate([
                        'paspor' => 'required|string|max:50',
                        'pasporFile' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
                    ]);
                }
                $snk_version = decrypt($req->payload)["snk_version"];
                // Simpan data registrasi
                $registrasi = Tregistrasi::create([
                    'nouid' => $nouid,
                    'nama' => $req->nama,
                    'warneg' => $req->warneg,
                    'warneg_name' => $req->warnegName,
                    'nik' => $req->warneg === 'ID' ? $req->nik : null,
                    'kk' => $req->warneg === 'ID' ? $req->kk : null,
                    'paspor' => $req->warneg !== 'ID' ? $req->paspor : null,
                    'alamat1' => $req->alamat1,
                    'alamat2' => $req->temtin == 1 ? $req->alamat2 : null,
                    'temtin' => $req->temtin,
                    'hub' => $req->hub,
                    'tel' => $req->tel,
                    'email' => $req->email,
                    'sta' => 0,
                    'updated_by' => 0
                ]);

                // Simpan file KTP/Paspor
                $fileField = $req->warneg === 'ID' ? 'ktpFile' : 'pasporFile';
                $fileType = $req->warneg === 'ID' ? 'ktp' : 'paspor';

                if ($req->hasFile($fileField)) {
                    $file = $req->file($fileField);
                    $path = $file->store('public/doc/reg');

                    Timagable::create([
                        'name' => $fileType . '_' . $nouid,
                        'path' => str_replace('public/', '', $path),
                        'mime_type' => $file->getMimeType(),
                        'size' => $file->getSize(),
                        'imagable_id' => $registrasi->id,
                        'imagable_type' => Tregistrasi::class
                    ]);
                }

                // Simpan tanda tangan
                Tsignsnk::create([
                    'nouid' => $nouid,
                    'sign' => $req->sign,
                    'payload' => $req->payload,
                    'snk_version' => $snk_version,
                    'ip_address' => $req->ip(),
                    'user_agent' => $req->userAgent()
                ]);

            

                return response()->json([
                    'success' => true,
                    'message' => 'Pendaftaran berhasil',
                    'data' => [
                        'nouid' => $nouid,
                        'registrasi_id' => $registrasi->id
                    ]
                ]);
            });
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return back()
                ->withErrors($e->validator)
                ->withInput()
                ->with([
                    'success' => false,
                    'message' => 'Validasi gagal',
                ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            logger()->error('Registration Error: ' . $th->getMessage(), [
                'trace' => $th->getTraceAsString()
            ]);

            return back()->with([
                'success' => false,
                'message' => 'Terjadi kesalahan sistem',
                'error' => env('APP_DEBUG') ? $th->getMessage() : null
            ], 500)->withError(['message' => $th->getMessage() ?? null]);
        }
    }

    protected function formatPhoneNumber($number): string
    {
        $number = preg_replace('/[^0-9]/', '', $number);

        // Hilangkan prefix 0 atau 62 jika ada
        if (str_starts_with($number, '0')) {
            $number = substr($number, 1);
        } elseif (str_starts_with($number, '62')) {
            $number = substr($number, 2);
        }

        return '62' . $number;
    }
    public function verifphone(Request $request, $nouid)
    {
        $request->validate([
            'number' => 'required|string|regex:/^[0-9]+$/|min:10|max:15'
        ]);

        $phone = $this->formatPhoneNumber($request->number);
        $indentitas = Indentitas::with('siswa')
            ->where('nouid', $nouid)
            ->firstOrFail();


        if (!$indentitas->siswa) {
            return back()->withErrors(['tel' => 'Data siswa tidak ditemukan']);
        }

        //apakah user telah memiliki tel di kolom tel tabel tsiswa?
        if ($indentitas->siswa->tel !== null) {
        }
        // Update tel
        $indentitas->siswa->tel = $phone;
        $indentitas->siswa->save();
    }


    private function stored(Request $request, $nouid): \Inertia\Response|\Illuminate\Http\RedirectResponse
    {
        logger('RegisteredUserController', ['request' => $request->all(), 'nouid' => $nouid]);

        $validated = $request->validate([
            'pin' => 'required|digits:6|numeric|confirmed',
            'pin_confirmation' => 'required|digits:6',
            'phone' => 'required|string|regex:/^[0-9]+$/|min:10|max:15'
        ]);

        try {

            return DB::transaction(function () use ($validated, $nouid) {
                $indentitas = Indentitas::with('siswa')
                    ->where('nouid', $nouid)
                    ->firstOrFail();

                if (!$indentitas->siswa) {
                    return back()->withErrors(['pin' => 'Data siswa tidak ditemukan']);
                }

                // Update PIN dan nomor telepon
                $indentitas->siswa->update([
                    'pin' => $validated['pin'],
                    'tel' => $this->formatPhoneNumber($validated['phone']) // Simpan ke kolom tel
                ]);
                Indentitas::where('nouid', $nouid)->update(['sta' => 0]);
                event(new Registered($indentitas->siswa));

                Auth::login($indentitas->siswa);
                session(['current_nouid' => $nouid]);

                return redirect()->intended(route('siswa.index', ['nouid' => $nouid]));
            });
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            logger()->error('Indentitas not found', ['nouid' => $nouid, 'error' => $e->getMessage()]);
            return back()->withErrors(['pin' => 'Data identitas tidak ditemukan']);
        } catch (\Exception $e) {
            logger()->error('Error saving data', ['error' => $e->getMessage()]);
            return back()->withErrors(['pin' => 'Gagal menyimpan data. Silakan coba lagi.']);
        }
    }
}
