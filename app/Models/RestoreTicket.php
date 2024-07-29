<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RestoreTicket extends Model
{
    use HasFactory;

    protected $fillable = [
        'participant_id',
        'ticket_id',
    ];
}
