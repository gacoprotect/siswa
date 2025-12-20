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
        Schema::connection('mai4')->create('snap_tokens', function (Blueprint $table) {
            $table->id();
            $table->string('bank', 50)->comment('Bank name (ocbc, bca, mandiri, cimb)');
            $table->string('client_id', 255)->comment('Client ID dari config');
            $table->string('ip', 45)->nullable()->comment('IP address peminta token');
            $table->json('meta')->nullable()->comment('Meta data tambahan (user agent, header, dsb)');
            $table->text('access_token')->comment('Access token dari B2B API');
            $table->string('token_type', 20)->default('bearer')->comment('Token type (bearer)');
            $table->integer('expires_in')->comment('Token expiration time in seconds');
            $table->timestamp('expires_at')->comment('Token expiration timestamp');
            $table->boolean('is_active')->default(true)->comment('Status token (active/inactive)');
            $table->timestamp('last_used_at')->nullable()->comment('Last time token was used');
            $table->timestamps();

            // Index untuk performa query
            $table->index(['bank', 'client_id', 'is_active']);
            $table->index(['expires_at', 'is_active']);
            $table->index('last_used_at');
            $table->index('ip');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mai4')->dropIfExists('snap_tokens');
    }
};
