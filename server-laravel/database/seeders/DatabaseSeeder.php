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
        // The user for api testing
        User::factory()
            ->has(Tweet::factory()->count(60))
            ->create([
                'name' => 'Rok Sprogar',
                'email' => 'rok.sprogar@gmail.com',
            ]);

        // Ten users with 4 tweets each.
        User::factory()
            ->count(9)
            ->has(Tweet::factory()->count(50))
            ->create();
    }
}
