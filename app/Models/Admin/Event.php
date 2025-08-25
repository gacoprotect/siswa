<?php

namespace App\Models\Admin;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends BaseModel
{
    use LogsChanges;

    protected $connection = 'mai1';

    protected $table = 'events';

    protected $fillable = [
        'nouid',
        'event_category_id',
        'title',
        'description',
        'start_at',
        'end_at',
        'all_day',
        'location',
        'status',
        'is_important',
        'meta',
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
        'all_day' => 'boolean',
        'is_important' => 'boolean',
        'meta' => 'array',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(EventCategory::class, 'event_category_id');
    }

    public function color(): Attribute
    {
        return Attribute::get(fn () => $this->category?->color ?? '#999999');
    }

    public function icon(): Attribute
    {
        return Attribute::get(fn () => $this->category?->icon);
    }
}
