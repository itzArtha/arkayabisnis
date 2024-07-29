<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    Route::middleware(['complete-register'])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Event/Dashboard');
        })->name('dashboard');

        Route::prefix('profile')->as('profile.')->group(__DIR__ . '/profile.php');
        Route::prefix('finance')->as('finance.')->group(__DIR__ . '/finance.php');
        Route::prefix('ots-system')->as('ots.')->group(__DIR__ . '/ots.php');
        Route::prefix('participants')->as('participants.')->group(__DIR__ . '/participant.php');
        Route::prefix('event')->as('event.')->group(__DIR__.'/event.php');
    });
});

require __DIR__ . '/auth.php';
