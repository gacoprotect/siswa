<?php

namespace App\Models\Saving;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tbank extends BaseModel
{
    use HasFactory;
    use LogsChanges;

    protected $connection = 'mai4';

    protected $table = 'tbank';

    protected $primaryKey = 'id';

    public $timestamps = true;

    protected $fillable = [
        'id',
        'code',
        'bank',
        'va_code',
        'sta',
    ];

    protected $casts = [
        'sta' => 'boolean',
    ];
}
