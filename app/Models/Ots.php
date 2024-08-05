<?php

namespace App\Models;

use App\Casts\Json;
use App\Enums\OtsStatusEnum;
use Bavix\Wallet\Interfaces\Wallet;
use Bavix\Wallet\Traits\HasWallet;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Ots extends Model implements Wallet
{
    use HasFactory, HasWallet;

    protected $fillable = [
        'uuid',
        'organizer_id',
        'event_id',
        'total_sales',
        'total_participants',
        'settings',
        'status'
    ];

    protected $casts = [
        'status' => OtsStatusEnum::class,
        'settings' => Json::class
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function payments(): MorphMany
    {
        return $this->morphMany(Payment::class, 'sourceable');
    }
}
