<?php

namespace App\Models\Tokoundangan;

use App\Models\HasTokoundanganConnection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Guest extends Model
{
    use HasFactory;
    use HasSlug, HasTokoundanganConnection;

    protected $fillable = [
        'slug',
        'name',
        'email',
        'event_id',
        'user_id',
        'notes',
        'is_attending'
    ];

    protected $casts = [
        'is_attending' => 'boolean',
    ];


    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }
}
