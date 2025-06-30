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
        // Schema::connection('mai2')->table('tsiswa', function (Blueprint $table) {
        //     // $table->string('pin', 255)->nullable()->after('ala');
        //     // $table->json('excul')->nullable()->after('pin');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::connection('mai2')->table('tsiswa', function (Blueprint $table) {
        //     //
        // });
    }
};
