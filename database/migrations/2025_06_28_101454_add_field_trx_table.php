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
        // Migrasi untuk tabel ttrx
        Schema::connection('mai4')->table('ttrx', function (Blueprint $table) {
            $table->json('spr_id')->nullable()->after('pay_data');
            $table->json('jen1')->nullable()->after('spr_id');
            $table->string('created_by')->after('updated_at');
        });

        // Migrasi untuk tabel ttrxlog
        Schema::connection('mai4')->table('ttrxlog', function (Blueprint $table) {
            $table->decimal('bb', 16, 2)->default(0)->after('description');
            $table->decimal('ab', 16, 2)->default(0)->after('bb');
            $table->string('created_by')->after('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mai4')->table('ttrx', function (Blueprint $table) {
            $table->dropColumn(['spr_id', 'jen1', 'created_by']);
        });

        Schema::connection('mai4')->table('ttrxlog', function (Blueprint $table) {
            $table->dropColumn(['bb', 'ab', 'created_by']);
        });
    }
};