<?php

namespace App\Actions\Tokoevent\Payment\Gateways\Xendit\Webhook;

use App\Actions\Tokoevent\Payment\UpdatePayment;
use App\Actions\Tokoevent\Payment\UpdatePaymentStatus;
use App\Enums\PaymentStatusEnum;
use App\Events\SendWebhookPaymentStatusEvent;
use App\Events\SendWebhookTopupStatusEvent;
use App\Models\Payment;
use App\Notifications\SendTicketToBuyerNotification;
use Bavix\Wallet\Models\Transaction;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\AcionRequest;
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


            $paymentMethod = Arr::get($attributes, 'payment_method');

            if(!$paymentMethod) {
                $referenceId = Arr::get($attributes, 'reference_id');
            } else {
                $referenceId = Arr::get($paymentMethod, 'reference_id');
            }

            if ($callbackToken === config('xendit.callback')) {
                $payment = Payment::where('reference_id', $referenceId)->first();

                if(!$payment) {
                    if(in_array(Arr::get($attributes, 'status'), ['PAID', 'SUCCEEDED'])) {
                        $referenceId = Arr::get($attributes, 'payment_method')['reference_id'];
                    } else {
                        $referenceId = Arr::get($attributes, 'reference_id');
                    }

                    $payment = Transaction::where('uuid', $referenceId)->first();

                    if($payment) {
                        if(in_array($status, ['PAID', 'SUCCEEDED'])) {
                            $result = $payment->payable->confirm($payment);

                            broadcast(new SendWebhookTopupStatusEvent($payment))->toOthers();

                            return $result;
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

                    $payment->refresh();

                    if($payment->status !== PaymentStatusEnum::IS_SETTLEMENT->value) {
                        UpdatePaymentStatus::run($payment, $data);

                        $payment->refresh();
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
