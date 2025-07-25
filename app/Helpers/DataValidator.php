<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class DataValidator
{
    public static function log(array $data): void
    {
        $validator = Validator::make($data, [
            'nouid' => 'required|string|max:50',
            'trx_id' => 'required|integer|exists:mai4.ttrx,id',
            'amount' => 'required|numeric|min:0',
            'action' => 'required|in:increase,decrease',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    public static function totp(array $data): void
    {
        $validator = Validator::make($data, [
            'phone' => 'required|string|max:255',
            'attempts' => 'required|integer|min:0',
            'otp' => 'required|string|max:255',
            'expires_at' => 'required|date',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    public static function tbulan(array $data): void
    {
        $validator = Validator::make($data, [
            'bulid' => 'required|integer|min:0|max:255',
            'bul' => 'required|string|max:15',
            'odr' => 'nullable|integer|min:0|max:255',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    public static function tindentitas(array $data): void
    {
        $validator = Validator::make($data, [
            'idmen' => 'required|integer',
            'idok' => 'required|integer',
            'tip' => 'required|integer',
            'nouid' => 'nullable|string|max:50|unique:tindentitas,nouid',
            'sta' => 'required|integer|min:0|max:255',
            'rev' => 'required|integer|min:0|max:255',
            'createdby' => 'required|integer',
            'updatedby' => 'required|integer',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    public static function tsiswa(array $data): void
    {
        $validator = Validator::make($data, [
            'nis' => 'required|string|max:10|unique:tsiswa,nis',
            'nisn' => 'nullable|string|max:30',
            'namlen' => 'required|string|max:50',
            'nampan' => 'nullable|string|max:30',
            'namman' => 'nullable|string|max:15',
            'temlah' => 'nullable|string|max:30',
            'tgllah' => 'required|date',
            'jenkel' => 'nullable|string|size:1',
            'tel' => 'nullable|string|max:20',
            'ket' => 'nullable|string',
            'sta' => 'required|integer|min:0|max:1',
            'staqd' => 'required|integer|min:0|max:1',
            'rev' => 'required|integer',
            'kel' => 'nullable|string|max:50',
            'ala' => 'nullable|string|max:255',
            'pin' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    public static function tbalance(array $data): void
    {
        $validator = Validator::make($data, [
            'nouid' => 'required|string|max:50|unique:tbalance,nouid',
            'nis' => 'required|string|max:50',
            'balance' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    public static function tbank(array $data): void
    {
        $validator = Validator::make($data, [
            'code' => 'required|string|max:255|unique:tbank,code',
            'bank' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    public static function tpt(array $data): void
    {
        $validator = Validator::make($data, [
            'code' => 'required|string|max:255|unique:tpt,code',
            'pt' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    public static function ttrx(array $data): array
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
                'input' => $data
            ]);
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    public static function ttrxlog(array $data): array
    {
        $validator = Validator::make($data, [
            'nouid' => 'required|string|max:50',
            'nis' => 'required|string|max:50',
            'trx_id' => 'required|integer|exists:mai4.ttrx,id',
            'amount' => 'required|numeric|min:0',
            'action' => 'required|in:increase,decrease',
            'description' => 'nullable|string',
            'bb' => 'required|numeric|min:0',
            'ab' => 'required|numeric|min:0',
            'created_by' => 'required|integer|max:255',
        ]);

        if ($validator->fails()) {
            logger()->error('Validasi ttrxlog gagal', [
                'errors' => $validator->errors(),
                'input' => $data
            ]);
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
    public static function paidbill(array $data): array
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
    public static function tsalpenrut(array $data): array
    {
        $validator = Validator::make($data, [
            'idset' => 'required|integer',
            'idsis' => 'required|integer',
            'bulid' => 'required|integer|min:0|max:255',
            'tah' => 'required|integer|digits:4',
            'nmr' => 'required|integer|min:0|max:255',
            'jen' => 'required|integer|min:0|max:255',
            'ket' => 'nullable|string|max:80',
            'jum' => 'required|numeric|min:0',
            'coapen' => 'required|integer',
            'coapiu' => 'nullable|integer',
            'coapendim' => 'nullable|integer',
            'coabelter' => 'nullable|integer',
            'sta' => 'required|integer|min:0|max:255',
            'islock' => 'required|integer|min:0|max:1',
            'idspr1' => 'required|integer',
            'idgru' => 'required|integer',
            'idpr' => 'required|integer',
            'createdby' => 'required|integer',
            'updatedby' => 'required|integer',
        ]);

        if ($validator->fails()) {
            logger()->error('Validasi tsalpenrut gagal', [
                'errors' => $validator->errors(),
                'input' => $data
            ]);
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }

    public static function ttpenrut(array $data): void
    {
        $validator = Validator::make($data, [
            'nopr' => 'nullable|string|max:20',
            'tgl' => 'nullable|date',
            'idsis' => 'required|integer',
            'via' => 'required|integer|min:0|max:255',
            'idkas' => 'required|integer',
            'nova' => 'nullable|string|max:30',
            'ket' => 'nullable|string|max:80',
            'jum' => 'required|numeric|min:0',
            'cat' => 'nullable|string|max:100',
            'cet' => 'required|integer|min:0|max:1',
            'dar' => 'required|integer|min:0|max:255',
            'sta' => 'required|integer|min:0|max:255',
            'stapos' => 'required|integer|min:0|max:255',
            'rev' => 'required|integer|min:0|max:255',
            'createdby' => 'required|integer',
            'updatedby' => 'required|integer',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    public static function ttpenrut1(array $data): void
    {
        $validator = Validator::make($data, [
            'idpr' => 'required|integer',
            'nmr' => 'required|integer|min:1|max:255',
            'idspr' => 'required|integer',
            'ket' => 'nullable|string|max:100',
            'jum' => 'required|numeric|min:0',
            'idcoa' => 'required|integer',
            'nolai' => 'nullable|string|max:20',
            'salpr' => 'required|integer|min:0|max:1',
            'sta' => 'nullable|integer|min:0|max:255',
            'stapos' => 'required|integer|min:0|max:255',
            'createdby' => 'required|integer',
            'updatedby' => 'required|integer',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
