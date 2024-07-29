<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = [
        'ticket_id',
        'payment_id',
        'participant_id',
        'amount',
        'subtotal',
        'status',
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id')->withTrashed();
    }

    public function invoice()
    {
        return $this->hasOne(Invoice::class, 'transaction_id');
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class, 'payment_id');
    }

    public function participant()
    {
        return $this->belongsTo(Participant::class, 'participant_id');
    }
}
