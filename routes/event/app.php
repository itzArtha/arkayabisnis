<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {    
    Route::get('/dashboard', function () {
        return Inertia::render('Event/Dashboard');
    })->name('dashboard');
    
    Route::get('/participants', function () {
        return Inertia::render('Event/Participants');
    })->name('participants');

    Route::prefix('profile')->as('profile.')->group(function() {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('destroy');
    });
});