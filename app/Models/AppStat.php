<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AppStat extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function organizer(): BelongsTo
    {
        return $this->belongsTo(Organization::class, 'organizer_id');
    }
}
