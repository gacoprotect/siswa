<?php

namespace App\Services;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class DataValidatorService
{
    public function tizin(array $data): array
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
                'input' => Arr::except($data, ['dok']), // Exclude file content from logs
            ]);
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    public function ttrx(array $data): array
    {
        $validator = Validator::make($data, [
            'for' => 'sometimes|string|in:tagihan',
            'nouid' => 'required|string|max:50',
            'order_id' => 'required|string|max:255|unique:mai4.ttrx,order_id',
            'amount' => 'required|numeric|min:0',
            'bank_id' => 'nullable|integer|exists:mai4.tbank,id',
            'pt_id' => 'nullable|integer|exists:mai4.tpt,id',
            'phone' => 'required|string|max:255',
            'va_number' => 'nullable|string|max:255',
            'status' => 'required|in:pending,success,failed',
            'type' => 'required|in:topup,payment,withdraw,refund',
            'note' => 'nullable|string',
            'pay_data' => 'nullable|json',
            'failure_message' => 'nullable|string',
            'expiry_time' => 'nullable|date',
            'paid_at' => 'nullable|date',
            'spr_id' => 'sometimes|array',
            'spr_id.*' => 'integer|exists:mai3.tsalpenrut,id',
            'created_by' => 'required|integer|max:255',
        ]);

        if ($validator->fails()) {
            logger()->error('Validasi ttrx gagal', [
                'errors' => $validator->errors(),
                'input' => $data,
            ]);
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
    public function paidbill(array $data): array
    {
        $validator = Validator::make($data, [
            'trx_id' => 'required|integer|min:1|exists:mai4.ttrx,id',
            'nouid' => 'required|string|max:50|exists:mai2.tindentitas,nouid',
            'spr_id' => 'required|integer|exists:mai3.tsalpenrut,id|unique:mai4.tpaidbill,spr_id',
            'nmr' => 'required|integer|min:1',
            'jum' => 'required|numeric',
            'paid_at' => 'nullable|date',
            'ket' => 'nullable|string',
            'created_by' => 'required|integer',
            'sta' => 'required|integer',
        ], [
            // Pesan untuk trx_id
            'trx_id.required' => 'ID Transaksi wajib diisi',
            'trx_id.integer' => 'ID Transaksi harus berupa angka',
            'trx_id.min' => 'ID Transaksi tidak valid',
            'trx_id.exists' => 'Transaksi tidak ditemukan',

            // Pesan untuk nouid
            'nouid.required' => 'Nomor UID wajib diisi',
            'nouid.string' => 'Nomor UID harus berupa teks',
            'nouid.max' => 'Nomor UID maksimal 50 karakter',
            'nouid.exists' => 'Nomor UID tidak terdaftar',

            // Pesan khusus untuk spr_id
            'spr_id.required' => 'ID Saldo Penarikan Rutin wajib diisi',
            'spr_id.integer' => 'ID Saldo Penarikan Rutin harus berupa angka',
            'spr_id.exists' => 'Saldo Penarikan Rutin tidak ditemukan',
            'spr_id.unique' => 'ID Saldo Penarikan Rutin sudah digunakan',

            // Pesan untuk nmr
            'nmr.required' => 'Nomor wajib diisi',
            'nmr.integer' => 'Nomor harus berupa angka',
            'nmr.min' => 'Nomor minimal 1',

            // Pesan untuk jum
            'jum.required' => 'Jumlah wajib diisi',
            'jum.numeric' => 'Jumlah harus berupa angka',

            // Pesan untuk paid_at
            'paid_at.date' => 'Format tanggal pembayaran tidak valid',

            // Pesan untuk created_by
            'created_by.required' => 'ID Pembuat wajib diisi',
            'created_by.integer' => 'ID Pembuat harus berupa angka',

            // Pesan untuk sta
            'sta.required' => 'Status wajib diisi',
            'sta.integer' => 'Status harus berupa angka',

            // Pesan umum (opsional)
            'required' => ':attribute wajib diisi',
            'integer' => ':attribute harus berupa angka',
        ]);


        if ($validator->fails()) {
            logger()->error('Validasi paidbill gagal', [
                'errors' => $validator->errors(),
                'input' => $data
            ]);
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}
