<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;
use Illuminate\Translation\PotentiallyTranslatedString;

class JsonIdsNotExist implements ValidationRule
{
    /**
     * @param string $table Nama tabel untuk pengecekan
     * @param string $column Nama kolom yang dicek (default: 'id')
     * @param string|null $connection Koneksi database khusus
     * @param bool $allowEmpty Apakah mengizinkan array kosong
     */
    public function __construct(
        private string $table,
        private string $column = 'id',
        private ?string $connection = null,
        private bool $allowEmpty = true
    ) {
    }

    /**
     * Run the validation rule.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Handle null value
        if (is_null($value)) {
            return;
        }

        // Decode JSON
        $ids = json_decode($value, true);

        // Validasi format JSON
        if (json_last_error() !== JSON_ERROR_NONE) {
            $fail('The :attribute must be a valid JSON string.');
            return;
        }

        // Validasi tipe data
        if (!is_array($ids)) {
            $fail('The :attribute must be a JSON array.');
            return;
        }

        // Handle empty array
        if (empty($ids) && $this->allowEmpty) {
            return;
        }

        // Validasi isi array
        if (!array_is_list($ids)) {
            $fail('The :attribute must be a sequential array.');
            return;
        }

        // Validasi tipe data setiap ID
        foreach ($ids as $id) {
            if (!is_numeric($id) && !is_string($id)) {
                $fail('All IDs in :attribute must be numeric or string.');
                return;
            }
        }

        // Query ke database
        $query = $this->connection
            ? DB::connection($this->connection)->table($this->table)
            : DB::table($this->table);

        $existingIds = $query
            ->whereIn($this->column, $ids)
            ->pluck($this->column)
            ->toArray();

        if (!empty($existingIds)) {
            $fail(sprintf(
                'The following IDs in :attribute already exist in %s table: %s',
                $this->table,
                implode(', ', $existingIds)
            ));
        }
    }
}