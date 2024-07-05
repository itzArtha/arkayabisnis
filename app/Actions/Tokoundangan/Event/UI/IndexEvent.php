<?php

namespace App\Actions\Tokoundangan\Event\UI;

use App\Models\Tokoundangan\Event;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;
use Inertia\Response;
use Lorisleiva\Actions\Concerns\AsAction;

class IndexEvent
{
    use AsAction;

    public function handle()
    {
        return Event::paginate(10);
    }

    public function htmlResponse(LengthAwarePaginator $events): Response
    {
        return Inertia::render('Undangan/Undangan', [
            'events' => $events
        ]);
    }
}
