<?php

namespace App\Actions\Tokoevent\Payment\Gateways\Xendit\Channels;

use App\Models\Payment;
use Lorisleiva\Actions\Concerns\AsAction;
use Xendit\Configuration;
use Xendit\PaymentRequest\PaymentRequestApi;
use Xendit\PaymentRequest\PaymentRequestParameters;

class QrisChannel
{
    use AsAction;

    public function handle(Payment $payment)
    {
        Configuration::setXenditKey(config('xendit.api_key'));

        $apiInstance = new PaymentRequestApi();
        $payment_request_parameters = new PaymentRequestParameters([
            'reference_id' => (string) $payment->reference_id,
            'amount' => $payment->total,
            'currency' => 'IDR',
            'type' => 'DYNAMIC',
            'payment_method' => [
                'type' => 'QR_CODE',
                'reusability' => 'ONE_TIME_USE',
                'qr_code' => [
                    'channel_properties' => [
                        'expires_at' => $payment->expired_at->toISOString(),
                    ]
                ]
            ],
            'metadata' => [
                'event_name' => $payment->transactions()->first()?->ticket?->event?->name,
                'ticket_name' => $payment->transactions()->first()?->ticket?->name,
                'quantity' => $payment->transactions()->count(),
                'total' => $payment->total
            ]
        ]);

        $result = $apiInstance->createPaymentRequest(null, null, $payment_request_parameters)->getPaymentMethod();

        return $result;
    }
}
