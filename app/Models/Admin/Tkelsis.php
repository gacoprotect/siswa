<?php

namespace App\Models\Admin;

use App\Models\BaseModel;
use App\Models\Datmas\Indentitas;
use App\Models\Datmas\Siswa;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Tkelsis extends BaseModel
{
    use LogsChanges;
    
    protected $connection = 'mai1';
    protected $table = 'tkelsis';
    protected $primaryKey = 'ids';
    public $timestamps = false;
    protected $appends = ['kel'];
    protected $hidden = [
        "createdat",
        "updatedat",
        "createdby",
        "updatedby",
    ];
    // protected $fillable = [
    // 'tin',
    // 'idta',
    // 'ids',
    // 'idkel',
    // 'sta',
    // 'createdat',
    // 'updatedat',
    // 'createdby',
    // 'updatedby',
    // ];

     public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'ids', 'id');
    }
     public function identitas()
    {
        return $this->belongsTo(Indentitas::class, 'ids', 'idok');
    }
     public function kelas()
    {
        return $this->belongsTo(Tkelas::class, 'idkel', 'id');
    }
    public function kel(): Attribute
    {
        return Attribute::get(function () {
            return $this->kelas->nam;
        });
    }
}
