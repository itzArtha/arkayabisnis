<?php

namespace App\Actions\Tokoevent\User;

use App\Enums\OtsStatusEnum;
use App\Models\Event;
use App\Models\Ots;
use App\Models\User;
use App\Rules\FieldOtsRule;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\Concerns\WithAttributes;
use Symfony\Component\HttpFoundation\Response;

class StoreUser
{
    use AsAction;
    use WithAttributes;

    public Ots $ots;

    public function handle(array $attributes): User
    {
        if(Arr::exists($attributes, 'email') or Arr::exists($attributes, 'phone')) {
            $user = User::orWhere('email', Arr::get($attributes, 'email'))
                ->orWhere('phone', Arr::get($attributes, 'phone'))->first();

            $user->update($attributes);

            return $user->refresh();
        }

        return User::create($attributes);
    }

    public function rules(): array
    {
        return [
            'name' => ['nullable', 'string'],
            'email' => ['nullable', 'string'],
            'phone' => ['required', 'string'],
            'password' => ['required', 'string']
        ];
    }

    public function prepareForValidation(ActionRequest $request): void
    {
        $this->setRawAttributes([
            'name' => $request->input('name')
                ?? 'ots buyer',
            'email' => $request->input('email')
                ?? Str::random(8).'-ots-buyer@tokoevent.id',
            'phone' => $request->input('whatsapp'),
            'password' => Str::random(8)
        ]);
    }

    public function fromOts(ActionRequest $request): User
    {
        $this->setRawAttributes($request->all());

        return $this->handle($this->validateAttributes());
    }
}