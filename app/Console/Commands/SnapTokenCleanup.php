<?php

namespace App\Console\Commands;

use App\Services\Snap\SnapTokenService;
use Illuminate\Console\Command;

class SnapTokenCleanup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'snap:token-cleanup {--bank= : Cleanup tokens for specific bank only}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cleanup expired Snap B2B tokens from database';

    /**
     * Execute the console command.
     */
    public function handle(SnapTokenService $tokenService): int
    {
        $bank = $this->option('bank');

        $this->info('Starting Snap token cleanup...');

        if ($bank) {
            $this->info("Cleaning up tokens for bank: {$bank}");
        } else {
            $this->info('Cleaning up all expired tokens...');
        }

        $deleted = $tokenService->cleanupExpiredTokens();

        if ($deleted > 0) {
            $this->info("Successfully deleted {$deleted} expired token(s).");
        } else {
            $this->info('No expired tokens to cleanup.');
        }

        // Show statistics
        $stats = $tokenService->getStatistics($bank);
        $this->table(
            ['Metric', 'Count'],
            [
                ['Total Tokens', $stats['total']],
                ['Active Tokens', $stats['active']],
                ['Expired Tokens', $stats['expired']],
            ]
        );

        return Command::SUCCESS;
    }
}
