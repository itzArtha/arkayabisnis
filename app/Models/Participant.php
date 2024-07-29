<?php

namespace App\Models;

use App\Casts\Json;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Participant extends Model
{
    use HasFactory;
    protected $fillable = [
        'uuid',
        'reference',
        'user_id',
        'event_id',
        'ticket_id',
        'data',
        'notes',
        'status'
    ];

    protected $casts = [
        'data' => Json::class
    ];

    // protected $with = ["user", "event", "ticket"];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function transaction(): HasOne
    {
        return $this->hasOne(Transaction::class, 'participant_id');
    }

    public function presence(): HasOne
    {
        return $this->hasOne(ParticipantPresence::class, 'participant_id');
    }

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id')->withTrashed();
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id')->withTrashed();
    }

    public function seat()
    {
        return $this->hasOne(ParticipantHasSeats::class);
    }
}
