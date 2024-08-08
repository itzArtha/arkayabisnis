<?php

namespace App\Actions\Tokoevent\Finance;

use App\Models\Payment;
use Lorisleiva\Actions\Concerns\AsAction;

class UpdateTransaction
{
    use AsAction;

    public function handle(Payment $payment, array $request = []): int
    {
        return $payment->transactions()->update($request);
    }
}
