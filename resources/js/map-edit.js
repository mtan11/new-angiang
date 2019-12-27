var map = L.map('map').setView([10.6079209, 105.1175397], 11);

let btnClose = document.getElementById('close-btn');
let panel = document.getElementById('panel');
let panelUpdate = document.getElementById('panel-update');

let btnOpen = document.getElementById('show-btn');
let btnSubmit = document.getElementById('accept-new-info');
let titlePanel = document.getElementById('panel-title');
let layerContent = document.getElementById('layer-content');
let infoContent = document.getElementById('info-content');
let inputName = document.getElementById('input-name');
let inputNameShow = document.getElementById('input-name-show');
let inputInfo = document.getElementById('input-info');
let inputInfoShow = document.getElementById('input-info-show');
let imgSlider = document.getElementById('img-slider');
let btnCloseUpdate = document.getElementById('close-update-btn');
var imgContainer = document.getElementById('container-img');
var swiperContainer = document.getElementById('swiper-container');
var chartContainer = document.getElementById('container-chart');
var imgmcContainer = document.getElementById('container-imgmc');
// let btnUploadShp = document.getElementById('btn-upload-shp');
let selectKindMarker = document.getElementById('selectKindMarker');
let btnUploadShpFile = document.getElementById('btn-upload-shp-file');
let titleUpdate = document.getElementById('title-update');
let updateBtnContainer = document.getElementById('container-update-btn');
let containerInfoInsert = document.getElementById('container-info-insert');
let api = 'http://35.198.222.40/';
let lat = 0;
let lng = 0;

let latlngmc = '';
let coormc;

let geoserver = 'http://35.198.222.40:8080/geoserver/angiang/wms';
let urlImg = 'http://35.198.222.40/storage/uploadedimages/';

let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
let basemap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
});


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(map);

var base = {
    "Satellite": googleSat,
    "Basemap": basemap
};

//Switch base map
var checkmap = L.control({ position: 'bottomleft' });
checkmap.onAdd = function(e) {
    var div = L.DomUtil.create('div');
    div.innerHTML = `
  <div value="basemap" id="switchwrapper" class="switchwrapper">
  <figure id="googlepic" class="item-wrapper">
  <figcaption class="item-title">
  <span class="item-text">Satellite</span></figcaption>
  <img class="item-img" src="/images/earth-layer.png" alt="Google map" title="Satellite">
  </figure>
  <figure id="basepic" class="item-wrapper" style="display: none;">
  <figcaption class="item-title">
  <span class="item-text">Base map</span></figcaption>
  <img class="item-img" src="/images/base-layer.png" alt="Mapbox" title="Base map">
  </figure>
  </div>`;
    return div;
};
checkmap.addTo(map);
document.getElementById('googlepic').addEventListener('click', function (e) {
    map.removeLayer(basemap);
    map.addLayer(googleSat);
    document.getElementById("switchwrapper").setAttribute("value", "googlemap");
    document.getElementById('googlepic').style.display = "none";
    document.getElementById('basepic').style.display = "block";
    var buttonText = document.getElementsByClassName("buttonText");
    for (var i = 0; i < buttonText.length; i++) {
        buttonText[i].style.color = "#ffff";
    }
});
document.getElementById('basepic').addEventListener('click', function (e) {
    map.removeLayer(googleSat);
    map.addLayer(basemap);
    document.getElementById("switchwrapper").setAttribute("value", "basemap");
    document.getElementById('googlepic').style.display = "block";
    document.getElementById('basepic').style.display = "none";
    var buttonText = document.getElementsByClassName("buttonText");
    for (var i = 0; i < buttonText.length; i++) {
        buttonText[i].style.color = "#000000";
    }
});

let markerGot = [];
let markerGotSL = [];
let arrMarkers = [];
let arrSatLo = L.layerGroup();
let arrDoanSL = L.layerGroup();
arrMarkers = L.layerGroup();
var ksIcon = new L.icon({
    iconUrl: '/images/icon-red.png',
    iconSize: [30, 35],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
});
var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'vertical',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
})

selectKindMarker.addEventListener('change', () => {
    containerInfoInsert.classList.remove('hidden');
    if (selectKindMarker.value == 'diemks') {
        imgmcContainer.classList.add('hidden');
        imgContainer.classList.remove('hidden');
    } else {
        imgContainer.classList.add('hidden');
        imgmcContainer.classList.remove('hidden');
    }
})
btnClose.addEventListener('click', closePanel.bind(this));
btnCloseUpdate.addEventListener('click', closePanelUpdate.bind(this));
btnOpen.addEventListener('click', showPanel.bind(this));
btnSubmit.addEventListener('click', acceptEditInfo.bind(this));
btnUploadShpFile.addEventListener('click', uploadShpFIle.bind(this));

function closePanel() {
    panel.style.right = '-450px';
    btnOpen.classList.remove('hidden');
    swiperContainer.classList.add('hidden');
    chartContainer.classList.add('hidden');
}

function closePanelUpdate() {
    panelUpdate.style.right = '-450px';

}

function uploadShpFIle() {
    let url = api + 'api/upload-shapefile';
    let bodyFormData = new FormData();
    let nameShp = document.getElementById('inputGroupSelectNameShp');
    let shp = document.getElementById('inputShp');
    bodyFormData.set('tablename', nameShp.value);
    bodyFormData.append('shpFile', shp.files[0]);
    axios({
            method: 'post',
            url: url,
            data: bodyFormData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(function (response) {
            //handle success
            alert('Cập nhật dữ liệu thành công');
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            alert('Có lỗi xảy ra trong quá trình cập nhật');
            console.log(response);
        });
}

function showPanel() {
    panel.style.right = '10px';
    titlePanel.innerHTML = 'Các lớp layer';
    btnOpen.classList.add('hidden');
    infoContent.classList.add('hidden');
    layerContent.classList.remove('hidden');
    // swiperContainer.classList.remove('hidden');
    // chartContainer.classList.remove('hidden');
}

function showPanelUpdate() {
    panelUpdate.style.right = '10px';
}

function acceptEditInfo() {
    var bodyFormData = new FormData();
    var kindMarker = document.getElementById('selectKindMarker');
    var name = document.getElementById('input-name');
    var descr = document.getElementById('input-info');
    var img = document.getElementById('input-images');
    var imgmc = document.getElementById('input-images-mc');
    var xy = lng + ' ' + lat;
    var urlKS = api + 'api/insert-data-diemks';
    var urlSL = api + 'api/insert-data-diemsl';
    if (name.value == null || descr.value == null) {
        alert('Vui lòng điền đầy đủ thông tin')
    } else {
        bodyFormData.set('name', name.value);
        bodyFormData.set('info', descr.value);
        bodyFormData.set('xy', xy);
        // console.log(img.files.length);


        if (selectKindMarker.value == 'diemks') {
            for (let i = 0; i < img.files.length; i++) {
                bodyFormData.append('photos[]', img.files[i]);
            }
            axios({
                    method: 'post',
                    url: urlKS,
                    data: bodyFormData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(function (response) {
                    //handle success
                    alert('Cập nhật điểm thành công');
                    console.log(response);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        } else {
            for (let i = 0; i < imgmc.files.length; i++) {
                bodyFormData.append('excelmc', imgmc.files[i]);
            }
            axios({
                    method: 'post',
                    url: urlSL,
                    data: bodyFormData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(function (response) {
                    //handle success
                    alert('Cập nhật điểm thành công');
                    console.log(response);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        }
    }

}


function getMarker() {
    let url = api + 'api/get-all-data'
    axios({
            method: 'get',
            url: url,
        })
        .then(function (response) {
            let diemanhks = response.data.diemanhks;
            let diemsl = response.data.diemsl;
            let doansl = response.data.doansl;
            console.log(response.data);
            markerGot = [];
            let doanGotSL = [];
            let markerGotSL = [];
            for (var i = 0; i < doansl.length; i++) {
                // console.log(diemanhks[i]);
                doanGotSL.push({
                    type: 'Feature',
                    geometry: {
                        type: JSON.parse(doansl[i].st_asgeojson).type,
                        coordinates: JSON.parse(doansl[i].st_asgeojson).coordinates
                    },
                    properties: {
                        Name: doansl[i].name,
                        Info: doansl[i].info,
                        Id: doansl[i].gid,
                        Photos: doansl[i].photos
                    }
                });
            };
            for (var i = 0; i < doanGotSL.length; i++) {
                let mar = L.geoJson(doanGotSL[i], {
                    onEachFeature: clickLineSL.bind(this),
                });
                arrDoanSL.addLayer(mar);
            }
            for (var i = 0; i < diemsl.length; i++) {
                // console.log(diemanhks[i]);
                markerGotSL.push({
                    type: 'Feature',
                    geometry: {
                        type: JSON.parse(diemsl[i].st_asgeojson).type,
                        coordinates: JSON.parse(diemsl[i].st_asgeojson).coordinates
                    },
                    properties: {
                        Name: diemsl[i].name,
                        Info: diemsl[i].info,
                        Id: diemsl[i].gid,
                        Photos: diemsl[i].photos
                    }
                });
            };
            for (var i = 0; i < markerGotSL.length; i++) {
                let mar = L.geoJson(markerGotSL[i], {
                    pointToLayer: function (feature, latlng) {
                        return L.marker(latlng, {
                            icon: ksIcon
                        });
                    },
                    onEachFeature: clickMarkerSL.bind(this),
                });
                arrSatLo.addLayer(mar);
            }
            for (var i = 0; i < diemanhks.length; i++) {
                // console.log(diemanhks[i]);
                markerGot.push({
                    type: 'Feature',
                    geometry: {
                        type: JSON.parse(diemanhks[i].st_asgeojson).type,
                        coordinates: JSON.parse(diemanhks[i].st_asgeojson).coordinates
                    },
                    properties: {
                        Name: diemanhks[i].name,
                        Info: diemanhks[i].info,
                        Id: diemanhks[i].gid,
                        Photos: diemanhks[i].photos
                    }
                });
            };
            for (var i = 0; i < markerGot.length; i++) {
                let mar = L.geoJson(markerGot[i], {
                   
                    onEachFeature: clickMarkerKS.bind(this),
                });
                arrMarkers.addLayer(mar);
            }
            arrMarkers.addTo(map);
            arrSatLo.addTo(map);
            arrDoanSL.addTo(map);
        });
};

getMarker();

// map.on('click', addMarker);

function clickMarkerKS(feature, layer) {
    layer.on('click', function (e) {
        showPanel();
        chartContainer.classList.add('hidden');
        let url = api + 'api/update-data-diemks';
        console.log(feature.properties);
        let id = feature.properties.Id;
        titlePanel.innerHTML = "Thông tin điểm khảo sát";
        layerContent.classList.add("hidden");
        infoContent.classList.remove("hidden");
        imgSlider.innerHTML = '';
        inputNameShow.value = feature.properties.Name;
        inputInfoShow.value = feature.properties.Info;
        titleUpdate.innerHTML = 'Chọn ảnh';

        if (feature.properties.Photos == null) {
            swiperContainer.classList.add('hidden');
        } else {
            swiperContainer.classList.remove('hidden');
        }
        let photo = [];
        if (feature.properties.Photos != null) {
            photo = JSON.parse(feature.properties.Photos).img;
        }

        let updateBtn = document.createElement('button');
        updateBtn.innerHTML = 'Cập nhật';
        updateBtn.className = 'btn btn-primary';
        updateBtn.addEventListener('click', () => {
            console.log(id);
            var bodyFormData = new FormData();
            var name = document.getElementById('input-name-show');
            var descr = document.getElementById('input-info-show');
            var file = document.getElementById('input-file-show');
            bodyFormData.set('name', name.value);
            bodyFormData.set('info', descr.value);
            bodyFormData.set('id', id);
            for (let i = 0; i < file.files.length; i++) {
                bodyFormData.append('photos[]', file.files[i]);
            }
            axios({
                    method: 'post',
                    url: url,
                    data: bodyFormData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(function (response) {
                    //handle success
                    alert('Cập nhật dữ liệu thành công');
                    console.log(response);
                })
                .catch(function (response) {
                    //handle error
                    alert('Có lỗi xảy ra trong quá trình cập nhật');
                    console.log(response);
                });
        })
        updateBtnContainer.innerHTML = '';
        updateBtnContainer.appendChild(updateBtn);


        // let photomc = JSON.parse(feature.properties.Photos).imgmc;
        for (let i = 0; i < photo.length; i++) {
            if (i == 0) {
                createImgDiv(id, true, 'img', photo[i], 'diemanhks')
            } else {
                createImgDiv(id, false, 'img', photo[i], 'diemanhks')
            }

        }
    })
}

function clickMarkerSL(feature, layer) {
    layer.on('click', function (e) {
        showPanel();
        swiperContainer.classList.add('hidden');
        let url = api + 'api/update-data-diemsl';
        let urlMC = api + 'api/get-matcat-by-pointid/';
        console.log(feature.properties);
        let id = feature.properties.Id;
        titlePanel.innerHTML = "Thông tin điểm khảo sát";
        layerContent.classList.add("hidden");
        infoContent.classList.remove("hidden");
        imgSlider.innerHTML = '';
        inputNameShow.value = feature.properties.Name;
        inputInfoShow.value = feature.properties.Info;
        titleUpdate.innerHTML = 'Chọn file excel';

        axios({
                method: 'get',
                url: urlMC + id,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(function (response) {
                //handle success
                console.log(response.data);
                if (response.data.length < 1) {
                    chartContainer.classList.add('hidden');
                } else {
                    chartContainer.classList.remove('hidden');
                }
                document.getElementById('chart').innerHTML = '';
                var data = response.data;
                var width = 800;
                var height = 300;
                var margin = 50;
                var duration = 250;

                var lineOpacity = "0.25";
                var lineOpacityHover = "0.85";
                var otherLinesOpacityHover = "0.1";
                var lineStroke = "1.5px";
                var lineStrokeHover = "2.5px";

                var circleOpacity = '0.85';
                var circleOpacityOnLineHover = "0.25"
                var circleRadius = 3;
                var circleRadiusHover = 6;

                var maxX = 0;
                var maxY = 0;
                /* Format Data */
                // var parseDate = d3.timeParse("%Y");
                data.forEach(function (d) {
                    d.values.forEach(function (d) {
                        maxX = (d.khoangcach > maxX) ? d.khoangcach : maxX;
                        maxY = (d.dosau < maxY) ? d.dosau : maxY;
                    });
                });


                /* Scale */
                var xScale = d3.scaleLinear()
                    .domain([0, maxX])
                    .range([0, width - margin]);

                var yScale = d3.scaleLinear()
                    .domain([maxY, 0 ])
                    .range([height - margin, 0]);

                var color = d3.scaleOrdinal(d3.schemeCategory10);

                /* Add SVG */
                var svg = d3.select("#chart").append("svg")
                    .attr("width", (width + margin) + "px")
                    .attr("height", (height + margin) + "px")
                    .append('g')
                    .attr("transform", `translate(${margin}, ${margin})`);


                /* Add line into SVG */
                var line = d3.line()
                    .x(d => xScale(d.khoangcach))
                    .y(d => yScale(d.dosau));

                let lines = svg.append('g')
                    .attr('class', 'lines');

                lines.selectAll('.line-group')
                    .data(data).enter()
                    .append('g')
                    .attr('class', 'line-group')
                    .on("mouseover", function (d, i) {
                        svg.append("text")
                            .attr("class", "title-text")
                            .style("fill", color(i))
                            .text(d.thoigian)
                            .attr("text-anchor", "middle")
                            .attr("x", (width - margin) / 2)
                            .attr("y", 5);
                    })
                    .on("mouseout", function (d) {
                        svg.select(".title-text").remove();
                    })
                    .append('path')
                    .attr('class', 'line')
                    .attr('d', d => line(d.values))
                    .style('stroke', (d, i) => color(i))
                    .style('opacity', lineOpacity)
                    .on("mouseover", function (d) {
                        d3.selectAll('.line')
                            .style('opacity', otherLinesOpacityHover);
                        d3.selectAll('.circle')
                            .style('opacity', circleOpacityOnLineHover);
                        d3.select(this)
                            .style('opacity', lineOpacityHover)
                            .style("stroke-width", lineStrokeHover)
                            .style("cursor", "pointer");
                    })
                    .on("mouseout", function (d) {
                        d3.selectAll(".line")
                            .style('opacity', lineOpacity);
                        d3.selectAll('.circle')
                            .style('opacity', circleOpacity);
                        d3.select(this)
                            .style("stroke-width", lineStroke)
                            .style("cursor", "none");
                    });


                /* Add circles in the line */
                lines.selectAll("circle-group")
                    .data(data).enter()
                    .append("g")
                    .style("fill", (d, i) => color(i))
                    .selectAll("circle")
                    .data(d => d.values).enter()
                    .append("g")
                    .attr("class", "circle")
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .style("cursor", "pointer")
                            .append("text")
                            .attr("class", "text")
                            .text(`${d.dosau}`)
                            .attr("x", d => xScale(d.khoangcach) + 5)
                            .attr("y", d => yScale(d.dosau) - 10);
                    })
                    .on("mouseout", function (d) {
                        d3.select(this)
                            .style("cursor", "none")
                            .transition()
                            .duration(duration)
                            .selectAll(".text").remove();
                    })
                    .append("circle")
                    .attr("cx", d => xScale(d.khoangcach))
                    .attr("cy", d => yScale(d.dosau))
                    .attr("r", circleRadius)
                    .style('opacity', circleOpacity)
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .transition()
                            .duration(duration)
                            .attr("r", circleRadiusHover);
                    })
                    .on("mouseout", function (d) {
                        d3.select(this)
                            .transition()
                            .duration(duration)
                            .attr("r", circleRadius);
                    });


                /* Add Axis into SVG */
                var xAxis = d3.axisBottom(xScale).ticks(10);
                var yAxis = d3.axisLeft(yScale).ticks(10);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", `translate(0, ${height-margin})`)
                    .call(xAxis)
                    .append("text")
                    .attr("transform",
                        "translate(" + (width / 2) + " ," + 40 + ")")
                    .style("text-anchor", "middle")
                    .attr("fill", "#000")
                    .html("Khoảng cách (m)");


                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append('text')
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - margin)
                    .attr("x", 0 - (height / 2))
                    .attr("dy", "1em")
                    .style("text-anchor", "middle")
                    .attr("fill", "#000")
                    .html("Độ sâu (m)");
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

        let updateBtn = document.createElement('button');
        updateBtn.innerHTML = 'Cập nhật';
        updateBtn.className = 'btn btn-primary';
        updateBtn.addEventListener('click', () => {
            console.log(id);
            var bodyFormData = new FormData();
            var name = document.getElementById('input-name-show');
            var descr = document.getElementById('input-info-show');
            var file = document.getElementById('input-file-show');
            bodyFormData.set('name', name.value);
            bodyFormData.set('info', descr.value);
            bodyFormData.set('id', id);
            for (let i = 0; i < file.files.length; i++) {
                bodyFormData.append('excelmc', file.files[i]);
            }
            axios({
                    method: 'post',
                    url: url,
                    data: bodyFormData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(function (response) {
                    //handle success
                    alert('Cập nhật dữ liệu thành công');
                    console.log(response);
                })
                .catch(function (response) {
                    //handle error
                    alert('Có lỗi xảy ra trong quá trình cập nhật');
                    console.log(response);
                });
        })
        updateBtnContainer.innerHTML = '';
        updateBtnContainer.appendChild(updateBtn);


    })
}

function clickLineSL(feature, layer) {
    layer.setStyle({color:'blue'});
    layer.on('mouseover', function (e) {
        // var popup = e.target.getPopup();
        // popup.setLatLng(e.latlng).openOn(mymap);

        this.setStyle({
            color: 'red',
            weight: weightLineHover,
        });
    });
    layer.on('mouseout', function (e) {
        this.setStyle({
            color: 'blue',
            weight: 3,
        });
    });
    layer.on('click', function (e) {
        showPanel();
        chartContainer.classList.add('hidden');
        let url = api + 'api/update-data-doansl';
        console.log(feature.properties);
        let id = feature.properties.Id;
        titlePanel.innerHTML = "Thông tin điểm khảo sát";
        layerContent.classList.add("hidden");
        infoContent.classList.remove("hidden");
        imgSlider.innerHTML = '';
        inputNameShow.value = feature.properties.Name;
        inputInfoShow.value = feature.properties.Info;
        titleUpdate.innerHTML = 'Chọn ảnh';

        if (feature.properties.Photos == null) {
            swiperContainer.classList.add('hidden');
        } else {
            swiperContainer.classList.remove('hidden');
        }
        let photo = [];
        if (feature.properties.Photos != null) {
            photo = JSON.parse(feature.properties.Photos).img;
        }

        let updateBtn = document.createElement('button');
        updateBtn.innerHTML = 'Cập nhật';
        updateBtn.className = 'btn btn-primary';
        updateBtn.addEventListener('click', () => {
            console.log(id);
            var bodyFormData = new FormData();
            var name = document.getElementById('input-name-show');
            var descr = document.getElementById('input-info-show');
            var file = document.getElementById('input-file-show');
            bodyFormData.set('name', name.value);
            bodyFormData.set('info', descr.value);
            bodyFormData.set('id', id);
            if (file.files.length != 0) {
                for (let i = 0; i < file.files.length; i++) {
                    bodyFormData.append('photos[]', file.files[i]);
                }
            }

            axios({
                    method: 'post',
                    url: url,
                    data: bodyFormData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(function (response) {
                    //handle success
                    alert('Cập nhật dữ liệu thành công');
                    console.log(response);
                })
                .catch(function (response) {
                    //handle error
                    alert('Có lỗi xảy ra trong quá trình cập nhật');
                    console.log(response);
                });
        })
        updateBtnContainer.innerHTML = '';
        updateBtnContainer.appendChild(updateBtn);


        // let photomc = JSON.parse(feature.properties.Photos).imgmc;
        for (let i = 0; i < photo.length; i++) {
            if (i == 0) {
                createImgDiv(id, true, 'img', photo[i], 'doansl')
            } else {
                createImgDiv(id, false, 'img', photo[i], 'doansl')
            }

        }
    })
}



function clickMarker(feature, layer) {
    layer.on('click', function (e) {
        showPanel();
        let url = api + 'api/get-matcat-by-pointid/' + feature.properties.Id;
        console.log(feature.properties);
        let id = feature.properties.Id;
        titlePanel.innerHTML = "Thông tin điểm khảo sát";
        layerContent.classList.add("hidden");
        infoContent.classList.remove("hidden");
        imgSlider.innerHTML = '';
        inputNameShow.value = feature.properties.Name;
        inputInfoShow.value = feature.properties.Info;

        let photo = JSON.parse(feature.properties.Photos).img;


        // let photomc = JSON.parse(feature.properties.Photos).imgmc;
        for (let i = 0; i < photo.length; i++) {
            if (i == 0) {
                createImgDiv(id, true, 'img', photo[i])
            }
            createImgDiv(id, false, 'img', photo[i])
        }
        axios({
                method: 'get',
                url: url,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(function (response) {
                //handle success
                console.log(response.data);

                var data = [{
                        name: "USA",
                        values: [{
                                date: "2000",
                                price: "100"
                            },
                            {
                                date: "2001",
                                price: "110"
                            },
                            {
                                date: "2002",
                                price: "145"
                            },
                            {
                                date: "2003",
                                price: "241"
                            },
                            {
                                date: "2004",
                                price: "101"
                            },
                            {
                                date: "2005",
                                price: "90"
                            },
                            {
                                date: "2006",
                                price: "10"
                            },
                            {
                                date: "2007",
                                price: "35"
                            },
                            {
                                date: "2008",
                                price: "21"
                            },
                            {
                                date: "2009",
                                price: "201"
                            }
                        ]
                    },
                    {
                        name: "Canada",
                        values: [{
                                date: "2000",
                                price: "200"
                            },
                            {
                                date: "2001",
                                price: "120"
                            },
                            {
                                date: "2002",
                                price: "33"
                            },
                            {
                                date: "2003",
                                price: "21"
                            },
                            {
                                date: "2004",
                                price: "51"
                            },
                            {
                                date: "2005",
                                price: "190"
                            },
                            {
                                date: "2006",
                                price: "120"
                            },
                            {
                                date: "2007",
                                price: "85"
                            },
                            {
                                date: "2008",
                                price: "221"
                            },
                            {
                                date: "2009",
                                price: "101"
                            }
                        ]
                    },
                    {
                        name: "Maxico",
                        values: [{
                                date: "2000",
                                price: "50"
                            },
                            {
                                date: "2001",
                                price: "10"
                            },
                            {
                                date: "2002",
                                price: "5"
                            },
                            {
                                date: "2003",
                                price: "71"
                            },
                            {
                                date: "2004",
                                price: "20"
                            },
                            {
                                date: "2005",
                                price: "9"
                            },
                            {
                                date: "2006",
                                price: "220"
                            },
                            {
                                date: "2007",
                                price: "235"
                            },
                            {
                                date: "2008",
                                price: "61"
                            },
                            {
                                date: "2009",
                                price: "10"
                            }
                        ]
                    }
                ];
                console.log(data)
                // let data = [];
                // data.push(response.data);
                createChart(response.data);

                // console.log(data);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        // for (let i = 0; i < photomc.length; i++) {
        //     createImgDiv(id, false, 'imgmc', photomc[i])
        // }
    })
}

// function createChart(data) {
//     var width = 500;
//     var height = 300;
//     var margin = 50;
//     var duration = 250;

//     var lineOpacity = "0.25";
//     var lineOpacityHover = "0.85";
//     var otherLinesOpacityHover = "0.1";
//     var lineStroke = "1.5px";
//     var lineStrokeHover = "2.5px";

//     var circleOpacity = '0.85';
//     var circleOpacityOnLineHover = "0.25"
//     var circleRadius = 3;
//     var circleRadiusHover = 6;


//     /* Format Data */
//     // var parseDate = d3.timeParse("%Y");
//     data.forEach(function (d) {
//         d.values.forEach(function (d) {
//             d.date = d.date;
//             d.price = d.price;
//         });
//     });


//     /* Scale */
//     var xScale = d3.scaleTime()
//         .domain(d3.extent(data[0].values, d => d.date))
//         .range([0, width - margin]);

//     var yScale = d3.scaleLinear()
//         .domain([0, d3.max(data[0].values, d => d.price)])
//         .range([height - margin, 0]);

//     var color = d3.scaleOrdinal(d3.schemeCategory10);

//     /* Add SVG */
//     var svg = d3.select("#chart").append("svg")
//         .attr("width", (width + margin) + "px")
//         .attr("height", (height + margin) + "px")
//         .append('g')
//         .attr("transform", `translate(${margin}, ${margin})`);


//     /* Add line into SVG */
//     var line = d3.line()
//         .x(d => xScale(d.date))
//         .y(d => yScale(d.price));

//     let lines = svg.append('g')
//         .attr('class', 'lines');

//     lines.selectAll('.line-group')
//         .data(data).enter()
//         .append('g')
//         .attr('class', 'line-group')
//         .on("mouseover", function (d, i) {
//             svg.append("text")
//                 .attr("class", "title-text")
//                 .style("fill", color(i))
//                 .text(d.name)
//                 .attr("text-anchor", "middle")
//                 .attr("x", (width - margin) / 2)
//                 .attr("y", 5);
//         })
//         .on("mouseout", function (d) {
//             svg.select(".title-text").remove();
//         })
//         .append('path')
//         .attr('class', 'line')
//         .attr('d', d => line(d.values))
//         .style('stroke', (d, i) => color(i))
//         .style('opacity', lineOpacity)
//         .on("mouseover", function (d) {
//             d3.selectAll('.line')
//                 .style('opacity', otherLinesOpacityHover);
//             d3.selectAll('.circle')
//                 .style('opacity', circleOpacityOnLineHover);
//             d3.select(this)
//                 .style('opacity', lineOpacityHover)
//                 .style("stroke-width", lineStrokeHover)
//                 .style("cursor", "pointer");
//         })
//         .on("mouseout", function (d) {
//             d3.selectAll(".line")
//                 .style('opacity', lineOpacity);
//             d3.selectAll('.circle')
//                 .style('opacity', circleOpacity);
//             d3.select(this)
//                 .style("stroke-width", lineStroke)
//                 .style("cursor", "none");
//         });


//     /* Add circles in the line */
//     lines.selectAll("circle-group")
//         .data(data).enter()
//         .append("g")
//         .style("fill", (d, i) => color(i))
//         .selectAll("circle")
//         .data(d => d.values).enter()
//         .append("g")
//         .attr("class", "circle")
//         .on("mouseover", function (d) {
//             d3.select(this)
//                 .style("cursor", "pointer")
//                 .append("text")
//                 .attr("class", "text")
//                 .text(`${d.price}`)
//                 .attr("x", d => xScale(d.date) + 5)
//                 .attr("y", d => yScale(d.price) - 10);
//         })
//         .on("mouseout", function (d) {
//             d3.select(this)
//                 .style("cursor", "none")
//                 .transition()
//                 .duration(duration)
//                 .selectAll(".text").remove();
//         })
//         .append("circle")
//         .attr("cx", d => xScale(d.date))
//         .attr("cy", d => yScale(d.price))
//         .attr("r", circleRadius)
//         .style('opacity', circleOpacity)
//         .on("mouseover", function (d) {
//             d3.select(this)
//                 .transition()
//                 .duration(duration)
//                 .attr("r", circleRadiusHover);
//         })
//         .on("mouseout", function (d) {
//             d3.select(this)
//                 .transition()
//                 .duration(duration)
//                 .attr("r", circleRadius);
//         });


//     /* Add Axis into SVG */
//     var xAxis = d3.axisBottom(xScale).ticks(5);
//     var yAxis = d3.axisLeft(yScale).ticks(5);

//     svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", `translate(0, ${height-margin})`)
//         .call(xAxis);

//     svg.append("g")
//         .attr("class", "y axis")
//         .call(yAxis)
//         .append('text')
//         .attr("y", 15)
//         .attr("transform", "rotate(-90)")
//         .attr("fill", "#000")
//         .text("Total values");
// }

function createImgDiv(id, isFirst, ismc, name, kind) {
    let div = document.createElement('div');
    if (isFirst == true) {
        div.className = 'carousel-item active';
    } else {
        div.className = 'carousel-item';
    }
    let img = document.createElement('img');
    img.className = 'd-block w-100';
    // img.height = '300px';
    img.style.height = '300px';
    img.src = urlImg + kind + '/' + id + '/' + ismc + '/' + name;
    div.appendChild(img);
    imgSlider.appendChild(div);
}

function addMarker(e) {
    showPanel();
    showPanelUpdate();
    var newMarker = new L.marker(e.latlng).addTo(map);
    // console.log(e.latlng.lat);
    lat = e.latlng.lat;
    lng = e.latlng.lng;

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
let dem_2009 = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:dem_2009',
    Version: '1.1.1',
    Transparent: true,
    SRS: 'EPSG:900913',
    maxZoom: 21
})
let dem_2019 = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:dem_2019',
    Version: '1.1.1',
    Transparent: true,
    SRS: 'EPSG:900913',
    maxZoom: 21
})
let quy_hoach_khai_thac_cat_th = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:quy_hoach_khai_thac_cat_th',
    Version: '1.1.1',
    Transparent: true,
    SRS: 'EPSG:900913',
    maxZoom: 21
})
let dieu_chinh_quy_hoach_th = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:dieu_chinh_quy_hoach_th',
    Version: '1.1.1',
    Transparent: true,
    SRS: 'EPSG:900913',
    maxZoom: 21
})
let du_bao_long_dan_2030 = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:du_bao_long_dan_2030',
    Version: '1.1.1',
    Transparent: true,
    SRS: 'EPSG:900913',
    maxZoom: 21
})
let du_bao_long_dan_2050 = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:du_bao_long_dan_2025',
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
    toggleLayer(arrSatLo, map, this.checked);
});
$("#diemmatcatmoi").on('change', function() {
    toggleLayer(u_diem_mc_moi, map, this.checked);
});
$("#diemsatlo").on('change', function() {
    toggleLayer(u_diem_sat_lo, map, this.checked);
});
$("#doansatlo").on('change', function() {
    toggleLayer(arrDoanSL, map, this.checked);
});
$("#tramdothuyvan").on('change', function() {
    toggleLayer(u_tram_do_thuy_van, map, this.checked);
});
$("#dem_2009").on('change', function() {
    toggleLayer(dem_2009, map, this.checked);
});
$("#dem_2019").on('change', function() {
    toggleLayer(dem_2019, map, this.checked);
});
$("#quy_hoach_khai_thac_cat_th").on('change', function() {
    toggleLayer(quy_hoach_khai_thac_cat_th, map, this.checked);
});
$("#dieu_chinh_quy_hoach_th").on('change', function() {
    toggleLayer(dieu_chinh_quy_hoach_th, map, this.checked);
});
$("#du_bao_long_dan_2030").on('change', function() {
    toggleLayer(du_bao_long_dan_2030, map, this.checked);
});
$("#du_bao_long_dan_2025").on('change', function() {
    toggleLayer(du_bao_long_dan_2050, map, this.checked);
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
searchControl.on("results", function (data) {
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
    }
});
let self = this;
map.on('pm:create', function (e) {
    console.log(e.layer.getLatLngs());
    let latlng = '';
    let url = api + 'api/get-matcat'
    var bodyFormData = new FormData();
    let coordinates = e.layer.getLatLngs();
    for (let i = 0; i < coordinates.length; i++) {
        if (i == coordinates.length - 1) {
            latlng += coordinates[i].lng + ' ' + coordinates[i].lat;
        } else {
            latlng += coordinates[i].lng + ' ' + coordinates[i].lat + ',';
        }

    }
    latlngmc = latlng;
    bodyFormData.set('linestring', latlngmc);
    axios({
            method: 'post',
            url: urlKS,
            data: bodyFormData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(function (response) {
            //handle success
            alert('Cập nhật điểm thành công');
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    // axios({
    //         method: 'post',
    //         url: url,
    //         data: bodyFormData,
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })
    //     .then(function (response) {
    //         //handle success
    //         alert('Biểu đồ mặt cắt được cập nhật');
    //         coormc = JSON.parse(response.data[0].st_asgeojson).coordinates;
    //         el.clear();

    //         geojson = {
    //             "name": "NewFeatureType",
    //             "type": "FeatureCollection",
    //             "features": [{
    //                 "type": "Feature",
    //                 "geometry": {
    //                     "type": "LineString",
    //                     "coordinates": coormc
    //                 },
    //                 "properties": null
    //             }]
    //         };
    //         el.addData(geojson);
    //         var gjl = L.geoJson(geojson, {
    //             onEachFeature: el.addData.bind(el)
    //         }).addTo(map);



    //     })
    //     .catch(function (response) {
    //         //handle error
    //         console.log(response);
    //     });


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

// var el = L.control.elevation();
// el.addTo(map);
