<?php

namespace App\Actions\Tokoevent\User;

use App\Enums\OtsStatusEnum;
use App\Models\Event;
use App\Models\Ots;
use App\Models\User;
use App\Rules\FieldOtsRule;
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
        return User::create($attributes);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'email' => ['required', 'string'],
            'phone' => ['nullable', 'string'],
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
        return $this->handle($this->validateAttributes());
    }
}
