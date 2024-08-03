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

        $qrCode = GenerateQrCode::run(Arr::get($payment->actions, 'qr_code'));

        return [
            'qr_code' => $qrCode,
            'expired_at' => $payment->expired_at
        ];
    }
}
