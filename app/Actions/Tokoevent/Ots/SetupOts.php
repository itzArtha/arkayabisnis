<?php

namespace App\Actions\Tokoevent\Ots;

use App\Enums\OtsStatusEnum;
use App\Models\Event;
use App\Models\Ots;
use App\Models\User;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;
use Symfony\Component\HttpFoundation\Response;

class SetupOts
{
    use AsAction;

    public function handle(ActionRequest $request): Ots
    {
        /** @var User $user */
        $user = $request->user();

        return $user->event->ots()->updateOrCreate([
            'uuid' => Str::uuid(),
            'organizer_id' => $user->organizer->id,
            'status' => OtsStatusEnum::ACTIVE->value,
            'settings' => [
                'fields' => $request->input('fields')
            ]
        ]);
    }

    public function asController(ActionRequest $request): Ots
    {
        $request->validate();

        return $this->handle($request);
    }

    public function htmlResponse(): Response
    {
        return Inertia::location(route('ots.index'));
    }
}
