<?php

namespace App\Actions\Tokoevent\Payment;

use App\Actions\Tokoevent\Finance\UpdateTransaction;
use App\Actions\Tokoevent\Participant\UpdateParticipant;
use App\Enums\PaymentStatusEnum;
use App\Models\Payment;
use Lorisleiva\Actions\Concerns\AsAction;

class UpdatePaymentStatus
{
    use AsAction;

    public function handle(Payment $payment, array $request): Payment
    {
        $payment->update($request);

        if($payment->status === PaymentStatusEnum::IS_SETTLEMENT->value) {
            $participant = UpdateParticipant::run($payment->user, [
                'status' => $payment->status
            ]);

            UpdateTransaction::run($participant, [
                'status' => $payment->status
            ]);
        }

        return $payment;
    }
}
