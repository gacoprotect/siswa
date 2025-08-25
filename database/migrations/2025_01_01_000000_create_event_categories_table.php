<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::connection('mai1')->create('event_categories', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('color', 32)->default('#999999');
            $table->string('icon', 64)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::connection('mai1')->dropIfExists('event_categories');
    }
};
