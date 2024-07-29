<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdditionalParticipantInformation extends Model
{
    use HasFactory;

    protected $fillable = [
        "event_id",
        "name",
        "email",
        "hp",
        "instansi",
        "ktp",
        "nim",
        "referral",
    ];
}
