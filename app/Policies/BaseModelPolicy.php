<?php

namespace App\Policies;

use App\Models\BaseModel;
use App\Models\Datmas\Siswa;
use Illuminate\Auth\Access\Response;

class BaseModelPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(Siswa $siswa): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Siswa $siswa, BaseModel $baseModel): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Siswa $siswa): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Siswa $siswa, BaseModel $baseModel): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Siswa $siswa, BaseModel $baseModel): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Siswa $siswa, BaseModel $baseModel): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Siswa $siswa, BaseModel $baseModel): bool
    {
        return false;
    }
}
