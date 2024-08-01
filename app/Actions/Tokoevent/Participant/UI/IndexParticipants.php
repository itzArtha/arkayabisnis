<?php

namespace App\Actions\Tokoevent\Participant\UI;

use App\Http\Resources\Event\ParticipantsResource;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;
use Inertia\Response;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;
use App\Services\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

class IndexParticipants
{
    use AsAction;

    public function handle(ActionRequest $request): LengthAwarePaginator
    {
        $event = $request->user()->event;

        $globalSearch = AllowedFilter::callback('global', function ($query, $value) {
            $query->where('reference', "%$value%");
        });

        $query = QueryBuilder::for($event->participants());

        $query->with('ticket', 'user');

        return $query->defaultSort('-reference')
        ->allowedSorts(['reference'])
        ->allowedFilters([$globalSearch])
        ->withPaginator()
        ->withQueryString();
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
