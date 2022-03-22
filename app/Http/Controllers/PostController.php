<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Post;

class PostController extends Controller
{
    public function create(PostRequest $request)
    {
        $user = Auth::user();
        $post = $user->posts()->create($request->validated());
        return $post;
    }

    public function index()
    {
        $id = Auth::id();
        return Post::with('user')->whereHas('user.followers', function($query) use ($id) {
            $query->where('follower_id', $id)
                  ->orWhere('user_id', $id);
        })->latest()->paginate(3);
    }
}
