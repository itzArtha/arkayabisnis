<?php

namespace App\Actions\Tokoevent\Payment\Gateways\Xendit\Webhook;

use App\Actions\Tokoevent\Payment\UpdatePayment;
use App\Enums\PaymentStatusEnum;
use App\Models\Payment;
use Bavix\Wallet\Models\Transaction;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class HandleWebhookPayment
{
    use AsAction;

    /**
     * @throws \Throwable
     */
    public function handle(ActionRequest $request): Payment|bool
    {
        return DB::transaction(function () use ($request) {
            $attributes    = $request->input('data');

            $callbackToken = $request->header('x-callback-token');
            $webhookId     = $request->header('webhook-id');
            $status        = Arr::get($attributes, 'status');
            $referenceId = Arr::get($attributes, 'reference_id');

            if ($callbackToken === config('xendit.callback')) {
                $payment = Payment::where('reference_id', $referenceId)->first();

                if(!$payment) {
                    $referenceId = Arr::get($attributes, 'payment_method')['reference_id'];
                    $payment = Transaction::where('uuid', $referenceId)->first();

                    if($payment) {
                        if(in_array($status, ['PAID', 'SUCCEEDED'])) {
                            return $payment->payable->confirm($payment);
                        }

                        return true;
                    } else {
                        abort(404);
                    }
                }

                if (blank($payment->webhook_id)) {
                    $data = [
                        'status'     => $this->checkStatus($status)
                    ];

                    if(in_array($status, ['PAID', 'SUCCEEDED'])) {
                        array_merge($data, ['completed_at' => now()]);
                    } else {
                        array_merge($data, ['cancelled_at' => now()]);
                    }

                    if($payment->status !== PaymentStatusEnum::IS_SETTLEMENT->value) {
                        UpdatePayment::run($payment, $data);
                    }
                }

                return $payment;
            }

            abort(403);
        });
    }

    /**
     * @throws \Throwable
     */
    public function asController(ActionRequest $request): Payment|bool
    {
        return $this->handle($request);
    }

    public function checkStatus(string $status): string
    {
        match ($status) {
            'PAID', 'SUCCEEDED'  => $status  = PaymentStatusEnum::IS_SETTLEMENT->value,
            'PENDING', 'ACTIVE'  => $status  = PaymentStatusEnum::IS_PENDING->value,
            default => $status  = PaymentStatusEnum::IS_EXPIRE->value
        };

        return $status;
    }
}
