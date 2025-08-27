<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Tabel kategori
        Schema::connection('mai1')->create('event_categories', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('color', 32)->default('#DFDFDF');
            $table->string('icon', 64)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        // Tabel events
        Schema::connection('mai1')->create('events', function (Blueprint $table) {
            $table->id();
            $table->string('judul', 255);
            $table->text('desk')->nullable();
            $table->dateTime('start_at');
            $table->dateTime('end_at')->nullable();
            $table->boolean('fullday')->default(false)->comment('seharian penuh');
            $table->string('lokasi', 255)->nullable();
            $table->boolean('penting')->default(false);
            $table->tinyInteger('sifat')->default(0)->comment('0 = optional, 1 = wajib');

            // Relasi kategori
            $table->foreignId('kategori_id')
                ->nullable()
                ->constrained('event_categories')
                ->nullOnDelete();

            $table->boolean('sta')->default(false);
            $table->json('meta')->nullable();
            $table->softDeletes();
            $table->timestamps();
            $table->index(['kategori_id', 'start_at']);
        });

        // Tabel target audiens
        Schema::connection('mai1')->create('event_targets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events')->cascadeOnDelete();
            $table->tinyInteger('target_type')->default(0)->comment('0 = all, 1 = tingkatan, 2 = jurusan, 3 = kelas, 4 = siswa');
            $table->unsignedBigInteger('target_id')->comment('id tingkatan, jurusan, kelas, atau siswa'); // fleksibel, bisa id kelas / siswa
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::connection('mai1')->dropIfExists('event_targets');
        Schema::connection('mai1')->dropIfExists('events');
        Schema::connection('mai1')->dropIfExists('event_categories');
    }
};
