<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::connection('mai1')->create('events', function (Blueprint $table) {
            $table->id();
            $table->string('nouid', 64)->index();
            $table->foreignId('event_category_id')->constrained('event_categories')->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->dateTime('start_at');
            $table->dateTime('end_at')->nullable();
            $table->boolean('all_day')->default(false);
            $table->string('location')->nullable();
            $table->enum('status', ['wajib', 'opsional'])->default('wajib');
            $table->boolean('is_important')->default(false);
            $table->json('meta')->nullable();
            $table->timestamps();
            $table->index(['nouid', 'start_at']);
        });
    }

    public function down(): void
    {
        Schema::connection('mai1')->dropIfExists('events');
    }
};
