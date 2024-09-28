<?php

namespace App\Actions\Tokoevent\Finance;

use App\Actions\Tokoevent\Participant\UpdateParticipant;
use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentStatusEnum;
use App\Models\Payment;
use App\Models\Revenue;
use Lorisleiva\Actions\Concerns\AsAction;

class UpdateTransaction
{
    use AsAction;

    public function handle(Payment $payment, array $request = []): void
    {
        $payment->transactions()->update([
            'status' => $payment->status
        ]);

        $payment->refresh();

        foreach($payment->transactions as $transaction) {
            if(($transaction->status === PaymentStatusEnum::IS_SETTLEMENT->value)) {
                $revenue = Revenue::create([
                    'transaction_id' => $transaction->id,
                    'organization_id' => $transaction->ticket->event->organizer_id,
                    'amount' => $transaction->subtotal,
                    'status' => $transaction->status
                ]);

                $revenue->organization->organizer->deposit($transaction->subtotal);

                UpdateParticipant::run($transaction->participant, [
                    'status' => $payment->status
                ]);
            }
        }
    }
}
