<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Event extends Model
{
    use HasFactory, SoftDeletes, HasSlug;

    protected $fillable = [
        'organizer_id',
        'title',
        'slug',
        'description',
        'terms',
        'location',
        'start_at',
        'end_at',
        'photo_url',
        'banner_url',
        'is_online',
        'status',
        'stream_url',
        'format_id',
        'category_id',
        'shareable_id',
        'edited_by_id',
        "deleted_at",
    ];

    const IS_DRAFT    = 0;
    const IS_ACTIVE   = 1;
    const IS_ENDED    = 2;
    const IS_PENDING  = 3;
    const IS_REJECTED = 4;

    protected $attributes = [
        'status' => self::IS_PENDING
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime'
    ];

    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function getStatus(): array
    {
        switch ($this->status) {
            case self::IS_DRAFT:
                return [
                    'label' => 'Draft',
                    'color' => 'bg-indigo-100 text-indigo-800'
                ];
            case self::IS_ACTIVE:
                return [
                    'label' => 'Aktif',
                    'color' => 'bg-green-100 text-green-800'
                ];
            case self::IS_ENDED:
                return [
                    'label' => 'Selesai',
                    'color' => 'bg-red-100 text-red-800'
                ];
            case self::IS_PENDING:
                return [
                    'label' => 'Pending',
                    'color' => 'bg-yellow-100 text-yellow-800'
                ];
            case self::IS_REJECTED:
                return [
                    'label' => 'Ditolak',
                    'color' => 'bg-red-100 text-red-800'
                ];
            default:
                return [
                    'label' => 'Tidak diketahui',
                    'color' => 'bg-red-100 text-red-800'
                ];
        }
    }

    public function getBanner()
    {
        return $this->banner_url ? $this->banner_url : asset('images/placeholders/banner-event.png');
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function organizer()
    {
        return $this->hasMany(EventOrganizer::class, 'event_id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'event_id');
    }

    public function detailIzin()
    {
        return $this->hasOne(DetailIzinEvent::class, 'event_id');
    }

    public function lastEdited()
    {
        return $this->belongsTo(User::class, 'edited_by_id');
    }

    public function shareable()
    {
        return $this->belongsTo(ShareableUrl::class, 'shareable_id');
    }

    public function APInformation()
    {
        return $this->hasOne(AdditionalParticipantInformation::class, 'event_id');
    }

    public function viewers()
    {
        return $this->hasMany(EventViewer::class, 'event_id');
    }

    public function category()
    {
        return $this->belongsTo(EventCategory::class, 'category_id');
    }

    public function format()
    {
        return $this->belongsTo(EventFormat::class, 'format_id');
    }

    public function participants()
    {
        return $this->hasMany(Participant::class, 'event_id');
    }

    public function studios()
    {
        return $this->hasMany(Studio::class);
    }

    public function stats()
    {
        return $this->hasOne(EventStat::class, 'event_id');
    }

    public function ots()
    {
        return $this->hasOne(Ots::class, 'event_id');
    }
}
