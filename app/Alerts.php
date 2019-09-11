<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Alerts extends Model
{
	protected $table = 'allerts';
    protected $fillable = ['from_user', 'on_user'];


}