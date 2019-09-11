<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use App\Messages;
use App\invitation;

use App\Event\NewMessageAdded;
use App\User;
use App\Http\Controllers\Auth;


class ChatController extends Controller
{
    public function getIndex()
    {
        $messages = Messages::all();

        // $rmessages = array_reverse($messages);
        return view('welcome', compact('messages'));
    }
    public static function postMessage(Request $request)
    {
        $message = Messages::create($request->all());
        return back();
    }
    // public function getUser(Request $request)
    // {
    //     $username = Auth::user()->name;
    //     return response()->json(
    //         ['autor' => $username]
    //     );
    // }
    public function users(){
        return view('users');
    }
    public function getUserByName(Request $request)
    {

        $users = User::select('name', 'id')->where('name', 'like' , $_GET['search_input'] . '%')->get();
        echo "string";
        return response()->json(
            [
                'users' => $users,
                'request_input'=> $_GET['search_input']
            ] 
        );
    }
    public function getKnownUsers(){
        // Messages::getMessagesByRoom
    }

    public function alertUser(Request $request)
    {
        $from_id = $request->from_id;
        $to_id = $request->to_id;

        invitation::create($request->all());
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/login');
    }
}
