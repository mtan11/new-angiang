import { compile } from "vue-template-compiler";

var map = L.map('map').setView([10.6079209, 105.1175397], 11);

let btnClose = document.getElementById('close-btn');
let panel = document.getElementById('panel');
let btnOpen = document.getElementById('show-btn');
let btnSubmit = document.getElementById('accept-new-info');
let titlePanel = document.getElementById('panel-title');
let layerContent = document.getElementById('layer-content');
let infoContent = document.getElementById('info-content');
let inputName = document.getElementById('input-name');
let inputInfo = document.getElementById('input-info');
let imgSlider = document.getElementById('img-slider');
let api = 'http://35.240.232.121/';
let lat = 0;
let lng = 0;

let markerGot = [];
let arrMarkers = [];
arrMarkers = L.layerGroup();
let geoserver = 'http://35.240.232.121:8080/geoserver/angiang/wms';
let urlImg = 'http://35.240.232.121/storage/uploadedimages/';


btnClose.addEventListener('click', closePanel.bind(this));
btnOpen.addEventListener('click', showPanel.bind(this));
// btnSubmit.addEventListener('click', acceptEditInfo.bind(this));

function closePanel() {
    panel.style.right = '-450px';
    btnOpen.classList.remove('hidden');
}

function showPanel() {
    panel.style.right = '10px';
    titlePanel.innerHTML = 'Các lớp layer';
    btnOpen.classList.add('hidden');
    infoContent.classList.add('hidden');
    layerContent.classList.remove('hidden');
}

// function acceptEditInfo() {
//     var bodyFormData = new FormData();
//     var name = document.getElementById('input-name');
//     var descr = document.getElementById('input-info');
//     var img = document.getElementById('input-images');
//     var imgmc = document.getElementById('input-images-mc');
//     var xy = lat + ' ' + lng;
//     var url = api + 'api/insert-data-point';
//     bodyFormData.set('name', name.value);
//     bodyFormData.set('info', descr.value);
//     bodyFormData.set('xy', xy);
//     bodyFormData.append('photos', img);
//     bodyFormData.append('photomc', imgmc);

//     axios({
//             method: 'post',
//             url: url,
//             data: bodyFormData,
//             headers: { 'Content-Type': 'multipart/form-data' }
//         })
//         .then(function(response) {
//             //handle success
//             alert('Cập nhật điểm thành công');
//             console.log(response);
//         })
//         .catch(function(response) {
//             //handle error
//             console.log(response);
//         });

// }

function getMarker() {
    let url = api + '/api/get-all-imgpoint'
    axios({
            method: 'get',
            url: url,
        })
        .then(function(response) {
            let markers = response.data;
            markerGot = [];
            for (var i = 0; i < markers.length; i++) {

                console.log(markers[i]);
                markerGot.push({
                    type: 'Feature',
                    geometry: {
                        type: JSON.parse(markers[i].st_asgeojson).type,
                        coordinates: JSON.parse(markers[i].st_asgeojson).coordinates
                    },
                    properties: {
                        Name: markers[i].name,
                        Info: markers[i].info,
                        Id: markers[i].gid,
                        Photos: markers[i].photos
                    }
                });
            };
            for (var i = 0; i < markerGot.length; i++) {
                let mar = L.geoJson(markerGot[i], {
                    onEachFeature: clickMarker.bind(this),
                });
                arrMarkers.addLayer(mar);
            }
            arrMarkers.addTo(map);
        });
};


getMarker();


function clickMarker(feature, layer) {
    layer.on('click', function(e) {
        console.log(feature.properties);
        let id = feature.properties.Id;
        titlePanel.innerHTML = "Thông tin điểm khảo sát";
        layerContent.classList.add("hidden");
        infoContent.classList.remove("hidden");
        imgSlider.innerHTML = '';
        inputName.value = feature.properties.Name;
        inputInfo.value = feature.properties.Info;
        let photo = JSON.parse(feature.properties.Photos).img;
        let photomc = JSON.parse(feature.properties.Photos).imgmc;
        console.log(photo);
        console.log(photomc);
        for (let i = 0; i < photo.length; i++) {
            if (i == 0) {
                createImgDiv(id, true, 'img', photo[i])
            }
            createImgDiv(id, false, 'img', photo[i])
        }
        for (let i = 0; i < photomc.length; i++) {
            createImgDiv(id, false, 'imgmc', photo[i])
        }
    })
}

function createImgDiv(id, isFirst, ismc, name) {
    let div = document.createElement('div');
    if (isFirst == true) {
        div.className = 'carousel-item active';
    } else { div.className = 'carousel-item'; }
    let img = document.createElement('img');
    img.className = 'd-block w-100';
    img.src = urlImg + id + '/' + ismc + '/' + name;
    div.appendChild(img);
    imgSlider.appendChild(div);
}



L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(map);

let dangsau_2009_line = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:dangsau_2009_line',
    Version: '1.1.1',
    Transparent: true,
    SRS: 'EPSG:900913',
    maxZoom: 21
})
let diemdosau_2019_point = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:diemdosau_2019_point',
    Version: '1.1.1',
    Transparent: true,
    SRS: 'EPSG:900913',
    maxZoom: 21
})

let diemdosau_2009_point = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:diemdosau_2009_point',
    Version: '1.1.1',
    Transparent: true,
    SRS: 'EPSG:900913',
    maxZoom: 21
})

let satlo_mohinhthuyluc_line = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:satlo_mohinhthuyluc_line',
    Version: '1.1.1',
    Transparent: true,
    SRS: 'EPSG:900913',
    maxZoom: 21
})

let satlo_truottongthe_line = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:satlo_truottongthe_line',
    Version: '1.1.1',
    Transparent: true,
    SRS: 'EPSG:900913',
    maxZoom: 21
})
let satloduongbo_gis_line = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:satloduongbo_gis_line',
    Version: '1.1.1',
    Transparent: true,
    SRS: 'EPSG:900913',
    maxZoom: 21
})

//add Layer

var mapMinZoom = 10;
var mapMaxZoom = 16;
var options = {
    minZoom: mapMinZoom,
    maxZoom: mapMaxZoom,
    opacity: 1.0,
    attribution: 'Rendered with <a href="http://www.maptiler.com/">MapTiler Desktop</a>',
    tms: false
};
let bandobosung = L.tileLayer('/storage/bandobosungvadieuchinh/{z}/{x}/{y}.png', options);
let bandophantich = L.tileLayer('/storage/bandophantich/{z}/{x}/{y}.png', options);
let bandotheoketqua = L.tileLayer('/storage/bandotheoketqua/{z}/{x}/{y}.png', options);


// marker.on('click', onMarkerClick);

$("#rungngapman").on('change', function() {
    toggleLayer(arrMarkers, map, this.checked);
});
$("#bandobosung").on('change', function() {
    toggleLayer(bandobosung, map, this.checked);
});
$("#bandoketqua").on('change', function() {
    toggleLayer(bandotheoketqua, map, this.checked);
});
$("#bandophantich").on('change', function() {
    toggleLayer(bandophantich, map, this.checked);
});
$("#2009line").on('change', function() {
    toggleLayer(dangsau_2009_line, map, this.checked);
});
$("#diemdosau2019").on('change', function() {
    toggleLayer(diemdosau_2019_point, map, this.checked);
});
$("#satlomohinhthuyluch").on('change', function() {
    toggleLayer(satlo_mohinhthuyluc_line, map, this.checked);
});
$("#diemdosau").on('change', function() {
    toggleLayer(diemdosau_2009_point, map, this.checked);
});
$("#satlotruottongthe").on('change', function() {
    toggleLayer(satlo_truottongthe_line, map, this.checked);
});
$("#satloduongbo").on('change', function() {
    toggleLayer(satloduongbo_gis_line, map, this.checked);
});


function toggleLayer(layer, map, status) {
    if (status == true) {
        status = $(this).is(':checked');
        map.addLayer(layer);
    } else {
        status = $(this).is(':checked');
        map.removeLayer(layer);
    }

}

//image slide

function onMarkerClick(e) {
    console.log(e.sourceTarget.options.title);
    console.log(e);
}
map.addControl(new L.Control.Fullscreen());
L.control.ruler().addTo(map);
L.control.locate().addTo(map);
// add leaflet.pm controls with some options to the map
map.pm.addControls({
    position: 'topleft',
    drawCircle: false,
});

// create the geocoding control and add it to the map
var searchControl = L.esri.Geocoding.geosearch().addTo(map);

// create an empty layer group to store the results and add it to the map
var results = L.layerGroup().addTo(map);

// listen for the results event and add every result to the map
searchControl.on("results", function(data) {
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
    }
});

var geojson = {
    "name": "NewFeatureType",
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [
                    105.13693,
                    10.696476,
                    296
                ],
                [
                    105.134602,
                    10.69764,
                    295
                ],
                [
                    105.129983,
                    10.701164,
                    299
                ],
                [
                    105.131292,
                    10.702382,
                    303
                ],
                [
                    105.13376,
                    10.704533,
                    315
                ],
                [
                    105.135568,
                    10.705574,
                    336
                ],
                [
                    105.136179,
                    10.70934,
                    338
                ],
                [
                    105.137011,
                    10.714066,
                    344
                ],
                [
                    105.136984,
                    10.719489,
                    342
                ],
                [
                    105.136898,
                    10.725235,
                    350
                ],
                [
                    105.136801,
                    10.730143,
                    353
                ],
                [
                    105.135632,
                    10.734853,
                    354
                ],
                [
                    105.131882,
                    10.738989,
                    363
                ],
                [
                    105.129688,
                    10.744241,
                    363
                ],
                [
                    105.123937,
                    10.746982,
                    361
                ],
                [
                    105.118509,
                    10.750286,
                    371
                ],
                [
                    105.112763,
                    10.753113,
                    374
                ],
                [
                    105.107807,
                    10.755356,
                    378
                ],
                [
                    105.103467,
                    10.758086,
                    386
                ],
                [
                    105.098902,
                    10.760956,
                    388
                ],
                [
                    105.096429,
                    10.764642,
                    397
                ],
                [
                    105.094197,
                    10.768246,
                    401
                ],
                [
                    105.091955,
                    10.773037,
                    402
                ],
                [
                    105.089251,
                    10.777194,
                    408
                ],
                [
                    105.086215,
                    10.780939,
                    410
                ],
                [
                    105.083227,
                    10.785498,
                    412
                ],
                [
                    105.079778,
                    10.788926,
                    423
                ],
                [
                    105.076913,
                    10.7923,
                    429
                ],
                [
                    105.074059,
                    10.795938,
                    429
                ],
                [
                    105.071495,
                    10.800213,
                    435
                ],
                [
                    105.069505,
                    10.804263,
                    442
                ],
                [
                    105.067574,
                    10.809322,
                    436
                ],
                [
                    105.065508,
                    10.812728,
                    450
                ],
                [
                    105.063277,
                    10.817299,
                    451
                ],
                [
                    105.062,
                    10.822073,
                    447
                ],
                [
                    105.06023,
                    10.826622,
                    464
                ],
                [
                    105.058905,
                    10.831729,
                    459
                ],
                [
                    105.05553,
                    10.835645,
                    460
                ],
                [
                    105.051888,
                    10.83933,
                    467
                ],
                [
                    105.048626,
                    10.842817,
                    476
                ],
                [
                    105.045467,
                    10.846106,
                    480
                ],
                [
                    105.042028,
                    10.849287,
                    485
                ],
                [
                    105.037672,
                    10.851776,
                    493
                ],
                [
                    105.033477,
                    10.854367,
                    495
                ],
                [
                    105.029974,
                    10.856373,
                    502
                ],
                [
                    105.027324,
                    10.857559,
                    514
                ],
                [
                    105.023832,
                    10.859275,
                    518
                ],
                [
                    105.020587,
                    10.861743,
                    524
                ],
                [
                    105.017615,
                    10.864414,
                    526
                ],
                [
                    105.015748,
                    10.868888,
                    520
                ],
                [
                    105.013119,
                    10.872059,
                    529
                ],
                [
                    105.009879,
                    10.874521,
                    536
                ],
                [
                    105.00798,
                    10.87598,
                    553
                ],
                [
                    105.005073,
                    10.878158,
                    556
                ],
                [
                    105.00452,
                    10.878609,
                    557
                ],
                [
                    105.004488,
                    10.878619,
                    554
                ],
                [
                    105.004477,
                    10.878619,
                    553
                ],
                [
                    105.004483,
                    10.878619,
                    552
                ],
                [
                    105.004477,
                    10.878619,
                    551
                ],
                [
                    105.004477,
                    10.878619,
                    550
                ],
                [
                    105.004477,
                    10.878619,
                    551
                ],
                [
                    105.004483,
                    10.878614,
                    551
                ],
                [
                    105.004488,
                    10.878614,
                    551
                ],
                [
                    105.004488,
                    10.878614,
                    552
                ],
                [
                    105.004558,
                    10.878598,
                    556
                ],
                [
                    105.004011,
                    10.880808,
                    556
                ],
                [
                    105.002584,
                    10.884032,
                    570
                ],
                [
                    105.001033,
                    10.886172,
                    583
                ],

            ]
        },
        "properties": null
    }]
};
var el = L.control.elevation();
el.addTo(map);
var gjl = L.geoJson(geojson, {
    onEachFeature: el.addData.bind(el)
}).addTo(map);