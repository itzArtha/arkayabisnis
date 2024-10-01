<?php

namespace App\Actions\Tokoevent\Ots;

use App\Models\Ots;
use App\Models\Withdraw;
use Bavix\Wallet\Models\Transaction;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\Concerns\WithAttributes;

class WithdrawOtsCollateral
{
    use AsAction;
    use WithAttributes;

    public Ots $ots;

    public function handle(Ots $ots, ActionRequest $request): Transaction|null
    {
        $withdraw = Withdraw::create([
            'user_id' => $request->user()->id,
            'bank_id' => $request->input('bank_id'),
            'amount' => $request->input('amount'),
            'type' => 'ots',
            'balance_before_wd' => $ots->balance,
            'balance_after_wd' => $ots->balance - $request->input('amount'),
            'status' => 'pending',
        ]);

        return $ots->withdraw($withdraw->amount, $withdraw->toArray());
    }

    public function asController(Ots $ots, ActionRequest $request): Transaction|null
    {
        $this->ots = $ots;
        $request->validate();

        return $this->handle($ots, $request);
    }
    
    public function rules(): array
    {
        return [
            'bank_id' => ['required', 'exists:banks,id'],
            'amount' => ['required', 'integer', 'min:10000', 'lte:' . $this->ots->balance]
        ];
    }
    
    public function messages(): array
    {
        return [
            'amount.required' => 'Jumlah penarikan wajib diisi.',
            'amount.integer' => 'Jumlah penarikan harus berupa angka yang valid.',
            'amount.min' => 'Jumlah penarikan harus lebih dari Rp10.000.',
            'amount.lte' => 'Jumlah penarikan tidak boleh melebihi saldo Anda yang tersedia',
        ];
    }

    public function prepareForValidation(ActionRequest $request)
    {
        $request->merge([
            'bank_id' => $request->bank_id['id']
        ]);
    }
}
