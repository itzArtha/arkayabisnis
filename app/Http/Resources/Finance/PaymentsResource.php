<?php

namespace App\Http\Resources\Finance;

use App\Actions\Helpers\GenerateQrCode;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class PaymentsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        /** @var Payment $payment */
        $payment = $this;

        $transaction = $payment->transactions()->with('ticket')->first();

        return [
            'ticket_name' => $transaction?->ticket?->title,
            'buyer_phone' => $payment->user->phone,
            'quantity' => $payment->transactions()->count(),
            'total' => $payment->subtotal,
            'channel' => $payment->channel,
            'status' => $payment->getStatus($payment->status),
            'created_at' => $payment->created_at
        ];
    }
}
