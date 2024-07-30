<?php

namespace App\Http\Resources\Event;

use App\Models\Event;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ParticipantsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        /** @var Participant $participant */
        $participant = $this;

        return [
            'name' => $participant->user->name,
            'ticket_number' => $participant->reference,
            'ticket_name' => $participant->ticket->title,
            'status' => $participant->status,
        ];
    }
}
