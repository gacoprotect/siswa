<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;

class NotIn implements ValidationRule
{
    protected string $table;
    protected string $column;
    protected ?string $connection;

    /**
     * @param string $table Nama tabel
     * @param string $column Nama kolom (default: 'id')
     * @param string|null $connection Nama koneksi database (opsional)
     */
    public function __construct(string $table, string $column = 'id', ?string $connection = null)
    {
        $this->table = $table;
        $this->column = $column;
        $this->connection = $connection;
    }

    /**
     * Run the validation rule.
     *
     * @param string $attribute
     * @param mixed $value
     * @param Closure $fail
     * @return void
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $query = $this->connection
            ? DB::connection($this->connection)->table($this->table)
            : DB::table($this->table);

        if ($query->where($this->column, $value)->exists()) {
            $fail("The :attribute already exists in {$this->table} table.");
        }
    }
}