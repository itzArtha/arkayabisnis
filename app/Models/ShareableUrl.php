<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShareableUrl extends Model
{
    use HasFactory;
    protected $fillable = [
        'original_url',
        'short_url',
        'qr_code',
    ];
        
    // public function organization()
    // {
    //     return $this->hasOne(Organization::class, 'shareable_id');
    // }
}
