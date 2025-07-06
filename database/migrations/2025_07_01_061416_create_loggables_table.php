<?php

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
        Schema::create('tloggable', function (Blueprint $table) {
            $table->id();
            $table->string('loggable_type'); //App\Models\Siswa
            $table->unsignedBigInteger('loggable_id'); // ID siswa
            $table->unsignedBigInteger('user_id'); // Pengusul (user yang mengedit)
            $table->string('action'); // "update", "delete", "create"
            $table->json('old_data')->nullable(); // data lama
            $table->json('new_data'); // data yang diajukan
            $table->unsignedTinyInteger('sta')->default(0); //0 = pending, 1 = approved, 2 = rejected
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tloggable');
    }
};
