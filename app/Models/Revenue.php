<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Revenue extends Model
{
    use HasFactory;
    protected $fillable = [
        'transaction_id',
        'organization_id',
        'amount',
        'status',
    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class, 'transaction_id');
    }

    public function organization()
    {
        return $this->belongsTo(User::class, 'organization_id');
    }
}
