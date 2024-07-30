<?php

namespace App\Actions\Tokoevent\Dashboard\UI;

use App\Http\Resources\Event\EventResource;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class ShowDashboard
{
    use AsAction;

    public function handle(ActionRequest $request): User
    {
        return $request->user();
    }

    public function htmlResponse(User $user): Response
    {
        $event = $user->event()->orderBy('id', 'desc')->first();

        return Inertia::render('Event/Dashboard', [
            'event' => EventResource::make($event),
            'stats' => [
                'total_tickets' => 0,
                'daily_sales' => 0,
                'daily_visitors' => 0,
                'total_participants' => 0,
            ]
        ]);
    }
}
