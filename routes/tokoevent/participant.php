<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/participants', function () {
    return Inertia::render('Event/Participants');
})->name('participants.index');
