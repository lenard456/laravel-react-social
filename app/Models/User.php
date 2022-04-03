<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $with = ['imageAvatar'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'imageAvatar',
        'email',
        'email_verified_at',
        'updated_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = ['avatar'];

    protected static function booted()
    {
        static::created(function ($user) {

            //Generate default Avatar
            $user->regenerateAvatar();
        });
    }

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = Hash::make($password);
    }

    public function getAvatarAttribute()
    {
        return $this->imageAvatar->url;
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'followers', 'user_id', 'follower_id');
    }

    public function following()
    {
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'user_id');
    }

    public function getFollowerIdsAttribute()
    {
        return $this->followers()->pluck('id');
    }

    public function getFollowingIdsAttribute()
    {
        return $this->following()->pluck('id');
    }

    public function notFollowing()
    {
        /**
         * Select all the user that 
         * the current user is not following :))
         */
        $id = $this->id;
        return User::whereDoesntHave('followers', function($q) use ($id) {
            $q->where('follower_id', $id);
        })->where('id', '<>', $id);
    }

    public function imageAvatar()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function regenerateAvatar()
    {
        //Delete if has avatar
        $this->imageAvatar()->delete();

        //Generate new
        $name = strtolower(urlencode($this->name));
        $this->imageAvatar()->create([
            'source' => 'url',
            'reference' => "https://avatars.dicebear.com/api/initials/$name.svg"
        ]);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function unlike($likable)
    {
        if (! $this->hasLiked($likable)) return $this;

        $likable->likes()
            ->whereHas('user', fn($q) => $q->whereId($this->id))
            ->delete();
        
        return $this;
    }

    public function like($likable) 
    {
        if ($this->hasLiked($likable)) return $this;

        (new Like())
            ->user()->associate($this)
            ->likable()->associate($likable)
            ->save();

        return $this;
    }

    public function comment($commentable, $content)
    {
        $comment = new Comment();
        $comment->content = $content;
        $comment->user()->associate($this);
        $comment->commentable()->associate($commentable);
        $comment->save();
        return $comment;
    }

    public function hasLiked($likable)
    {
        if (! $likable->exists) return false;

        return $likable
            ->likes()
            ->whereHas('user', fn($q) => $q->whereId($this->id))
            ->exists();
    }

    public function threads()
    {
        return $this->belongsToMany(Thread::class);
    }

    public function adminThreads()
    {
        if ($this->role === 'admin'){
            return Thread::where('type', 'admin')->get();
        }
    }

    public function threadWith(User $receiver) : Thread
    {
        $thread = $this->threads()->whereHas('members', fn($q) => $q->whereId($receiver->id))->first();

        if (!$thread) {
            $thread = $this->threads()->create();
            $thread->members()->attach($receiver->id);
        }

        return $thread;
    }

    public function conversations()
    {
        return $this->threads()
            ->with('members')
            ->where('messages_count', '>', 0)
            ->get()
            ->map(fn($thread) => new Conversation($thread));
            // ->pluck('members') 
            // ->flatten()
            // ->where('id', '<>', $this->id)
            // ->values();
    }

    public function sendMessage(User $receiver, string $content)
    {
        $thread = $this->threadWith($receiver);
        return $this->sendMessageOn($thread, $content);
    }

    public function sendMessageOn(Thread $thread, string $content)
    {
        $message = new Message();
        $message->content = $content;
        $message->user()->associate($this);
        $message->thread()->associate($thread);
        $message->save();
        return $message;        
    }
}
