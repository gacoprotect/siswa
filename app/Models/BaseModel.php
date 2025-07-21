<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\LogsChanges;
use Illuminate\Support\Facades\Log;

abstract class BaseModel extends Model
{
    use LogsChanges;

    protected static function boot()
    {
        parent::boot();

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
}
