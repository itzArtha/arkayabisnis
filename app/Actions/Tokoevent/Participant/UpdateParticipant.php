<?php

namespace App\Actions\Tokoevent\Participant;

use App\Models\User;
use Lorisleiva\Actions\Concerns\AsAction;

class UpdateParticipant
{
    use AsAction;

    public function handle(User $user, array $request = []): int
    {
        return $user->participants()->update($request);
    }
}
