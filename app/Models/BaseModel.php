<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\LogsChanges;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

abstract class BaseModel extends Model
{
    use LogsChanges;

    const CREATED_AT = 'createdat';
    const UPDATED_AT = 'updatedat';

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            // Nonaktifkan timestamps jika kolom tidak ada
            if (!self::hasTimestampColumns($model)) {
                $model->timestamps = false;
            }
        });

        static::created(function ($model) {
            if (method_exists($model, 'logCreation')) {
                Log::debug('Logging model creation', ['model' => get_class($model), 'id' => $model->id]);
                $model->logCreation();
            }
        });

        static::updated(function ($model) {
            if (method_exists($model, 'logChange')) {
                Log::debug('Logging model update', ['model' => get_class($model), 'id' => $model->id]);
                $model->logChange($model->getChanges(), 'update');
            }
        });

        static::deleted(function ($model) {
            if (method_exists($model, 'logDeletion')) {
                Log::debug('Logging model delete', ['model' => get_class($model), 'id' => $model->id]);
                $model->logDeletion();
            }
        });

        if (method_exists(static::class, 'restored')) {
            static::restored(function ($model) {
                Log::debug('Logging model restore', ['model' => get_class($model), 'id' => $model->id]);
                $model->logRestoration();
            });
        }
    }

    /**
     * Check if the table has timestamp columns.
     */
    protected static function hasTimestampColumns($model): bool
    {
        $table = $model->getTable();

        return Schema::hasColumn($table, 'createdat') &&
            Schema::hasColumn($table, 'updatedat');
    }

    /**
     * Get the name of the "created at" column.
     */
    public function getCreatedAtColumn()
    {
        return self::hasTimestampColumns($this) ? static::CREATED_AT : null;
    }

    /**
     * Get the name of the "updated at" column.
     */
    public function getUpdatedAtColumn()
    {
        return self::hasTimestampColumns($this) ? static::UPDATED_AT : null;
    }
}
