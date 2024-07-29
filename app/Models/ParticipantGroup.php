<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParticipantGroup extends Model
{
    use HasFactory;
    protected $fillable = [
        'leader_id',
        'user_id',
        'data',
    ];

    public function leader()
    {
        return $this->belongsTo(Participant::class, 'leader_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
