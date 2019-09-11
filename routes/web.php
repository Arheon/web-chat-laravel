<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function(){
	return redirect('/chat');
})->middleware('auth');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/users', 'ChatController@users')->middleware('auth');
Route::get('/user', 'ChatController@getUserByName')->middleware('auth');
Route::post('/alertUser', 'ChatController@alertUser')->middleware('auth');
Route::get('/chat', 'ChatController@getIndex')->middleware('auth');
Route::post('/chat/message', 'ChatController@postMessage');
Route::get('/chat/user', 'ChatController@getUser')->middleware('auth');
