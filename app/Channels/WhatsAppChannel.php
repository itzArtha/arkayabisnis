<?php
namespace App\Channels;

use Illuminate\Notifications\Notification;
use Twilio\Exceptions\ConfigurationException;
use Twilio\Exceptions\TwilioException;
use Twilio\Rest\Client;

class WhatsAppChannel
{
    /**
     * @throws TwilioException
     * @throws ConfigurationException
     */

    public function send($notifiable, Notification $notification)
    {
        $message = $notification->toWhatsApp($notifiable);

        $to = $notifiable->routeNotificationFor('WhatsApp');
        $from = config('services.twilio.whatsapp_from');

        $twilio = new Client(config('services.twilio.sid'), config('services.twilio.token'));

        $options = [
            "from" => 'whatsapp:' . $from,
            "body" => $message->content
        ];

        if(isset($message->media)) $options += ["mediaUrl" => $message->media];

        return $twilio->messages->create('whatsapp:' . $to, $options);
    }
}
