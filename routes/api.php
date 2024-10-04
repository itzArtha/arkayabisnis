<?php

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/payment-webhook-test', function (Request $request) {
    $payment = Payment::where('sourceable_id', 1)->first();
    // $payment->user->notify(new SendTicketToBuyerNotification($payment));
    broadcast(new \App\Events\SendWebhookPaymentStatusEvent($payment))->toOthers();
});

Route::post('/topup-webhook-test', function (Request $request) {
    $payment = \Bavix\Wallet\Models\Transaction::where('payable_id', 1)->first();

    // $payment->user->notify(new SendTicketToBuyerNotification($payment));
    broadcast(new \App\Events\SendWebhookTopupStatusEvent($payment))->toOthers();
});
