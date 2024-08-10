<?php

namespace App\Actions\Tokoevent\Payment;

use App\Actions\Tokoevent\Payment\Gateways\Xendit\Channels\QrisChannel;
use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentStatusEnum;
use App\Enums\PaymentTypeEnum;
use App\Models\Ots;
use App\Models\Payment;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class StorePayment
{
    use AsAction;

    public function handle(Ots $parent, User $user, Ticket $ticket, $quantity, $channel): Payment
    {
        $subtotal = $ticket->price * $quantity;
        $fee = $subtotal == 0 ? 0 : 5000;
        $conveniencefee = $fee * $quantity;

        if($channel == PaymentMethodEnum::QRIS->value) {
            $transactionFee = $subtotal > 100000 ? 1000 : 0;
        } else if($channel == PaymentMethodEnum::CASH->value) {
            $transactionFee = 0;
        } else {
            $transactionFee = 4000;
        }

        $total = $subtotal + $conveniencefee + $transactionFee;
        $uuid = Str::uuid();

        if($channel === PaymentMethodEnum::CASH->value &&$parent->balance < $total) {
            throw ValidationException::withMessages(['payment_methods' => 'Saldo jaminan tidak cukup, silakan topup/transfer']);
        }

        $attributes = [
            'reference_id' => $uuid,
            'user_id' => $user->id,
            'subtotal' => $subtotal,
            'total' => $total,
            'convience_fee' => $conveniencefee,
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

        return $payment;
    }
}
