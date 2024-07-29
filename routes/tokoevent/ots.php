<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/ots-system', function () {
    return Inertia::render('Event/OtsSystem');
})->name('ots.index');
