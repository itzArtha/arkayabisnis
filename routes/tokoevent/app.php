<?php

use App\Actions\Tokoevent\Dashboard\UI\ShowDashboard;
use App\Models\Payment;
use App\Notifications\SendTicketToBuyerNotification;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $payment = Payment::first();
    // $payment->user->notify(new SendTicketToBuyerNotification($payment));
    return redirect()->route('login');
});

Route::middleware(['auth'])->group(function () {
    Route::middleware(['complete-register'])->group(function () {
        Route::middleware('not-ready')->group(function() {
            Route::get('/dashboard', ShowDashboard::class)->name('dashboard');
            Route::prefix('profile')->as('profile.')->group(__DIR__ . '/profile.php');
            Route::prefix('finance')->as('finance.')->group(__DIR__ . '/finance.php');
            Route::prefix('participants')->as('participants.')->group(__DIR__ . '/participant.php');
        });
        
        Route::prefix('event')->as('event.')->group(__DIR__.'/event.php');
        Route::prefix('ots-system')->as('ots.')->group(__DIR__ . '/ots.php');
    });
});

require __DIR__ . '/auth.php';
