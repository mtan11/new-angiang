<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PointData extends Model
{
    protected $connection = "pgsql";
    protected $table = 'hinh_anh_khao_sat_thuc_dia';
    protected $fillable = ['photos','name','info','geom'];
    protected $primaryKey = 'gid';
}
