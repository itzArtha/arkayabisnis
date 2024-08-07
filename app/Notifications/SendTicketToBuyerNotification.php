<?php

namespace App\Notifications;

use App\Channels\Messages\WhatsAppMessage;
use App\Channels\WhatsAppChannel;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendTicketToBuyerNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public $payment;

    public function __construct(Payment $payment)
    {
        $this->payment = $payment;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return [WhatsAppChannel::class];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return WhatsAppMessage
     */
    public function toWhatsApp($notifiable)
    {
        return (new WhatsAppMessage)
            ->content("Pesanan {$this->payment->transactions()->count()} Tiket Berhasil Dibayar. Berikut ini adalah tiket dalam bentuk QR")
            ->media("https://tokoevent.id/wp-content/uploads/2024/07/xgp7a4S4fizfL8r36BPa8LDsbZaX59k1ovd8ykLE.png");
    }
    
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'id' => $this->payment->id,
            'amount' => $this->payment->amount,
        ]);
    }
}