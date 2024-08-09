<?php

namespace App\Actions\Tokoevent\Participant;

use App\Actions\Tokoevent\Finance\StoreTransaction;
use App\Models\Participant;
use App\Models\Payment;
use App\Models\User;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class StoreParticipant
{
    use AsAction;

    public function handle(User $user, array $attributes): Participant
    {
        /** @var Participant $participant */
        $participant = $user->participants()->create($attributes);

        return $participant;
    }
}
