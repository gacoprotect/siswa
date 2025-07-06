<?php
namespace App\Traits;

use App\Models\Admin\Loggable;
use Illuminate\Support\Facades\Auth;

trait LogsChanges
{
    public function logChange(array $newData, string $action = 'update'): void
    {
        $oldData = $this->only(array_keys($newData));

        Loggable::create([
            'loggable_type' => get_class($this),
            'loggable_id' => $this->id,
            'user_id' => Auth::id(),
            'action' => $action,
            'old_data' => $oldData,
            'new_data' => $newData,
            'sta' => 0,
        ]);
    }
}
