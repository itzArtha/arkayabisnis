<?php

namespace App\Models;

use App\Casts\Json;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ticket extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'prefix',
        'event_id',
        'start_no',
        'title',
        'description',
        'price',
        'amount',
        'type',
        'max_person',
        'status',
        'is_free',
        'start_at',
        'end_at',
        'seat_layout',
        'time',
        'deleted_at'
    ];

    protected $date = ['deleted_at', 'start_at', 'end_at'];

    protected $hidden = ['deleted_at'];

    protected $attributes = [
        'description' => '',
        'seat_layout' => '{}'
    ];

    protected $casts = [
        'seat_layout' => Json::class
    ];

    const IS_PERSON = 0;
    const IS_GROUP = 1;
    const IS_CINEMA = 2;

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id')->withTrashed();
    }

    public function transaction(): HasMany
    {
        return $this->hasMany(Transaction::class, 'ticket_id');
    }

    public function studio(): BelongsToMany
    {
        return $this->belongsToMany(Studio::class, 'studio_has_tickets')
            ->withPivot(['total_seats', 'total_booked_seats', 'total_unbooked_seats']);
    }

    public function bookedSeats(): HasMany
    {
        return $this->hasMany(ParticipantHasSeats::class);
    }

    // public function setTitleAttribute($title)
    // {
    //     $this->attribute['prefix'] = env('TICKET_PREFIX_ID') . rand();
    // }

    // protected static function boot()
    // {
    //     parent::boot();

    //     static::created(function ($model) {
    //         $model->prefix = env('TICKET_PREFIX_ID') . $model->id;
    //         $model->save();
    //     });
    // }
}
