!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=2)}({2:function(e,t,n){e.exports=n("Dbiy")},Dbiy:function(e,t){var n=L.map("map").setView([10.6079209,105.1175397],11);$((function(){$('[data-toggle="tooltip"]').tooltip()}));var a=document.getElementById("close-btn"),o=document.getElementById("close-chart-btn"),i=document.getElementById("panel"),r=document.getElementById("panel-update"),s=document.getElementById("close-legend-btn"),l=document.getElementById("btn-legend"),c=document.getElementById("legend-panel"),d=document.getElementById("show-btn"),m=document.getElementById("accept-new-info"),u=document.getElementById("panel-title"),p=document.getElementById("layer-content"),h=document.getElementById("info-content"),g=(document.getElementById("input-name"),document.getElementById("input-name-show")),y=(document.getElementById("input-info"),document.getElementById("input-info-show")),f=document.getElementById("input-doan-show"),v=document.getElementById("input-stt-show"),x=document.getElementById("input-mota-show"),E=document.getElementById("input-diadiem-show"),w=document.getElementById("input-chieudai-show"),T=document.getElementById("input-kcnguyhiem-show"),S=document.getElementById("input-kcnantoan-show"),b=document.getElementById("input-tocdo-show"),k=document.getElementById("input-mucdo-show"),_=document.getElementById("img-slider"),I=document.getElementById("close-update-btn"),B=document.getElementById("container-img"),A=document.getElementById("swiper-container"),M=document.getElementById("container-chart"),C=document.getElementById("container-imgmc"),F=document.getElementById("selectKindMarker"),G=document.getElementById("btn-upload-shp-file"),P=document.getElementById("title-update"),R=document.getElementById("container-update-btn"),N=document.getElementById("container-info-insert"),V=document.getElementById("form-marker"),H=document.getElementById("form-doansl"),q=document.getElementById("year-matcat"),Z="https://satlo-angiang.online/",O="https://satlo-angiang.online:8443/",z=0,j=0,J=8,D="",W="https://satlo-angiang.online:8443/geoserver/angiang/wms",K="/storage/uploadedimages/",Y=L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",{maxZoom:21,subdomains:["mt0","mt1","mt2","mt3"]}).addTo(n),U=L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",{maxZoom:21,id:"mapbox.streets"}),X=L.control({position:"bottomleft"});X.onAdd=function(e){var t=L.DomUtil.create("div");return t.innerHTML='\n  <div value="basemap" id="switchwrapper" class="switchwrapper">\n  <figure id="googlepic" class="item-wrapper" style="display: none;">\n  <figcaption class="item-title">\n  <span class="item-text">Vệ tinh</span></figcaption>\n  <img class="item-img" src="/images/earth-layer.png" alt="Bản đồ" title="Satellite">\n  </figure>\n  <figure id="basepic" class="item-wrapper" >\n  <figcaption class="item-title">\n  <span class="item-text">Bản đồ</span></figcaption>\n  <img class="item-img" src="/images/base-layer.png" alt="Mapbox" title="Base map">\n  </figure>\n  </div>',t},X.addTo(n),document.getElementById("googlepic").addEventListener("click",(function(e){n.removeLayer(U),n.addLayer(Y),Y.setZIndex(-1),document.getElementById("switchwrapper").setAttribute("value","googlemap"),document.getElementById("googlepic").style.display="none",document.getElementById("basepic").style.display="block";for(var t=document.getElementsByClassName("buttonText"),a=0;a<t.length;a++)t[a].style.color="#ffff"})),document.getElementById("basepic").addEventListener("click",(function(e){n.removeLayer(Y),n.addLayer(U),U.setZIndex(-1),document.getElementById("switchwrapper").setAttribute("value","basemap"),document.getElementById("googlepic").style.display="block",document.getElementById("basepic").style.display="none";for(var t=document.getElementsByClassName("buttonText"),a=0;a<t.length;a++)t[a].style.color="#000000"}));var Q=[],ee=[],te=L.layerGroup(),ne=L.layerGroup();ee=L.layerGroup();var ae=new L.icon({iconUrl:"/images/icon-red.png",iconSize:[30,35],iconAnchor:[15,40],popupAnchor:[0,-40]});new Swiper(".swiper-container",{direction:"vertical",loop:!0,pagination:{el:".swiper-pagination"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},scrollbar:{el:".swiper-scrollbar"}});F.addEventListener("change",(function(){N.classList.remove("hidden"),"diemks"==F.value?(C.classList.add("hidden"),B.classList.remove("hidden")):(B.classList.add("hidden"),C.classList.remove("hidden"))})),a.addEventListener("click",re.bind(this)),o.addEventListener("click",re.bind(this)),I.addEventListener("click",function(){r.style.right="-450px"}.bind(this)),d.addEventListener("click",se.bind(this)),m.addEventListener("click",function(){var e=new FormData,t=(document.getElementById("selectKindMarker"),document.getElementById("input-name")),n=document.getElementById("input-info"),a=document.getElementById("input-images"),o=document.getElementById("input-images-mc"),i=j+" "+z,r=Z+"api/insert-data-diemks",s=Z+"api/insert-data-diemsl";if(null==t.value||null==n.value)alert("Vui lòng điền đầy đủ thông tin");else if(e.set("name",t.value),e.set("info",n.value),e.set("xy",i),"diemks"==F.value){for(var l=0;l<a.files.length;l++)e.append("photos[]",a.files[l]);axios({method:"post",url:r,data:e,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){alert("Cập nhật điểm thành công"),console.log(e)})).catch((function(e){console.log(e)}))}else{for(var c=0;c<o.files.length;c++)e.append("excelmc",o.files[c]);axios({method:"post",url:s,data:e,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){alert("Cập nhật điểm thành công"),console.log(e)})).catch((function(e){console.log(e)}))}}.bind(this)),G.addEventListener("click",function(){var e=Z+"api/upload-shapefile",t=new FormData,n=document.getElementById("inputGroupSelectNameShp"),a=document.getElementById("inputShp");t.set("tablename",n.value),t.append("shpFile",a.files[0]),axios({method:"post",url:e,data:t,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){alert("Cập nhật dữ liệu thành công"),console.log(e)})).catch((function(e){alert("Có lỗi xảy ra trong quá trình cập nhật"),console.log(e)}))}.bind(this)),l.addEventListener("click",function(){c.style.right="10px"}.bind(this)),s.addEventListener("click",function(){c.style.right="-450px"}.bind(this));var oe,ie=document.getElementsByClassName("caret");for(oe=0;oe<ie.length;oe++)ie[oe].addEventListener("click",(function(){this.parentElement.querySelector(".nested").classList.toggle("active"),this.classList.toggle("caret-down")}));function re(){i.style.right="-450px",d.classList.remove("hidden"),A.classList.add("hidden"),M.classList.add("hidden")}function se(){i.style.right="10px",u.innerHTML="Các lớp layer",d.classList.add("hidden"),h.classList.add("hidden"),p.classList.remove("hidden")}function le(e,t){t.on("click",(function(t){se(),M.classList.add("hidden");var n=Z+"api/update-data-diemks";console.log(e.properties);var a=e.properties.Id;u.innerHTML="Thông tin điểm khảo sát",V.classList.remove("hidden"),H.classList.add("hidden"),p.classList.add("hidden"),h.classList.remove("hidden"),_.innerHTML="",g.value=e.properties.Name,y.value=e.properties.Info,P.innerHTML="Chọn ảnh",null==e.properties.Photos?A.classList.add("hidden"):A.classList.remove("hidden");var o=[];null!=e.properties.Photos&&(o=JSON.parse(e.properties.Photos).img);var i=document.createElement("button");i.innerHTML="Cập nhật",i.className="btn btn-primary",i.addEventListener("click",(function(){console.log(a);var e=new FormData,t=document.getElementById("input-name-show"),o=document.getElementById("input-info-show"),i=document.getElementById("input-file-show");e.set("name",t.value),e.set("info",o.value),e.set("id",a);for(var r=0;r<i.files.length;r++)e.append("photos[]",i.files[r]);axios({method:"post",url:n,data:e,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){alert("Cập nhật dữ liệu thành công"),i.value="",console.log(e)})).catch((function(e){alert("Có lỗi xảy ra trong quá trình cập nhật"),console.log(e)}))})),R.innerHTML="",R.appendChild(i);for(var r=0;r<o.length;r++)me(a,0==r,"img",o[r],"diemanhks")}))}function ce(e,t){t.on("click",(function(t){se(),A.classList.add("hidden");var n=Z+"api/update-data-diemsl",a=Z+"api/get-matcat-by-pointid/";console.log(e.properties);var o=e.properties.Id;u.innerHTML="Thông tin điểm khảo sát",V.classList.remove("hidden"),H.classList.add("hidden"),p.classList.add("hidden"),h.classList.remove("hidden"),_.innerHTML="",g.value=e.properties.Name,y.value=e.properties.Info,P.innerHTML="Chọn file excel",q.innerHTML="",axios({method:"get",url:a+o,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){console.log(e.data),e.data.length<1?M.classList.add("hidden"):M.classList.remove("hidden"),function(e){document.getElementById("chart").innerHTML="";var t=e.data,n=800,a=300;window.matchMedia("(max-width: 321px)").matches?(n=250,a=180):window.matchMedia("(max-width: 376px)").matches?(n=300,a=180):window.matchMedia("(max-width: 415px)").matches?(n=300,a=180):window.matchMedia("(max-width: 425px)").matches?(n=350,a=200):window.matchMedia("(max-width: 1600px)").matches?(n=400,a=200):(n=800,a=300);var o=0,i=0;t.forEach((function(e){e.values.forEach((function(e){o=e.khoangcach>o?e.khoangcach:o,i=e.dosau<i?e.dosau:i}))}));var r=d3.scaleLinear().domain([0,o]).range([0,n-50]),s=d3.scaleLinear().domain([i,0]).range([a-50,0]),l=d3.scaleOrdinal(d3.schemeCategory10),c=d3.select("#chart").append("svg").attr("width",n+50+"px").attr("height",a+50+"px").append("g").attr("transform","translate(".concat(50,", ").concat(50,")")),d=d3.line().x((function(e){return r(e.khoangcach)})).y((function(e){return s(e.dosau)})),m=c.append("g").attr("class","lines");m.selectAll(".line-group").data(t).enter().append("g").attr("class","line-group").on("mouseover",(function(e,t){c.append("text").attr("class","title-text").style("fill",l(t)).text(e.thoigian).attr("text-anchor","middle").attr("x",(n-50)/2).attr("y",5)})).on("mouseout",(function(e){c.select(".title-text").remove()})).append("path").attr("class","line").attr("d",(function(e){return d(e.values)})).style("stroke",(function(e,t){return l(t)})).style("opacity","0.25").on("mouseover",(function(e){d3.selectAll(".line").style("opacity","0.1"),d3.selectAll(".circle").style("opacity","0.25"),d3.select(this).style("opacity","0.85").style("stroke-width","2.5px").style("cursor","pointer")})).on("mouseout",(function(e){d3.selectAll(".line").style("opacity","0.25"),d3.selectAll(".circle").style("opacity","0.85"),d3.select(this).style("stroke-width","1.5px").style("cursor","none")})),m.selectAll("circle-group").data(t).enter().append("g").style("fill",(function(e,t){return l(t)})).selectAll("circle").data((function(e){return e.values})).enter().append("g").attr("class","circle").on("mouseover",(function(e){d3.select(this).style("cursor","pointer").append("text").attr("class","text").text("".concat(e.dosau)).attr("x",(function(e){return r(e.khoangcach)+5})).attr("y",(function(e){return s(e.dosau)-10}))})).on("mouseout",(function(e){d3.select(this).style("cursor","none").transition().duration(250).selectAll(".text").remove()})).append("circle").attr("cx",(function(e){return r(e.khoangcach)})).attr("cy",(function(e){return s(e.dosau)})).attr("r",3).style("opacity","0.85").on("mouseover",(function(e){d3.select(this).transition().duration(250).attr("r",6)})).on("mouseout",(function(e){d3.select(this).transition().duration(250).attr("r",3)}));var u=d3.axisBottom(r).ticks(10),p=d3.axisLeft(s).ticks(10);c.append("g").attr("class","x axis").attr("transform","translate(0, ".concat(a-50,")")).call(u).append("text").attr("transform","translate("+n/2+" ,40)").style("text-anchor","middle").attr("fill","#000").html("Khoảng cách (m)"),c.append("g").attr("class","y axis").call(p).append("text").attr("transform","rotate(-90)").attr("y",-50).attr("x",0-a/2).attr("dy","1em").style("text-anchor","middle").attr("fill","#000").html("Độ sâu (m)")}(e)})).catch((function(e){console.log(e)}));var i=document.createElement("button");i.innerHTML="Cập nhật",i.className="btn btn-primary",i.addEventListener("click",(function(){console.log(o);var e=new FormData,t=document.getElementById("input-name-show"),a=document.getElementById("input-info-show"),i=document.getElementById("input-file-show");e.set("name",t.value),e.set("info",a.value),e.set("id",o);for(var r=0;r<i.files.length;r++)e.append("excelmc",i.files[r]);axios({method:"post",url:n,data:e,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){i.value="",alert("Cập nhật dữ liệu thành công"),console.log(i)})).catch((function(e){alert("Có lỗi xảy ra trong quá trình cập nhật"),console.log(e)}))})),R.innerHTML="",R.appendChild(i)}))}function de(e,t){"Rất nguy hiểm"==e.properties.Mucdo?t.setStyle({color:"#ff3c00",weight:5}):"Nguy hiểm"==e.properties.Mucdo?t.setStyle({color:"#ffbf00",weight:5}):t.setStyle({color:"#ff7b00",weight:5}),t.on("mouseover",(function(e){this.setStyle({weight:J})})),t.on("mouseout",(function(e){this.setStyle({weight:5})})),t.on("click",(function(t){se(),M.classList.add("hidden");var n=Z+"api/update-data-doansl";console.log(e.properties);var a=e.properties.Id;u.innerHTML="Thông tin điểm khảo sát",V.classList.add("hidden"),H.classList.remove("hidden"),p.classList.add("hidden"),h.classList.remove("hidden"),_.innerHTML="",f.value=e.properties.Name,x.value=e.properties.Info,E.value=e.properties.Diadiem,w.value=e.properties.Chieudai,T.value=e.properties.Kcnguyhiem,S.value=e.properties.Kcantoan,b.value=e.properties.Tocdo,v.value=e.properties.Stt,k.value=e.properties.Mucdo,P.innerHTML="Chọn ảnh",null==e.properties.Photos?A.classList.add("hidden"):A.classList.remove("hidden");var o=[];null!=e.properties.Photos&&(o=JSON.parse(e.properties.Photos).img);var i=document.createElement("button");i.innerHTML="Cập nhật",i.className="btn btn-primary",i.addEventListener("click",(function(){console.log(a);var e=new FormData,t=(document.getElementById("input-name-show"),document.getElementById("input-info-show"),document.getElementById("input-file-doan-show"));if(e.set("tendoan",f.value),e.set("mota",x.value),e.set("stt",v.value),e.set("diadiem",E.value),e.set("chieudai",w.value),e.set("kc_nguyhiem",T.value),e.set("kc_antoan",S.value),e.set("tocdo",b.value),e.set("mucdo",k.value),e.set("id",a),0!=t.files.length)for(var o=0;o<t.files.length;o++)e.append("photos[]",t.files[o]);axios({method:"post",url:n,data:e,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){t.value="",alert("Cập nhật dữ liệu thành công"),console.log(e)})).catch((function(e){alert("Có lỗi xảy ra trong quá trình cập nhật"),console.log(e)}))})),R.innerHTML="",R.appendChild(i);for(var r=0;r<o.length;r++)me(a,0==r,"img",o[r],"doansl")}))}function me(e,t,n,a,o){var i=document.createElement("div");i.className=1==t?"carousel-item active":"carousel-item";var r=document.createElement("img");r.className="d-block w-100",r.style.height="300px",r.src=K+o+"/"+e+"/"+n+"/"+a,i.appendChild(r),_.appendChild(i)}axios({method:"get",url:Z+"api/get-all-data"}).then((function(e){var t=e.data.diemanhks,a=e.data.diemsl,o=e.data.doansl;console.log(e.data),Q=[];for(var i=[],r=[],s=0;s<o.length;s++)i.push({type:"Feature",geometry:{type:JSON.parse(o[s].st_asgeojson).type,coordinates:JSON.parse(o[s].st_asgeojson).coordinates},properties:{Name:o[s].tendoan,Info:o[s].mota,Stt:o[s].stt,Diadiem:o[s].diadiem,Chieudai:o[s].chieudai,Kcnguyhiem:o[s].kc_nguyhiem,Kcantoan:o[s].kc_antoan,Tocdo:o[s].tocdo,Mucdo:o[s].mucdo,Id:o[s].gid,Photos:o[s].photos}});for(s=0;s<i.length;s++){var l=L.geoJson(i[s],{onEachFeature:de.bind(this)});ne.addLayer(l)}for(s=0;s<a.length;s++)r.push({type:"Feature",geometry:{type:JSON.parse(a[s].st_asgeojson).type,coordinates:JSON.parse(a[s].st_asgeojson).coordinates},properties:{Name:a[s].name,Info:a[s].info,Id:a[s].gid,Photos:a[s].photos}});for(s=0;s<r.length;s++){var c=L.geoJson(r[s],{pointToLayer:function(e,t){return L.marker(t,{icon:ae})},onEachFeature:ce.bind(this)});te.addLayer(c)}for(s=0;s<t.length;s++)Q.push({type:"Feature",geometry:{type:JSON.parse(t[s].st_asgeojson).type,coordinates:JSON.parse(t[s].st_asgeojson).coordinates},properties:{Name:t[s].name,Info:t[s].info,Id:t[s].gid,Photos:t[s].photos}});for(s=0;s<Q.length;s++){var d=L.geoJson(Q[s],{onEachFeature:le.bind(this)});ee.addLayer(d)}te.addTo(n),ne.addTo(n)}));var ue=L.tileLayer.wms(W,{Format:"image/png",Layers:"angiang:dangsau_2009_line",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),pe=L.tileLayer(O+"geoserver/gwc/service/wmts?layer=angiang%3Adiemdosau_2019_point&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),he=L.tileLayer(O+"geoserver/gwc/service/wmts?layer=angiang%3Adiemdosau_2009_point&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),ge=L.tileLayer(O+"geoserver/gwc/service/wmts?layer=angiang%3Asatlo_mohinhthuyluc_line&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),ye=L.tileLayer(O+"geoserver/gwc/service/wmts?layer=angiang%3Asatlo_truottongthe_line&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),fe=L.tileLayer(O+"geoserver/gwc/service/wmts?layer=angiang%3Asatloduongbo_gis_line&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),ve=L.tileLayer.wms(W,{Format:"image/png",Layers:"angiang:u_diem_mc_moi",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),Le=(L.tileLayer.wms(W,{Format:"image/png",Layers:"angiang:u_anh",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),L.tileLayer.wms(W,{Format:"image/png",Layers:"angiang:u_diem_sat_lo",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21})),xe=(L.tileLayer.wms(W,{Format:"image/png",Layers:"angiang:doan_sat_lo",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),L.tileLayer.wms(W,{Format:"image/png",Layers:"angiang:u_tram_do_thuy_van",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21})),Ee=L.tileLayer(O+"geoserver/gwc/service/wmts?layer=angiang%3Adem_2009&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),we=L.tileLayer(O+"geoserver/gwc/service/wmts?layer=angiang%3Adem_2019&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),Te=L.tileLayer.wms(W,{Format:"image/png",Layers:"angiang:quy_hoach_khai_thac_cat_th",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),Se=L.tileLayer.wms(W,{Format:"image/png",Layers:"angiang:duongbinhdo_dangsau2019",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}).addTo(n),be=L.tileLayer.wms(W,{Format:"image/png",Layers:"angiang:duongbinhdo_dangsau2009",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),ke=L.tileLayer.wms(W,{Format:"image/png",Layers:"angiang:vanhdai_antoan",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),_e=L.tileLayer.wms(W,{Format:"image/png",Layers:"angiang:ranh_nguyhiem",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),Ie=L.tileLayer.wms(W,{Format:"image/png",Layers:"angiang:dieu_chinh_quy_hoach_th",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),Be=L.tileLayer(O+"geoserver/gwc/service/wmts?layer=angiang%3Adu_bao_long_dan_2030&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),Ae=(L.tileLayer(O+"geoserver/gwc/service/wmts?layer=angiang%3Adu_bao_long_dan_2025&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),L.tileLayer.wms(W,{Format:"image/png",Layers:"angiang:thuadat",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21})),Me={minZoom:10,maxZoom:16,opacity:1,attribution:'Rendered with <a href="http://www.maptiler.com/">MapTiler Desktop</a>',tms:!1},Ce=L.tileLayer("/storage/bandobosungvadieuchinh/{z}/{x}/{y}.png",Me),Fe=L.tileLayer("/storage/bandophantich/{z}/{x}/{y}.png",Me),Ge=L.tileLayer("/storage/bandotheoketqua/{z}/{x}/{y}.png",Me);function Pe(e,t,n){1==n?(n=$(this).is(":checked"),t.addLayer(e)):(n=$(this).is(":checked"),t.removeLayer(e))}$("#rungngapman").on("change",(function(){Pe(ee,n,this.checked)})),$("#bandobosung").on("change",(function(){Pe(Ce,n,this.checked)})),$("#bandoketqua").on("change",(function(){Pe(Ge,n,this.checked)})),$("#bandophantich").on("change",(function(){Pe(Fe,n,this.checked)})),$("#2009line").on("change",(function(){Pe(ue,n,this.checked)})),$("#diemdosau20019").on("change",(function(){Pe(pe,n,this.checked)})),$("#satlomohinhthuyluch").on("change",(function(){Pe(ge,n,this.checked)})),$("#diemdosau").on("change",(function(){Pe(he,n,this.checked)})),$("#satlotruottongthe").on("change",(function(){Pe(ye,n,this.checked)})),$("#satloduongbo").on("change",(function(){Pe(fe,n,this.checked)})),$("#diemanh").on("change",(function(){Pe(te,n,this.checked)})),$("#diemmatcatmoi").on("change",(function(){Pe(ve,n,this.checked)})),$("#diemsatlo").on("change",(function(){Pe(Le,n,this.checked)})),$("#doansatlo").on("change",(function(){Pe(ne,n,this.checked)})),$("#tramdothuyvan").on("change",(function(){Pe(xe,n,this.checked)})),$("#dem_2009").on("change",(function(){Pe(Ee,n,this.checked)})),$("#dem_2019").on("change",(function(){Pe(we,n,this.checked)})),$("#quy_hoach_khai_thac_cat_th").on("change",(function(){Pe(Te,n,this.checked)})),$("#duongbinhdo_dangsau2019").on("change",(function(){Pe(Se,n,this.checked)})),$("#duongbinhdo_dangsau2009").on("change",(function(){Pe(be,n,this.checked)})),$("#ranh_nguyhiem").on("change",(function(){Pe(_e,n,this.checked)})),$("#vanhdai_antoan").on("change",(function(){Pe(ke,n,this.checked)})),$("#dieu_chinh_quy_hoach_th").on("change",(function(){Pe(Ie,n,this.checked)})),$("#du_bao_long_dan_2030").on("change",(function(){Pe(Be,n,this.checked)})),$("#du_bao_long_dan_2025").on("change",(function(){Pe(du_bao_long_dan_2050,n,this.checked)})),$("#thuadat").on("change",(function(){Pe(Ae,n,this.checked)})),n.addControl(new L.Control.Fullscreen);L.control.ruler({lengthUnit:{factor:1e3,display:"m",decimal:2,label:"Khoảng cách"}}).addTo(n),L.control.locate().addTo(n),n.pm.addControls({position:"topleft",drawCircle:!1});var Re=L.esri.Geocoding.geosearch().addTo(n),$e=2009,Ne=document.getElementsByClassName("leaflet-pm-icon-polyline")[0],Ve=document.getElementById("btn-mc-2009"),He=document.getElementById("btn-mc-2019");Ve.addEventListener("click",(function(){Ne.click(),$e=2009,q.innerHTML="2009"})),He.addEventListener("click",(function(){Ne.click(),$e=2019,console.log(q),q.innerHTML="2019"}));var qe=L.layerGroup().addTo(n);Re.on("results",(function(e){qe.clearLayers();for(var t=e.results.length-1;t>=0;t--)qe.addLayer(L.marker(e.results[t].latlng))}));n.on("pm:create",(function(e){n.removeLayer(e.layer);var t="",a=Z+"api/get-matcat";a=2009==$e?Z+"api/get-matcat/dem2009":Z+"api/get-matcat/dem2019";for(var o=new FormData,i=e.layer.getLatLngs(),r=0;r<i.length;r++)r==i.length-1?t+=i[r].lng+" "+i[r].lat:t+=i[r].lng+" "+i[r].lat+",";D=t,o.set("linestring",D),axios({method:"post",url:a,data:o,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){alert("Biểu đồ mặt cắt được cập nhật"),e.data[0].values.length<1?(M.classList.add("hidden"),alert("Vui lòng vẽ lại mặt cắt")):M.classList.remove("hidden"),function(e){document.getElementById("chart").innerHTML="";var t=e.data,n=window.matchMedia("(max-width: 1600px)"),a=800,o=300;n.matches&&(a=400,o=200);var i=0,r=0;t.forEach((function(e){e.values.forEach((function(e){i=e.x>i?e.x:i,r=e.y<r?e.y:r}))}));var s=d3.scaleLinear().domain([0,i]).range([0,a-50]),l=d3.scaleLinear().domain([r,0]).range([o-50,0]),c=d3.scaleOrdinal(d3.schemeCategory10),d=d3.select("#chart").append("svg").attr("width",a+50+"px").attr("height",o+50+"px").append("g").attr("transform","translate(".concat(50,", ").concat(50,")")),m=d3.line().x((function(e){return s(e.x)})).y((function(e){return l(e.y)})),u=d.append("g").attr("class","lines");u.selectAll(".line-group").data(t).enter().append("g").attr("class","line-group").on("mouseover",(function(e,t){d.append("text").attr("class","title-text").style("fill",c(t)).text(e.dem).attr("text-anchor","middle").attr("x",(a-50)/2).attr("y",5)})).on("mouseout",(function(e){d.select(".title-text").remove()})).append("path").attr("class","line").attr("d",(function(e){return m(e.values)})).style("stroke",(function(e,t){return c(t)})).style("opacity","0.25").on("mouseover",(function(e){d3.selectAll(".line").style("opacity","0.1"),d3.selectAll(".circle").style("opacity","0.25"),d3.select(this).style("opacity","0.85").style("stroke-width","2.5px").style("cursor","pointer")})).on("mouseout",(function(e){d3.selectAll(".line").style("opacity","0.25"),d3.selectAll(".circle").style("opacity","0.85"),d3.select(this).style("stroke-width","1.5px").style("cursor","none")})),u.selectAll("circle-group").data(t).enter().append("g").style("fill",(function(e,t){return c(t)})).selectAll("circle").data((function(e){return e.values})).enter().append("g").attr("class","circle").on("mouseover",(function(e){d3.select(this).style("cursor","pointer").append("text").attr("class","text").text("".concat(e.y)).attr("x",(function(e){return s(e.x)+5})).attr("y",(function(e){return l(e.y)-10}))})).on("mouseout",(function(e){d3.select(this).style("cursor","none").transition().duration(250).selectAll(".text").remove()})).append("circle").attr("cx",(function(e){return s(e.x)})).attr("cy",(function(e){return l(e.y)})).attr("r",3).style("opacity","0.85").on("mouseover",(function(e){d3.select(this).transition().duration(250).attr("r",6)})).on("mouseout",(function(e){d3.select(this).transition().duration(250).attr("r",3)}));var p=d3.axisBottom(s).ticks(10),h=d3.axisLeft(l).ticks(10);d.append("g").attr("class","x axis").attr("transform","translate(0, ".concat(o-50,")")).call(p).append("text").attr("transform","translate("+a/2+" ,40)").style("text-anchor","middle").attr("fill","#000").html("Khoảng cách (m)"),d.append("g").attr("class","y axis").call(h).append("text").attr("transform","rotate(-90)").attr("y",-50).attr("x",0-o/2).attr("dy","1em").style("text-anchor","middle").attr("fill","#000").html("Độ sâu (m)")}(e),console.log(e)})).catch((function(e){console.log(e)}))}))}});