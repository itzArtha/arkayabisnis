<?php

namespace App\Actions\Tokoevent\Ots\UI;

use App\Models\Ots;
use Inertia\Inertia;
use Inertia\Response;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class ShowOts
{
    use AsAction;

    public function handle(ActionRequest $request): Ots|null
    {
        return $request->user()->event->ots;
    }

    public function htmlResponse(Ots|null $ots): Response
    {
        return Inertia::render('Event/OtsSystem', [
            'ots' => $ots
        ]);
    }

    public function asController(ActionRequest $request): Ots|null
    {
        return $this->handle($request);
    }
}
