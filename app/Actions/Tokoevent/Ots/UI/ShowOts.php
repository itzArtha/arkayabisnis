<?php

namespace App\Actions\Tokoevent\Ots\UI;

use App\Models\Event;
use Inertia\Inertia;
use Inertia\Response;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;
use Spatie\LaravelOptions\Options;

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
            'ots' => $event->ots,
            'tickets' => Options::forArray($event->tickets->pluck('title', 'id'))
        ]);
    }

    public function asController(ActionRequest $request): Event
    {
        return $this->handle($request);
    }
}
