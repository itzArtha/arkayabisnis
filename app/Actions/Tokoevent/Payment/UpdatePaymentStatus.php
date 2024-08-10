<?php

namespace App\Actions\Tokoevent\Payment;

use App\Actions\Tokoevent\Finance\UpdateTransaction;
use App\Actions\Tokoevent\Participant\UpdateParticipant;
use App\Enums\PaymentStatusEnum;
use App\Events\SendWebhookPaymentStatusEvent;
use App\Models\Payment;
use App\Notifications\SendTicketToBuyerNotification;
use Lorisleiva\Actions\Concerns\AsAction;

class UpdatePaymentStatus
{
    use AsAction;

    public function handle(Payment $payment, array $request): Payment
    {
        if($payment->status === PaymentStatusEnum::IS_SETTLEMENT->value) {
            return $payment;
        }

        $payment->update($request);
        $payment->refresh();

        if(in_array($payment->status, [PaymentStatusEnum::IS_SETTLEMENT->value, PaymentStatusEnum::IS_EXPIRE->value])) {
            UpdateTransaction::run($payment, [
                'status' => $payment->status
            ]);

            if($payment->status === PaymentStatusEnum::IS_SETTLEMENT->value) {
                event(new SendWebhookPaymentStatusEvent($payment));
            }
        }

        return $payment;
    }
}
