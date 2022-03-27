<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function view(User $user)
    {
        return $user->append('followingIds', 'followerIds');
    }

    public function suggestions()
    {
        return Auth::user()->notFollowing()->inRandomOrder()->limit(10)->get();
    }

    public function follow(User $user)
    {
        $user->followers()->detach(Auth::id()); //To prevent duplication
        $user->followers()->attach(Auth::id());
        return 'Successfully followed';
    }

    public function unFollow(User $user)
    {
        $user->followers()->detach(Auth::id());
        return 'Successfully unfollowed';
    }

    public function currentUser()
    {
        $user = Auth::user()->append('followingIds', 'followerIds');
        return $user;
    }

    public function posts(User $user)
    {
        $posts = $user->posts()->latest()->paginate(10);
        return $posts;
    }

    public function following(User $user)
    {
        return $user->following()->paginate(2);
    }
}
