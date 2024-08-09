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
        $payment->update($request);

        if(in_array($payment->status, [PaymentStatusEnum::IS_SETTLEMENT->value, PaymentStatusEnum::IS_EXPIRE->value])) {
            UpdateParticipant::run($payment->user, [
                'status' => $payment->status
            ]);

            UpdateTransaction::run($payment, [
                'status' => $payment->status
            ]);

            if($payment->status === PaymentStatusEnum::IS_SETTLEMENT->value) {
                broadcast(new SendWebhookPaymentStatusEvent($payment))->toOthers();
                $payment->user->notify(new SendTicketToBuyerNotification($payment));
            }
        }

        return $payment;
    }
}