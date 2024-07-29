<?php

namespace App\Models;

use Bavix\Wallet\Interfaces\Wallet;
use Bavix\Wallet\Traits\HasWallet;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property User $parent
 */

class Organization extends Authenticatable implements Wallet
{
    use HasApiTokens, HasFactory, Notifiable, HasWallet;

    protected $fillable = [
        'parent_id',
        'description',
        'tagline',
        'banner_url',
        'address',
        'is_verified',
        'shareable_id',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    public function stats(): HasOne
    {
        return $this->hasOne(OrgStat::class, 'organizer_id');
    }

    public function shareable(): BelongsTo
    {
        return $this->belongsTo(ShareableUrl::class, 'shareable_id');
    }
}
