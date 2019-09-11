<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    protected $fillable = ['autor', 'message', 'message_time', 'room_id'];


    public static function getMessagesByRoom(int $room_id){
    	Messages::where('room_id', room_id);
    }
}
