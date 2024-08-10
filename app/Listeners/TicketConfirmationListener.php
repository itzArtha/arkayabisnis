<?php

namespace App\Listeners;

use App\Events\SendWebhookPaymentStatusEvent;
use App\Notifications\SendTicketToBuyerNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class TicketConfirmationListener implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SendWebhookPaymentStatusEvent $event): void
    {
        $event->payment->user->notify(new SendTicketToBuyerNotification($event->payment));
    }
}
