import {
    compile
} from "vue-template-compiler";

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
let inputNameShow = document.getElementById('input-name-show');
let inputInfoShow = document.getElementById('input-info-show');
let imgSlider = document.getElementById('img-slider');
var swiperContainer = document.getElementById('swiper-container');
var chartContainer = document.getElementById('container-chart');
let api = 'http://35.198.222.40/';
let apiGeo = 'http://35.198.222.40:8080/';
let lat = 0;
let lng = 0;

let latlngmc = '';
var weightLineHover = 8;
let coormc;

let markerGot = [];
let markerGotSL = [];
let arrMarkers = [];
let arrSatLo = L.layerGroup();
let arrDoanSL = L.layerGroup();
// let arrMarkersKhaoSat = [];
arrMarkers = L.layerGroup();
var ksIcon = new L.icon({
    iconUrl: '/images/icon-red.png',
    iconSize: [30, 35],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
});
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
var checkmap = L.control({
    position: 'bottomleft'
});
checkmap.onAdd = function (e) {
    var div = L.DomUtil.create('div');
    div.innerHTML = `
  <div value="basemap" id="switchwrapper" class="switchwrapper">
  <figure id="googlepic" class="item-wrapper">
  <figcaption class="item-title">
  <span class="item-text">Vệ tinh</span></figcaption>
  <img class="item-img" src="/images/earth-layer.png" alt="Bản đồ" title="Satellite">
  </figure>
  <figure id="basepic" class="item-wrapper" style="display: none;">
  <figcaption class="item-title">
  <span class="item-text">Bản đồ</span></figcaption>
  <img class="item-img" src="/images/base-layer.png" alt="Mapbox" title="Base map">
  </figure>
  </div>`;
    return div;
};
checkmap.addTo(map);
// map.addLayer(googleSat);
// map.addLayer(basemap);


document.getElementById('googlepic').addEventListener('click', function (e) {
    map.removeLayer(basemap);
    map.addLayer(googleSat);
    googleSat.bringToBack();
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
    basemap.bringToBack();
    document.getElementById("switchwrapper").setAttribute("value", "basemap");
    document.getElementById('googlepic').style.display = "block";
    document.getElementById('basepic').style.display = "none";
    var buttonText = document.getElementsByClassName("buttonText");
    for (var i = 0; i < buttonText.length; i++) {
        buttonText[i].style.color = "#000000";
    }
});

btnClose.addEventListener('click', closePanel.bind(this));
btnOpen.addEventListener('click', showPanel.bind(this));
// btnSubmit.addEventListener('click', acceptEditInfo.bind(this));

function closePanel() {
    panel.style.right = '-450px';
    btnOpen.classList.remove('hidden');
    swiperContainer.classList.add('hidden');
    chartContainer.classList.add('hidden');
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
                    // pointToLayer: function (feature, latlng) {
                    //     return L.marker(latlng, {
                    //         icon: ksIcon
                    //     });
                    // },
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


function clickMarker(feature, layer) {
    layer.on('click', function (e) {
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


function clickMarkerKS(feature, layer) {
    layer.on('click', function (e) {
        showPanel();
        // swiperContainer.classList.re('hidden');
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

        if (feature.properties.Photos == null) {
            swiperContainer.classList.add('hidden');
        } else {
            swiperContainer.classList.remove('hidden');
        }
        let photo = [];
        if (feature.properties.Photos != null) {
            photo = JSON.parse(feature.properties.Photos).img;
        }


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
                createD3Chart(response);
                console.log(response.data);

            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

    })
}

function createD3Chart(response, year) {
    document.getElementById('chart').innerHTML = '';
    var data = response.data;
    if(year == 2009) {
        data = response.data.dem2009;
    }
    var x = window.matchMedia("(max-width: 1600px)");
    var width = 800;
    var height = 300;
    if(x.matches) {
        width = 400;
        height = 200;
    }
    
    // var height = 300;
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
        .domain([maxY, 0])
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
}

function createD3ChartDraw(response) {
    document.getElementById('chart').innerHTML = '';

    var data = response.data;
    var x = window.matchMedia("(max-width: 1600px)");
    var width = 800;
    var height = 300;
    if(x.matches) {
        width = 400;
        height = 200;
    }
    
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
            maxX = (d.x > maxX) ? d.x : maxX;
            maxY = (d.y < maxY) ? d.y : maxY;
        });
    });


    /* Scale */
    var xScale = d3.scaleLinear()
        .domain([0, maxX])
        .range([0, width - margin]);

    var yScale = d3.scaleLinear()
        .domain([maxY, 0])
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
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

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
                .text(d.dem)
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
                .text(`${d.y}`)
                .attr("x", d => xScale(d.x) + 5)
                .attr("y", d => yScale(d.y) - 10);
        })
        .on("mouseout", function (d) {
            d3.select(this)
                .style("cursor", "none")
                .transition()
                .duration(duration)
                .selectAll(".text").remove();
        })
        .append("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
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
}

function clickLineSL(feature, layer) {
    layer.setStyle({
        color: 'blue'
    });
    layer.on('mouseover', function (e) {
        // var popup = e.target.getPopup();
        // popup.setLatLng(e.latlng).openOn(mymap);

        this.setStyle({
            color: 'red',
            weight: weightLineHover,
        });
    });
    layer.on('mouseout', function (e) {
        // var popup = e.target.getPopup();
        // popup.setLatLng(e.latlng).openOn(mymap);

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

        if (feature.properties.Photos == null) {
            swiperContainer.classList.add('hidden');
        } else {
            swiperContainer.classList.remove('hidden');
        }
        let photo = [];
        if (feature.properties.Photos != null) {
            photo = JSON.parse(feature.properties.Photos).img;
        }
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

// video
var videoUrls_2010 = [
    '/images/v_2010.webm',
],
bounds = L.latLngBounds([[ 10.301955638, 104.871579184], [ 10.978093201, 105.978488438]]);
var videoUrls_2013 = [
    '/images/v_2013.webm',
],
bounds = L.latLngBounds([[ 10.301955638, 104.871579184], [ 10.978093201, 105.978488438]]);
var vantocnam2010 = L.videoOverlay(videoUrls_2010, bounds, {
    opacity: 1.0,
    interactive: false,
    autoplay: true
});
var vantocnam2013 = L.videoOverlay(videoUrls_2013, bounds, {
    opacity: 1.0,
    interactive: false,
    autoplay: true
});
// var PauseControl = L.Control.extend({
//     onAdd: function() {
//         var button = L.DomUtil.create('button');
//         button.innerHTML = '⏸';
//         L.DomEvent.on(button, 'click', function () {
//             overlay_2010.getElement().pause();
//         });
//         return button;
//     }
// });
// var PlayControl = L.Control.extend({
//     onAdd: function() {
//         var button = L.DomUtil.create('button');
//         button.innerHTML = '▶️';
//         L.DomEvent.on(button, 'click', function () {
//             overlay_2010.getElement().play();
//         });
//         return button;
//     }
// });

// var pauseControl = (new PauseControl()).addTo(map);
// var playControl = (new PlayControl()).addTo(map);

let dangsau_2009_line = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:dangsau_2009_line',
    Version: '1.1.1',
    Transparent: true,
    SRS: 'EPSG:900913',
    maxZoom: 21
})
let diemdosau_2019_point = L.tileLayer(apiGeo+'geoserver/gwc/service/wmts?layer=angiang%3Adiemdosau_2019_point&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}');

// let diemdosau_2019_point = L.tileLayer.wms(geoserver, {
//     Format: 'image/png',
//     Layers: 'angiang:diemdosau_2019_point',
//     Version: '1.1.1',
//     Transparent: true,
//     SRS: 'EPSG:900913',
//     maxZoom: 21
// })
let diemdosau_2009_point = L.tileLayer(apiGeo+'geoserver/gwc/service/wmts?layer=angiang%3Adiemdosau_2009_point&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}');


// let diemdosau_2009_point = L.tileLayer.wms(geoserver, {
//     Format: 'image/png',
//     Layers: 'angiang:diemdosau_2009_point',
//     Version: '1.1.1',
//     Transparent: true,
//     SRS: 'EPSG:900913',
//     maxZoom: 21
// })

let satlo_mohinhthuyluc_line = L.tileLayer(apiGeo+'geoserver/gwc/service/wmts?layer=angiang%3Asatlo_mohinhthuyluc_line&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}');


// let satlo_mohinhthuyluc_line = L.tileLayer.wms(geoserver, {
//     Format: 'image/png',
//     Layers: 'angiang:satlo_mohinhthuyluc_line',
//     Version: '1.1.1',
//     Transparent: true,
//     SRS: 'EPSG:900913',
//     maxZoom: 21
// })

let satlo_truottongthe_line = L.tileLayer(apiGeo+'geoserver/gwc/service/wmts?layer=angiang%3Asatlo_truottongthe_line&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}');


// let satlo_truottongthe_line = L.tileLayer.wms(geoserver, {
//     Format: 'image/png',
//     Layers: 'angiang:satlo_truottongthe_line',
//     Version: '1.1.1',
//     Transparent: true,
//     SRS: 'EPSG:900913',
//     maxZoom: 21
// })

let satloduongbo_gis_line = L.tileLayer(apiGeo+'geoserver/gwc/service/wmts?layer=angiang%3Asatloduongbo_gis_line&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}');

// let satloduongbo_gis_line = L.tileLayer.wms(geoserver, {
//     Format: 'image/png',
//     Layers: 'angiang:satloduongbo_gis_line',
//     Version: '1.1.1',
//     Transparent: true,
//     SRS: 'EPSG:900913',
//     maxZoom: 21
// })

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

let doan_sat_lo = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:doan_sat_lo',
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

let dem_2009 = L.tileLayer(apiGeo+'geoserver/gwc/service/wmts?layer=angiang%3Adem_2009&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}');


// let dem_2009 = L.tileLayer.wms(geoserver, {
//     Format: 'image/png',
//     Layers: 'angiang:dem_2009',
//     Version: '1.1.1',
//     Transparent: true,
//     SRS: 'EPSG:900913',
//     maxZoom: 21
// })

let dem_2019 = L.tileLayer(apiGeo+'geoserver/gwc/service/wmts?layer=angiang%3Adem_2019&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}');

// let dem_2019 = L.tileLayer.wms(geoserver, {
//     Format: 'image/png',
//     Layers: 'angiang:dem_2019',
//     Version: '1.1.1',
//     Transparent: true,
//     SRS: 'EPSG:900913',
//     maxZoom: 21
// })
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

let du_bao_long_dan_2030 = L.tileLayer(apiGeo+'geoserver/gwc/service/wmts?layer=angiang%3Adu_bao_long_dan_2030&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}');
let du_bao_long_dan_2025 = L.tileLayer(apiGeo+'geoserver/gwc/service/wmts?layer=angiang%3Adu_bao_long_dan_2025&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}');

// let du_bao_long_dan_2030 = L.tileLayer.wms(geoserver, {
//     Format: 'image/png',
//     Layers: 'angiang:du_bao_long_dan_2030',
//     Version: '1.1.1',
//     Transparent: true,
//     SRS: 'EPSG:900913',
//     maxZoom: 21
// })
// let du_bao_long_dan_2025 = L.tileLayer.wms(geoserver, {
//     Format: 'image/png',
//     Layers: 'angiang:du_bao_long_dan_2025',
//     Version: '1.1.1',
//     Transparent: true,
//     SRS: 'EPSG:900913',
//     maxZoom: 21
// })
let thuadat = L.tileLayer.wms(geoserver, {
    Format: 'image/png',
    Layers: 'angiang:thuadat',
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

$("#rungngapman").on('change', function () {
    toggleLayer(arrMarkers, map, this.checked);
});
$("#bandobosung").on('change', function () {
    toggleLayer(bandobosung, map, this.checked);
});
$("#bandoketqua").on('change', function () {
    toggleLayer(bandotheoketqua, map, this.checked);
});
$("#bandophantich").on('change', function () {
    toggleLayer(bandophantich, map, this.checked);
});
$("#2009line").on('change', function () {
    toggleLayer(dangsau_2009_line, map, this.checked);
});
$("#diemdosau20019").on('change', function () {
    toggleLayer(diemdosau_2019_point, map, this.checked);
});
$("#satlomohinhthuyluch").on('change', function () {
    toggleLayer(satlo_mohinhthuyluc_line, map, this.checked);
});
$("#diemdosau").on('change', function () {
    toggleLayer(diemdosau_2009_point, map, this.checked);
});
$("#satlotruottongthe").on('change', function () {
    toggleLayer(satlo_truottongthe_line, map, this.checked);
});
$("#satloduongbo").on('change', function () {
    toggleLayer(satloduongbo_gis_line, map, this.checked);
});
$("#diemanh").on('change', function () {
    toggleLayer(arrSatLo, map, this.checked);
});
$("#diemmatcatmoi").on('change', function () {
    toggleLayer(u_diem_mc_moi, map, this.checked);
});
$("#diemsatlo").on('change', function () {
    toggleLayer(u_diem_sat_lo, map, this.checked);
});
$("#doansatlo").on('change', function () {
    toggleLayer(arrDoanSL, map, this.checked);
});
$("#tramdothuyvan").on('change', function () {
    toggleLayer(u_tram_do_thuy_van, map, this.checked);
});
$("#dem_2009").on('change', function () {
    toggleLayer(dem_2009, map, this.checked);
});
$("#dem_2019").on('change', function () {
    toggleLayer(dem_2019, map, this.checked);
});
$("#quy_hoach_khai_thac_cat_th").on('change', function () {
    toggleLayer(quy_hoach_khai_thac_cat_th, map, this.checked);
});
$("#dieu_chinh_quy_hoach_th").on('change', function () {
    toggleLayer(dieu_chinh_quy_hoach_th, map, this.checked);
});
$("#du_bao_long_dan_2030").on('change', function () {
    toggleLayer(du_bao_long_dan_2030, map, this.checked);
});
$("#du_bao_long_dan_2025").on('change', function () {
    toggleLayer(du_bao_long_dan_2025, map, this.checked);
});
$("#thuadat").on('change', function () {
    toggleLayer(thuadat, map, this.checked);
});
$("#vantocnam2010").on('change', function () {
    toggleLayer(vantocnam2010, map, this.checked);
});
$("#vantocnam2013").on('change', function () {
    toggleLayer(vantocnam2013, map, this.checked);
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
    console.log(latlngmc);
    bodyFormData.set('linestring', latlngmc);
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
            alert('Biểu đồ mặt cắt được cập nhật');
            if (response.data[0].values.length < 1) {
                chartContainer.classList.add('hidden');
                alert('Vui lòng vẽ lại mặt cắt');
            } else {
                chartContainer.classList.remove('hidden');
            }
            createD3ChartDraw(response);
            
            // coormc = JSON.parse(response.data[0].st_asgeojson).coordinates;
            // el.clear();

            // geojson = {
            //     "name": "NewFeatureType",
            //     "type": "FeatureCollection",
            //     "features": [{
            //         "type": "Feature",
            //         "geometry": {
            //             "type": "LineString",
            //             "coordinates": coormc
            //         },
            //         "properties": null
            //     }]
            // };
            // el.addData(geojson);
            // var gjl = L.geoJson(geojson, {
            //     onEachFeature: el.addData.bind(el)
            // }).addTo(map);



        })
        .catch(function (response) {
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

// var el = L.control.elevation();
// el.addTo(map);
