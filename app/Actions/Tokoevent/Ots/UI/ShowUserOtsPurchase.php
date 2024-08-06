<?php

namespace App\Actions\Tokoevent\Ots\UI;

use App\Http\Resources\Event\TicketsResource;
use App\Http\Resources\Ots\OtsResource;
use App\Models\Event;
use App\Models\Ots;
use Inertia\Inertia;
use Inertia\Response;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class ShowUserOtsPurchase
{
    use AsAction;

    public function handle(Ots $ots): Ots
    {
        return $ots;
    }

    public function htmlResponse(Ots $ots): Response
    {
        return Inertia::render('Event/UserOtsPurchase', [
            'ots' => OtsResource::make($ots),
            'tickets' => TicketsResource::collection($ots->event->tickets)
        ]);
    }

    public function asController(Ots $ots, ActionRequest $request): Ots
    {
        return $this->handle($ots);
    }
}
