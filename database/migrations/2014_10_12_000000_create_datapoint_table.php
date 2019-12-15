<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateDatapointTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_point', function (Blueprint $table) {
            $table->increments('gid');
            $table->text('name');
            $table->text('info');
            $table->text('photos');
            $table->timestamps();
        });
        DB::statement('ALTER TABLE data_point ADD geom geometry(MultiPoint, 32648)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('data_point');
    }
}
