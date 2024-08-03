<?php

namespace App\Actions\Tokoevent\Payment\Gateways\Xendit\Channels;

use App\Models\Payment;
use Lorisleiva\Actions\Concerns\AsAction;
use Xendit\Configuration;
use Xendit\PaymentMethod\QRCode;
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
            'payment_method' => [
                'expires_at' => $payment->expired_at,
                'type' => 'QR_CODE',
                'reusability' => 'ONE_TIME_USE'
            ],
        ]);

        $result = $apiInstance->createPaymentRequest(null, null, $payment_request_parameters)->getPaymentMethod();

        return $result['qr_code']['channel_properties'];
    }
}
