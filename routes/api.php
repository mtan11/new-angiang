<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/insert-data-diemks', 'PostgresController@insertDataAnhKS');
Route::post('/insert-data-diemsl', 'PostgresController@insertDataDiemSL');
Route::post('/insert-data-doansl', 'PostgresController@insertDataDoanSL');

Route::post('/update-data-diemks', 'PostgresController@updateDataAnhKS');
Route::post('/update-data-diemsl', 'PostgresController@updateDataDiemSL');
Route::post('/update-data-doansl', 'PostgresController@updateDataDoanSL');

Route::post('/upload-shapefile','PostgresController@uploadShapeFile');
Route::get('/get-all-data','PostgresController@getAllData');
Route::get('/get-matcat-by-pointid/{pointid}','PostgresController@getMatCatByPointID');
Route::post('/get-matcat','PostgresController@getMatCat');

