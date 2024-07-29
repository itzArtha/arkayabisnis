<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reminder extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'remind_at',
        'data',
        'via',
    ];

    protected $date = ['remind_at'];

    const VIA_MAIL = 0;
    const VIA_WA = 1;
}
