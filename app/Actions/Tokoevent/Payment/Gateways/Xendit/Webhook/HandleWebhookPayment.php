<?php

namespace App\Actions\Tokoevent\Payment\Gateways\Xendit\Webhook;

use App\Enums\OtsStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Models\Event;
use App\Models\Ots;
use App\Models\Payment;
use App\Models\User;
use App\Rules\FieldOtsRule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;
use Symfony\Component\HttpFoundation\Response;

class HandleWebhookPayment
{
    use AsAction;


    /**
     * @throws \Throwable
     */
    public function handle(ActionRequest $request): Payment
    {
        return DB::transaction(function () use ($request) {
            $callbackToken = $request->header('x-callback-token');
            $webhookId     = $request->header('webhook-id');
            $status        = $request->input('status');

            if ($callbackToken === env('XENDIT_CALLBACK_TOKEN')) {
                $payment = Payment::where('reference', $request->input('external_id'))->first();

                if(!$payment) {
                    abort(404);
                }

                if (blank($payment->webhook_id)) {
                    $data = [
                        'webhook_id' => $webhookId,
                        'status'     => $this->checkStatus($status),
                        'data'       => $request->all()
                    ];

                    if($status === 'PAID') {
                        array_merge($data, ['completed_at' => now()]);
                    } else {
                        array_merge($data, ['cancelled_at' => now()]);
                    }

                    UpdatePayment::run($payment, $data);
                }

                return $payment;
            }

            abort(403);
        });
    }

    /**
     * @throws \Throwable
     */
    public function asController(ActionRequest $request): Payment
    {
        return $this->handle($request);
    }

    public function checkStatus(string $status): string
    {
        match ($status) {
            'PAID'  => $status  = PaymentStatusEnum::IS_SETTLEMENT->value,
            'PENDING'  => $status  = PaymentStatusEnum::IS_PENDING->value,
            default => $status  = PaymentStatusEnum::IS_EXPIRE->value
        };

        return $status;
    }
}
