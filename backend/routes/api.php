<?php

use App\Http\Controllers\Controller;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\JWTController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'authenticate']);
Route::get('abcd',function(){
    return view('pdf.invoice-pdf');
});

Route::group(['middleware' => ['jwt.verify']], function ($router) {
    Route::post('/addInvoice', [InvoiceController::class, 'addInvoice']); 
    Route::get('/logout', [UserController::class, 'logout']);
    Route::get('/getInvoices', [InvoiceController::class, 'getInvoices']);
    Route::get('/downloadInvoicePDF/{id}',[InvoiceController::class, 'downloadInvoicePDF']);
});

Route::get('testFunction', [UserController::class, 'testFunction']);
