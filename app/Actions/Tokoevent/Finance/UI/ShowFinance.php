<?php

namespace App\Actions\Tokoevent\Finance\UI;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;

class ShowFinance
{
    use AsAction;

    public function handle(ActionRequest $request)
    {
        return $request->user();
    }

    public function htmlResponse(User $user): Response
    {
        return Inertia::render('Event/Finance', [
            'transactions' => IndexTransactions::run($user),
            'withdraws' => IndexWithdraws::run($user),
            'header' => [
                'balance' => $user->organizer->balance
            ]
        ]);
    }
}
