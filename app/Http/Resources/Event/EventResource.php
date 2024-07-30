<?php

namespace App\Http\Resources\Event;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        /** @var Event $event */
        $event = $this;

        return [
            'title' => $event->title,
            'start_at' => $event->start_at,
            'end_at' => $event->end_at,
            'category_name' => $event->category?->name,
            'format_name' => $event->format?->name,
            'banner_url' => $event->getBanner()
        ];
    }
}
