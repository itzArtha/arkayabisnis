<?php

namespace App\Actions\Tokoevent\Payment;

use App\Actions\Tokoevent\Payment\Gateways\Xendit\Channels\QrisChannel;
use App\Enums\PaymentStatusEnum;
use App\Enums\PaymentTypeEnum;
use App\Models\Ots;
use App\Models\Payment;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Str;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class StorePayment
{
    use AsAction;

    public function handle(Ots $parent, User $user, Ticket $ticket, $quantity, $channel): Payment
    {
        $subtotal = $ticket->price * $quantity;
        $adminfee = 5000 * $quantity;
        $transactionFee = $subtotal > 100000 ? 1000 : 0;

        $total = $subtotal + $adminfee + $transactionFee;
        $uuid = Str::uuid();

        $attributes = [
            'reference_id' => $uuid,
            'user_id' => $user->id,
            'subtotal' => $subtotal,
            'total' => $total,
            'convience_fee' => $adminfee,
            'admin_fee' => $transactionFee,
            'status' => PaymentStatusEnum::IS_PENDING->value,
            'expired_at' => now()->addMinutes(15),
            'channel' => $channel,
            'type' => PaymentTypeEnum::OTS->value,
            'path' => ''
        ];

        /** @var Payment $payment */
        $payment = $parent->payments()->create($attributes);

        $payment->refresh();

        $qrCode = QrisChannel::run($payment);

        $payment->update([
            'reference_id' => $qrCode['reference_id'],
            'actions' => [
                'qr_code' => $qrCode['qr_code']['channel_properties']['qr_string']
            ]
        ]);

        $payment->refresh();

        return $payment;
    }
}
