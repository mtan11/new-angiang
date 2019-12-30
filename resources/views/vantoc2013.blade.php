<!DOCTYPE html>
<html>

<head>

    <title>Video Overlay Tutorial - Leaflet</title>

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>


    <style>
        html,
        body {
            height: 100%;
            margin: 0;
        }

        #map {
            width: 100%;
            height: 100vh;
        }
    </style>


</head>

<body>

    <div id='map'></div>

    <script>
        var map = L.map('map');

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/satellite-v9'
        }).addTo(map);


        //
        // Phần code thêm
        // THêm 2 layer: Vận tốc năm 2010 và vận tốc 2013, 2 lớp dạng anima
        //
        var videoUrls_2010 = [
                '/images/v_2010.webm',
            ],
            bounds = L.latLngBounds([
                [10.301955638, 104.871579184],
                [10.978093201, 105.978488438]
            ]);
        var videoUrls_2013 = [
                '/images/v_2013.webm',
            ],
            bounds = L.latLngBounds([
                [10.301955638, 104.871579184],
                [10.978093201, 105.978488438]
            ]);
        map.fitBounds(bounds);

        var overlay_2010 = L.videoOverlay(videoUrls_2010, bounds, {
            opacity: 1.0,
            interactive: false,
            autoplay: true
        });
        var overlay_2013 = L.videoOverlay(videoUrls_2013, bounds, {
            opacity: 1.0,
            interactive: false,
            autoplay: true
        });
        map.addLayer(overlay_2013);
        // map.addLayer(overlay_2013);

        //
        // Thêm 2 nút để chạy và dừng; em có thể hardcode thành 1 thẻ div;
        // Lưu ý kjhi nào layer visible thì 2 tool này mới visible, em có thể xử lý bằng cách track thêm sự kiện switch layer.
        //
        var PauseControl = L.Control.extend({
            onAdd: function() {
                var button = L.DomUtil.create('button');
                button.innerHTML = '⏸';
                L.DomEvent.on(button, 'click', function() {
                    overlay_2013.getElement().pause();
                });
                return button;
            }
        });
        var PlayControl = L.Control.extend({
            onAdd: function() {
                var button = L.DomUtil.create('button');
                button.innerHTML = '▶️';
                L.DomEvent.on(button, 'click', function() {
                    overlay_2013.getElement().play();
                });
                return button;
            }
        });

        var pauseControl = (new PauseControl()).addTo(map);
        var playControl = (new PlayControl()).addTo(map);
    </script>



</body>

</html>