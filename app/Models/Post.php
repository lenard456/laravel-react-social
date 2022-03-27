<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','content'];

    protected $appends = ['likerIds'];

    protected $hidden = ['likes'];

    protected $with = ['user'];

    protected $withCount = ['comments'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function likes()
    {
        return $this->morphMany(Like::class, 'likable');
    }

    public function getLikersAttribute()
    {
        return $this->likes()->with('user')->get()->pluck('user');
    }

    public function getLikerIdsAttribute()
    {
        return $this->likes->pluck('user_id');
    }
}
