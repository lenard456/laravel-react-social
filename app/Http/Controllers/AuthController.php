<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\RegisterRequest;
use App\Models\User;

class AuthController extends Controller
{

    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->validated())) {
            throw ValidationException::withMessages([
                'email' => 'Wrong email or password.'
            ]);
        }

        return Auth::user()->append('followingIds', 'followerIds');
    }


    public function register(RegisterRequest $request)
    {
        return User::create($request->validated());
    }


    public function logout()
    {
        return Auth::guard('web')->logout();
    }
}
