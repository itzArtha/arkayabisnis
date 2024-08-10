<?php

namespace App\Http\Resources\Finance;

use App\Actions\Helpers\GenerateQrCode;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class PaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        /** @var Payment $payment */
        $payment = $this;

        if(Arr::get($payment->actions, 'qr_code')) {
            $qrCode = GenerateQrCode::run(Arr::get($payment->actions, 'qr_code'));

            $paymentMethod = [
                'qr_code' => $qrCode,
            ];
        } else {
            $paymentMethod = $payment->actions ?? [];
        }

        return [
            ...$paymentMethod,
            'status' => $payment->status,
            'total' => $payment->total,
            'status_label' => $payment->getStatus($payment->status),
            'expired_at' => $payment->expired_at
        ];
    }
}
