<?php

namespace App\Http\Resources\Event;

use App\Models\Event;
use App\Models\Participant;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ParticipantsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        /** @var Transaction $transaction */
        $transaction = $this;

        return [
            'name' => $transaction->participant->name,
            'ticket_number' => $transaction->participant->reference,
            'ticket_name' => $transaction->participant->ticket->title,
            'status' => $transaction->status
        ];
    }
}
