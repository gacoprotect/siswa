<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\LogsChanges;

abstract class BaseModel extends Model
{
    use LogsChanges;

    protected static function boot()
    {
        parent::boot();

        static::created(function ($model) {
            if (method_exists($model, 'logCreation')) {
                $model->logCreation();
            }
        });

        static::updated(function ($model) {
            if (method_exists($model, 'logChange')) {
                $model->logChange($model->getChanges(), 'update');
            }
        });

        static::deleted(function ($model) {
            if (method_exists($model, 'logDeletion')) {
                $model->logDeletion();
            }
        });

        if (method_exists(static::class, 'restored')) {
            static::restored(function ($model) {
                $model->logRestoration();
            });
        }
    }
}
