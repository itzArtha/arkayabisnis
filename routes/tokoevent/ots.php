<?php

use App\Actions\Tokoevent\Ots\SetupOts;
use App\Actions\Tokoevent\Ots\StoreOtsTransaction;
use App\Actions\Tokoevent\Ots\UI\ShowOts;
use Illuminate\Support\Facades\Route;


Route::get('/', ShowOts::class)->name('index');
Route::post('/', SetupOts::class)->name('store');
Route::post('{ots}/transaction', StoreOtsTransaction::class)->name('transaction.store');
