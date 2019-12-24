<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\Models\PointData;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\File;
// use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;

class PostgresController extends Controller
{


    public function insertData(Request $request)
    {
        $name = $request->name;
        $info = $request->info;
        $xy = $request->xy;
        $photos = $request->file('photos');
        // $photomc = $request->file('photomc');
        $excelmc = $request->file('excelmc');
        $point = "MultiPoint($xy)";



        $data = PointData::create([
            'photos' => json_encode(array(
                'img' => [],
                'imgmc' => []
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
                Storage::disk('public')->put('/uploadedimages/' . $data->gid . '/img/' . $fileName, File::get($photo));
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
        
        $excelextension = $excelmc->getClientOriginalExtension();
        $excelfileName = sprintf('%s.%s', $excelmc->getFilename(), $excelextension);
        Storage::disk('public')->put('/uploadedimages/' . $data->gid . '/excel/' . $excelfileName, File::get($excelmc));
        
        $process = shell_exec("python3 /var/www/new-angiang/pyservices/importExcel.py {$data->gid} {$excelfileName}");


        return 'thêm data thanh cong'.$process;
    }

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

    public function getAllPointImg()
    {
        // $all = PointData::all();
        // $all = DB::raw("select gid, name, info, photos, ST_Asgeojson(ST_Transform(geom,4326)) from data_point");
        // dd($all);
        // // $data->update([
        //     'geom' => DB::raw("ST_Asgeojson(ST_Transform(geom,4326))"))]);
        // $all->update($all->geom = DB::raw("ST_Asgeojson(ST_Transform(geom,4326))"));
        // return json_encode($all,200);
        $qhpksdd = DB::connection('pgsql')->select(
            "select gid, name, info, photos, ST_Asgeojson(ST_Transform(geom,4326)) from data_point");
        
        return json_encode($qhpksdd);
        
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
        $output = shell_exec("python3 /var/www/new-angiang/pyservices/getMatcat.py {$pointid}");
        $outputsplit = explode("\n", $output);
        $maqhpkranh = $outputsplit[count($outputsplit)-2];
        $resStr = str_replace("'", '"', $maqhpkranh);
        return $resStr;
        
    }


    public function getMatCat(Request $request)
    {
        $linestring = $request->linestring;
        $qhpksdd = DB::connection('pgsql')->select(
            "WITH line AS
            (SELECT st_transform(GeomFromEWKT('SRID=4326;LINESTRING ($linestring)'),32648)::geometry AS geom),
          cells AS
            (SELECT ST_Centroid((ST_Intersection(demelevation.rast, line.geom)).geom) AS geom,
            (ST_Intersection(demelevation.rast, line.geom)).val AS val
             FROM demelevation, line
             WHERE ST_Intersects(demelevation.rast, line.geom)),
          points3d AS
            (SELECT ST_SetSRID(ST_MakePoint(ST_X(cells.geom), ST_Y(cells.geom), val), 32632) AS geom
             FROM cells, line
             ORDER BY ST_Distance(ST_StartPoint(line.geom), cells.geom))

        SELECT ST_Asgeojson(ST_Transform(ST_GeomFromText(st_astext(ST_MakeLine(geom)),32648),4326)) FROM points3d;");
        
        return json_encode($qhpksdd);
    }
    

    // /**
    //  * @var PostgresRepository
    //  */
    // protected $postgresRepository;

    // public function __construct(PostgresRepository $postgresRepository)
    // {
    //     $this->postgresRepository = $postgresRepository;
    // }

    // /**
    //  * Get Thuadat
    //  * @param integer $mathuadat
    //  * 
    //  * @return array
    //  */
    // public function getThuaDat($mathuadat)
    // {
    //     $thuadat = $this->postgresRepository->getThuaDat($mathuadat);
    //     return response()->json($thuadat);
    // }

    // /**
    //  * Get LoDat
    //  * @param integer $malodat
    //  * 
    //  * @return array
    //  */
    // public function getLoDat($malodat)
    // {
    //     $thuadat = $this->postgresRepository->getLoDat($malodat);
    //     return response()->json($thuadat);
    // }

    // /**
    //  * Get Thuadat theo ToaDo
    //  * @param string $toado
    //  * 
    //  * @return array
    //  */
    // public function getToaDo($toado)
    // {
    //     $mathuadat = $this->postgresRepository->getToaDo($toado);
    //     $thuadat = $this->postgresRepository->getThuaDat($mathuadat);
    //     return response()->json($thuadat);
    // }

    // public function getLichSuByToaDo($toado)
    // {
    //     $mathuadat = $this->postgresRepository->getToaDo($toado);
    //     $lichsu = $this->postgresRepository->getLichSu($mathuadat);
    //     return response()->json($lichsu);
    // }

    // /**
    //  * Get Thuadat theo Ranh2k
    //  * @param string $ranh2k
    //  * 
    //  * @return array
    //  */
    // public function getRanh2k($ranh2k)
    // {
    //     $thuadat = $this->postgresRepository->getRanh2k($ranh2k);
    //     return response()->json($thuadat);
    // }

    // /**
    //  * Get QHPKSDD theo gid
    //  * @param integer $gid
    //  * 
    //  * @return array
    //  */
    // public function getQHPKSDD($gid)
    // {
    //     $qhpksdd = $this->postgresRepository->getQHPKSDD($gid);
    //     return response()->json($qhpksdd);
    // }

    // /**
    //  * Get QHKhacRanh theo MaQHKhacRanh
    //  * @param string $MaQHKhacRanh
    //  * 
    //  * @return object
    //  */
    // public function getQHKhacRanh($MaQHKhacRanh)
    // {
    //     $qhkhacranh = $this->postgresRepository->getQHKhacRanh($MaQHKhacRanh);
    //     return response()->json($qhkhacranh);
    // }

    // /**
    //  * Get legend
    //  *
    //  * @return Response
    //  */
    // public function getLegend()
    // {
    //     $data = $this->postgresRepository->getLegend();
    //     $data = array_map(array($this, 'parseLegend'), $data);
    //     return response()->json($data);
    // }

    // private function parseLegend($data)
    // {
    //     return (object) array(
    //         'ChucNangSDD' => $data->chucnangsdd,
    //         'RGBColor' => $data->rgbcolor
    //     );
    // }

    // public function getLegendOld()
    // {
    //     $data = $this->postgresRepository->getLegendOld();
    //     $data = array_map(array($this, 'parseLegend'), $data);
    //     return response()->json($data);
    // }

    // private function parseLegendOld($data)
    // {
    //     return (object) array(
    //         'ChucNangSDD' => $data->chucnangsdd,
    //         'RGBColor' => $data->rgbcolor
    //     );
    // }

    // //////////////////////////////////////////////////////////////////////////
    // // Redis
    // /**
    //  * Cache mathuadat with Redis
    //  * @param Request $request
    //  * 
    //  * @return Response
    //  */
    // public function redisThuadat(Request $request)
    // {
    //     $toado = $request->input('Lon') . ' ' . $request->input('Lat');
    //     $mathuadat = $this->postgresRepository->getToaDo($toado);

    //     $redis = Redis::connection();
    //     $name = $redis->exists($mathuadat);

    //     if ($name == 0) {
    //         $client = new Client();
    //         $response = $client->request('POST', 'https://computing.thongtinquyhoach.vn/930/api/v3.1/a-z', [
    //             'form_params' => [
    //                 'Lat' => $request->input('Lat'),
    //                 'Lon' => $request->input('Lon'),
    //             ]
    //         ]);
    //         $redis->set($mathuadat, $response->getBody());
    //         return $response->getBody();
    //     } else {
    //         $data = $redis->get($mathuadat);
    //         return $redis->get($mathuadat);
    //     }
    // }
    // // =====================================================================================================
    // // =====================================================================================================
    // // =====================================================================================================


    // public function getThuaDatQ($mathuadat)
    // {
    //     $thuadat = $this->postgresRepository->getThuaDatQ($mathuadat);
    //     return response()->json($thuadat);
    // }


    // public function getRanh2kQ($ranh2k)
    // {
    //     $thuadat = $this->postgresRepository->getRanh2kQ($ranh2k);
    //     return response()->json($thuadat);
    // }


    // public function getToaDoQ($toado)
    // {
    //     $mathuadat = $this->postgresRepository->getToaDoQ($toado);
    //     $thuadat = $this->postgresRepository->getThuaDatQ($mathuadat);
    //     return response()->json($thuadat);
    // }

    // /**
    //  * Get QHPKSDD theo gid
    //  * @param integer $gid
    //  * 
    //  * @return array
    //  */
    // public function getQHPKSDDQ($gid)
    // {
    //     $qhpksdd = $this->postgresRepository->getQHPKSDDQ($gid);
    //     return response()->json($qhpksdd);
    // }

    // public function getQueueList()
    // {
    //     $qhpkranh = DB::connection('pgsql')->select(
    //         "SELECT stt, maqh, TenDoAn, CoQuanPD, SoQD, NgayDuyet, ST_AsGeoJSON(ST_Transform(qhpkranh.geom, 4326))
    //         FROM qhpkranh_queue as qhpkranh
    //         WHERE deleted_at is NULL"
    //     );

    //     return response()->json($qhpkranh);
    // }

    // public function getThongKeQHPKbyQuanHuyen($maquan)
    // {
    //     $like = "QHPK".$maquan."%";
    //     $qhpkranh = DB::connection('pgsql')->select(
    //         "SELECT qhpksdd_new.maquyuoc, quyuoc_new.chucnangsdd, quyuoc_new.rgbcolor, SUM(qhpkchitieuopho_new.dientich) as dientich, SUM(qhpkchitieuopho_new.danso) as danso, (select SUM(qhpkchitieuopho_new.danso) as tongdansotp from qhpkchitieuopho_new), (select SUM(qhpkchitieuopho_new.dientich) as tongdientichtp from qhpkchitieuopho_new), (select SUM(qhpkchitieuopho_new.danso) as tongdansoquan from qhpkchitieuopho_new,qhpksdd_new where qhpksdd_new.maso LIKE '$like' and st_intersects(qhpksdd_new.geom,qhpkchitieuopho_new.geom)), (select SUM(qhpkchitieuopho_new.dientich) as tongdientichquan from qhpkchitieuopho_new,qhpksdd_new where qhpksdd_new.maso LIKE '$like' and st_intersects(qhpksdd_new.geom,qhpkchitieuopho_new.geom)), Count(qhpkchitieuopho_new.gid) as soopholoai, (select Count(qhpkchitieuopho_new.gid) as soophotp from qhpkchitieuopho_new), (select Count(qhpkchitieuopho_new.gid) as soophoquan from qhpkchitieuopho_new, qhpksdd_new, quyuoc_new where qhpksdd_new.maso LIKE '$like' and qhpksdd_new.maquyuoc = quyuoc_new.maquyuoc and st_intersects(qhpksdd_new.geom,qhpkchitieuopho_new.geom))
    //         FROM qhpksdd_new, qhpkchitieuopho_new, quyuoc_new
    //         where qhpksdd_new.maso LIKE '$like' and qhpksdd_new.maquyuoc = quyuoc_new.maquyuoc and st_intersects(qhpksdd_new.geom,qhpkchitieuopho_new.geom) and qhpksdd_new.deleted_at is NULL and qhpkchitieuopho_new.deleted_at is NULL
    //         group by qhpksdd_new.maquyuoc, quyuoc_new.chucnangsdd, quyuoc_new.rgbcolor"
    //     );

    //     return response()->json($qhpkranh);
    // }
   

    // public function getDoAnbyDistrict($maqh)
    // {   
    //     $qhpkranh = DB::connection('pgsql')->select(
    //         "SELECT CONCAT(maqh, stt) as MaQHPKRanh, gid as gid, stt as stt, maqh as maqh, TenDoAn, trangthai as trangthai, dientich as dientich, dansohh as dansohh, dansoqh as dansoqh, chudautu as chudautu, donvitvtk as donvitvtk, CoQuanPD, SoQD, NgayDuyet, ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom
    //         FROM qhpkranh_new
    //         where qhpkranh_new.maqh = '$maqh' and qhpkranh_new.deleted_at is NULL"
    //     );

    //     return response()->json($qhpkranh);
    // }

    // public function getThongKeQHPKbyDoAn($maqh, $stt)
    // {   $maqhpkranh = "QHPK".$maqh.$stt."%";
    //     $qhpkranh = DB::connection('pgsql')->select(
    //         "SELECT qhpksdd_new.maquyuoc, quyuoc_new.chucnangsdd, quyuoc_new.rgbcolor, SUM(qhpkchitieuopho_new.dientich) as dientich, SUM(qhpkchitieuopho_new.danso) as danso, (select SUM(qhpkchitieuopho_new.danso) as tongdansotp from qhpkchitieuopho_new), (select SUM(qhpkchitieuopho_new.dientich) as tongdientichtp from qhpkchitieuopho_new), (select SUM(qhpkchitieuopho_new.danso) as tongdansoquan from qhpkchitieuopho_new,qhpksdd_new where qhpksdd_new.maso LIKE '$maqhpkranh' and st_intersects(qhpksdd_new.geom,qhpkchitieuopho_new.geom)), (select SUM(qhpkchitieuopho_new.dientich) as tongdientichquan from qhpkchitieuopho_new,qhpksdd_new where qhpksdd_new.maso LIKE '$maqhpkranh' and st_intersects(qhpksdd_new.geom,qhpkchitieuopho_new.geom)), Count(qhpkchitieuopho_new.gid) as soopholoai, (select Count(qhpkchitieuopho_new.gid) as soophotp from qhpkchitieuopho_new), (select Count(qhpkchitieuopho_new.gid) as soophoquan from qhpkchitieuopho_new, qhpksdd_new, quyuoc_new where qhpksdd_new.maso LIKE '$like' and qhpksdd_new.maquyuoc = quyuoc_new.maquyuoc and st_intersects(qhpksdd_new.geom,qhpkchitieuopho_new.geom))
    //         FROM qhpksdd_new, qhpkchitieuopho_new, quyuoc_new
    //         where qhpksdd_new.maso LIKE '$maqhpkranh' and qhpksdd_new.maquyuoc = quyuoc_new.maquyuoc and st_intersects(qhpksdd_new.geom,qhpkchitieuopho_new.geom) and qhpksdd_new.deleted_at is NULL and qhpkchitieuopho_new.deleted_at is NULL
    //         group by qhpksdd_new.maquyuoc, quyuoc_new.chucnangsdd, quyuoc_new.rgbcolor"
    //     );

    //     return response()->json($qhpkranh);
    // }


    // // =====================================================================================================
    // public function uploadShapeFile(Request $request)
    // {
    //     $shpFile = $request->file('shpFile');
    //     if ($shpFile) {
    //         $extension = $shpFile->getClientOriginalExtension();
    //         if ($extension != "zip") {
    //             return response()->json([
    //                 'error' => "File không đúng định dạng. Vui lòng chỉ chọn file .zip!",
    //             ], 500);
    //         }
    //         $fileName = sprintf('%s.%s', $shpFile->getFilename(), $extension);
    //         Storage::disk('public')->put('/Shape_File/' . $fileName, File::get($shpFile));
    //         // Excute python code, import data to database
    //         // chdir('/var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices');
    //         // $output = shell_exec("python3 /var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/uploadSHP.py ".$fileName." 2>&1");
    //         // $output = shell_exec("touch /root/asddas.py");
    //         // $process = new Process(['python3', '/var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/uploadSHP.py', $fileName]);
    //         // $process->run();
    //         $output = shell_exec("source /root/.bashrc && python3 /var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/checkMaRanhDoAn.py {$fileName}");
    //         $outputsplit = explode("\n", $output);
    //         $maqhpkranh = $outputsplit[count($outputsplit)-2];
    //         // dd($output,$outputsplit,$maqhpkranh);
    //         $process = new Process("source /root/.bashrc && python3 /var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/uploadSHP.py {$fileName}");
    //         $process->run();
    //         // $output = shell_exec("/root/anaconda3/bin/python3 /var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/uploadSHP.py $fileName");
    //         // var_dump($output);
    //         if (!$process->isSuccessful()) {
    //             throw new ProcessFailedException($process);
    //         }
    //         // Ghi log

    //         $ranhdoan = DB::connection('pgsql')->select(
    //             "SELECT ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom
    //             FROM qhpkranh_queue
    //             where concat(maqh,stt) = '$maqhpkranh' and deleted_at is NULL");

    //         if (!$process->isSuccessful()) {
    //             throw new ProcessFailedException($process);
    //         }

    //         return response()->json($ranhdoan, 200);

    //         // return response()->json([
    //         //     // 'message' => $output
    //         //     'message' => "Upload shape file successfully!"
    //         // ], 200);
    //     }
    //     return response()->json([
    //         'error' => "No zip file found!"
    //     ], 404);
    // }

    // public function downloadShapeFile_new($stt, $maqh)
    // {
    //     $process = new Process(['python3', '/var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/downloadSHP_new.py', "$stt", "$maqh"]);
    //     $process->run();
    //     // $output = shell_exec("source /root/.bashrc && python3 /var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/downloadSHP_new.py {$stt} {$maqh}");
    //     // dd($output);
    //     // Ghi log
    //     return response()->download(storage_path("app/public/shp.zip"));
    // }
    // public function downloadRanhDoAn_new($maqhpkranh)
    // {
    //     $process = new Process(['python3', '/var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/downloadRanhDoAn_new.py', "$maqhpkranh"]);
    //     $process->run();
    //     // Ghi log
    //     return response()->download(storage_path("app/public/".$maqhpkranh.".zip"));
    // }
    // public function downloadShapeFile_queue($stt, $maqh)
    // {
    //     $process = new Process(['python3', '/var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/downloadSHP_queue.py', "$stt", "$maqh"]);
    //     $process->run();
    //     // Ghi log
    //     return response()->download(storage_path("app/public/shp.zip"));
    // }

    // // ======================================== CHANGE GEOM TEXT TO COORDINATE ====================================
    // public function changeTextToGeom(){
    //     // $districts = District::all();
    //     // foreach ($districts as $district) {
    //     //     $geoJSON = '{"type":"MultiPolygon","coordinates":' . $district->ranh . '}';
    //     //     $geom = DB::raw("ST_SetSRID(ST_GeomFromGeoJSON('$geoJSON'),900914)");
    //     //     $district->geom = $geom;
    //     //     $district->save();
    //     // }
    //     $wards = DB::select("
    //                 SELECT maphuongxa, ranh
    //                 FROM phuongxa_backup
    //                 WHERE ranh is not null");
    //     foreach ($wards as $ward) {
    //         $geoJSON = '{"type":"MultiPolygon","coordinates":' . $ward->ranh . '}';
    //         $geom = DB::raw("ST_SetSRID(ST_GeomFromGeoJSON('$geoJSON'),900914)");
    //         DB::table('phuongxa_backup')->where('maphuongxa','like',$ward->maphuongxa)->update([
    //             'geom'=>$geom,
    //         ]);
    //     }
    //     return "Ward YEAHHHHHH";
    //     // return $wards;
    // }
    // // =====================================================================================================
    // // =====================================================================================================
    // // =====================================================================================================


    // // public function getThuaDatNhaBe($mathuadat) {
    // //     $thuadat = $this->postgresRepository->getThuaDatNhaBe($mathuadat);
    // //     return response()->json($thuadat);
    // // }


    // // public function getRanh2kNhaBe($ranh2k) {
    // //     $thuadat = $this->postgresRepository->getRanh2kNhaBe($ranh2k);
    // //     return response()->json($thuadat);
    // // }


    // // public function getToaDoNhaBe($toado) {
    // //     $mathuadat = $this->postgresRepository->getToaDoNhaBe($toado);
    // //     $thuadat = $this->postgresRepository->getThuaDatNhaBe($mathuadat);
    // //     return response()->json($thuadat);
    // // }


    // // =====================================================================================================
    // // =====================================================================================================
    // // =====================================================================================================


    // public function getThuaDatPreview($mathuadat)
    // {
    //     $thuadat = $this->postgresRepository->getThuaDatPreview($mathuadat);
    //     return response()->json($thuadat);
    // }


    // public function getRanh2kPreview($ranh2k)
    // {
    //     $thuadat = $this->postgresRepository->getRanh2kPreview($ranh2k);
    //     return response()->json($thuadat);
    // }


    // public function getToaDoPreview($toado)
    // {
    //     $mathuadat = $this->postgresRepository->getToaDoPreview($toado);
    //     $thuadat = $this->postgresRepository->getThuaDatPreview($mathuadat);
    //     return response()->json($thuadat);
    // }

    // public function uploadGeoTIFF(Request $request)
    // {
    //     $tifFileFull = $request->file('tifFileFull');
    //     $tifFileCut = $request->file('tifFileCut');
    //     $shpFileRanh = $request->file('shpFileRanh');
    //     // $maqhpkranh = $request->maqhpkranh;


    //     if ($tifFileFull and $tifFileCut and $shpFileRanh) {
    //         $extensionFull = $tifFileFull->getClientOriginalExtension();
    //         $extensionCut = $tifFileCut->getClientOriginalExtension();
    //         $extensionRanh = $shpFileRanh->getClientOriginalExtension();
    //         if (($extensionFull != "tif" and $extensionFull != "tiff") or ($extensionCut != "tif" and $tifFileCut != "tiff") or $extensionRanh != "zip") {
    //             return response()->json([
    //                 'error' => "File không đúng định dạng. Vui lòng chọn lại !",
    //             ], 500);
    //         }
    //         $fileNameRanh = sprintf('%s.%s', $shpFileRanh->getFilename(), $extensionRanh);
    //         Storage::disk('public')->put('/Shape_File/' . $fileNameRanh, File::get($shpFileRanh));
    //         $output = shell_exec("source /root/.bashrc && python3 /var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/checkMaRanhDoAn.py {$fileNameRanh}");
    //         $outputsplit = explode("\n", $output);
            
    //         $maqhpkranh = $outputsplit[count($outputsplit)-2];

    //         $fileNameFull = sprintf('%s.%s', $maqhpkranh, $extensionFull);
    //         $fileNameCut = sprintf('%s.%s', $maqhpkranh, $extensionCut);
    //         Storage::disk('sftp')->delete('/anh_qhpk_queue/full/' . $fileNameFull);
    //         Storage::disk('sftp')->put('/anh_qhpk_queue/full/' . $fileNameFull, File::get($tifFileFull));
    //         Storage::disk('sftp')->delete('/anh_qhpk_queue/cut/' . $fileNameCut);
    //         Storage::disk('sftp')->put('/anh_qhpk_queue/cut/' . $fileNameCut, File::get($tifFileCut));
            
            
    //         // Excute python code, import data to database
    //         // $process = new Process(['source /root/.bashrc && python3 /var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/uploadSHP.py {$fileName}', "$fileNameRanh", "$fileNameFull", "$fileNameCut"]);
    //         $process = new Process("source /root/.bashrc && python3 /var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/uploadTIF.py {$fileNameRanh} {$fileNameFull} {$fileNameCut}");
    //         $process->run();

    //         // $asd = shell_exec("source /root/.bashrc && python3 /var/www/ttqh-hcm-dev.thongtinquyhoach.vn/pyservices/uploadTIF.py {$fileNameRanh} {$fileNameFull} {$fileNameCut}");
            

    //         $ranhdoan = DB::connection('pgsql')->select(
    //             "SELECT ST_AsGeoJSON(ST_Transform(geom, 4326)) as geom
    //             FROM ranhdoan_queue
    //             where ranhdoan_queue.maqhpkranh = '$maqhpkranh' and ranhdoan_queue.deleted_at is NULL");

    //         if (!$process->isSuccessful()) {
    //             throw new ProcessFailedException($process);
    //         }

    //         return response()->json($ranhdoan, 200);

    //         // return response()->json(, 200);
    //     }
    //     return response()->json([
    //         'error' => "No file found!"
    //     ], 404);
    // }

    // public function rollbackLastChange($maqh,$stt){

    //     $maqhpkranh = $maqh.$stt;
    //     $qhpkranh = DB::connection('pgsql')->select(
    //         "select * from qhpksdd_new where deleted_at is not NULL
    //         order by deleted_at"
    //     );

    //     return response()->json($qhpkranh);

    // }
}
