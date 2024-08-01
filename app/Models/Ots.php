<?php

namespace App\Models;

use App\Casts\Json;
use App\Enums\OtsStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ots extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'organizer_id',
        'event_id',
        'total_sales',
        'total_participants',
        'settings',
        'status'
    ];

    protected $casts = [
        'status' => OtsStatusEnum::class,
        'settings' => Json::class
    ];
}