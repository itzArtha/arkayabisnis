<?php

namespace App\Actions\Tokoevent\Ots;

use App\Actions\Tokoevent\Finance\StoreTransaction;
use App\Actions\Tokoevent\Participant\StoreParticipant;
use App\Actions\Tokoevent\Payment\StorePayment;
use App\Actions\Tokoevent\User\StoreUser;
use App\Enums\PaymentMethodEnum;
use App\Http\Resources\Finance\PaymentResource;
use App\Models\Ots;
use App\Models\Payment;
use App\Models\Ticket;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;
use Symfony\Component\HttpFoundation\Response;

class StoreOtsTransaction
{
    use AsAction;

    public Ots $ots;

    public function handle(ActionRequest $request): Payment
    {
        $quantity = $request->input('quantity');
        $user = StoreUser::make()->fromOts($request);
        $ticket = Ticket::find($request->input('ticket_id'));
        $channel = $request->input('payment_methods');

        $payment = StorePayment::run($user, $ticket, $quantity, $channel);

        $request->merge([
            'payment_id' => $payment->id
        ]);

        for ($qty = 1; $qty <= $quantity; $qty++) {
            $participant = StoreParticipant::run($user, $request);
            StoreTransaction::run($participant, $request);
        }

        return $payment;
    }

    public function jsonResponse(Payment $payment): JsonResource
    {
        return PaymentResource::make($payment);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'email' => ['sometimes', 'email', Rule::unique('users', 'email')],
            'whatsapp' => ['sometimes', 'max:13', Rule::unique('users', 'phone')],
            'quantity' => ['sometimes', 'integer'],
            'ticket_id' => ['required', Rule::exists('tickets', 'id')],
            'event_id' => ['required', Rule::exists('events', 'id')],
            'payment_methods' => ['required', Rule::enum(PaymentMethodEnum::class)]
        ];
    }

    public function prepareForValidation(ActionRequest $request): void
    {
        $request->merge([
            'ticket_id' => $request->ticket['id'],
            'event_id' => $request->ticket['event_id']
        ]);
    }

    public function asController(Ots $ots, ActionRequest $request): Payment
    {
        $request->validate();

        return $this->handle($request);
    }
}
