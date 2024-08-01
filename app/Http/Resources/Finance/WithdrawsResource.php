<?php

namespace App\Http\Resources\Finance;

use App\Models\Event;
use App\Models\Participant;
use App\Models\Withdraw;
use Bavix\Wallet\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WithdrawsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        /** @var Withdraw $withdraw */
        $withdraw = $this;

        return [
            'name' => $withdraw->amount,
            'status' => $withdraw->status
        ];
    }
}
