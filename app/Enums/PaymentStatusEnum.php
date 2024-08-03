<?php

namespace App\Enums;

enum PaymentStatusEnum: string
{
    case IS_SETTLEMENT = "settlement";
    case IS_PENDING = "pending";
    case IS_DENY = "deny";
    case IS_EXPIRE = "expire";
    case IS_CANCEL = "cancel";
}
