<?php

namespace App\Actions\Tokoevent\Ots;

use App\Actions\Tokoevent\Payment\Gateways\Xendit\Channels\VirtualAccountChannel;
use App\Models\Ots;
use App\Rules\FieldOtsRule;
use Bavix\Wallet\Models\Transaction;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;
use Symfony\Component\HttpFoundation\Response;

class StoreOtsTransfer
{
    use AsAction;

    public function handle(Ots $ots, ActionRequest $request): Transaction
    {
        $organizer = $ots->event->owner->organizer;

        if($organizer->balance < $request->amount) {
            throw ValidationException::withMessages(['amount' => 'Penghasilan kamu kurang, total penghasilan saat ini: ' . 'Rp' . number_format($organizer->balance, 0, ',', '.')]);
        }

        $transfer = $organizer->transfer($ots, $request->amount);

        return $transfer->deposit;
    }
}
