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
        Schema::connection('mai4')->create('timagable', function (Blueprint $table) {
            $table->id();

            $table->string('name')->comment('Nama file (misal: ktp, paspor)');
            $table->string('path')->comment('Path penyimpanan relatif di storage');
            $table->string('mime_type')->nullable()->comment('Tipe MIME file');
            $table->unsignedBigInteger('size')->nullable()->comment('Ukuran file dalam byte');

            $table->morphs('imagable');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mai4')->dropIfExists('timagable');
    }
};
