<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiemKhaoSatMatCatNgang extends Model
{
    protected $connection = "pgsql";
    protected $table = 'diem_khao_sat_mat_cat_ngang';
    protected $fillable = ['name','info','geom'];
    protected $primaryKey = 'gid';
}
