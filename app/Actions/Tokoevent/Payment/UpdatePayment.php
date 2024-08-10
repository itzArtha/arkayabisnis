<?php

namespace App\Actions\Tokoevent\Payment;

use App\Actions\Tokoevent\Payment\Gateways\Xendit\Channels\QrisChannel;
use App\Actions\Tokoevent\Payment\Gateways\Xendit\Channels\VirtualAccountChannel;
use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentStatusEnum;
use App\Events\SendWebhookPaymentStatusEvent;
use App\Models\Ots;
use App\Models\Payment;
use Illuminate\Validation\ValidationException;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class UpdatePayment
{
    use AsAction;

    public function handle(Ots $ots, Payment $payment, ActionRequest $request): Payment
    {
        if($payment->channel === PaymentMethodEnum::QRIS->value) {
            $qrCode = QrisChannel::run($payment);
            $payment->update([
                'reference_id' => $qrCode['reference_id'],
                'actions' => [
                    'qr_code' => $qrCode['qr_code']['channel_properties']['qr_string']
                ]
            ]);
        } else if($payment->channel === PaymentMethodEnum::CASH->value) {
            $ots->withdraw($payment->total, [
                'reference_id' => $payment->reference_id,
                'description' => 'Payment for ' . $payment->user->name
            ]);

            UpdatePaymentStatus::run($payment, [
                'status' => $payment->status
            ]);
        } else if(in_array($payment->channel, ['BNI', 'MANDIRI', 'PERMATA', 'BRI'])) {
            $request->merge([
                'amount' => $payment->total,
                'payment_method' => $payment->channel
            ]);

            $virtualAccount = VirtualAccountChannel::run($ots, $request);

            $payment->update([
                'reference_id' => $virtualAccount['reference_id'],
                'actions' => $virtualAccount
            ]);
        }

        return $payment;
    }
}
