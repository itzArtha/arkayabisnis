<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ParticipantPresence extends Model
{
    use HasFactory;
    protected $fillable = [
        'presence_id',
        'participant_id',
        'presence_at',
        'signature',
    ];

    protected $with = ['presence', 'participant'];

    protected $dates = [
        'presence_at',
    ];

    public function presence(): BelongsTo
    {
        return $this->belongsTo(Presence::class, 'presence_id');
    }

    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class, 'participant_id');
    }
}
