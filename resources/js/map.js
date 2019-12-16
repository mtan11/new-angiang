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

let latlngmc = '';
let coormc;

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
        for (let i = 0; i < photo.length; i++) {
            if (i == 0) {
                createImgDiv(id, true, 'img', photo[i])
            }
            createImgDiv(id, false, 'img', photo[i])
        }
        for (let i = 0; i < photomc.length; i++) {
            console.log(photomc);

            createImgDiv(id, false, 'imgmc', photomc[i])
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

let u_diem_mc_moi = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:u_diem_mc_moi',
    Version: '1.1.1',
    Transparent: true,
    SRS: 'EPSG:900913',
    maxZoom: 21
})

let u_anh = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:u_anh',
    Version: '1.1.1',
    Transparent: true,
    SRS: 'EPSG:900913',
    maxZoom: 21
})

let u_diem_sat_lo = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:u_diem_sat_lo',
    Version: '1.1.1',
    Transparent: true,
    SRS: 'EPSG:900913',
    maxZoom: 21
})

let u_doan_sat_lo = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:u_doan_sat_lo',
    Version: '1.1.1',
    Transparent: true,
    SRS: 'EPSG:900913',
    maxZoom: 21
})


let u_tram_do_thuy_van = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:u_tram_do_thuy_van',
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
$("#diemdosau20019").on('change', function() {
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
$("#diemanh").on('change', function() {
    toggleLayer(u_anh, map, this.checked);
});
$("#diemmatcatmoi").on('change', function() {
    toggleLayer(u_diem_mc_moi, map, this.checked);
});
$("#diemsatlo").on('change', function() {
    toggleLayer(u_diem_sat_lo, map, this.checked);
});
$("#doansatlo").on('change', function() {
    toggleLayer(u_doan_sat_lo, map, this.checked);
});
$("#tramdothuyvan").on('change', function() {
    toggleLayer(u_tram_do_thuy_van, map, this.checked);
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

map.on('pm:create', function(e) {
    console.log(e.layer.getLatLngs());
    let latlng = '';
    let url = api + 'api/get-matcat'
    var bodyFormData = new FormData();
    let coordinates = e.layer.getLatLngs();
    for (let i = 0; i < coordinates.length; i++) {
        if (i == coordinates.length - 1) {
            latlng += coordinates[i].lng + ' ' + coordinates[i].lat;
        } else { latlng += coordinates[i].lng + ' ' + coordinates[i].lat + ','; }

    }
    latlngmc = latlng;
    console.log(latlngmc);
    bodyFormData.set('linestring', latlngmc);
    axios({
            method: 'post',
            url: url,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(function(response) {
            //handle success
            alert('Biểu đồ mặt cắt được cập nhật');
            coormc = JSON.parse(response.data[0].st_asgeojson).coordinates;
            el.clear();

            geojson = {
                "name": "NewFeatureType",
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": coormc
                    },
                    "properties": null
                }]
            };
            el.addData(geojson);
            var gjl = L.geoJson(geojson, {
                onEachFeature: el.addData.bind(el)
            }).addTo(map);



        })
        .catch(function(response) {
            //handle error
            console.log(response);
        });


})

var geojson = {
    "name": "NewFeatureType",
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": coormc
        },
        "properties": null
    }]
};

var el = L.control.elevation();
el.addTo(map);