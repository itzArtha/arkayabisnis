<?php

namespace App\Models\Tokoundangan;

use App\Models\HasTokoundanganConnection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Event extends HasTokoundanganConnection
{
    use HasFactory;
    use HasSlug;

    /**
     * Get the options for generating the slug.
     */

    protected $fillable = [
        'name',
        'subdomain',
        'description',
        'start_date',
        'end_date',
        'timezone',
        'location',
        'status',
        'user_id',
        'theme_id'
    ];

    protected $casts = [
        'data' => 'array',
        'location' => 'array',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    protected $attributes = [
        'data' => '{}',
        'location' => '{}',
    ];

    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->usingSeparator('-')
            ->doNotGenerateSlugsOnUpdate()
            ->saveSlugsTo('subdomain');
    }

    public function getMaleName(): string
    {
        return explode('&', $this->name)[0];
    }

    public function getFemaleName(): string
    {
        return explode('&', $this->name)[1];
    }

    public function guests(): HasMany
    {
        return $this->hasMany(Guest::class);
    }

    public function brides(): HasMany
    {
        return $this->hasMany(Bride::class);
    }

    public function theme(): BelongsTo
    {
        return $this->belongsTo(Theme::class);
    }
}
