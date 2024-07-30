<?php

namespace App\Actions\Tokoevent\Migrate;

use App\Models\Event;
use App\Models\User;
use Inertia\Inertia;
use Lorisleiva\Actions\ActionRequest;
use Lorisleiva\Actions\Concerns\AsAction;
use Lorisleiva\Actions\Concerns\AsCommand;
use Symfony\Component\HttpFoundation\Response;

class MarkOrganizerAsComplete
{
    use AsAction;
    use AsCommand;

    public $commandSignature = 'users:complete';

    public function handle(): void
    {
        $users = User::with('events')->get();

        foreach ($users as $user) {

            if($user->events->count() > 0) {
                $user->update([
                    'is_complete' => true,
                    'completed_at' => now()
                ]);
            }

            echo "$user->name marked as complete ✅ \n";
        }
    }

    public function asCommand(): void
    {
        $this->handle();
    }
}
