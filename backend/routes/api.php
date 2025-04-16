<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthenticaeController;
use App\Http\Controllers\UserController;
use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth/login', [AuthenticaeController::class, 'login']);

Route::middleware(['auth:sanctum', 'isAdmin'])->group(function (){
    Route::get('/admin', [AdminController::class, 'dashboard']);
    Route::post('/admin/users', [AdminController::class, 'createUser']);
    Route::post('/admin/users/{user}', [AdminController::class, 'updateUser']);
    Route::get('/admin/users', [AdminController::class, 'getUser']);
    Route::delete('/admin/users/{user}', [AdminController::class, 'deleteUser']);
    Route::get('/admin/users/{user}', [AdminController::class, 'detailUser']);
    Route::get('/admin/absensi',[AdminController::class,'absensiuser']);
    Route::get('/admin/profile', [AdminController::class, 'profile']);
});


Route::middleware(['auth:sanctum'])->group(function (){
    Route::get('/profile ', [UserController::class, 'profile']);
    Route::post('/absensi', [UserController::class, 'absensi']);
    Route::get('/absensi/my', [UserController::class, 'userAbsensi']);
    Route::get('/dashboard', [UserController::class, 'dashboard']);

    Route::get('/auth/logout ', [AuthenticaeController::class, 'logout']);

});


