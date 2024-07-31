<?php

namespace App\Actions\Tokoevent\Finance\UI;

use App\Enums\WalletTransactionTypeEnum;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Lorisleiva\Actions\Concerns\AsAction;

class IndexWithdraws
{
    use AsAction;

    public function handle(User $user): LengthAwarePaginator
    {
        return $user->withdraws()
            ->paginate(10);
    }
}
