<?php

use App\Actions\Tokoevent\Participant\UI\IndexParticipants;
use Illuminate\Support\Facades\Route;

Route::get('/', IndexParticipants::class)->name('index');
