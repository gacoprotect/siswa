<?php

namespace App\Models\Saving;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tsignsnk extends BaseModel
{
    use HasFactory;

    protected $connection = 'mai4';
    protected $table = 'tsignsnks';

    protected $fillable = [
        'nouid', 'sign', 'snk_version', 'ip_address', 'user_agent'
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
