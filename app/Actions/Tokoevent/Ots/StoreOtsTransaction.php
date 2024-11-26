<?php

namespace App\Actions\Tokoevent\Ots;

use App\Actions\Tokoevent\Finance\StoreTransaction;
use App\Actions\Tokoevent\Participant\StoreParticipant;
use App\Actions\Tokoevent\Payment\StorePayment;
use App\Actions\Tokoevent\Payment\UpdatePayment;
use App\Actions\Tokoevent\User\StoreUser;
use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentStatusEnum;
use App\Http\Resources\Finance\PaymentResource;
use App\Models\Ots;
use App\Models\Payment;
use App\Models\Ticket;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;
use Symfony\Component\HttpFoundation\Response;

class StoreOtsTransaction
{
    use AsAction;

    public Ots $ots;

    public function handle(Ots $ots, ActionRequest $request): Payment
    {
        $quantity = $request->input('quantity');
        $user = StoreUser::make()->fromOts($request);
        $ticket = Ticket::find($request->input('ticket_id'));
        $channel = $request->input('payment_methods');

        $payment = StorePayment::run($ots, $user, $ticket, $quantity, $channel);

        $request->merge([
            'payment_id' => $payment->id,
            'status' => PaymentStatusEnum::IS_PENDING->value
        ]);

        for ($qty = 1; $qty <= $quantity; $qty++) {
            $participant = StoreParticipant::run($user, [
                'status' => $payment->status,
                'ticket_id' => $ticket->id,
                'event_id' => $ticket->event_id
            ]);

            StoreTransaction::run($participant, [
                'status' => $payment->status,
                'ticket_id' => $ticket->id,
                'payment_id' => $payment->id,
                'amount' => 1,
                'subtotal' => $ticket->price
            ]);
        }

        UpdatePayment::run($ots, $payment, $request);

        $payment->refresh();

        return $payment;
    }

    public function jsonResponse(Payment $payment): JsonResource
    {
        return PaymentResource::make($payment);
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string'],
            'whatsapp' => ['required', 'max:13'],
            'quantity' => ['sometimes', 'integer', 'min:1'],
            'ticket_id' => ['required', Rule::exists('tickets', 'id')],
            'event_id' => ['required', Rule::exists('events', 'id')],
            'payment_methods' => ['required', Rule::enum(PaymentMethodEnum::class)]
        ];
    }

    public function prepareForValidation(ActionRequest $request): void
    {
        if(blank($request->ticket)) {
            throw ValidationException::withMessages(['ticket' => 'Tiket tidak boleh kosong']);
        }

        $request->merge([
            'ticket_id' => $request->ticket['id'],
            'event_id' => $request->ticket['event_id']
        ]);
    }

    public function asController(Ots $ots, ActionRequest $request): Payment
    {
        $request->validate();

        return $this->handle($ots, $request);
    }
}
