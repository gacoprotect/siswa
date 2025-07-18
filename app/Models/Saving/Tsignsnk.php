<?php

namespace App\Models\Saving;

use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tsignsnk extends BaseModel
{
    use LogsChanges;
    use HasFactory;

    protected $connection = 'mai4';
    protected $table = 'tsignsnks';

    protected $fillable = [
        'nouid', 'sign','payload', 'snk_version', 'ip_address', 'user_agent'
    ];
    protected $casts = [
        'payload' => 'array',
    ];

    public function registrasi()
    {
        return $this->belongsTo(Tregistrasi::class, 'nouid', 'nouid');
    }

    public function snk()
    {
        return $this->belongsTo(Tsnk::class, 'snk_version', 'version');
    }
}
