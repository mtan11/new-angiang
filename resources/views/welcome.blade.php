<!DOCTYPE html>
<html>

<head>

    <title>An Giang</title>

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js" integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og==" crossorigin=""></script>

    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>

    <link rel="stylesheet" href="{{ mix('css/leaflet.elevation-0.0.4.css') }}" />
    <script type="text/javascript" src="{{ mix('js/leaflet-elevation.js') }}"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://d3js.org/d3.v4.min.js"></script>

    <script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js'></script>
    <link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css' rel='stylesheet' />

    <link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/gokertanrisever/leaflet-ruler/master/src/leaflet-ruler.css">
    <script src="https://cdn.rawgit.com/gokertanrisever/leaflet-ruler/master/src/leaflet-ruler.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.67.0/dist/L.Control.Locate.min.css" />

    <script src="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.67.0/dist/L.Control.Locate.min.js" charset="utf-8"></script>

    <!-- Load Esri Leaflet from CDN -->
    <script src="https://unpkg.com/esri-leaflet"></script>

    <!-- Esri Leaflet Geocoder -->
    <link rel="stylesheet" href="https://unpkg.com/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css">
    <script src="https://unpkg.com/esri-leaflet-geocoder"></script>

    <link rel="stylesheet" href="https://unpkg.com/leaflet.pm@latest/dist/leaflet.pm.css" />
    <script src="https://unpkg.com/leaflet.pm@latest/dist/leaflet.pm.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous">
    </script>


    <link rel="stylesheet" type="text/css" href="{{ mix('css/style.css') }}" />

</head>

<body>
    <div id="map"></div>
    <a class="btn btn-light btn-login" href="/login">Đăng nhập</a>
    <a class="btn btn-light btn-3d" href="/3dmap">Bản đồ 3D</a>
    <div id="show-btn" class="arrow-btn hidden"><i class="fa fa-angle-double-left"></i></div>
    <div id="panel" class="panel-container">
        <div>
            <div class="d-flex panel-header">
                <h5 class="card-title" id="panel-title">Các lớp layer</h5>
                <button type="button" id="close-btn" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="" style="overflow-y:scroll; overflow-x:scroll; height:580px;">
                <div class="container-content">
                    <div id="layer-content">
                        <div class="row">
                            <div class="col-8">
                                <h6>HÌNH ẢNH KHẢO SÁT THỰC ĐỊA 2019</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="rungngapman" type="checkbox" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>ĐOẠN SẠT LỞ</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="doansatlo" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>ĐIỂM KHẢO SÁT MẶT CẮT NGANG THƯỜNG XUYÊN</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="diemanh" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>ĐIỂM ĐỘ SÂU 2009</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="diemdosau" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>ĐIỂM ĐỘ SÂU 2019</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="diemdosau20019" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>MÔ HÌNH SỐ ĐỘ CAO (DEM) NĂM 2009</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="dem_2009" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>MÔ HÌNH SỐ ĐỘ CAO (DEM) NĂM 2019</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="dem_2019" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-8">
                                <h6>DỰ BÁO SẠT LỞ ĐƯỜNG BỜ BẰNG MÔ HÌNH</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="satlomohinhthuyluch" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-8">
                                <h6>DỰ BÁO SẠT LỞ ĐƯỜNG BỜ BẰNG PHƯƠNG PHÁP TRƯỢT TỔNG THỂ</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="satlotruottongthe" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>DIỄN BIẾN ĐƯỜNG BỜ BẰNG PHƯƠNG PHÁP VIỄN THÁM & GIS</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="satloduongbo" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-8">
                                <h6>QUY HOẠCH KHAI THÁC CÁT</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="quy_hoach_khai_thac_cat_th" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>ĐIỀU CHỈNH QUY HOẠCH KHAI THÁC CÁT</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="dieu_chinh_quy_hoach_th" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>

                        <!-- <div class="row">
                            <div class="col-8">
                                <h6>Bản đồ bổ sung và điều chỉnh các quy hoạch khai thác cát cho các khu vực trọng điểm
                                    của tỉnh An Giang</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="bandobosung" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>Bản đồ theo kết quả tính ổn định đường bờ</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="bandoketqua" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>Bản đồ theo phân tích viễn thám GIS</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="bandophantich" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>Đằng sau 2009</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="2009line" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>Điểm mặt cắt mới</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="diemmatcatmoi" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>Điểm sạt lỡ</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="diemsatlo" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-8">
                                <h6>Trạm đo thuỷ văn</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="tramdothuyvan" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div> -->

                    </div>
                </div>
                <div id="info-content" class="hidden">
                    <div class="container-form" style="padding: 10px;">
                        <div class="form-group">
                            <label for="input-name">Tên</label>
                            <input class="form-control" id="input-name" disabled>
                        </div>
                        <div class="form-group">
                            <label for="input-info">Thông tin</label>
                            <input class="form-control" id="input-info" disabled>
                        </div>
                    </div>
                    <div class="img-slider">
                        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner" id="img-slider">

                            </div>
                            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="{{ mix('js/map.js') }}"></script>

</html>