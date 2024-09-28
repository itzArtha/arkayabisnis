<?php

namespace App\Actions\Tokoevent\Ots;

use App\Models\Ots;
use Bavix\Wallet\Models\Transaction;
use Illuminate\Http\Resources\Json\JsonResource;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class StoreOtsCollateral
{
    use AsAction;

    public function handle(Ots $ots, ActionRequest $request): Transaction|null
    {
        $deposit = null;

        if($request->type == 'topup') {
            $deposit = StoreOtsTopUp::run($ots, $request);
        }

//        if($request->type == 'transfer') {
//            $deposit = StoreOtsTransfer::run($ots, $request);
//        }

        return $deposit;
    }

    public function rules(): array
    {
        return [
            'amount' => ['required', 'integer'],
            'payment_method' => ['required'],
            'type' => ['required']
        ];
    }

    public function asController(Ots $ots, ActionRequest $request): Transaction|null
    {
        $request->validate();

        return $this->handle($ots, $request);
    }
}
