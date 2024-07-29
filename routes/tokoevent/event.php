<?php

use App\Actions\Tokoevent\Event\StoreEvent;
use App\Actions\Tokoevent\Event\UI\CreateEvent;
use Illuminate\Support\Facades\Route;


Route::get('/', CreateEvent::class)->name('create')->withoutMiddleware('complete-register');
Route::post('/', StoreEvent::class)->name('store')->withoutMiddleware('complete-register');
