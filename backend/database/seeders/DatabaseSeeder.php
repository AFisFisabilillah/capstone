<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Factories\UserFactory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // User::factory(10)->create()->save();

        User::factory()->create([
            'name' => 'Afis2112',
            'email' => 'afis@gmail.com',
            "password" => "2112-7",
            "photo" => "afis.jpg",
            "alamat" => "cikiwul",
            "role" => "ADMIN"
        ]);
    }
}
