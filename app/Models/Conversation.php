<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;

class Conversation
{
    public $thread_id;
    public $type;
    public $name;
    public $avatar;
    public $member;
    public $messages = [];
    private $thread;

    public function __construct(Thread $thread)
    {
        $this->thread = $thread;
        $this->thread_id = $thread->id;
        $this->type = $thread->type;
        $this->name = $this->getThreadName();
        $this->avatar = $this->getThreadAvatar();
    }

    private function getThreadAvatar()
    {
        if ($this->type === 'admin') {
            return 'https://avatars.dicebear.com/api/initials/L+R.svg';
        }

        return $this->getMember()->avatar;
    }

    private function getThreadName()
    {
        if ($this->type === 'admin') {
            return 'Alspace Support';
        }

        return $this->getMember()->name;
    }

    private function getMember()
    {
        if (is_null($this->member)) {
            $this->member = $this->thread->members->where('user_id', '<>',Auth::id())->first();
        }
        return $this->member;
    }

    public function setMessages($messages)
    {
        $this->messages = $messages;
    }
}