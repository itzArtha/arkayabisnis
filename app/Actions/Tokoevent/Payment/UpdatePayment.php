<?php

namespace App\Actions\Tokoevent\Payment;

use App\Models\Payment;
use Lorisleiva\Actions\Concerns\AsAction;

class UpdatePayment
{
    use AsAction;

    public function handle(Payment $payment, array $attributes): Payment
    {
        $payment->update($attributes);

        return $payment;
    }
}
