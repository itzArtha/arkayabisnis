<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemporaryCart extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'expired_at',
        'data'
    ];

    protected $casts = [
        'expired_at' => 'datetime',
        'data' => 'array'
    ];
}
