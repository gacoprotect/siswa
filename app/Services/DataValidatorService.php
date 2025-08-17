<?php

namespace App\Services;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class DataValidatorService
{
    public static function tizin(array $data): array
    {
        $rules = [
            'idsis' => 'required|numeric|exists:mai2.tindentitas,idok',
            'jen' => 'required|integer|exists:mai1.tizinjenis,id',
            'tgl_mulai' => 'required|date|before_or_equal:tgl_akhir',
            'tgl_akhir' => 'required|date|after_or_equal:tgl_mulai',
            'ket' => 'required|string|min:10|max:500',
            'dok' => 'sometimes|file|mimetypes:image/jpeg,image/png,image/gif,application/pdf|max:2048',
            'sta' => 'sometimes|integer|in:0,1,2',
        ];

        $validator = Validator::make($data, $rules, [
            'tgl_akhir.after_or_equal' => 'Tanggal akhir harus setelah atau sama dengan tanggal mulai',
            'dok.mimetypes' => 'Dokumen harus berupa gambar (JPEG, PNG, GIF) atau PDF',
            'dok.max' => 'Ukuran dokumen maksimal 2MB',
        ]);

        if ($validator->fails()) {
            logger()->error('Validasi izin gagal', [
                'errors' => $validator->errors()->all(),
                'input' => Arr::except($data, ['dok']) // Exclude file content from logs
            ]);
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
    public static function create($data)
    {
        # code...
    }
}
