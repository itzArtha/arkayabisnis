<?php

namespace App\Actions\Tokoevent\Participant\UI;

use App\Http\Resources\Event\ParticipantsResource;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;
use Inertia\Response;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class IndexParticipants
{
    use AsAction;

    public function handle(ActionRequest $request): LengthAwarePaginator
    {
        $event = $request->user()->event;

        return $event->participants()->paginate(10);
    }

    public function asController(ActionRequest $request): LengthAwarePaginator
    {
        return $this->handle($request);
    }

    public function htmlResponse(LengthAwarePaginator $participants): Response
    {
        return Inertia::render('Event/Participants', [
            'participants' => ParticipantsResource::collection($participants)
        ]);
    }
}
