<?php

namespace App\Enums;

enum PaymentMethodEnum: string
{
    case QRIS = 'qris';
    case CASH = 'cash';
}
