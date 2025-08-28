<?php

namespace App\Models\Admin;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventCategory extends BaseModel
{
    use SoftDeletes, LogsChanges;

    protected $connection = 'mai1';
    protected $table = 'event_categories';

    protected $fillable = [
        'slug',
        'name',
        'color',
        'icon',
    ];

    public function events()
    {
        return $this->hasMany(Event::class, 'kategori_id');
    }
}
