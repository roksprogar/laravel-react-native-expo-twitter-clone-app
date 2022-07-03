<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Tweet;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Ten users with 4 tweets each.
        User::factory()
            ->count(10)
            ->has(Tweet::factory()->count(60))
            ->create();
    }
}
