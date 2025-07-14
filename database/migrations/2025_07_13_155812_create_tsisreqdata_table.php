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
        Schema::connection('mai4')->create('tsisreqdata', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('idsis')->comment('ID Siswa');
            $table->json('old_data')->comment('Data siswa sebelum perubahan');
            $table->json('new_data')->comment('Data perubahan yang diminta');
            $table->tinyInteger('status')->default(0)->comment('0=pending, 1=approved, -1=rejected');
            $table->text('rejection_reason')->nullable()->comment('Alasan penolakan jika status rejected');
            $table->bigInteger('updated_by')->nullable()->constrained('users')->comment('User yang menyetujui/menolak');
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();

            // Tambahan index
            $table->index('idsis');
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mai4')->dropIfExists('student_data_requests');
        Schema::connection('mai4')->dropIfExists('tsisreqdata');
    }
};
