<?php

use App\Enums\OtsStatusEnum;
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
        Schema::create('ots', function (Blueprint $table) {
            $table->id();

            $table->uuid();
            $table->unsignedBigInteger('organizer_id');
            $table->unsignedBigInteger('event_id');
            $table->integer('total_sales')->default(0);
            $table->integer('total_participants')->default(0);
            $table->jsonb('settings')->nullable();
            $table->string('status')->default(OtsStatusEnum::INACTIVE->value);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ots');
    }
};
