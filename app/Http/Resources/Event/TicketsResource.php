<?php

namespace App\Http\Resources\Event;

use App\Models\Event;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        /** @var Ticket $ticket */
        $ticket = $this;

        return [
            'id' => $ticket->id,
            'title' => $ticket->title,
            'price' => $ticket->price,
            'start_at' => $ticket->start_at,
            'end_at' => $ticket->end_at
        ];
    }
}
