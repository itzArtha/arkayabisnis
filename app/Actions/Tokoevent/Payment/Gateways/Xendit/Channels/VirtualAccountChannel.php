<?php

namespace App\Actions\Tokoevent\Payment\Gateways\Xendit\Channels;

use App\Models\Ots;
use Str;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;
use Xendit\Configuration;
use Xendit\PaymentRequest\PaymentRequestApi;
use Xendit\PaymentRequest\PaymentRequestParameters;

class VirtualAccountChannel
{
    use AsAction;

    public function handle(Ots $ots, ActionRequest $request)
    {
        Configuration::setXenditKey(config('xendit.api_key'));

        $apiInstance = new PaymentRequestApi();
        $payment_request_parameters = new PaymentRequestParameters([
            'reference_id' => (string) Str::uuid(),
            'amount' => $request->amount,
            'currency' => 'IDR',
            'type' => 'DYNAMIC',
            'payment_method' => [
                'type' => 'VIRTUAL_ACCOUNT',
                'reusability' => 'ONE_TIME_USE',
                'virtual_account' => [
                    'channel_code' => $request->payment_method,
                    'channel_properties' => [
                        'customer_name' => $ots->event->title,
                        'expires_at' => now()->addMinutes(15)->toISOString()
                    ]
                ]
            ]
        ]);

        $result = $apiInstance->createPaymentRequest(null, null, $payment_request_parameters)->getPaymentMethod();

        return [
            'reference_id' => $result['reference_id'],
            'channel_code' => $result['virtual_account']['channel_code'],
            'virtual_account_number' => $result['virtual_account']['channel_properties']['virtual_account_number'],
            'expired_at' => $result['virtual_account']['channel_properties']['expires_at']
        ];
    }
}
