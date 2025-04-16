<?php

namespace App\Http\Controllers;
use App\Models\Absensi;
use App\Http\Resources\AbsensiResponse;
use Exception;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use App\Http\Resources\AdminResource;
use Illuminate\Support\Facades\Storage;
//use Illuminate\Container\Attributes\Auth;//
use PHPUnit\TextUI\XmlConfiguration\Logging\Logging;
use Illuminate\Http\Exceptions\HttpResponseException;

class AdminController extends Controller
{
    private $pathModel ='localhost:5000';

    public function dashboard(){
        $hadir =  Absensi::where("status", "berhasil")->get();
        $tidakHadir =  Absensi::whereNot("status", "berhasil")->get();
        $results = DB::table('absensi')
            ->select(DB::raw('DATE_FORMAT(tanggal, "%M") as name'), DB::raw('count(status) as Hadir'))
            ->groupBy(DB::raw('DATE_FORMAT(tanggal, "%M")'))
            ->get();


            $data = DB::table('absensi')
                ->select('status as name', DB::raw('count(id) as value'))
                ->groupBy('status')
                ->get();


        return response()->json([
            "status"=>"berhasil mengambil dashboard",
            "message" => "berhasil mengambil data",
            "data" => [
                "totaluser" => User::count("id"),
                "hadir" => count($hadir),
                "tidakHadir" => count($tidakHadir),
                "barchart" => $results,
                "piechart" => $data
            ]
            ]);
    }


    public function profile()
    {
        return response()->json([
            'admin' => Auth::user()
        ]);
    }


    public function createUser(Request $request)    {
        $request->validate([
            "name" => ["required"],
            "email" => ["email", "unique:users,email", "required"],
            "password" => ["required","min:6"],
            "alamat" => ["required"],
            "role" => ["required"],
            "photo" => ["required", "file", "image"]
        ]);

        $imageName=Str::uuid()."_".$request->file("photo")->getClientOriginalName();
        $path = $request->file("photo")->storeAs("photos",$imageName,"public");

        $response =Http::attach(
            'image',
            file_get_contents($request->file('photo')->getRealPath()),
            $request->file('photo')->getClientOriginalName()
        )->post($this->pathModel."/register_face", [
            "name" => $request['email'],
        ]);


        DB::beginTransaction();
        $user = new User();
        $user->name = $request['name'];
        $user->email = $request['email'];
        $user->alamat = $request['alamat'];
        $user->password = Hash::make( $request['password']);
        $user->photo = $path;
        $user->role = Str::upper($request['role']) ;
        $user->save();
        DB::commit();

        return response([
            "status" => "success",
            "message" => "berhasil menambahkan user",
            "data" => (new UserResponse($user))
        ]);

    }

    public function updateUser(Request $request, User $user)
{
    $request->validate([
        "name" => ["required"],
        "email" => ["required"],
        "password" => ["nullable", "min:6"],
        "alamat" => ["required"],
        "role" => ["required"],
        "photo" => ["nullable", "file", "image"]
    ]);

    DB::beginTransaction();

    try {
        if ($request->hasFile("photo")) {
            Storage::delete($user->photo);
            $imageName = Str::uuid() . "_" . $request->file("photo")->getClientOriginalName();
            $path = $request->file("photo")->storeAs("photos", $imageName, "public");
            $user->photo = $path;

            // Optional: API call
            $response = Http::attach(
                'image',
                file_get_contents($request->file('photo')->getRealPath()),
                $request->file('photo')->getClientOriginalName()
            )->post($this->pathModel . "/update_face", [
                "name" => $user->email,
            ]);
        }

        // Update manual (jangan pakai $request->all())
        $user->name = $request->input("name");
        $user->email = $request->input("email");
        $user->alamat = $request->input("alamat");
        $user->role = Str::upper($request->input("role"));

        if ($request->filled("password")) {
            $user->password = bcrypt($request->input("password"));
        }

        $user->save();
        DB::commit();

        return response([
            "status" => "success",
            "message" => "berhasil update user",
            "data" => new UserResponse($user)
        ]);
    } catch (Exception $e) {
        DB::rollBack();
        return response([
            "status" => "error",
            "message" => $e->getMessage()
        ], 500);
    }
}




    public function getUser(Request $request){
        $limit = $request->query("limit", 10);
        $search = $request->query("q", "");

        $users = User::query();


        if (!empty($search)) {
            $users->whereFullText(['name'], $search);
        }

        $users = $users->paginate($limit);

        return response([
            "status" => "success",
            "message" => "berhasil update user user",
            "data" => (UserResponse::collection($users->items())),
            "meta" => [
                "current_page" => $users->currentPage(),
                "last_page" => $users->lastPage(),
                "per_page" => $users->perPage(),
                "total" => $users->total(),
                "next_page_url" => $users->nextPageUrl(),
                "prev_page_url" => $users->previousPageUrl(),
            ]
        ]);
    }

    public function deleteUser(User $user){
        $isSucces = $user->delete();
        if($isSucces){
            Http::delete($this->pathModel."/delete_face",[
                "name" => $user->email
            ]);
            return response([
                "status" => "success",
                "message" => "berhasil menghapus user",
                "data" => (new UserResponse($user))
            ]);
        }else{
            throw new HttpResponseException(response([
                "status" => "error",
                "message" => "gagal menghapus user",
            ], 400));
        }
    }

    public function detailUser(String $id){
        $user = User::where('id', $id)->first();
        if(!$user){
            throw new HttpResponseException(response([
                "status" => "error",
                "message" => "gagal meneumkan user  user",
            ], 404));
        }

        $absensi = $user->absensi;

        return response([
            "status" => "success",
            "message" => "berhasil mendapatkan user",
            "data" => [
                "profile" => (new UserResponse($user)),
                "absensi" => AbsensiResponse::collection($absensi)
            ]
        ]);

    }

    public function absensiUser(){
        $absensi = Absensi::all();

        return response()->json([
            "status" => "success",
            "message" => "berhasil mendapatkan absensi",
            "data" => AbsensiResponse::collection($absensi)
        ]);
    }


}
