<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Datmas\Indentitas;
use App\Saving\Models\Timagable;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(Request $req, $nouid)
    {
        return Inertia::render('Register/Register', [
            'nouid' => $nouid
        ]);
    }


    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $req, $nouid)
    {
        logger('REQUEST', ['data' => $req->all()]);
        // [2025-07-16 18:14:21] local.DEBUG: REQUEST {"data":{"nama":"WAHYU WIJAYA","warneg":"ID","warnegName":"Indonesia","nik":"3306071507000002","kk":"3306071507000002","paspor":null,"alamat1":{"addr":"jalan jalan","rt":"004","rw":"002","kec":"33.06.07","desa":"33.06.07.2017","kodpos":"54171","prov":"33","kab":"33.06","provName":"JAWA TENGAH","kabName":"KAB. PURWOREJO","kecName":"Banyuurip","desaName":"Tanjunganom"},"alamat2":{"addr":"jalan jalan","rt":"004","rw":"002","kec":"33.06.10","desa":"33.06.10.2008","kodpos":"54171","prov":"33","kab":"33.06","provName":"JAWA TENGAH","kabName":"KAB. PURWOREJO","kecName":"Butuh","desaName":"Tamansari"},"temtin":"1","hub":"Ayah","tel":"081808856626","email":"gacoprotect@gmail.com","pasporFile":null,"ktpPreview":null,"pasporPreview":null,"ktpFilePreview":"blob:http://siswa.test/b05c54a8-c9c2-4c8f-80fc-dcb0f4bb727f","ktpFile":{"Illuminate\\Http\\UploadedFile":"C:\\xampp\\tmp\\phpD95A.tmp"}}} 

        $v = $req->validate([
            "nama" => "required|string|max:100",
            "warneg" => "required|string|max:100",
            "warnegName" => "required|string|max:100",

            // WNI hanya jika warneg = 'ID'
            "nik" => "nullable|numeric|digits:16",
            "kk" => "nullable|numeric|digits:16",
            "ktpFile" => "nullable|file|mimes:jpg,jpeg,png,pdf|max:2048",

            // WNA hanya jika warneg != 'ID' dan tidak null/''
            "paspor" => "nullable|string|max:50",
            "pasporFile" => "nullable|file|mimes:jpg,jpeg,png,pdf|max:2048",

            // Alamat 1
            "alamat1.addr" => "required|string|max:255",
            "alamat1.rt" => "required|string|max:10",
            "alamat1.rw" => "required|string|max:10",
            "alamat1.kec" => "required|string|max:20",
            "alamat1.desa" => "required|string|max:20",
            "alamat1.kodpos" => "required|string|max:10",
            "alamat1.prov" => "required|string|max:10",
            "alamat1.kab" => "required|string|max:10",
            "alamat1.provName" => "nullable|string",
            "alamat1.kabName" => "nullable|string",
            "alamat1.kecName" => "nullable|string",
            "alamat1.desaName" => "nullable|string",

            // Alamat 2 hanya jika temtin == 1
            "temtin" => "required|in:0,1",
            "alamat2.addr" => "required_if:temtin,1|string|max:255",
            "alamat2.rt" => "required_if:temtin,1|string|max:10",
            "alamat2.rw" => "required_if:temtin,1|string|max:10",
            "alamat2.kec" => "required_if:temtin,1|string|max:20",
            "alamat2.desa" => "required_if:temtin,1|string|max:20",
            "alamat2.kodpos" => "required_if:temtin,1|string|max:10",
            "alamat2.prov" => "required_if:temtin,1|string|max:10",
            "alamat2.kab" => "required_if:temtin,1|string|max:10",
            "alamat2.provName" => "nullable|string",
            "alamat2.kabName" => "nullable|string",
            "alamat2.kecName" => "nullable|string",
            "alamat2.desaName" => "nullable|string",

            "hub" => "required|string|in:Ayah,Ibu,Wali",
            "tel" => "required|string|max:16",
            "email" => "required|email|max:100",
        ]);
        /**
         * use App\Saving\Models\Timagable;
         * field = [
         *   'name',
         *   'path',
         *   'mime_type',
         *   'size',
         *   'imagable_id',
         *   'imagable_type',
         * ]
         * use App\Saving\Models\Tregistrasi;
         * field =[
         *   'nouid',
         *   'nama',
         *   'warneg',
         *   'warneg_name',
         *   'nik',
         *   'kk',
         *   'paspor',
         *   'alamat1',
         *   'alamat2',
         *   'temtin',
         *   'hub',
         *   'tel',
         *   'email',
         *   'sta',
         *   'updated_by',
         *   'reject_reason'
         * ]
         * 
         */
        if ($req->warneg === 'ID') { // WNI
            $req->validate([
                'nik' => 'required|numeric|digits:16',
                'kk' => 'required|numeric|digits:16',
                'ktpFile' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            ]);
        } else { // WNA
            $req->validate([
                'paspor' => 'required|string',
                'pasporFile' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            ]);
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
