<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presence extends Model
{
    use HasFactory;
    protected $with = ['event'];
    protected $fillable = [
        'event_id',
        'slug',
        'certificates',
        'is_share_certificate',
        'is_need_signature',
        'path_for_users'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }
}
