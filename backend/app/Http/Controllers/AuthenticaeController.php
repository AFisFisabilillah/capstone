<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\LoginResponse;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthenticaeController extends Controller
{
    public function login(Request $request){
        $validate = $request->validate([
            "email" => ["email", "required"],
            "password" =>["required"]
        ]);

        $user = User::where('email', $validate['email'])->first();
        if(!$user || !Hash::check($validate['password'],$user->password )){
            throw new HttpResponseException(response([
                "status"=>false,
                "message" => "gagal login",
                "errors" => "Password Atau Username salah"
            ], 400));
        }

        $token  = $user->createToken("authToken")->plainTextToken;
        return response()->json([
            "status" => "success",
            "message"=> "berhasil login",
            "data" => (new LoginResponse($user))->additional(["token"=>$token])
        ]);


    }

    public function logout(Request $request){
        $user = Auth::user();

        if ($user) {
            // Hapus hanya token yang sedang digunakan
            $user->currentAccessToken()->delete();

            return response()->json([
                "status" => "success",
                "message" => "Logout berhasil"
            ]);
        }

        return response()->json([
            "status" => "error",
            "message" => "User tidak ditemukan"
        ], 401);
    
    }
}

