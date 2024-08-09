<?php

namespace App\Actions\Tokoevent\Finance;

use App\Actions\Tokoevent\Payment\Gateways\Xendit\Channels\QrisChannel;
use App\Models\Participant;
use App\Models\Payment;
use App\Models\Transaction;
use App\Models\User;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class StoreTransaction
{
    use AsAction;

    public function handle(Participant $participant, array $attributes): Transaction
    {
        /** @var Transaction $transaction */
        $transaction = $participant->transaction()->create($attributes);

        return $transaction;
    }
}
