<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Absensi extends Model
{
    protected $table = "absensi";
    protected $fillable = ["tanggal", "user_id", "status"];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
