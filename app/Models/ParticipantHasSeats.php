<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ParticipantHasSeats extends Pivot
{
    use HasFactory;

    protected $table = 'participant_has_seats';

    protected $fillable = [
        'studio_id',
        'event_id',
        'ticket_id',
        'seat',
        'expired_at',
        'booked_at'
    ];

    protected $casts = [
        'expired_at' => 'datetime',
        'booked_at' => 'datetime'
    ];

    public function studio(): BelongsTo
    {
        return $this->belongsTo(Studio::class);
    }
}
