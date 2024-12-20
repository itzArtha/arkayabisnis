<?php

namespace App\Actions\Tokoevent\Payment\UI;

use App\Enums\PaymentStatusEnum;
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

class IndexPayments
{
    use AsAction;

    public function handle(?Ots $parent): LengthAwarePaginator
    {
        $globalSearch = AllowedFilter::callback('global', function ($query, $value) {
            $query->where('reference_id', "%$value%");
        });

        $query = QueryBuilder::for($parent ? $parent->payments() : Payment::class);

        $query->where('status', PaymentStatusEnum::IS_SETTLEMENT->value);
        $query->with('transactions');

        return $query->defaultSort('-id')
        ->allowedSorts(['reference_id'])
        ->allowedFilters([$globalSearch])
        ->withPaginator()
        ->withQueryString();
    }
}
