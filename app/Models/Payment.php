<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'reference_id',
        'user_id',
        'channel',
        'subtotal',
        'discount',
        'convience_fee',
        'admin_fee',
        'total',
        'path',
        'actions',
        'status',
        'expired_at',
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'payment_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    const IS_SETTLEMENT = "settlement";
    const IS_PENDING = "pending";
    const IS_DENY = "deny";
    const IS_EXPIRE = "expire";
    const IS_CANCEL = "cancel";

    public function getStatus($status): array
    {
        switch ($status ?? $this->status) {
            case self::IS_PENDING:
                return [
                    'key'   => self::IS_PENDING,
                    'label' => 'Tertunda',
                    'color' => 'bg-yellow-100 text-yellow-800'
                ];
            case self::IS_SETTLEMENT:
                return [
                    'key'   => self::IS_SETTLEMENT,
                    'label' => 'Sukses',
                    'color' => 'bg-green-100 text-green-800'
                ];
            case self::IS_EXPIRE:
                return [
                    'key'   => self::IS_EXPIRE,
                    'label' => 'Kedaluarsa',
                    'color' => 'bg-red-100 text-red-800'
                ];
            case self::IS_DENY:
                return [
                    'key'   => self::IS_DENY,
                    'label' => 'Ditolak',
                    'color' => 'bg-red-100 text-red-800'
                ];
            default:
                return [
                    'key'   => self::IS_CANCEL,
                    'label' => 'Tidak diketahui',
                    'color' => 'bg-red-100 text-red-800'
                ];
        }
    }
}
