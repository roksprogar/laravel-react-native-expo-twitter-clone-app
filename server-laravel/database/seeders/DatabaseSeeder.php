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
            ->has(Tweet::factory()->count(5))
            ->create([
                'name' => 'Rok Sprogar',
                'email' => 'rok.sprogar@gmail.com',
            ]);

        // Ten users with 4 tweets each.
        User::factory()
            ->count(99)
            ->sequence(fn ($sequence) => ['name' => 'Person ' . $sequence->index + 2])
            ->has(Tweet::factory()->count(5))
            ->create();

        foreach (range(1, 20) as $user_id) {
            foreach (range(1, 20) as $user_id2) {
                User::find($user_id)->follows()->attach(User::find($user_id2));
            }
        }

        foreach (range(21, 40) as $user_id) {
            foreach (range(21, 40) as $user_id2) {
                User::find($user_id)->follows()->attach(User::find($user_id2));
            }
        }

        foreach (range(41, 60) as $user_id) {
            foreach (range(41, 60) as $user_id2) {
                User::find($user_id)->follows()->attach(User::find($user_id2));
            }
        }

        foreach (range(61, 80) as $user_id) {
            foreach (range(61, 80) as $user_id2) {
                User::find($user_id)->follows()->attach(User::find($user_id2));
            }
        }

        foreach (range(81, 100) as $user_id) {
            foreach (range(81, 100) as $user_id2) {
                User::find($user_id)->follows()->attach(User::find($user_id2));
            }
        }
    }
}
