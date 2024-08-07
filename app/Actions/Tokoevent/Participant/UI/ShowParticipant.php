<?php

namespace App\Actions\Tokoevent\Participant\UI;

use App\Http\Resources\Event\ParticipantsResource;
use App\Models\Ots;
use App\Models\Payment;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;
use Inertia\Response;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;
use App\Services\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

class ShowParticipant
{
    use AsAction;

    public function handle(Payment $parent, ActionRequest $request): LengthAwarePaginator
    {
        $globalSearch = AllowedFilter::callback('global', function ($query, $value) {
            $query->where('reference', "%$value%");
        });

        $query = QueryBuilder::for($parent->transactions());

        $query->with('participant');
        $query->whereNotNull('reference');

        return $query->defaultSort('-reference')
        ->allowedSorts(['reference'])
        ->allowedFilters([$globalSearch])
        ->withPaginator()
        ->withQueryString();
    }

    public function asController(Payment $payment, ActionRequest $request): LengthAwarePaginator
    {
        return $this->handle($payment, $request);
    }

    public function htmlResponse(LengthAwarePaginator $participants): Response
    {
        return Inertia::render('Ots/Tickets', [
            'participants' => ParticipantsResource::collection($participants)
        ]);
    }
}
