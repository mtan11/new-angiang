<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\Models\PointData;
use App\Models\DiemKhaoSatMatCatNgang;
use App\Models\DoanSatLo;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\File;
// use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;

class PostgresController extends Controller
{


    public function insertDataAnhKS(Request $request)
    {
        $name = $request->name;
        $info = $request->info;
        $xy = $request->xy;
        $photos = $request->file('photos');
        // $photomc = $request->file('photomc');
        // $excelmc = $request->file('excelmc');
        $point = "Point($xy)";



        $data = PointData::create([
            'photos' => json_encode(array(
                'img' => []
                // 'imgmc' => []
            )),
            'name' => $name,
            'info' => $info,
            'geom' => DB::raw("ST_Transform(ST_GeomFromText('$point',4326), 32648)")
        ]);

        $photos = $request->file('photos');
        // $photomc = $request->file('photomc');


        $photoFiles = [];
        if ($photos) {
            foreach ($photos as $photo) {
                $extension = $photo->getClientOriginalExtension();
                $fileName = sprintf('%s.%s', $photo->getFilename(), $extension);
                Storage::disk('public')->put('/uploadedimages/diemanhks/' . $data->gid . '/img/' . $fileName, File::get($photo));
                array_push($photoFiles, $fileName);
            }
        }
        // $photomcFiles = [];
        // if ($photomc) {
        //     foreach ($photomc as $photom) {
        //         $extension = $photom->getClientOriginalExtension();
        //         $fileName = sprintf('%s.%s', $photom->getFilename(), $extension);
        //         Storage::disk('public')->put('/uploadedimages/' . $data->gid . '/imgmc/' . $fileName, File::get($photom));
        //         array_push($photomcFiles, $fileName);
        //     }
        // }
        $data->update([
            'photos' => json_encode(array(
                'img' => $photoFiles
            ))]);
        
        // $excelextension = $excelmc->getClientOriginalExtension();
        // $excelfileName = sprintf('%s.%s', $excelmc->getFilename(), $excelextension);
        // Storage::disk('public')->put('/uploadedimages/' . $data->gid . '/excel/' . $excelfileName, File::get($excelmc));
        
        // $process = shell_exec("python3 /var/www/new-angiang/pyservices/importExcel.py {$data->gid} {$excelfileName}");


        return 'thêm data thanh cong';
    }


    public function updateDataAnhKS(Request $request)
    {
        $id = $request->id;
        $name = $request->name;
        $info = $request->info;
        // $xy = $request->xy;
        $photos = $request->file('photos');
        // $photomc = $request->file('photomc');
        // $excelmc = $request->file('excelmc');
        // $point = "MultiPoint($xy)";



        $data = PointData::where('gid',"$id")->update([
            // 'photos' => json_encode(array(
            //     'img' => []
            //     // 'imgmc' => []
            // )),
            'name' => $name,
            'info' => $info,
            // 'geom' => DB::raw("ST_Transform(ST_GeomFromText('$point',4326), 32648)")
        ]);
        
        $select = PointData::find($id);

        $photos = $request->file('photos');


        if (strpos($select->photos, '"img"') == true) {
            $curphotos = json_decode($select->photos);  
            $photoFiles = $curphotos->img;
        } else {
            $photoFiles = [];
        }

        // $photomc = $request->file('photomc');
        

        // $photoFiles = [];
        if ($photos) {
            foreach ($photos as $photo) {
                $extension = $photo->getClientOriginalExtension();
                $fileName = sprintf('%s.%s', $photo->getFilename(), $extension);
                Storage::disk('public')->put('/uploadedimages/diemanhks/' . $id . '/img/' . $fileName, File::get($photo));
                array_push($photoFiles, $fileName);
            }
        }
        // $photomcFiles = [];
        // if ($photomc) {
        //     foreach ($photomc as $photom) {
        //         $extension = $photom->getClientOriginalExtension();
        //         $fileName = sprintf('%s.%s', $photom->getFilename(), $extension);
        //         Storage::disk('public')->put('/uploadedimages/' . $data->gid . '/imgmc/' . $fileName, File::get($photom));
        //         array_push($photomcFiles, $fileName);
        //     }
        // }
        $data = PointData::where('gid',"$id")->update([
            'photos' => json_encode(array(
                'img' => $photoFiles
            ))]);
        
        // $excelextension = $excelmc->getClientOriginalExtension();
        // $excelfileName = sprintf('%s.%s', $excelmc->getFilename(), $excelextension);
        // Storage::disk('public')->put('/uploadedimages/' . $data->gid . '/excel/' . $excelfileName, File::get($excelmc));
        
        // $process = shell_exec("python3 /var/www/new-angiang/pyservices/importExcel.py {$data->gid} {$excelfileName}");


        return 'update data thanh cong';
    }



    public function insertDataDiemSL(Request $request)
    {
        $name = $request->name;
        $info = $request->info;
        $xy = $request->xy;
        // $photos = $request->file('photos');
        // $photomc = $request->file('photomc');
        $excelmc = $request->file('excelmc');
        $point = "Point($xy)";



        $data = DiemKhaoSatMatCatNgang::create([
            // 'photos' => json_encode(array(
            //     'img' => [],
            //     'imgmc' => []
            // )),
            'name' => $name,
            'info' => $info,
            'geom' => DB::raw("ST_Transform(ST_GeomFromText('$point',4326), 32648)")
        ]);

        
        $excelextension = $excelmc->getClientOriginalExtension();
        $excelfileName = sprintf('%s.%s', $excelmc->getFilename(), $excelextension);
        Storage::disk('public')->put('/exceldiemsl/' . $data->gid . '/' . $excelfileName, File::get($excelmc));
        
        $process = shell_exec("python3 /var/www/new-angiang/pyservices/importExcel.py {$data->gid} {$excelfileName}");


        return 'thêm data thanh cong';
    }

    public function updateDataDiemSL(Request $request)
    {
        $id = $request->id;
        $name = $request->name;
        $info = $request->info;
        // $xy = $request->xy;
        // $photos = $request->file('photos');
        // $photomc = $request->file('photomc');
        $excelmc = $request->file('excelmc');
        // $point = "Point($xy)";



        $data = DiemKhaoSatMatCatNgang::where('gid',"$id")->update([
            // 'photos' => json_encode(array(
            //     'img' => [],
            //     'imgmc' => []
            // )),
            'name' => $name,
            'info' => $info,
            // 'geom' => DB::raw("ST_Transform(ST_GeomFromText('$point',4326), 32648)")
        ]);

        
        $excelextension = $excelmc->getClientOriginalExtension();
        $excelfileName = sprintf('%s.%s', $excelmc->getFilename(), $excelextension);
        Storage::disk('public')->put('/exceldiemsl/' . $id . '/' . $excelfileName, File::get($excelmc));
        
        $process = shell_exec("python3 /var/www/new-angiang/pyservices/importExcel.py {$id} {$excelfileName}");


        return 'update data thanh cong';
    }


    public function insertDataDoanSL(Request $request)
    {
        #'photos','tendoan','mota','stt','diadiem','chieudai','kc_nguyhiem','kc_antoan','tocdo','mucdo','shape_leng','geom'
        $tendoan = $request->tendoan;
        $mota = $request->mota;
        $stt = $request->stt;
        $diadiem = $request->diadiem;
        $chieudai = $request->chieudai;
        $kc_nguyhiem = $request->kc_nguyhiem;
        $kc_antoan = $request->kc_antoan;
        $tocdo = $request->tocdo;
        $mucdo = $request->mucdo;
        $xy = $request->xy;
        $photos = $request->file('photos');
        // $photomc = $request->file('photomc');
        // $excelmc = $request->file('excelmc');
        $point = $xy;



        $data = DoanSatLo::create([
            'photos' => json_encode(array(
                'img' => []
                // 'imgmc' => []
            )),
            'tendoan' => $tendoan,
            'mota' => $mota,
            'stt' => $stt,
            'diadiem' => $diadiem,
            'chieudai' => $chieudai,
            'kc_nguyhiem' => $kc_nguyhiem,
            'kc_antoan' => $kc_antoan,
            'tocdo' => $tocdo,
            'mucdo' => $mucdo,
            'geom' => DB::raw("st_transform(GeomFromEWKT('SRID=4326;LINESTRING ($point)'),32648)"),
        ]);

        $photos = $request->file('photos');
        // $photomc = $request->file('photomc');
        

        $photoFiles = [];
        if ($photos) {
            foreach ($photos as $photo) {
                $extension = $photo->getClientOriginalExtension();
                $fileName = sprintf('%s.%s', $photo->getFilename(), $extension);
                Storage::disk('public')->put('/uploadedimages/doansl/' . $data->gid . '/img/' . $fileName, File::get($photo));
                array_push($photoFiles, $fileName);
            }
        }
        // $photomcFiles = [];
        // if ($photomc) {
        //     foreach ($photomc as $photom) {
        //         $extension = $photom->getClientOriginalExtension();
        //         $fileName = sprintf('%s.%s', $photom->getFilename(), $extension);
        //         Storage::disk('public')->put('/uploadedimages/' . $data->gid . '/imgmc/' . $fileName, File::get($photom));
        //         array_push($photomcFiles, $fileName);
        //     }
        // }
        $data->update([
            'photos' => json_encode(array(
                'img' => $photoFiles
            )),
            'shape_leng' => DB::raw("ST_Length(geom)"),]);
        
        // $excelextension = $excelmc->getClientOriginalExtension();
        // $excelfileName = sprintf('%s.%s', $excelmc->getFilename(), $excelextension);
        // Storage::disk('public')->put('/uploadedimages/' . $data->gid . '/excel/' . $excelfileName, File::get($excelmc));
        
        // $process = shell_exec("python3 /var/www/new-angiang/pyservices/importExcel.py {$data->gid} {$excelfileName}");


        return 'thêm data thanh cong';
    }

    public function updateDataDoanSL(Request $request)
    {
        $tendoan = $request->tendoan;
        $mota = $request->mota;
        $stt = $request->stt;
        $diadiem = $request->diadiem;
        $chieudai = $request->chieudai;
        $kc_nguyhiem = $request->kc_nguyhiem;
        $kc_antoan = $request->kc_antoan;
        $tocdo = $request->tocdo;
        $mucdo = $request->mucdo;
        $photos = $request->file('photos');
        // $photomc = $request->file('photomc');
        // $excelmc = $request->file('excelmc');
        // $point = "MultiPoint($xy)";



        $data = DoanSatLo::where('gid',$id)->update([
            // 'photos' => json_encode(array(
            //     'img' => []
            //     // 'imgmc' => []
            // )),
            'tendoan' => $tendoan,
            'mota' => $mota,
            'stt' => $stt,
            'diadiem' => $diadiem,
            'chieudai' => $chieudai,
            'kc_nguyhiem' => $kc_nguyhiem,
            'kc_antoan' => $kc_antoan,
            'tocdo' => $tocdo,
            'mucdo' => $mucdo,
            // 'geom' => DB::raw("ST_Transform(ST_GeomFromText('$point',4326), 32648)")
        ]);
        $select = DoanSatLo::find($id);

        $photos = $request->file('photos');

        if (strpos($select->photos, '"img"') == true) {
            $curphotos = json_decode($select->photos);  
            $photoFiles = $curphotos->img;
        } else {
            $photoFiles = [];
        }

        

        // $photomc = $request->file('photomc');
        

        // 
        if ($photos) {
            foreach ($photos as $photo) {
                $extension = $photo->getClientOriginalExtension();
                $fileName = sprintf('%s.%s', $photo->getFilename(), $extension);
                Storage::disk('public')->put('/uploadedimages/doansl/' . $id . '/img/' . $fileName, File::get($photo));
                array_push($photoFiles, $fileName);
            }
        }
        // $photomcFiles = [];
        // if ($photomc) {
        //     foreach ($photomc as $photom) {
        //         $extension = $photom->getClientOriginalExtension();
        //         $fileName = sprintf('%s.%s', $photom->getFilename(), $extension);
        //         Storage::disk('public')->put('/uploadedimages/' . $data->gid . '/imgmc/' . $fileName, File::get($photom));
        //         array_push($photomcFiles, $fileName);
        //     }
        // }
        $data = DoanSatLo::where('gid',$id)->update([
            'photos' => json_encode(array(
                'img' => $photoFiles
            ))]);
        
        // $excelextension = $excelmc->getClientOriginalExtension();
        // $excelfileName = sprintf('%s.%s', $excelmc->getFilename(), $excelextension);
        // Storage::disk('public')->put('/uploadedimages/' . $data->gid . '/excel/' . $excelfileName, File::get($excelmc));
        
        // $process = shell_exec("python3 /var/www/new-angiang/pyservices/importExcel.py {$data->gid} {$excelfileName}");


        return 'update data thanh cong';
    }


    //==================================

    


    public function uploadShapeFile(Request $request)
    {
        $shpFile = $request->file('shpFile');
        $tablename = $request->tablename;
        if ($shpFile) {
            $extension = $shpFile->getClientOriginalExtension();
            if ($extension != "zip") {
                return response()->json([
                    'error' => "File không đúng định dạng. Vui lòng chỉ chọn file .zip!",
                ], 500);
            }
            $fileName = sprintf('%s.%s', $shpFile->getFilename(), $extension);
            Storage::disk('public')->put('/Shape_File/' . $fileName, File::get($shpFile));
            // Excute python code, import data to database
            // chdir('/var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices');
            // $output = shell_exec("python3 /var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/uploadSHP.py ".$fileName." 2>&1");
            // $output = shell_exec("touch /root/asddas.py");
            // $process = new Process(['python3', '/var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/uploadSHP.py', $fileName]);
            // $process->run();
            // $output = shell_exec("source /root/.bashrc && python3 /var/www/new-angiang/pyservices/checkMaRanhDoAn.py {$fileName}");
            // $outputsplit = explode("\n", $output);
            // $maqhpkranh = $outputsplit[count($outputsplit)-2];
            // // dd($output,$outputsplit,$maqhpkranh);
            $process = shell_exec("python3 /var/www/new-angiang/pyservices/uploadSHP.py {$fileName} {$tablename}");
            // $process = shell_exec("source /root/.bashrc && python3 /var/www/new-angiang/pyservices/uploadSHP.py {$fileName}");
            // $output = shell_exec("/root/anaconda3/bin/python3 /var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/uploadSHP.py $fileName");
            // var_dump($output);
            // if (!$process->isSuccessful()) {
            //     throw new ProcessFailedException($process);
            // }
            // Ghi log

            // $ranhdoan = DB::connection('pgsql')->select(
            //     "SELECT ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom
            //     FROM qhpkranh_queue
            //     where concat(maqh,stt) = '$maqhpkranh' and deleted_at is NULL");

            // if (!$process->isSuccessful()) {
            //     throw new ProcessFailedException($process);
            // }

            return response()->json('Cap nhat thanh cong', 200);

            // return response()->json([
            //     // 'message' => $output
            //     'message' => "Upload shape file successfully!"
            // ], 200);
        }
        return response()->json([
            'error' => "No zip file found!"
        ], 404);
    }

    public function getAllData()
    {
        // $all = PointData::all();
        // $all = DB::raw("select gid, name, info, photos, ST_Asgeojson(ST_Transform(geom,4326)) from data_point");
        // dd($all);
        // // $data->update([
        //     'geom' => DB::raw("ST_Asgeojson(ST_Transform(geom,4326))"))]);
        // $all->update($all->geom = DB::raw("ST_Asgeojson(ST_Transform(geom,4326))"));
        // return json_encode($all,200);
        $diemanhks = DB::connection('pgsql')->select(
            "select gid, name, info, photos, ST_Asgeojson(ST_Transform(geom,4326)) from hinh_anh_khao_sat_thuc_dia");
        $diemsl = DB::connection('pgsql')->select(
            "select gid, name, info, ST_Asgeojson(ST_Transform(geom,4326)) from diem_khao_sat_mat_cat_ngang");
        $doansl = DB::connection('pgsql')->select(
            "select gid,photos,tendoan,mota,stt,diadiem,chieudai,kc_nguyhiem,kc_antoan,tocdo,mucdo,shape_leng, ST_Asgeojson(ST_Transform(geom,4326)) from doan_sat_lo");
        
        $result = (object) array(
            'diemanhks' => $diemanhks,
            'diemsl' => $diemsl,
            'doansl' => $doansl
        );

        return json_encode($result);
        
    }

    public function getMatCatByPointID($pointid)
    {
        // $all = PointData::all();
        // $all = DB::raw("select gid, name, info, photos, ST_Asgeojson(ST_Transform(geom,4326)) from data_point");
        // dd($all);
        // // $data->update([
        //     'geom' => DB::raw("ST_Asgeojson(ST_Transform(geom,4326))"))]);
        // $all->update($all->geom = DB::raw("ST_Asgeojson(ST_Transform(geom,4326))"));
        // return json_encode($all,200);
        putenv("PYTHONIOENCODING=utf-8");
        $output = shell_exec("python3 /var/www/new-angiang/pyservices/getMatcat.py {$pointid} 2>&1");
        // dd($output);
        $outputsplit = explode("\n", $output);
        $maqhpkranh = $outputsplit[count($outputsplit)-2];
        $resStr = str_replace("'", '"', $maqhpkranh);
        return $resStr;
    }


    public function getMatCat(Request $request)
    {
        $linestring = $request->linestring;
        $dem2009 = DB::connection('pgsql')->select(
            "WITH line AS
            (SELECT st_transform(GeomFromEWKT('SRID=4326;LINESTRING ($linestring)'),32648)::geometry AS geom),
            cells AS
            (SELECT ST_Centroid((ST_Intersection(dem2009.rast, line.geom)).geom) AS geom,
            (ST_Intersection(dem2009.rast, line.geom)).val AS val
             FROM dem2009, line
             WHERE ST_Intersects(dem2009.rast, line.geom)),
            points3d AS
                (SELECT ST_SetSRID(ST_MakePoint(ST_X(cells.geom), ST_Y(cells.geom), val), 32632) AS geom
                FROM cells, line
                ORDER BY ST_Distance(ST_StartPoint(line.geom), cells.geom)),
            linez AS 
                (SELECT ST_MakeLine(geom) as geom_3d FROM points3d),
            points3dd AS
                (SELECT (ST_DumpPoints(geom_3d)).geom AS geom,
                        ST_StartPoint(geom_3d) AS origin
                FROM linez)
            SELECT ST_distance(origin, geom) AS x, ST_Z(geom) AS y
            FROM points3dd;");
        
        $dem2019 = DB::connection('pgsql')->select(
            "WITH line AS
            (SELECT st_transform(GeomFromEWKT('SRID=4326;LINESTRING ($linestring)'),32648)::geometry AS geom),
            cells AS
            (SELECT ST_Centroid((ST_Intersection(dem2019.rast, line.geom)).geom) AS geom,
            (ST_Intersection(dem2019.rast, line.geom)).val AS val
             FROM dem2019, line
             WHERE ST_Intersects(dem2019.rast, line.geom)),
            points3d AS
                (SELECT ST_SetSRID(ST_MakePoint(ST_X(cells.geom), ST_Y(cells.geom), val), 32632) AS geom
                FROM cells, line
                ORDER BY ST_Distance(ST_StartPoint(line.geom), cells.geom)),
            linez AS 
                (SELECT ST_MakeLine(geom) as geom_3d FROM points3d),
            points3dd AS
                (SELECT (ST_DumpPoints(geom_3d)).geom AS geom,
                        ST_StartPoint(geom_3d) AS origin
                FROM linez)
            SELECT ST_distance(origin, geom) AS x, ST_Z(geom) AS y
            FROM points3dd;");
        
        // $resulttt = '{"name": "NewFeatureType","type": "FeatureCollection","features": [{"type": "Feature","geometry": '.$dem2009[0]->st_asgeojson.',"properties": "dem2009"},{"type": "Feature","geometry": '.$dem2019[0]->st_asgeojson.',"properties": "dem2019"}]}';
        // dd($dem2009[0]->st_asgeojson);

        $res09 = "{'dem':'2009','values':".json_encode($dem2009)."}";
        $res19 = "{'dem':'2019','values':".json_encode($dem2019)."}";
        $result = '['.$res09.','.$res19.']';
        $resStr1 = str_replace('"', '', $result);
        $resStr2 = str_replace("'", '"', $resStr1);
        $resStr3 = str_replace('x', '"x"', $resStr2);
        $resStr4 = str_replace('y', '"y"', $resStr3);
        // $result = (object) array(
        //     $res09,
        //     $res19
        // );

        return $resStr4;
    }
    
    public function downloadData()
    {
        $process = shell_exec("python3 /var/www/new-angiang/pyservices/downloadData.py");
        // $output = shell_exec("source /root/.bashrc && python3 /var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/downloadSHP_new.py {$stt} {$maqh}");
        // dd($output);
        // Ghi log
        return response()->download(storage_path("app/public/shp.zip"));
    }


      
    //   a = {"type":"LineString","coordinates":[[105.155838537077,10.6987255540008,-2.95923089981079],[105.155860188109,10.6987707639452,-2.92059588432312]]}
    //   "geometry" => a
}
