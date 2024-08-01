<?php

namespace App\Actions\Tokoevent\Event;

use App\Models\Event;
use App\Models\User;
use Inertia\Inertia;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;
use Symfony\Component\HttpFoundation\Response;

class StoreEvent
{
    use AsAction;

    public function handle(ActionRequest $request): Event
    {
        /** @var User $user */
        $user = $request->user();

        /** @var Event $event */
        $event = $user->event()->create($request->validated());

        $event->detailIzin()->create([
            'pic_name' => $request->pic_name,
            'whatsapp' => $request->whatsapp
        ]);

        $event->ots()->create([
            'organizer_id' => $user->organizer->id
        ]);

        $user->update([
            'is_complete' => true,
            'completed_at' => now()
        ]);

        return $event;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:50'],
            'pic_name' => ['required', 'string', 'max:50'],
            'whatsapp' => ['required', 'string', 'max:13']
        ];
    }

    public function asController(ActionRequest $request): Event
    {
        $request->validate();

        return $this->handle($request);
    }

    public function htmlResponse(): Response
    {
        return Inertia::location(route('dashboard'));
    }
}
