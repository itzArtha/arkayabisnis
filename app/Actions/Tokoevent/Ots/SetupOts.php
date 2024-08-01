<?php

namespace App\Actions\Tokoevent\Event;

use App\Enums\OtsStatusEnum;
use App\Models\Event;
use App\Models\User;
use Inertia\Inertia;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;
use Symfony\Component\HttpFoundation\Response;

class SetupOts
{
    use AsAction;

    public function handle(ActionRequest $request): Event
    {
        /** @var User $user */
        $user = $request->user();

        $ots = $user->event()->ots()->update([
            'status' => OtsStatusEnum::ACTIVE->value
        ]);

        return $ots;
    }

    public function asController(ActionRequest $request): Event
    {
        $request->validate();

        return $this->handle($request);
    }

    public function htmlResponse(): Response
    {
        return Inertia::location(route('ots.index'));
    }
}
