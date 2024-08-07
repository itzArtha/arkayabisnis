<?php

namespace App\Actions\Tokoevent\Participant;

use App\Actions\Tokoevent\Finance\StoreTransaction;
use App\Models\Participant;
use App\Models\Payment;
use App\Models\User;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class UpdateParticipant
{
    use AsAction;

    public function handle(User $user, array $request = []): Participant
    {
        /** @var Participant $participant */
        $participant = $user->participants()->update($request);

        return $participant;
    }
}
