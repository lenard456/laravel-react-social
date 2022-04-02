<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function send(User $user, MessageRequest $request)
    {
        $message = Auth::user()->sendMessage($user, $request->content);
        return $message;
    }

    public function getMessages(User $user)
    {
        $thread = Auth::user()->threadWith($user);
        return $thread->messages;
    }
}
