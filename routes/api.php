<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function() {

    Route::get('/user', [UserController::class, 'currentUser']);
    Route::get('/user/suggestions', [UserController::class, 'suggestions']);
    Route::get('/user/conversations', [UserController::class, 'conversations']);

    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/posts', [PostController::class, 'create']);
    Route::get('/posts/{post}', [PostController::class, 'view']);
    Route::post('/posts/{post}/like', [PostController::class, 'like']);
    Route::post('/posts/{post}/unlike', [PostController::class, 'unlike']);
    Route::post('/posts/{post}/comment', [PostController::class, 'comment']);

    Route::get('/users/{user}', [UserController::class, 'view']);
    Route::get('/users/{user}/posts', [UserController::class, 'posts']);
    Route::post('/users/{user}/follow', [UserController::class, 'follow']);
    Route::post('/users/{user}/unfollow', [UserController::class, 'unFollow']);
    Route::get('/users/{user}/following', [UserController::class, 'following']);

    Route::post('/messages/{user}', [MessageController::class, 'send']);
    Route::get('/messages/{user}', [MessageController::class, 'getMessages']);

    Route::get('/threads/{thread}', [ThreadController::class, 'view']);
    Route::post('/threads/{thread}',[ThreadController::class, 'send']);

    Route::post('/logout', [AuthController::class, 'logout']);

});