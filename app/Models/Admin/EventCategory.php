<?php

namespace App\Models\Admin;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EventCategory extends BaseModel
{
    use LogsChanges;

    protected $connection = 'mai1';

    protected $table = 'event_categories';

    protected $fillable = [
        'slug',
        'name',
        'color',
        'icon',
    ];

    public function events(): HasMany
    {
        return $this->hasMany(Event::class, 'event_category_id');
    }
}
