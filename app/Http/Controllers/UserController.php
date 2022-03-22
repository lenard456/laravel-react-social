<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

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
}
