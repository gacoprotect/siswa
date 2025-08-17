<?php
namespace App\Models\Admin;

use App\Enums\Status;
use App\Models\BaseModel;
use App\Traits\LogsChanges;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tizin extends BaseModel
{
    use LogsChanges;

    protected $connection = 'mai1';
    protected $table = 'tizin';
    protected $primaryKey = 'id';
    
    protected $appends = ['title'];
    protected $hidden = [
        "idsis",
        "jen",
        "jenis",
        "updated_at", 
        "deleted_at" 
    ];
    
    protected $fillable = [
        'idsis',
        'jen',
        'tgl_mulai',
        'tgl_akhir',
        'ket',
        'dok',
        'sta',
    ];

    public function jenis(): BelongsTo
    {
        return $this->belongsTo(Tizinjenis::class, 'jen', 'id');
    }

    public function title(): Attribute
    {
        return Attribute::get(fn () => $this->jenis?->title);
    }

    public function sta(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Status::tryFrom($value)?->label() ?? 'Unknown Status',
            set: fn ($value) => $this->resolveStatusValue($value)
        );
    }

    protected function resolveStatusValue($value): int
    {
        // Jika sudah berupa nilai integer yang valid
        if (is_int($value) && Status::tryFrom($value) !== null) {
            return $value;
        }

        // Jika berupa string nama status
        if (is_string($value)) {
            foreach (Status::cases() as $case) {
                if ($case->name === $value || $case->label() === $value) {
                    return $case->value;
                }
            }
        }

        // Default value jika tidak ditemukan
        return Status::tryDefault()->value;
    }
}