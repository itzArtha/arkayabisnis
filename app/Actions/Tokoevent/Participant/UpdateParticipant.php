<?php

namespace App\Actions\Tokoevent\Participant;

use App\Enums\PaymentStatusEnum;
use App\Models\Participant;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Arr;
use Lorisleiva\Actions\Concerns\AsAction;
use Illuminate\Support\Str;

class UpdateParticipant
{
    use AsAction;

    public function handle(Participant $participant, array $request = []): void
    {
        $this->updateStatusParticipant($participant, Arr::get($request, 'status'));
    }

    public function updateStatusParticipant(Participant $participant, $status)
    {
        try {
            $participantQuery = $participant;

            $ticket = Ticket::find($participantQuery->first()->ticket_id);
            $participantSettlementCount = Participant::where([['status', PaymentStatusEnum::IS_SETTLEMENT], ['event_id', $participantQuery->first()->event_id]])->count();
            $numberReference = $ticket->start_no + $participantSettlementCount + 1;
            $length = 4;

            $customNumber = str_pad((int)$numberReference, $length, "0", STR_PAD_LEFT);

            $participantQuery->update([
                'status' => $status,
                'uuid' => Str::uuid(),
                'reference' => $status == PaymentStatusEnum::IS_SETTLEMENT ? $customNumber : null,
            ]);

            $participant->refresh();

            if($participant->ticket->type == Ticket::IS_CINEMA) {
                if($status == PaymentStatusEnum::IS_SETTLEMENT) {
                    $participant->seat()->update([
                        'booked_at' => now(),
                        'expired_at' => null
                    ]);
                } else {
                    $participant->seat()->delete();
                }
            }

        } catch (\Throwable $th) {
            // throw $th;
        }
    }
}
