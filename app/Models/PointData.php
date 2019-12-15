<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PointData extends Model
{
    protected $connection = "pgsql";
    protected $table = 'data_point';
    protected $fillable = ['photos','name','info','geom'];
    protected $primaryKey = 'gid';
}
