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

        Schema::connection('mai4')->create('ttrx', function (Blueprint $table) {
            $table->id();

            $table->string('nouid', 50)->collation('utf8mb3_general_ci');
            $table->string('order_id')->unique();
            $table->decimal('amount', 16, 2);

            $table->unsignedBigInteger('bank_id')->nullable(); // foreign ke tbank
            $table->unsignedBigInteger('pt_id')->nullable();   // foreign ke tpt

            $table->string('phone');
            $table->string('va_number')->nullable();

            $table->enum('status', ['pending', 'success', 'failed', 'canceled'])->default('pending');
            $table->enum('type', ['topup', 'payment', 'withdraw', 'refund'])->default('topup');

            $table->json('spr_id')->nullable(); // idspr
            $table->text('note')->nullable();
            $table->json('pay_data')->nullable();
            $table->text('failure_message')->nullable();
            $table->timestamp('expiry_time');
            $table->integer('created_by');
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
            $table->string('nouid', 50)->collation('utf8mb3_general_ci'); //key atau index
            $table->string('nis', 50);
            $table->decimal('bb', 16, 2); // before balance
            $table->decimal('ab', 16, 2); // after balance
            $table->unsignedBigInteger('trx_id')->unique();
            $table->foreign('trx_id')->references('id')->on('ttrx')->onDelete('cascade');
            
            $table->decimal('amount', 16, 2);
            $table->enum('action', ['increase', 'decrease']);
            $table->text('description')->nullable();
            $table->integer('created_by');

            
            $table->index('nouid');
            $table->index('nis');
            $table->timestamps();
        });

        Schema::connection('mai4')->create('tpaidbill', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('trx_id');
            $table->string('nouid', 50)->collation('utf8mb3_general_ci');
            $table->bigInteger('nmr');
            $table->bigInteger('spr_id')->unique(); // idspr 
            $table->decimal('jum', 16, 2); // Jumlah dibayar jika jen=1 maka minus
            $table->text('ket')->nullable(); // Keterangan jika ada
            $table->tinyInteger('sta')->default(0);
            $table->tinyInteger('created_by')->default(0); 
            $table->timestamp('paid_at')->useCurrent(); // Waktu pembayaran
            $table->timestamps();

            // Foreign Key Constraints
            $table->foreign('trx_id')->references('id')->on('ttrx')->onDelete('cascade');

            // Indexing
            $table->index('nouid');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mai4')->dropIfExists('tpaidbill');
        Schema::connection('mai4')->dropIfExists('ttrxlog');
        Schema::connection('mai4')->dropIfExists('ttrx');
        Schema::connection('mai4')->dropIfExists('tbank');
        Schema::connection('mai4')->dropIfExists('tpt');
    }
};
