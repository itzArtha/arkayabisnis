<?php

namespace App\Models;

use App\Casts\Json;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Studio extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'available_hours',
        'event_id',
        'total_seats',
        'total_booked_seats',
        'total_unbooked_seats'
    ];

    protected $casts = [
        'available_hours' => Json::class
    ];

    public function tickets(): BelongsToMany
    {
        return $this->belongsToMany(Ticket::class, 'studio_has_tickets')
            ->withPivot(['total_seats', 'total_booked_seats', 'total_unbooked_seats']);
    }

    public function bookedSeats(): HasMany
    {
        return $this->hasMany(ParticipantHasSeats::class);
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}
