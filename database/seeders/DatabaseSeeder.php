<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::updateOrCreate(['email' => env('USER_EMAIL', 'user@gmail.com')],[
            'name' => env('USER_NAME', 'John Doe'),
            'password' => env('USER_PASSWORD', 'user1234')
        ]);
    }
}
