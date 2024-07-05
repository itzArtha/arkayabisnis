<?php

namespace App\Models\Tokoundangan;

use App\Models\HasTokoundanganConnection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 *
 * @property string $name
 * @property string $filename
 */

class Theme extends Model
{
    use HasFactory, HasTokoundanganConnection;

    protected $fillable = [
        'name',
        'filename'
    ];
}
