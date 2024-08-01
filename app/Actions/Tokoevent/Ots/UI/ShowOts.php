<?php

namespace App\Actions\Tokoevent\Ots\UI;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class ShowOts
{
    use AsAction;

    public function handle(ActionRequest $request)
    {
        return $request;
    }

    public function htmlResponse(): Response
    {
        return Inertia::render('Event/OtsSystem');
    }

    public function asController(ActionRequest $request): ActionRequest
    {
        return $this->handle($request);
    }
}
