<?php

namespace App\Models\Tokoundangan;

use App\Models\HasTokoundanganConnection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bride extends Model
{
    use HasFactory, HasTokoundanganConnection;

    protected $fillable = [
        'event_id',
        'name',
        'address',
        'type',
        'relation_to_parents'
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function parents(): HasMany
    {
        return $this->hasMany(BrideParent::class);
    }

    public function getDadName()
    {
        return $this->parents()->where('type', BrideParentTypeEnum::DAD->value)->first()->name;
    }

    public function getMomName()
    {
        return $this->parents()->where('type', BrideParentTypeEnum::MOM->value)->first()->name;
    }
}
