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
use App\Http\Controllers\Saving\SignatureController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(Request $req, $nouid)
    {
        $redirect = $this->registered($nouid);
        if ($redirect) return $redirect;

        $data = [];
        $props = ['nouid' => $nouid];
        if ($req->isMethod('POST')) {
            $data = $req->validate([
                'nouid' => 'required|string|exists:mai2.tindentitas,nouid',
                'warneg' => 'required|string',
                'nama' => 'required|string',
                'nik' => 'required_if:warneg,ID|nullable|digits:16|numeric',
                'paspor' => 'required_if:warneg,!ID|nullable|string',
                'kabName' => 'required|string',
            ]);
            if ($req->query('q') === 'agreement') {
                try {
                    if (empty($data)) {
                        return back()->withErrors(['data' => 'Terjadi kesalahan data tidak valid']);
                    }
                    $props = array_merge($props, self::agreement($data));
                } catch (\Exception $e) {
                    logger()->error('Gagal membuat agreement: ' . $e->getMessage(), [
                        'data' => $data,
                        'exception' => $e,
                    ]);
                    return back()->withErrors(['agreement' => 'Terjadi kesalahan saat membuat agreement.']);
                }
            }
        }

        return Inertia::render('Register/Register', $props);
    }


    private function agreement(array $data)
    {
        // Validasi manual minimum data
        if (
            empty($data['nouid']) ||
            empty($data['nama']) ||
            empty($data['warneg']) ||
            ($data['warneg'] === 'ID' && empty($data['nik'])) ||
            ($data['warneg'] !== 'ID' && empty($data['paspor'])) ||
            empty($data['kabName'])
        ) {
            throw new \InvalidArgumentException('Data tidak lengkap untuk memproses agreement.');
        }

        $snk = Tsnk::with(['points' => fn($q) => $q->orderBy('nmr')])
            ->where('is_active', true)
            ->latest('version')
            ->firstOrFail();

        $siswa = Indentitas::where('nouid', $data['nouid'])->with('siswa')->firstOrFail()->siswa;

        $signatureData = [
            'nouid' => $data['nouid'],
            'snk_version' => $snk->version,
            'nama' => $data['nama'],
            'id' => $data['warneg'] === 'ID' ? $data['nik'] : $data['paspor'],
            'waktu' => now()->toISOString(),
        ];

        $signature = SignatureController::getSign($signatureData, $data['nouid']);

        if (!$signature || !isset($signature['sign'])) {
            throw new \RuntimeException('Gagal menghasilkan tanda tangan digital.');
        }

        return [
            'agreement' => [
                'payload' => encrypt($signatureData),
                'sign' => $signature['sign'],
                'qr_code_svg' => $signature['qr_code_svg'] ?? null,
                'ortu' => $data['nama'],
                'siswa' => $siswa->namlen,
                'kota' => $data['kabName'] . ', ' . now()->translatedFormat('d F Y'),
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
            ],
        ];
    }


    private function registered($nouid)
    {
        $reg = Tregistrasi::where('nouid', $nouid)->first();

        if ($reg && in_array($reg->sta, [-2, 0, 1])) {
            return Inertia::location(route('siswa.index', [
                'nouid' => $nouid,
                'sta' => $reg->sta ?? null,
            ]));
        }

        return null;
    }


    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */

    public function store(Request $req, $nouid)
    {
        logger('REGISTRATION REQUEST', ['data' => $req->except(['ktpFile', 'pasporFile'])]);

        try {
            $reg = Tregistrasi::where('nouid', $nouid)->whereIn('sta', [-1, 0, 1])->first();
            $isReg = $reg && isset($reg->sta);

            // Early return if registration already exists with status 0 or 1
            if ($isReg && in_array($reg->sta, [0, 1])) {
                return Inertia::location(route('siswa.index', [
                    'nouid' => $nouid,
                    'sta' => $reg->sta
                ]));
            }

            return DB::connection('mai4')->transaction(function () use ($req, $nouid, $reg, $isReg) {
                // Common validation rules
                $baseRules = [
                    "nama" => "required|string|max:100",
                    "warneg" => "required|string",
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
                    "temtin" => "required|boolean",
                    "alamat2" => "required_if:temtin,1|array|nullable",
                    "alamat2.addr" => "required_if:temtin,1|string|max:255",
                    "alamat2.rt" => "required_if:temtin,1|string|max:10",
                    "alamat2.rw" => "required_if:temtin,1|string|max:10",
                    "alamat2.kec" => "required_if:temtin,1|string|max:20",
                    "alamat2.desa" => "required_if:temtin,1|string|max:20",
                    "alamat2.kodpos" => "required_if:temtin,1|string|max:10",
                    "alamat2.prov" => "required_if:temtin,1|string|max:10",
                    "alamat2.kab" => "required_if:temtin,1|string|max:10",
                    "hub" => "required|string|in:0,1,2",
                    "tel" => "required|string|max:16|regex:/^[0-9]+$/",
                    "email" => "required|email:rfc,dns|max:100",
                    "sign" => "required|string|size:64",
                    "payload" => "required|string",
                ];

                $validated = $req->validate($baseRules);

                // Nationality-specific validation
                $warnegRules = $req->warneg === 'ID'
                    ? [
                        'nik' => 'required|numeric|digits:16',
                        'kk' => 'required|numeric|digits:16',
                        'ktpFile' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
                    ]
                    : [
                        'paspor' => 'required|string|max:50',
                        'pasporFile' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
                    ];

                $req->validate($warnegRules);

                // Decrypt payload
                try {
                    $decryptedPayload = decrypt($req->payload);
                    $snk_version = $decryptedPayload['snk_version'] ?? '1.0.0';
                } catch (\Exception $e) {
                    throw ValidationException::withMessages([
                        'payload' => 'Invalid payload encryption'
                    ]);
                }

                // Prepare common registration data
                $regData = [
                    'nouid' => $nouid,
                    'nama' => $req->nama,
                    'warneg' => $req->warneg,
                    'warneg_name' => $req->warnegName,
                    'nik' => $req->warneg === 'ID' ? $req->nik : null,
                    'kk' => $req->warneg === 'ID' ? $req->kk : null,
                    'paspor' => $req->warneg !== 'ID' ? $req->paspor : null,
                    'alamat1' => $req->alamat1,
                    'alamat2' => $req->temtin ? $req->alamat2 : null,
                    'temtin' => $req->temtin,
                    'hub' => $req->hub,
                    'tel' => formatPhoneNumber($req->tel),
                    'email' => $req->email,
                    'sta' => 0,
                    'updated_by' => Auth::guard('web')->id() ?? 0
                ];
                try {
                    if ($isReg && $reg->sta === -1) {
                        logger('Update Tregistrasi');
                        $reg->update($regData);
                        $registrasi = $reg;
                    } else {
                        logger('Create Tregistrasi');
                        $registrasi = Tregistrasi::create($regData);
                    }
                } catch (\Exception $e) {
                    throw ValidationException::withMessages(['message' => 'Terjadi kesalahan' . $e->getMessage()]);
                }

                // File upload handling
                $fileField = $req->warneg === 'ID' ? 'ktpFile' : 'pasporFile';
                $fileType = $req->warneg === 'ID' ? 'ktp' : 'paspor';

                if ($req->hasFile($fileField)) {
                    $file = $req->file($fileField);
                    $filename = "{$fileType}_{$nouid}_" . time() . '.' . $file->extension();
                    $path = $file->storeAs('doc/reg', $filename, env('FILESYSTEM_DISK'));

                    logger('File Upload Debug', [
                        'isValid' => $file->isValid(),
                        'originalName' => $file->getClientOriginalName(),
                        'extension' => $file->extension(),
                        'size' => $file->getSize(),
                        'mimeType' => $file->getMimeType(),
                        'storagePath' => $path
                    ]);

                    $fileData = [
                        'name' => $filename,
                        'original_name' => $file->getClientOriginalName(),
                        'path' => $path,
                        'mime_type' => $file->getMimeType(),
                        'size' => $file->getSize(),
                        'imagable_id' => $registrasi->id,
                        'imagable_type' => $registrasi::class
                    ];
                    try {
                        if ($isReg) {
                            $existingFile = Timagable::where('imagable_type', $reg::class)
                                ->where('imagable_id', $reg->id)
                                ->first();

                            if ($existingFile) {
                                Storage::disk(env('FILESYSTEM_DISK'))->delete($existingFile->path);
                                $existingFile->update($fileData);
                            } else {
                                Timagable::create($fileData);
                            }
                        } else {
                            Timagable::create($fileData);
                        }
                    } catch (\Exception $e) {
                        throw ValidationException::withMessages(['message' => 'Terjadi kesalahan' . $e->getMessage()]);
                    }
                }

                // Handle signature
                $signData = [
                    'nouid' => $nouid,
                    'sign' => $req->sign,
                    'payload' => $req->payload,
                    'snk_version' => $snk_version,
                    'ip_address' => $req->ip(),
                    'user_agent' => $req->userAgent(),
                ];
                try {
                    if ($isReg) {
                        $ts = Tsignsnk::where('nouid', $nouid)->first()->update($signData);
                        logger('Update Tsignsnk', ['data' => $ts]);
                    } else {
                        $ts = Tsignsnk::create($signData);
                        logger('Create Tsignsnk', ['data' => $ts]);
                    }
                } catch (\Exception $e) {
                    throw ValidationException::withMessages(['message' => 'Terjadi kesalahan' . $e->getMessage()]);
                }

                return Inertia::location(route('siswa.index', [
                    'nouid' => $nouid,
                    'success' => true,
                    'message' => 'Registrasi berhasil'
                ]));
            });
        } catch (ValidationException $e) {
            logger()->error('Registration Validation Error', [
                'nouid' => $nouid,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return back()
                ->withErrors($e->validator)
                ->withInput()
                ->with('error', 'Validasi gagal: ' . $e->getMessage());
        } catch (\Exception $e) {
            logger()->error('Registration Error', [
                'nouid' => $nouid,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return back()
                ->withInput()
                ->with('error', env('APP_DEBUG')
                    ? 'Error: ' . $e->getMessage()
                    : 'Terjadi kesalahan sistem');
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


    public function setupPin(Request $request, $nouid): \Inertia\Response|\Illuminate\Http\RedirectResponse
    {
        logger('RegisteredUserController', ['request' => $request->all(), 'nouid' => $nouid]);

        $validated = $request->validate([
            'pin' => 'required|digits:6|numeric|confirmed',
            'pin_confirmation' => 'required|digits:6',
            'phone' => 'sometimes|string|regex:/^[0-9]+$/|min:10|max:15'
        ]);

        try {

            return DB::transaction(function () use ($validated, $nouid) {
                $indentitas = Indentitas::with('siswa')->with(['registrasi' => function ($q) {
                    $q->where('sta', 1);
                }])
                    ->where('nouid', $nouid)
                    ->firstOrFail();
                $phone = $validated['phone']
                    ?? optional($indentitas->siswa)->tel
                    ?? optional($indentitas->registrasi)->tel;

                if (!$indentitas->siswa && !$phone) {
                    return back()->withErrors(['pin' => 'Data siswa tidak ditemukan']);
                }

                // Update PIN dan nomor telepon
                if ($indentitas->siswa) {
                    $indentitas->siswa->update([
                        'pin' => $validated['pin'],
                        'tel' => $this->formatPhoneNumber($phone)
                    ]);
                }

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
    public function showFile($filename)
    {
        $filePath = 'doc/reg/' . $filename;

        if (!Storage::disk('private')->exists($filePath)) {
            abort(404);
        }

        return response()->file(
            storage_path('app/private/' . $filePath),
            [
                // 'Content-Type' => Storage::disk('private')->mimeType($filePath),
                'Content-Disposition' => 'inline; filename="' . $filename . '"'
            ]
        );
    }
}
