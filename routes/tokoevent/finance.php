<?php

use App\Actions\Tokoevent\Finance\UI\ShowFinance;
use Illuminate\Support\Facades\Route;

Route::get('/', ShowFinance::class)->name('index');
