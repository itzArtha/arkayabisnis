<?php

namespace App\Actions\Tokoevent\Ots\UI;

use App\Actions\Helpers\GenerateQrCode;
use App\Http\Resources\Event\TicketsResource;
use App\Http\Resources\Ots\OtsResource;
use App\Models\Event;
use Inertia\Inertia;
use Inertia\Response;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class ShowOts
{
    use AsAction;

    public function handle(ActionRequest $request): Event
    {
        return $request->user()->event;
    }

    public function htmlResponse(Event $event): Response
    {
        return Inertia::render('Event/OtsSystem', [
            'ots' => OtsResource::make($event->ots),
            'tickets' => TicketsResource::collection($event->tickets)
        ]);
    }

    public function asController(ActionRequest $request): Event
    {
        return $this->handle($request);
    }
}
