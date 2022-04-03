<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Models\Conversation;
use App\Models\Thread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ThreadController extends Controller
{
    public function view(Thread $thread)
    {
        $conversation = new Conversation($thread);
        $conversation->setMessages($thread->messages);
        return response()->json($conversation);
    }

    public function send(Thread $thread, MessageRequest $request)
    {
        $message = Auth::user()->sendMessageOn($thread, $request->content);
        return $message;
    }
}
