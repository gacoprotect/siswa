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
        // Tabel pengampu ekskul
        Schema::connection('mai2')->create('tpel_excul', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('telepon');
            $table->timestamps();
        });

        // Tabel ekskul
        Schema::connection('mai2')->create('excul', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('day');
            $table->string('time');
            $table->foreignId('pel_id')->constrained('tpel_excul')->onDelete('cascade');
            $table->unsignedInteger('quota');
            $table->unsignedInteger('registered')->default(0);
            $table->string('icon')->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mai2')->dropIfExists('excul');
        Schema::connection('mai2')->dropIfExists('tpel_excul');
    }
};
