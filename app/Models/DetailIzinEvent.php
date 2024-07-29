<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailIzinEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'pic_id',
        'pic_name',
        'whatsapp',
        'instagram',
        'ktp',
        'izin',
        'booking',
    ];
}
