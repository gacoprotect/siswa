<?php

use App\Enums\Status;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::connection('mai1')->create('tizinjenis', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title');
            $table->tinyInteger('sta')->comment('0=active, -1=inactive');
            $table->softDeletes();
            $table->timestamps();
        });
        Schema::connection('mai1')->create('tizin', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idsis');
            $table->foreignId('jen')->constrained('tizinjenis')->cascadeOnDelete();
            $table->date('tgl_mulai');
            $table->date('tgl_akhir');
            $table->text('ket');
            $table->unsignedBigInteger('dok')->nullable();
            $table->tinyInteger('sta')->default(Status::MENUNGGU->value)
                ->comment('0: menunggu, 1: disetujui, -1: ditolak, -2: dibatalkan');
            $table->softDeletes();
            $table->timestamps();

            $table->index(['idsis', 'jen', 'dok']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mai1')->dropIfExists('tizin');
        Schema::connection('mai1')->dropIfExists('tizinjenis');
    }
};
