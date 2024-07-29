<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ProfileController::class, 'edit'])->name('edit');
Route::patch('/profile', [ProfileController::class, 'update'])->name('update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('destroy');
