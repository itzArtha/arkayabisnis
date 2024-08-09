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

Route::post('/webhook-test', function (Request $request) {
    $payment = Payment::where('sourceable_id', 4)->first();
    // $payment->user->notify(new SendTicketToBuyerNotification($payment));
    broadcast(new \App\Events\SendWebhookPaymentStatusEvent($payment))->toOthers();
});
