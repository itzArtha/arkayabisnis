<?php

namespace App\Actions\Tokoevent\Ots;

use App\Actions\Tokoevent\Payment\Gateways\Xendit\Channels\VirtualAccountChannel;
use App\Models\Ots;
use App\Rules\FieldOtsRule;
use Bavix\Wallet\Models\Transaction;
use Inertia\Inertia;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;
use Symfony\Component\HttpFoundation\Response;

class StoreOtsTopUp
{
    use AsAction;

    public function handle(Ots $ots, ActionRequest $request): Transaction
    {
        $payment = VirtualAccountChannel::run($ots, $request);

        $deposit = $ots->deposit($request->amount, (array) $payment, false);
        $deposit->update(['uuid' => $payment['reference_id']]);

        return $deposit;
    }
}