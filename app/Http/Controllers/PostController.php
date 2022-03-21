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
        return Post::with(['user' => function($query) {
            $query->select(['id', 'name']);
        }])->paginate(3);
    }
}
