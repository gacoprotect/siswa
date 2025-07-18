<?php

namespace App\Traits;

use App\Models\Saving\Loggable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Jenssegers\Agent\Agent;
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
            // Get original values before any changes
            $oldData = $this->getOriginal();
            
            // Only include fields that are in $newData
            $oldData = array_intersect_key($oldData, $newData);
            
            // For create action, oldData should be empty
            if ($action === 'create') {
                $oldData = [];
            }
            
            // For delete action, oldData should be all original attributes
            if ($action === 'delete') {
                $oldData = $this->getOriginal();
            }

            // $oldData = $this->convertArraysToJson($oldData);
            // $newData = $this->convertArraysToJson($newData);

            // logger()->debug('Compare Data', [
            //     'OldData' => $oldData,
            //     'NewData' => $newData,
            //     'action' => $action,
            // ]);

            $logData = [
                'loggable_type' => get_class($this),
                'loggable_id' => $this->id,
                'user_id' => Auth::id() ?? 0,
                'action' => $action,
                'old_data' => $oldData,
                'new_data' => $newData,
                'sta' => $sta,
                'ip' => request()?->ip(),
                'ua' => request()?->userAgent(),
                'url' => request()?->fullUrl(),
                'method' => request()?->method(),
                'meta' => $this->getAdditionalMetaData(),
                'log_date' => now()->toDateString(),
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
        logger()->debug('logCreation dipanggil', ['model' => get_class($this), 'id' => $this->id]);

        return $this->logChange($this->getAttributes(), 'create', 0, $useTransaction);
    }

    /**
     * Log model deletion
     */
    public function logDeletion(bool $useTransaction = true): bool
    {
        logger()->debug('logDeletion dipanggil', ['model' => get_class($this), 'id' => $this->id]);

        return $this->logChange([], 'delete', 0, $useTransaction);
    }

    /**
     * Log model restoration
     */
    public function logRestoration(bool $useTransaction = true): bool
    {
        logger()->debug('logRestoration dipanggil', ['model' => get_class($this), 'id' => $this->id]);

        return $this->logChange($this->getAttributes(), 'restore', 0, $useTransaction);
    }

    protected function convertArraysToJson(array $data): array
    {
        return array_map(function ($value) {
            if (is_array($value)) {
                return json_encode($value);
            }
            // Handle cases where value is already JSON encoded
            if (is_string($value) && json_decode($value) !== null) {
                return $value;
            }
            return $value;
        }, $data);
    }

    protected function getAdditionalMetaData(): array
    {
        return [
            'locale' => app()->getLocale(),
            'agent' => $this->parseUserAgent(),
            'extra' => [] // Placeholder for custom data
        ];
    }

    protected function parseUserAgent(): array
    {
        $agent = new Agent();

        return [
            'browser' => [
                'name' => $agent->browser(),
                'version' => $agent->version($agent->browser())
            ],
            'platform' => [
                'name' => $agent->platform(),
                'version' => $agent->version($agent->platform())
            ],
            'device' => [
                'type' => $this->getDeviceType($agent),
                'model' => $agent->device()
            ],
            'is_robot' => $agent->isRobot(),
            'robot_name' => $agent->robot()
        ];
    }

    protected function getDeviceType(Agent $agent): string
    {
        if ($agent->isMobile()) return 'mobile';
        if ($agent->isTablet()) return 'tablet';
        if ($agent->isDesktop()) return 'desktop';
        return 'unknown';
    }
}