<?php

namespace App\Enums;

enum PaymentMethodEnum: string
{
    case QRIS = 'QRIS';
    case CASH = 'CASH';
}
