<?php

namespace App\Http\Resources\Ots;

use App\Actions\Helpers\GenerateQrCode;
use App\Models\Event;
use App\Models\Ots;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class OtsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        /** @var Ots $ots */
        $ots = $this;

        return [
            'id' => $ots->id,
            'uuid' => $ots->uuid,
            'total_sales' => $ots->total_sales,
            'total_participants' => $ots->total_participants,
            'fields' => Arr::get($ots->settings, 'fields'),
            'collateral' => $ots->wallet->balance,
            'qr_code' => GenerateQrCode::run(route('ots.user.purchase', $ots->uuid))
        ];
    }
}
