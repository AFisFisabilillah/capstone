<?php

namespace App\Http\Controllers;

use App\Http\Resources\AbsensiResponse;
use App\Models\Absensi;
use Illuminate\Http\Request;
use App\Http\Resources\UserResponse;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class UserController extends Controller
{
    public function profile(){
        $user = auth()->user();
        return response()->json([
            "status" => "success",
            "message" => "berhasil mendapatkan user",
            "data" => (new UserResponse($user))
        ]);
    }

    public function absensi(Request $request){
        $request->validate([
            "image" => "image|file|required"
        ]);

        $user = Auth::user();

        $responseHttp = Http::attach(
            "image", file_get_contents($request->file("image")->getRealPath()), $request->file("image")->getClientOriginalName()
        )->post("http://127.0.0.1:5000/compare_face", [
            "name" => $user->email
        ]);

        $response = $responseHttp->json();

        if(!$response['status']){
            throw new HttpResponseException(response([
                "status" => "error",
                "message" => "wajah tidak cocok"
            ], 400));
        }

        $absensi = Absensi::create([
            "tanggal" => now()->toDateString(),
            "user_id" => $user->id,
            "status" => "berhasil"
        ]);

        return response()->json([
            "status" => "success",
            "message" => "berhasil absen ",
            "data" => (new AbsensiResponse($absensi))
        ]);

    }

    public function userAbsensi(Request $request)
    {
        $user = Auth::user();

        $limit = $request->input('limit', 10);

        $absensi = $user->absensi()->paginate($limit);

        return response()->json([
            "status" => "success",
            "message" => "Berhasil mengambil absen",
            "data" => AbsensiResponse::collection($absensi->items()), // Ambil data dari paginator
            "meta" => [
                "current_page" => $absensi->currentPage(),
                "last_page" => $absensi->lastPage(),
                "per_page" => $absensi->perPage(),
                "total" => $absensi->total(),
                "next_page_url" => $absensi->nextPageUrl(),
                "prev_page_url" => $absensi->previousPageUrl(),
            ]
        ]);
    }

}
