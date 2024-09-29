<?php

namespace App\Actions\Tokoevent\Ots;

use App\Enums\OtsStatusEnum;
use App\Models\Event;
use App\Models\Ots;
use App\Models\User;
use App\Rules\FieldOtsRule;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;
use Symfony\Component\HttpFoundation\Response;

class SetupOts
{
    use AsAction;

    public function handle(Event $event, ActionRequest $request): Model
    {
        $event->ots()->updateOrCreate([
            'id' => $event?->ots?->id
        ],[
            'uuid' => $event->ots->uuid ?? Str::uuid(),
            'organizer_id' => $event->organizer_id,
            'status' => OtsStatusEnum::ACTIVE->value,
            'settings' => [
                'fields' => $request->input('fields')
            ]
        ]);

        return $event;
    }

    public function rules(): array
    {
        return [
            'fields' => ['required', 'array', new FieldOtsRule]
        ];
    }

    public function asController(Event $event, ActionRequest $request): Model
    {
        $request->validate();

        return $this->handle($event, $request);
    }

    public function htmlResponse(Event $event): Response
    {
        return Inertia::location(route('ots.event.index', $event->slug));
    }
}
