<?php

namespace App\Traits;

use App\Models\Admin\Loggable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

trait LogsChanges
{
    /**
     * Log changes to the model with transaction support and robust error handling
     *
     * @param array $newData
     * @param string $action
     * @param int $sta
     * @param bool $useTransaction
     * @return bool Returns true if logging succeeded, false otherwise
     */
    public function logChange(
        array $newData,
        string $action = 'update',
        int $sta = 0,
        bool $useTransaction = true
    ): bool {
        // Validate action type
        if (!in_array($action, ['create', 'update', 'delete', 'restore', 'forceDelete'])) {
            Log::error("Invalid log action type: {$action}", [
                'model' => get_class($this),
                'id' => $this->id ?? null,
            ]);
            return false;
        }

        try {
            // Only get the attributes that are actually being changed
            $oldData = $this->only(array_keys($newData));

            // Skip logging if no actual changes detected (for update actions)
            if ($action === 'update' && empty(array_diff_assoc($newData, $oldData))) {
                return true;
            }

            $logData = [
                'loggable_type' => get_class($this),
                'loggable_id' => $this->id,
                'user_id' => Auth::id(),
                'action' => $action,
                'old_data' => $oldData,
                'new_data' => $newData,
                'sta' => $sta,
                // 'ip_address' => request()?->ip(),
                // 'user_agent' => request()?->userAgent(),
            ];

            if ($useTransaction) {
                return DB::transaction(function () use ($logData) {
                    Loggable::create($logData);
                    return true;
                });
            }

            Loggable::create($logData);
            return true;
        } catch (Throwable $e) {
            Log::error("Failed to log changes for model", [
                'exception' => $e->getMessage(),
                'model' => get_class($this),
                'id' => $this->id ?? null,
                'action' => $action,
                'trace' => $e->getTraceAsString(),
            ]);

            if ($useTransaction && DB::transactionLevel() > 0) {
                DB::rollBack();
            }

            return false;
        }
    }

    /**
     * Log model creation
     */
    public function logCreation(bool $useTransaction = true): bool
    {
        return $this->logChange($this->getAttributes(), 'create', 0, $useTransaction);
    }

    /**
     * Log model deletion
     */
    public function logDeletion(bool $useTransaction = true): bool
    {
        return $this->logChange([], 'delete', 0, $useTransaction);
    }

    /**
     * Log model restoration
     */
    public function logRestoration(bool $useTransaction = true): bool
    {
        return $this->logChange($this->getAttributes(), 'restore', 0, $useTransaction);
    }
}