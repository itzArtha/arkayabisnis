<?php

namespace App\Models\Tokoundangan;

use App\Models\HasTokoundanganConnection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrideParent extends Model
{
    use HasFactory, HasTokoundanganConnection;

    protected $fillable = [
        'bride_id',
        'name',
        'address',
        'type'
    ];
}
