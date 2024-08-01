<?php

use App\Actions\Tokoevent\Ots\SetupOts;
use App\Actions\Tokoevent\Ots\UI\ShowOts;
use Illuminate\Support\Facades\Route;


Route::get('/', ShowOts::class)->name('index');
Route::post('/', SetupOts::class)->name('store');
