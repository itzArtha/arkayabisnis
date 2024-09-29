<?php

namespace App\Actions\Tokoevent\Ots\UI;

use App\Actions\Tokoevent\Payment\UI\IndexPayments;
use App\Http\Resources\Event\TicketsResource;
use App\Http\Resources\Finance\PaymentsResource;
use App\Http\Resources\Ots\OtsResource;
use App\Models\Event;
use Inertia\Inertia;
use Inertia\Response;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class ShowOts
{
    use AsAction;

    public function handle(Event $event): Event
    {
        return $event;
    }

    public function htmlResponse(Event $event): Response
    {
        return Inertia::render('Event/OtsSystem',
            $event->ots ? [
                'ots' => OtsResource::make($event->ots),
                'tickets' => TicketsResource::collection($event->tickets),
                'payments' => PaymentsResource::collection(IndexPayments::run($event->ots))
            ] : []
        );
    }

    public function asController(Event $event): Event
    {
        return $this->handle($event);
    }
}
