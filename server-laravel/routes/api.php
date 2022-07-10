<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TweetController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\TweetAllController;
use App\Http\Controllers\UserFollowController;
use App\Http\Controllers\UserTweetsController;
use App\Http\Controllers\UserProfileController;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/tweets', [TweetController::class, 'index'])->name('tweet.index');
    Route::get('/tweets_all', [TweetAllController::class, 'index'])->name('tweet.index.all');
    Route::get('/tweets/{tweet}', [TweetController::class, 'show'])->name('tweet.show');
    Route::post('/tweets', [TweetController::class, 'store'])->name('tweet.store');
    Route::delete('/tweets/{tweet}', [TweetController::class, 'destroy'])->name('tweet.destroy');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/follow/{user}', [UserFollowController::class, 'store'])->name('follow.user.store');
    Route::post('/unfollow/{user}', [UserFollowController::class, 'destroy'])->name('follow.user.destroy');
    Route::get('/is-following/{user}', [UserFollowController::class, 'show'])->name('follow.user.show');
});

Route::get('/users/{user}', [UserProfileController::class, 'show'])->name('user.profile.show');
Route::get('/users/{user}/tweets', [UserTweetsController::class, 'index'])->name('user.tweets.index');

Route::post('/login', [AuthController::class, 'store'])->name('login');
Route::post('/signup', [RegisterController::class, 'store'])->name('signup');
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'destroy'])->name('logout');
