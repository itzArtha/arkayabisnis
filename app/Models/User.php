<?php

namespace App\Models;

use App\Models\Traits\WhatsAppSettingTrait;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasSlug, WhatsAppSettingTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'username',
        'name',
        'email',
        'roles',
        'phone',
        'birthday',
        'photo_url',
        'password',
        'provider',
        'provider_id',
        'timezone',
        'completed_at',
        'verified_at'
    ];

    // protected $with = ['notificationSetting', 'event', 'bank'];

    const IS_ORG = "organizer";
    const IS_USER = "user";

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('username');
    }

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime'
    ];

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = Hash::make($password);
    }

    public function setNameAttribute($name)
    {
        $this->attributes['name'] = $name;
    }

    public function getPhotoUrlAttribute($value)
    {
        if($value) {
            return $value;
        } else if($this->roles == self::IS_ORG) {
            return 'https://ui-avatars.com/api/?bold=true&name=' . $this->attributes['name'] . '&background=random&?size=128&length=1';
        } else {
            return 'https://api.dicebear.com/7.x/fun-emoji/svg?seed='. $this->attributes['name'];
        }
    }

    public function sendPasswordResetNotification($token)
    {
        $url = env('APP_FRONTEND_URL') . '/password/reset?token=' . $token;

        $this->notify(new SendResetPassword($url));
    }

    public function SendEmailVerificationNotification()
    {
        $this->notify(new CustomEmailVerification());
    }

    public function organizer()
    {
        return $this->hasOne(Organization::class, 'parent_id');
    }

    public function bank()
    {
        return $this->hasOne(Bank::class, 'owner_id');
    }

    public function event()
    {
        return $this->hasOne(Event::class, 'organizer_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function participants()
    {
        return $this->hasMany(Participant::class);
    }

    public function reminders()
    {
        return $this->hasMany(Reminder::class, 'user_id');
    }

    public function withdraws()
    {
        return $this->hasMany(Withdraw::class, 'user_id');
    }
}
