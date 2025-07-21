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
     */
    public function logChange(
        array $newData,
        string $action = 'update',
        int $sta = 0,
        bool $useTransaction = true
    ): bool {

        if (empty(array_filter($newData, function ($value) {
            return $value !== null;
        }))) {
            return false;
        }
        $validActions = ['create', 'update', 'delete', 'restore', 'forceDelete', 'mass_update', 'mass_delete'];
        if (!in_array($action, $validActions)) {
            Log::error("Invalid log action type: {$action}", [
                'model' => static::class,
                'id' => $this->getKey(),
            ]);
            return false;
        }

        try {
            $oldData = $this->prepareOldData($action, $newData);
            $logData = $this->prepareLogData($action, $oldData, $newData, $sta);

            if ($useTransaction) {
                return DB::transaction(fn() => $this->createLogEntry($logData));
            }

            return $this->createLogEntry($logData);
        } catch (Throwable $e) {
            $this->handleLogError($e, $action, $useTransaction);
            return false;
        }
    }

    protected function prepareOldData(string $action, array $newData): array
    {
        return match ($action) {
            'create' => [],
            'delete' => $this->getOriginal(),
            default => array_intersect_key($this->getOriginal(), $newData)
        };
    }

    protected function prepareLogData(
        string $action,
        array $oldData,
        array $newData,
        int $sta
    ): array {
        return [
            'loggable_type' => static::class,
            'loggable_id' => $this->getKey(),
            'user_id' => Auth::id() ?? 0,
            'action' => $action,
            'old_data' => $this->convertArraysToJson($oldData),
            'new_data' => $this->convertArraysToJson($newData),
            'sta' => $sta,
            'ip' => request()?->ip(),
            'ua' => request()?->userAgent(),
            'url' => request()?->fullUrl(),
            'method' => request()?->method(),
            'meta' => $this->getAdditionalMetaData(),
            'log_date' => now()->toDateString(),
        ];
    }

    protected function createLogEntry(array $logData): bool
    {
        Loggable::create($logData);
        return true;
    }

    protected function handleLogError(Throwable $e, string $action, bool $useTransaction): void
    {
        Log::error("Failed to log changes for " . static::class, [
            'id' => $this->getKey(),
            'action' => $action,
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);

        if ($useTransaction && DB::transactionLevel() > 0) {
            DB::rollBack();
        }
    }

    public function logCreation(bool $useTransaction = true): bool
    {
        Log::debug('logCreation called', ['model' => static::class, 'id' => $this->getKey()]);
        return $this->logChange($this->getAttributes(), 'create', 0, $useTransaction);
    }

    public function logDeletion(bool $useTransaction = true): bool
    {
        Log::debug('logDeletion called', ['model' => static::class, 'id' => $this->getKey()]);
        return $this->logChange([], 'delete', 0, $useTransaction);
    }

    public function logRestoration(bool $useTransaction = true): bool
    {
        Log::debug('logRestoration called', ['model' => static::class, 'id' => $this->getKey()]);
        return $this->logChange($this->getAttributes(), 'restore', 0, $useTransaction);
    }

    protected function convertArraysToJson(array $data): array
    {
        return array_map(function ($value) {
            if (is_array($value) || (is_string($value) && json_decode($value) !== null)) {
                return json_encode($value);
            }
            return $value;
        }, $data);
    }

    protected function getAdditionalMetaData(): array
    {
        return [
            'locale' => app()->getLocale(),
            'agent' => $this->parseUserAgent(),
            'extra' => []
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
        return match (true) {
            $agent->isMobile() => 'mobile',
            $agent->isTablet() => 'tablet',
            $agent->isDesktop() => 'desktop',
            default => 'unknown'
        };
    }
}
