<?php

use App\Actions\Tokoundangan\Event\UI\CreateEvent;
use App\Actions\Tokoundangan\Event\UI\IndexEvent;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/', IndexEvent::class)->name('index');
    Route::get('/create', CreateEvent::class)->name('create');

    Route::get('/dashboard', function () {
        return Inertia::render('Undangan/Dashboard');
    })->name('dashboard');

    Route::get('/tamu', function () {
        return Inertia::render('Undangan/Guests');
    })->name('guests');
});
