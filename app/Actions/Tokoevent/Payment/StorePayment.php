<?php

namespace App\Actions\Tokoevent\Payment;

use App\Actions\Tokoevent\Payment\Gateways\Xendit\Channels\QrisChannel;
use App\Enums\PaymentStatusEnum;
use App\Models\Payment;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Str;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class StorePayment
{
    use AsAction;

    public function handle(User $user, Ticket $ticket, $quantity, $channel): Payment
    {
        $subtotal = $ticket->price * $quantity;
        $adminfee = 5000 * $quantity;
        $transactionFee = $subtotal > 100000 ? 1000 : 0;

        $total = $subtotal + $adminfee + $transactionFee;

        $attributes = [
            'reference_id' => Str::uuid(),
            'subtotal' => $subtotal,
            'total' => $total,
            'convience_fee' => $adminfee,
            'admin_fee' => $transactionFee,
            'status' => PaymentStatusEnum::IS_PENDING->value,
            'expired_at' => now()->addMinutes(15),
            'channel' => $channel,
            'path' => ''
        ];

        /** @var Payment $payment */
        $payment = $user->payments()->create($attributes);

        $qrCode = QrisChannel::run($payment);

        $payment->update([
            'actions' => [
                'qr_code' => $qrCode['qr_string']
            ]
        ]);

        return $payment;
    }
}
