<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DoanSatLo extends Model
{
    protected $connection = "pgsql";
    protected $table = 'doan_sat_lo';
    protected $fillable = ['photos','name','info','geom'];
    protected $primaryKey = 'gid';
}
