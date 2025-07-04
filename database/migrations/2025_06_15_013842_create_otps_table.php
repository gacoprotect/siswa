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
        Schema::connection('mai1')->create('totps', function (Blueprint $table) {
            $table->id();
            $table->string('phone'); 
            $table->unsignedInteger('attempts')->default(0);
            $table->string('otp');  
            $table->timestamp('expires_at'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mai1')->dropIfExists('totps');
    }
};
