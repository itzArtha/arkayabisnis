<?php

namespace App\Actions\Tokoundangan\Event\UI;

use App\Models\Tokoundangan\Event;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;
use Inertia\Response;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class CreateEvent
{
    use AsAction;

    public function handle(ActionRequest $request)
    {
        return $request;
    }

    public function htmlResponse(): Response
    {
        return Inertia::render('Undangan/CreateUndangan');
    }
}
