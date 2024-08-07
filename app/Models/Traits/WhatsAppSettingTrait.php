<?php

namespace App\Models\Traits;

trait WhatsAppSettingTrait {
    public function getPhoneNumber()
    {
        return $this->country_code ?? '+62' . $this->phone;
    }

    public function routeNotificationForWhatsApp()
    {
        return $this->getPhoneNumber();
    }
}