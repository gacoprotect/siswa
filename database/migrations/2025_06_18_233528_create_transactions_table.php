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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tindentitas_id')->constrained()->onDelete('cascade');
            $table->foreignId('tsiswa_id')->nullable()->constrained()->onDelete('set null');
            $table->string('nouid');
            $table->string('order_id')->unique();
            $table->decimal('amount', 12, 2);
            $table->string('bank');
            $table->string('phone');
            $table->string('va_number')->nullable();
            $table->string('payment_type');
            $table->string('status')->default('pending');
            $table->json('payment_data')->nullable();
            $table->text('failure_message')->nullable();
            $table->timestamp('expiry_time')->nullable();
            $table->timestamps();

            $table->index('nouid');
            $table->index('order_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
