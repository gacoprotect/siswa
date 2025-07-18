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
        Schema::connection('mai4')->create('tregistrasi', function (Blueprint $table) {
            $table->id();
            $table->string('nouid')->index()->comment('Nomor UID unik pendaftar');
            $table->string('nama', 100)->comment('Nama lengkap sesuai KTP');
            $table->char('warneg', 2)->comment('Kode negara ISO 2-digit (contoh: ID)');
            $table->string('warneg_name', 100)->comment('Nama negara lengkap');

            // Dokumen identitas
            $table->string('nik', 16)->index()->nullable()->comment('NIK (16 digit untuk WNI)');
            $table->string('kk', 16)->index()->nullable()->comment('Nomor KK (16 digit untuk WNI)');
            $table->string('paspor', 20)->index()->nullable()->comment('Nomor Paspor (WNA)');

            // Alamat
            $table->json('alamat1')->comment('Alamat sesuai KTP (format JSON terstruktur)');
            $table->json('alamat2')->nullable()->comment('Alamat domisili jika berbeda');
            $table->boolean('temtin')->default(false)->comment('Tinggal tidak sesuai KTP (0=alamat1, 1=alamat2)');

            // Kontak
            $table->enum('hub', ['0', '1', '2'])->comment('0=Ayah, 1=Ibu, 2=Wali');
            $table->string('tel', 15)->comment('Nomor telepon/WhatsApp');
            $table->string('email', 100)->index()->comment('Email aktif');

            // Status dan tracking
            $table->tinyInteger('sta')->default(0)->comment('0=pending, 1=acc, -1=rejected, -2=blocked');
            $table->string('updated_by', 50)->nullable()->comment('ID user yang melakukan update');
            $table->text('reject_reason')->nullable()->comment('Alasan penolakan jika sta=-1');

            $table->timestamps();
            $table->softDeletes()->comment('Untuk arsip data');

            // Index tambahan
            $table->index(['warneg', 'sta']);
            $table->index(['email', 'tel']);
        });

        Schema::connection('mai4')->create('tsnk', function (Blueprint $table) {
            $table->id();
            $table->string('version', 20)->unique();
            $table->string('title');
            $table->text('summary')->nullable();
            $table->boolean('is_active')->default(false);
            $table->boolean('is_required')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->timestamp('effective_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
        Schema::connection('mai4')->create('tsnk_points', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tsnk_id');
            $table->foreign('tsnk_id')->references('id')->on('tsnk')->onDelete('cascade');
            $table->unsignedSmallInteger('nmr')->comment('Urutan point');
            $table->string('title')->nullable();
            $table->json('content')->comment('Format konten dalam json');
            $table->timestamps();
        });
        Schema::connection('mai4')->create('tsignsnks', function (Blueprint $table) {
            $table->id();
            $table->string('nouid')->index()->comment('Referensi ke tregistrasi.nouid');
            $table->string('sign')->comment('Tanda tangan digital (enkripsi/hash)');
            $table->text('payload')->comment("signature payload");
            $table->string('snk_version', 20)->comment('Versi Syarat dan Ketentuan');
            $table->ipAddress('ip_address')->nullable()->comment('IP saat menyetujui');
            $table->string('user_agent')->nullable()->comment('Device user saat menyetujui');

            $table->timestamps();

            // Index komposit
            $table->index(['nouid', 'snk_version'], 'uid_snk_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('mai4')->dropIfExists('tsnk_points');
        Schema::connection('mai4')->dropIfExists('tsnk');
        Schema::connection('mai4')->dropIfExists('tsignsnks');
        Schema::connection('mai4')->dropIfExists('tregistrasi');
    }
};
