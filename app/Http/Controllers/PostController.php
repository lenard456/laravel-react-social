<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Post;
use App\Http\Requests\CommentRequest;

class PostController extends Controller
{
    public function create(PostRequest $request)
    {
        $user = Auth::user();
        $post = $user->posts()->create($request->validated());
        return $post;
    }

    public function view(Post $post)
    {
        $post->comments;
        return $post;
    }

    public function comment(Post $post, CommentRequest $request)
    {
        Auth::user()->comment($post, $request->content);
        return $post->comments;
    }

    public function index()
    {
        $id = Auth::id();
        return Post::whereHas('user.followers', function($query) use ($id) {
            $query->where('follower_id', $id)
                  ->orWhere('user_id', $id);
        })->latest()->paginate(3);
    }

    public function like(Post $post)
    {
        Auth::user()->like($post);
        return $post->likerIds;
    }

    public function unlike(Post $post)
    {
        Auth::user()->unlike($post);
        return $post->likerIds;
    }
}
