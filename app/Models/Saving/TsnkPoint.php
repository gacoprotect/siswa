<?php

namespace App\Models\Saving;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TsnkPoint extends BaseModel
{
    use LogsChanges;
    use HasFactory;

    protected $connection = 'mai4';
    protected $table = 'tsnk_points';

    protected $fillable = [
        'tsnk_id',
        'nmr',
        'title',
        'content'
    ];
    protected $casts = [
        'content' => 'array'
    ];
    public function snk()
    {
        return $this->belongsTo(Tsnk::class, 'tsnk_id');
    }
}
