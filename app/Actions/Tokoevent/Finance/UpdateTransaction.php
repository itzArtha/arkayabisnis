<?php

namespace App\Actions\Tokoevent\Finance;

use App\Actions\Tokoevent\Participant\UpdateParticipant;
use App\Models\Payment;
use Lorisleiva\Actions\Concerns\AsAction;

class UpdateTransaction
{
    use AsAction;

    public function handle(Payment $payment, array $request = []): void
    {
        $payment->transactions()->update($request);

        foreach($payment->transactions as $transaction) {
            UpdateParticipant::run($transaction->participant, [
                'status' => $payment->status
            ]);
        }
    }
}
