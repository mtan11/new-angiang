<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DoanSatLo extends Model
{
    protected $connection = "pgsql";
    protected $table = 'doan_sat_lo';
    protected $fillable = ['photos','tendoan','mota','stt','diadiem','chieudai','kc_nguyhiem','kc_antoan','tocdo','mucdo','shape_leng','geom'];
    protected $primaryKey = 'gid';
}
