<?php

namespace App\Actions\Tokoevent\Payment;

use App\Actions\Tokoevent\Payment\Gateways\Xendit\Channels\QrisChannel;
use App\Actions\Tokoevent\Payment\Gateways\Xendit\Channels\VirtualAccountChannel;
use App\Enums\PaymentStatusEnum;
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
        if($payment->channel === 'QRIS') {
            $qrCode = QrisChannel::run($payment);
            $payment->update([
                'reference_id' => $qrCode['reference_id'],
                'actions' => [
                    'qr_code' => $qrCode['qr_code']['channel_properties']['qr_string']
                ]
            ]);
        } else if($payment->channel === 'CASH') {
            if($ots->balance < $payment->total) {
                throw ValidationException::withMessages(['payment_methods' => 'Saldo jaminan tidak cukup, silakan topup/transfer']);
            }

            $ots->withdraw($payment->total, [
                'reference_id' => $payment->reference_id,
                'description' => 'Payment for ' . $payment->user->name
            ]);

            $payment->update([
                'status' => PaymentStatusEnum::IS_SETTLEMENT->value
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
