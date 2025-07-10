<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SymlinkWilayah extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:symlink-wilayah';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
   public function handle()
{
    $publicApi = public_path('api');
    $realApi = base_path('wilayah/static/api');

    if (!file_exists($publicApi)) {
        symlink($realApi, $publicApi);
        $this->info('Symlink wilayah/api → public/api berhasil.');
    } else {
        $this->info('Symlink sudah ada.');
    }
}

}
