<!DOCTYPE html>
<html>

<head>

    <title>An Giang</title>

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js" integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og==" crossorigin=""></script>

    <!-- <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script> -->

    <link rel="stylesheet" href="{{ mix('css/leaflet.elevation-0.0.4.css') }}" />
    <script type="text/javascript" src="{{ mix('js/leaflet-elevation.js') }}"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js'></script>
    <link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css' rel='stylesheet' />
    <script src="https://d3js.org/d3.v4.min.js"></script>

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
    <link rel="stylesheet" href="https://unpkg.com/swiper/css/swiper.css">
    <link rel="stylesheet" href="https://swiperjs.com/package/css/swiper.min.css">


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
    @auth
    {{-- <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
            {{ Auth::user()->name }} <span class="caret"></span>
    </a> --}}
    <a class="btn btn-light btn-login" href="{{ route('logout') }}" onclick="event.preventDefault();
                             document.getElementById('logout-form').submit();">
        {{ __('Đăng xuất') }}
    </a>
    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
    </form>
    {{-- <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="{{ route('logout') }}"
    onclick="event.preventDefault();
    document.getElementById('logout-form').submit();">
    {{ __('Đăng xuất') }}
    </a>

    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
    </form>
    </div> --}}

    @endauth
    <a class="btn btn-light btn-3d" data-toggle="modal" data-target="#modaluploadshp" id="btn-upload-shp">Cập nhật</a>
    <a class="btn btn-light btn-legend-edit" id="btn-legend">Chú giải</a>
    <div id="map"></div>
    <div id="show-btn" class="arrow-btn"><i class="fa fa-angle-double-left"></i></div>
    <div id="panel-update" class="panel-container-update">
        <div>
            <div class="d-flex panel-header">
                <h5 class="card-title">Thêm điểm khảo sát</h5>
                <button type="button" id="close-update-btn" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="" style="overflow-y:scroll; overflow-x:scroll; height:580px;">
                <div class="container-form" style="padding: 10px;">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="selectKindMarker">Loại</label>
                        </div>
                        <select class="custom-select" id="selectKindMarker">
                            <option selected>Vui lòng chọn</option>
                            <option value="diemks">Điểm khảo sát</option>
                            <option value="diemsl">Điểm sạt lỡ</option>
                            <!-- <option value="3">Three</option> -->
                        </select>
                    </div>
                    <div id="container-info-insert" class="hidden">
                        <div class="form-group">
                            <label for="input-name">Tên</label>
                            <input class="form-control" id="input-name">
                        </div>
                        <div class="form-group">
                            <label for="input-info">Thông tin</label>
                            <input class="form-control" id="input-info">
                        </div>
                        <div class="form-group" id="container-img">
                            <label for="input-images">Chọn hình ảnh</label>
                            <input type="file" class="form-control-file" multiple name="img" id="input-images">
                        </div>
                        <div class="form-group" id="container-imgmc">
                            <label for="input-images">Chọn dữ liệu mặt cắt</label>
                            <input type="file" class="form-control-file" name="img" id="input-images-mc">
                        </div>
                        <div class="d-flex" style="justify-content: center"><button id="accept-new-info" class="btn btn-primary">Cập nhật</button></div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div id="panel" class="panel-container">
        <div>
            <div class="d-flex panel-header">
                <h5 class="card-title" id="panel-title">Các lớp layer</h5>
                <button type="button" id="close-btn" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="" style="overflow-y:scroll; overflow-x:hidden; height:580px;">
                <div class="container-content">
                    <div id="layer-content">
                    <div class="row">
                            <div class="col-8">
                                <!-- <h6>HÌNH ẢNH KHẢO SÁT THỰC ĐỊA 2019</h6> -->
                                <h6>Hình ảnh khảo sát thực địa 2019</h6>
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
                                <h6>Đoạn sạt lở</h6>
                                <!-- <h6>ĐOẠN SẠT LỞ</h6> -->
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="doansatlo" type="checkbox" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>Điểm khảo sát mặt cắt ngang thường xuyên</h6>
                                <!-- <h6>ĐIỂM KHẢO SÁT MẶT CẮT NGANG THƯỜNG XUYÊN</h6> -->
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="diemanh" type="checkbox" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>Điểm độ sâu 2009</h6>
                                <!-- <h6>ĐIỂM ĐỘ SÂU 2009</h6> -->
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
                                <h6>Điểm độ sâu 2019</h6>
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
                                <!-- <h6>MÔ HÌNH SỐ ĐỘ CAO (DEM) NĂM 2009</h6> -->
                                <h6>Mô hình số độ cao (DEM) năm 2009</h6>
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
                                <h6>Mô hình số độ cao (DEM) năm 2019</h6>
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
                                <h6>Dự báo sạt lở đường bờ bằng mô hình</h6>
                                <!-- <h6>DỰ BÁO SẠT LỞ ĐƯỜNG BỜ BẰNG MÔ HÌNH</h6> -->
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
                                <h6>Dự báo sạt lở đường bờ bằng phương pháp trượt tổng thể </h6>
                                <!-- <h6>DỰ BÁO SẠT LỞ ĐƯỜNG BỜ BẰNG PHƯƠNG PHÁP TRƯỢT TỔNG THỂ</h6> -->
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
                                <!-- <h6>DIỄN BIẾN ĐƯỜNG BỜ BẰNG PHƯƠNG PHÁP VIỄN THÁM & GIS</h6> -->
                                <h6>Diễn biến đường bờ bằng phương pháp viễn thám & GIS</h6>
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
                                <h6>Dự báo biến hình lòng dẫn bằng mô hình đến năm 2030</h6>
                                <!-- <h6>DỰ BÁO BIẾN HÌNH LÒNG DẪN BẰNG MÔ HÌNH ĐẾN NĂM 2030</h6> -->
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="du_bao_long_dan_2030" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>Dự báo biến hình lòng dẫn bằng mô hình đến năm 2025</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="du_bao_long_dan_2025" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        @role('admin')
                        <div class="row">
                            <div class="col-8">
                                <h6>Quy hoạch khai thác cát</h6>
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
                                <h6>Điều chỉnh quy hoạch khai thác cát</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="dieu_chinh_quy_hoach_th" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        @endrole
                        <div class="row">
                            <div class="col-8">
                                <h6>Đường đẳng sâu 2019</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="duongbinhdo_dangsau2019" type="checkbox" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>Đường đẳng sâu 2009</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="duongbinhdo_dangsau2009" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>Ranh nguy hiểm</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="ranh_nguyhiem" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <h6>Vành đai an toàn</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="vanhdai_antoan" type="checkbox" >
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        @role('admin')
                        <div class="row">
                            <div class="col-8">
                                <h6>Thửa đất</h6>
                            </div>
                            <div class="col-4">
                                <label class="switch">
                                    <input id="thuadat" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        @endrole
                        
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
                    <div class="container-form" style="padding: 10px;" id="form-marker">
                        <div class="form-group">
                            <label for="input-name">Tên</label>
                            <input class="form-control" id="input-name-show">
                        </div>
                        <div class="form-group">
                            <label for="input-info">Thông tin</label>
                            <textarea class="form-control" id="input-info-show" rows="5"></textarea>
                        </div>
                        <div class="form-group">
                            <label id="title-update"></label>
                            <input type="file" multiple class="form-control-file" id="input-file-show" required>
                        </div>
                    </div>
                    <div class="container-form" style="padding: 10px;" id="form-doansl">
                        <div class="form-group">
                            <label for="input-name">Tên</label>
                            <textarea class="form-control" id="input-doan-show"  rows="2"> </textarea>
                        </div>
                        <div class="form-group">
                            <label for="input-name">Số thứ tự</label>
                            <textarea class="form-control" id="input-stt-show"  rows="1"> </textarea>
                        </div>
                        <div class="form-group">
                            <label for="input-info">Mô tả</label>
                            <textarea class="form-control" id="input-mota-show"  rows="4"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="input-info">Địa điểm</label>
                            <textarea class="form-control" id="input-diadiem-show"  rows="2"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="input-info">Chiều dài</label>
                            <textarea class="form-control" id="input-chieudai-show"  rows="1"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="input-info">Khoảng cách nguy hiểm</label>
                            <textarea class="form-control" id="input-kcnguyhiem-show"  rows="1"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="input-info">Khoảng cách an toàn</label>
                            <textarea class="form-control" id="input-kcnantoan-show"  rows="1"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="input-info">Tốc độ</label>
                            <textarea class="form-control" id="input-tocdo-show"  rows="1"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="input-info">Mức độ</label>
                            <textarea class="form-control" id="input-mucdo-show" rows="1"></textarea>
                        </div>
                        <div class="form-group">
                            <label id="title-update"></label>
                            <input type="file" multiple class="form-control-file" id="input-file-doan-show" required>
                        </div>
                    </div>
                    <!-- <div class="img-slider">
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
                    </div> -->

                    <div class="d-flex" style="justify-content: center" id="container-update-btn">
                        <button class="btn btn-primary">Cập nhật</button>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="legend-panel" class="panel-container legend-panel">
        <div>
            <div class="d-flex panel-header">
                <h5 class="card-title">Chú giải</h5>
                <button type="button" id="close-legend-btn" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="" style="overflow-y:scroll; overflow-x:hidden; height:600px;">
                <div class="container-content">
                    <ul id="myUL">
                        <li><span class="caret">Biến đổi lòng dẫn (m)</span>
                            <ul class="nested">
                            <img src="/images/legend_biendoilongdan.png">
                            </ul>
                        </li>
                        <li><span class="caret">Độ sâu địa hình đáy (m)</span>
                            <ul class="nested">
                            <img src="/images/legend_dem.png">
                            </ul>
                        </li>
                        <li><span class="caret">Diễn biến đường bờ bằng phương pháp viễn thám & GIS qua các năm</span>
                            <ul class="nested">
                            <img src="/images/legend_duongbo_gis.png">
                            </ul>
                        </li>
                        <li><span class="caret">Dự báo sạt lở đường bờ bằng mô hình</span>
                            <ul class="nested">
                            <img src="/images/legend_ruiro_satlo.png">
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="modaluploadshp" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- <div class="row"> -->
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelectNameShp">Chọn lớp dữ liệu:</label>
                        </div>
                        <select class="custom-select" id="inputGroupSelectNameShp">
                            <!-- <option value="dangsau_2009_line">dangsau_2009_line</option> -->
                            <option value="diemks">Hình ảnh khảo sát thực địa 2019</option>
                            <option value="doansl">Đoạn sạt lỡ</option>
                            <option value="diemsl">Điểm mặt cắt khảo sát</option>
                            @role('admin')
                            <option value="quyhoach">Quy hoạch khai thác cát</option>
                            <option value="quyhoach_dieuchinh">Điều chỉnh quy hoạch khai thác cát</option>
                            @endrole
                            <option value="quyhoach_diemgoc">Điểm gốc quy hoạch khai thác cát</option>
                            <option value="quyhoach_dieuchinh_diemgoc">Điểm gốc điều chỉnh quy hoạch khai thác cát</option>
                            <option value="thudat">Thửa đất</option>
                            <!-- <option value="satlo_mohinhthuyluc_line">DỰ BÁO SẠT LỞ ĐƯỜNG BỜ BẰNG MÔ HÌNH</option> -->
                            <!-- <option value="satlo_truottongthe_line">DỰ BÁO SẠT LỞ ĐƯỜNG BỜ BẰNG PHƯƠNG PHÁP TRƯỢT TỔNG THỂ</option> -->
                            <!-- <option value="satloduongbo_gis_line">DIỄN BIẾN ĐƯỜNG BỜ BẰNG PHƯƠNG PHÁP VIỄN THÁM & GIS</option> -->
                            <!-- <option value="u_diem_mc_moi">u_diem_mc_moi</option> -->
                            <!-- <option value="u_anh">ĐIỂM KHẢO SÁT MẶT CẮT NGANG THƯỜNG XUYÊN</option> -->
                            <!-- <option value="u_diem_sat_lo">u_diem_sat_lo</option> -->
                            <!-- <option value="u_doan_sat_lo">ĐOẠN SẠT LỞ</option> -->
                            <!-- <option value="u_tram_do_thuy_van">u_tram_do_thuy_van</option> -->
                        </select>
                    </div>

                    <p>Chọn shapefile đã được nén lại dưới định dạng zip:</p>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Chọn tệp tin</span>
                        </div>
                        <div class="custom-file">
                            <input type="file" id="inputShp" required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btn-upload-shp-file">Cập nhật</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
                </div>
            </div>
        </div>
    </div>
    <div class="container-chart hidden" id="container-chart">
        <h3 style="text-align: center;">Biểu đồ mặt cắt</h3>
        <div id="chart"></div>
    </div>
    <div class="swiper-container hidden" id="swiper-container">
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
</body>

<script src="https://unpkg.com/swiper/js/swiper.js"></script>
<script src="https://unpkg.com/swiper/js/swiper.min.js"></script>
<script src="{{ mix('js/map-edit.js') }}"></script>

</html>