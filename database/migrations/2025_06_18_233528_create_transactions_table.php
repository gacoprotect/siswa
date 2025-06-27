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
        Schema::connection('mai4')->create('tpt', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // contoh: 'va', 'cash', 'wallet'
            $table->string('pt');             // misalnya: 'Virtual Account', 'Kasir'
            $table->timestamps();
        });

        Schema::connection('mai4')->create('tbank', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // misal 'bca'
            $table->string('bank');           // misal: 'Bank Central Asia'
            $table->timestamps();
        });

        Schema::connection('mai4')->create('tbalance', function (Blueprint $table) {
            $table->string('nouid', 50)->primary(); // satu user satu saldo
            $table->string('nis', 50);
            $table->decimal('balance', 16, 2)->default(0);

            $table->timestamps();

            $table->index('nis');
        });

        Schema::connection('mai4')->create('ttrx', function (Blueprint $table) {
            $table->id();

            $table->string('nouid', 50)->collation('utf8mb3_general_ci');
            $table->string('order_id')->unique();
            $table->decimal('amount', 16, 2);

            $table->unsignedBigInteger('bank_id')->nullable(); // foreign ke tbank
            $table->unsignedBigInteger('pt_id')->nullable();   // foreign ke tpt

            $table->string('phone');
            $table->string('va_number')->nullable();

            $table->enum('status', ['pending', 'success', 'failed'])->default('pending');
            $table->enum('type', ['topup', 'payment', 'withdraw', 'refund'])->default('topup');

            $table->text('note')->nullable();
            $table->json('pay_data')->nullable();
            $table->text('failure_message')->nullable();
            $table->timestamp('expiry_time')->nullable();
            $table->timestamp('paid_at')->nullable();

            $table->timestamps();

            $table->foreign('bank_id')->references('id')->on('tbank')->nullOnDelete();
            $table->foreign('pt_id')->references('id')->on('tpt')->nullOnDelete();

            $table->index('nouid');
            $table->index('order_id');
            $table->index('status');
        });

        Schema::connection('mai4')->create('ttrxlog', function (Blueprint $table) {
            $table->id();
            $table->string('nouid', 50)->collation('utf8mb3_general_ci');

            $table->unsignedBigInteger('trx_id');
            $table->foreign('trx_id')->references('id')->on('ttrx')->onDelete('cascade');

            $table->decimal('amount', 16, 2);
            $table->enum('action', ['increase', 'decrease']); // untuk mencatat perubahan
            $table->text('description')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mai4')->dropIfExists('ttrxlog');
        Schema::connection('mai4')->dropIfExists('ttrx');
        Schema::connection('mai4')->dropIfExists('tbalance');
        Schema::connection('mai4')->dropIfExists('tbank');
        Schema::connection('mai4')->dropIfExists('tpt');
    }
};
