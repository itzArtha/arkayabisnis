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

class UpdatePaymentStatus
{
    use AsAction;

    public function handle(Payment $payment, array $request): Payment
    {
        $payment->update($request);

        return $payment;
    }
}
