<?php

namespace App\Enums;

enum PaymentMethodEnum: string
{
    case QRIS = 'QRIS';
    case CASH = 'CASH';
    case BNI = 'BNI';
    case MANDIRI = 'MANDIRI';
    case BRI = 'BRI';
    case PERMATA = 'PERMATA';
}
