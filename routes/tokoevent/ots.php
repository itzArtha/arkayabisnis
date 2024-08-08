<?php

use App\Actions\Tokoevent\Ots\SetupOts;
use App\Actions\Tokoevent\Ots\StoreOtsCollateral;
use App\Actions\Tokoevent\Ots\StoreOtsTransaction;
use App\Actions\Tokoevent\Ots\UI\ShowOts;
use App\Actions\Tokoevent\Ots\UI\ShowUserOtsPurchase;
use App\Actions\Tokoevent\Participant\UI\ShowParticipant;
use Illuminate\Support\Facades\Route;


Route::get('/', ShowOts::class)->name('index');
Route::post('/', SetupOts::class)->name('store');
Route::post('{ots}/collateral', StoreOtsCollateral::class)->name('collateral.store');

Route::withoutMiddleware(['auth', 'complete-register'])->group(function () {
    Route::post('{ots}/transaction', StoreOtsTransaction::class)->name('transaction.store');
    Route::get('purchase/{ots:uuid}', ShowUserOtsPurchase::class)->name('user.purchase');
    Route::get('tickets/{payment:reference_id}', [ShowParticipant::class, 'fromPayment'])->name('user.tickets');
});