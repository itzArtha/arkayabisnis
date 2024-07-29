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
        Schema::table('detail_izin_events', function (Blueprint $table) {
            $table->after('id', function () use ($table) {
                $table->string('pic_id')->nullable();
                $table->string('pic_name');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('detail_izin_events', function (Blueprint $table) {
            //
        });
    }
};
