!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=2)}({2:function(e,t,n){e.exports=n("Dbiy")},Dbiy:function(e,t){var n=L.map("map").setView([10.6079209,105.1175397],11),a=document.getElementById("close-btn"),o=document.getElementById("panel"),i=document.getElementById("panel-update"),s=document.getElementById("close-legend-btn"),r=document.getElementById("btn-legend"),l=document.getElementById("legend-panel"),c=document.getElementById("show-btn"),d=document.getElementById("accept-new-info"),m=document.getElementById("panel-title"),u=document.getElementById("layer-content"),g=document.getElementById("info-content"),h=(document.getElementById("input-name"),document.getElementById("input-name-show")),p=(document.getElementById("input-info"),document.getElementById("input-info-show")),y=document.getElementById("input-doan-show"),f=document.getElementById("input-stt-show"),v=document.getElementById("input-mota-show"),E=document.getElementById("input-diadiem-show"),x=document.getElementById("input-chieudai-show"),w=document.getElementById("input-kcnguyhiem-show"),T=document.getElementById("input-kcnantoan-show"),S=document.getElementById("input-tocdo-show"),b=document.getElementById("input-mucdo-show"),_=document.getElementById("img-slider"),k=document.getElementById("close-update-btn"),I=document.getElementById("container-img"),B=document.getElementById("swiper-container"),A=document.getElementById("container-chart"),C=document.getElementById("container-imgmc"),M=document.getElementById("selectKindMarker"),F=document.getElementById("btn-upload-shp-file"),G=document.getElementById("title-update"),P=document.getElementById("container-update-btn"),R=document.getElementById("container-info-insert"),N=document.getElementById("form-marker"),V=document.getElementById("form-doansl"),q="https://satlo-angiang.online/",Z="https://satlo-angiang.online:8443/",H=0,z=0,O=8,j="",J="https://satlo-angiang.online:8443/geoserver/angiang/wms",D="/storage/uploadedimages/",W=L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",{maxZoom:21,subdomains:["mt0","mt1","mt2","mt3"]}).addTo(n),K=L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",{maxZoom:21,id:"mapbox.streets"}),Y=L.control({position:"bottomleft"});Y.onAdd=function(e){var t=L.DomUtil.create("div");return t.innerHTML='\n  <div value="basemap" id="switchwrapper" class="switchwrapper">\n  <figure id="googlepic" class="item-wrapper" style="display: none;">\n  <figcaption class="item-title">\n  <span class="item-text">Vệ tinh</span></figcaption>\n  <img class="item-img" src="/images/earth-layer.png" alt="Bản đồ" title="Satellite">\n  </figure>\n  <figure id="basepic" class="item-wrapper" >\n  <figcaption class="item-title">\n  <span class="item-text">Bản đồ</span></figcaption>\n  <img class="item-img" src="/images/base-layer.png" alt="Mapbox" title="Base map">\n  </figure>\n  </div>',t},Y.addTo(n),document.getElementById("googlepic").addEventListener("click",(function(e){n.removeLayer(K),n.addLayer(W),W.setZIndex(-1),document.getElementById("switchwrapper").setAttribute("value","googlemap"),document.getElementById("googlepic").style.display="none",document.getElementById("basepic").style.display="block";for(var t=document.getElementsByClassName("buttonText"),a=0;a<t.length;a++)t[a].style.color="#ffff"})),document.getElementById("basepic").addEventListener("click",(function(e){n.removeLayer(W),n.addLayer(K),K.setZIndex(-1),document.getElementById("switchwrapper").setAttribute("value","basemap"),document.getElementById("googlepic").style.display="block",document.getElementById("basepic").style.display="none";for(var t=document.getElementsByClassName("buttonText"),a=0;a<t.length;a++)t[a].style.color="#000000"}));var U=[],X=[],Q=L.layerGroup(),ee=L.layerGroup();X=L.layerGroup();var te=new L.icon({iconUrl:"/images/icon-red.png",iconSize:[30,35],iconAnchor:[15,40],popupAnchor:[0,-40]});new Swiper(".swiper-container",{direction:"vertical",loop:!0,pagination:{el:".swiper-pagination"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},scrollbar:{el:".swiper-scrollbar"}});M.addEventListener("change",(function(){R.classList.remove("hidden"),"diemks"==M.value?(C.classList.add("hidden"),I.classList.remove("hidden")):(I.classList.add("hidden"),C.classList.remove("hidden"))})),a.addEventListener("click",function(){o.style.right="-450px",c.classList.remove("hidden"),B.classList.add("hidden"),A.classList.add("hidden")}.bind(this)),k.addEventListener("click",function(){i.style.right="-450px"}.bind(this)),c.addEventListener("click",oe.bind(this)),d.addEventListener("click",function(){var e=new FormData,t=(document.getElementById("selectKindMarker"),document.getElementById("input-name")),n=document.getElementById("input-info"),a=document.getElementById("input-images"),o=document.getElementById("input-images-mc"),i=z+" "+H,s=q+"api/insert-data-diemks",r=q+"api/insert-data-diemsl";if(null==t.value||null==n.value)alert("Vui lòng điền đầy đủ thông tin");else if(e.set("name",t.value),e.set("info",n.value),e.set("xy",i),"diemks"==M.value){for(var l=0;l<a.files.length;l++)e.append("photos[]",a.files[l]);axios({method:"post",url:s,data:e,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){alert("Cập nhật điểm thành công"),console.log(e)})).catch((function(e){console.log(e)}))}else{for(var c=0;c<o.files.length;c++)e.append("excelmc",o.files[c]);axios({method:"post",url:r,data:e,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){alert("Cập nhật điểm thành công"),console.log(e)})).catch((function(e){console.log(e)}))}}.bind(this)),F.addEventListener("click",function(){var e=q+"api/upload-shapefile",t=new FormData,n=document.getElementById("inputGroupSelectNameShp"),a=document.getElementById("inputShp");t.set("tablename",n.value),t.append("shpFile",a.files[0]),axios({method:"post",url:e,data:t,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){alert("Cập nhật dữ liệu thành công"),console.log(e)})).catch((function(e){alert("Có lỗi xảy ra trong quá trình cập nhật"),console.log(e)}))}.bind(this)),r.addEventListener("click",function(){l.style.right="10px"}.bind(this)),s.addEventListener("click",function(){l.style.right="-450px"}.bind(this));var ne,ae=document.getElementsByClassName("caret");for(ne=0;ne<ae.length;ne++)ae[ne].addEventListener("click",(function(){this.parentElement.querySelector(".nested").classList.toggle("active"),this.classList.toggle("caret-down")}));function oe(){o.style.right="10px",m.innerHTML="Các lớp layer",c.classList.add("hidden"),g.classList.add("hidden"),u.classList.remove("hidden")}function ie(e,t){t.on("click",(function(t){oe(),A.classList.add("hidden");var n=q+"api/update-data-diemks";console.log(e.properties);var a=e.properties.Id;m.innerHTML="Thông tin điểm khảo sát",N.classList.remove("hidden"),V.classList.add("hidden"),u.classList.add("hidden"),g.classList.remove("hidden"),_.innerHTML="",h.value=e.properties.Name,p.value=e.properties.Info,G.innerHTML="Chọn ảnh",null==e.properties.Photos?B.classList.add("hidden"):B.classList.remove("hidden");var o=[];null!=e.properties.Photos&&(o=JSON.parse(e.properties.Photos).img);var i=document.createElement("button");i.innerHTML="Cập nhật",i.className="btn btn-primary",i.addEventListener("click",(function(){console.log(a);var e=new FormData,t=document.getElementById("input-name-show"),o=document.getElementById("input-info-show"),i=document.getElementById("input-file-show");e.set("name",t.value),e.set("info",o.value),e.set("id",a);for(var s=0;s<i.files.length;s++)e.append("photos[]",i.files[s]);axios({method:"post",url:n,data:e,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){alert("Cập nhật dữ liệu thành công"),i.value="",console.log(e)})).catch((function(e){alert("Có lỗi xảy ra trong quá trình cập nhật"),console.log(e)}))})),P.innerHTML="",P.appendChild(i);for(var s=0;s<o.length;s++)le(a,0==s,"img",o[s],"diemanhks")}))}function se(e,t){t.on("click",(function(t){oe(),B.classList.add("hidden");var n=q+"api/update-data-diemsl",a=q+"api/get-matcat-by-pointid/";console.log(e.properties);var o=e.properties.Id;m.innerHTML="Thông tin điểm khảo sát",N.classList.remove("hidden"),V.classList.add("hidden"),u.classList.add("hidden"),g.classList.remove("hidden"),_.innerHTML="",h.value=e.properties.Name,p.value=e.properties.Info,G.innerHTML="Chọn file excel",axios({method:"get",url:a+o,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){console.log(e.data),e.data.length<1?A.classList.add("hidden"):A.classList.remove("hidden"),function(e){document.getElementById("chart").innerHTML="";var t=e.data,n=0,a=0;t.forEach((function(e){e.values.forEach((function(e){n=e.khoangcach>n?e.khoangcach:n,a=e.dosau<a?e.dosau:a}))}));var o=d3.scaleLinear().domain([0,n]).range([0,750]),i=d3.scaleLinear().domain([a,0]).range([250,0]),s=d3.scaleOrdinal(d3.schemeCategory10),r=d3.select("#chart").append("svg").attr("width","850px").attr("height","350px").append("g").attr("transform","translate(".concat(50,", ").concat(50,")")),l=d3.line().x((function(e){return o(e.khoangcach)})).y((function(e){return i(e.dosau)})),c=r.append("g").attr("class","lines");c.selectAll(".line-group").data(t).enter().append("g").attr("class","line-group").on("mouseover",(function(e,t){r.append("text").attr("class","title-text").style("fill",s(t)).text(e.thoigian).attr("text-anchor","middle").attr("x",375).attr("y",5)})).on("mouseout",(function(e){r.select(".title-text").remove()})).append("path").attr("class","line").attr("d",(function(e){return l(e.values)})).style("stroke",(function(e,t){return s(t)})).style("opacity","0.25").on("mouseover",(function(e){d3.selectAll(".line").style("opacity","0.1"),d3.selectAll(".circle").style("opacity","0.25"),d3.select(this).style("opacity","0.85").style("stroke-width","2.5px").style("cursor","pointer")})).on("mouseout",(function(e){d3.selectAll(".line").style("opacity","0.25"),d3.selectAll(".circle").style("opacity","0.85"),d3.select(this).style("stroke-width","1.5px").style("cursor","none")})),c.selectAll("circle-group").data(t).enter().append("g").style("fill",(function(e,t){return s(t)})).selectAll("circle").data((function(e){return e.values})).enter().append("g").attr("class","circle").on("mouseover",(function(e){d3.select(this).style("cursor","pointer").append("text").attr("class","text").text("".concat(e.dosau)).attr("x",(function(e){return o(e.khoangcach)+5})).attr("y",(function(e){return i(e.dosau)-10}))})).on("mouseout",(function(e){d3.select(this).style("cursor","none").transition().duration(250).selectAll(".text").remove()})).append("circle").attr("cx",(function(e){return o(e.khoangcach)})).attr("cy",(function(e){return i(e.dosau)})).attr("r",3).style("opacity","0.85").on("mouseover",(function(e){d3.select(this).transition().duration(250).attr("r",6)})).on("mouseout",(function(e){d3.select(this).transition().duration(250).attr("r",3)}));var d=d3.axisBottom(o).ticks(10),m=d3.axisLeft(i).ticks(10);r.append("g").attr("class","x axis").attr("transform","translate(0, ".concat(250,")")).call(d).append("text").attr("transform","translate(400 ,40)").style("text-anchor","middle").attr("fill","#000").html("Khoảng cách (m)"),r.append("g").attr("class","y axis").call(m).append("text").attr("transform","rotate(-90)").attr("y",-50).attr("x",-150).attr("dy","1em").style("text-anchor","middle").attr("fill","#000").html("Độ sâu (m)")}(e)})).catch((function(e){console.log(e)}));var i=document.createElement("button");i.innerHTML="Cập nhật",i.className="btn btn-primary",i.addEventListener("click",(function(){console.log(o);var e=new FormData,t=document.getElementById("input-name-show"),a=document.getElementById("input-info-show"),i=document.getElementById("input-file-show");e.set("name",t.value),e.set("info",a.value),e.set("id",o);for(var s=0;s<i.files.length;s++)e.append("excelmc",i.files[s]);axios({method:"post",url:n,data:e,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){i.value="",alert("Cập nhật dữ liệu thành công"),console.log(i)})).catch((function(e){alert("Có lỗi xảy ra trong quá trình cập nhật"),console.log(e)}))})),P.innerHTML="",P.appendChild(i)}))}function re(e,t){"Rất nguy hiểm"==e.properties.Mucdo?t.setStyle({color:"red"}):"Nguy hiểm"==e.properties.Mucdo?t.setStyle({color:"yellow"}):t.setStyle({color:"blue"}),t.on("mouseover",(function(e){this.setStyle({weight:O})})),t.on("mouseout",(function(e){this.setStyle({weight:3})})),t.on("click",(function(t){oe(),A.classList.add("hidden");var n=q+"api/update-data-doansl";console.log(e.properties);var a=e.properties.Id;m.innerHTML="Thông tin điểm khảo sát",N.classList.add("hidden"),V.classList.remove("hidden"),u.classList.add("hidden"),g.classList.remove("hidden"),_.innerHTML="",y.value=e.properties.Name,v.value=e.properties.Info,E.value=e.properties.Diadiem,x.value=e.properties.Chieudai,w.value=e.properties.Kcnguyhiem,T.value=e.properties.Kcantoan,S.value=e.properties.Tocdo,f.value=e.properties.Stt,b.value=e.properties.Mucdo,G.innerHTML="Chọn ảnh",null==e.properties.Photos?B.classList.add("hidden"):B.classList.remove("hidden");var o=[];null!=e.properties.Photos&&(o=JSON.parse(e.properties.Photos).img);var i=document.createElement("button");i.innerHTML="Cập nhật",i.className="btn btn-primary",i.addEventListener("click",(function(){console.log(a);var e=new FormData,t=(document.getElementById("input-name-show"),document.getElementById("input-info-show"),document.getElementById("input-file-doan-show"));if(e.set("tendoan",y.value),e.set("mota",v.value),e.set("stt",f.value),e.set("diadiem",E.value),e.set("chieudai",x.value),e.set("kc_nguyhiem",w.value),e.set("kc_antoan",T.value),e.set("tocdo",S.value),e.set("mucdo",b.value),e.set("id",a),0!=t.files.length)for(var o=0;o<t.files.length;o++)e.append("photos[]",t.files[o]);axios({method:"post",url:n,data:e,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){t.value="",alert("Cập nhật dữ liệu thành công"),console.log(e)})).catch((function(e){alert("Có lỗi xảy ra trong quá trình cập nhật"),console.log(e)}))})),P.innerHTML="",P.appendChild(i);for(var s=0;s<o.length;s++)le(a,0==s,"img",o[s],"doansl")}))}function le(e,t,n,a,o){var i=document.createElement("div");i.className=1==t?"carousel-item active":"carousel-item";var s=document.createElement("img");s.className="d-block w-100",s.style.height="300px",s.src=D+o+"/"+e+"/"+n+"/"+a,i.appendChild(s),_.appendChild(i)}axios({method:"get",url:q+"api/get-all-data"}).then((function(e){var t=e.data.diemanhks,a=e.data.diemsl,o=e.data.doansl;console.log(e.data),U=[];for(var i=[],s=[],r=0;r<o.length;r++)i.push({type:"Feature",geometry:{type:JSON.parse(o[r].st_asgeojson).type,coordinates:JSON.parse(o[r].st_asgeojson).coordinates},properties:{Name:o[r].tendoan,Info:o[r].mota,Stt:o[r].stt,Diadiem:o[r].diadiem,Chieudai:o[r].chieudai,Kcnguyhiem:o[r].kc_nguyhiem,Kcantoan:o[r].kc_antoan,Tocdo:o[r].tocdo,Mucdo:o[r].mucdo,Id:o[r].gid,Photos:o[r].photos}});for(r=0;r<i.length;r++){var l=L.geoJson(i[r],{onEachFeature:re.bind(this)});ee.addLayer(l)}for(r=0;r<a.length;r++)s.push({type:"Feature",geometry:{type:JSON.parse(a[r].st_asgeojson).type,coordinates:JSON.parse(a[r].st_asgeojson).coordinates},properties:{Name:a[r].name,Info:a[r].info,Id:a[r].gid,Photos:a[r].photos}});for(r=0;r<s.length;r++){var c=L.geoJson(s[r],{pointToLayer:function(e,t){return L.marker(t,{icon:te})},onEachFeature:se.bind(this)});Q.addLayer(c)}for(r=0;r<t.length;r++)U.push({type:"Feature",geometry:{type:JSON.parse(t[r].st_asgeojson).type,coordinates:JSON.parse(t[r].st_asgeojson).coordinates},properties:{Name:t[r].name,Info:t[r].info,Id:t[r].gid,Photos:t[r].photos}});for(r=0;r<U.length;r++){var d=L.geoJson(U[r],{onEachFeature:ie.bind(this)});X.addLayer(d)}Q.addTo(n),ee.addTo(n)}));var ce=L.tileLayer.wms(J,{Format:"image/png",Layers:"angiang:dangsau_2009_line",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),de=L.tileLayer(Z+"geoserver/gwc/service/wmts?layer=angiang%3Adiemdosau_2019_point&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),me=L.tileLayer(Z+"geoserver/gwc/service/wmts?layer=angiang%3Adiemdosau_2009_point&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),ue=L.tileLayer(Z+"geoserver/gwc/service/wmts?layer=angiang%3Asatlo_mohinhthuyluc_line&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),ge=L.tileLayer(Z+"geoserver/gwc/service/wmts?layer=angiang%3Asatlo_truottongthe_line&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),he=L.tileLayer(Z+"geoserver/gwc/service/wmts?layer=angiang%3Asatloduongbo_gis_line&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),pe=L.tileLayer.wms(J,{Format:"image/png",Layers:"angiang:u_diem_mc_moi",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),ye=(L.tileLayer.wms(J,{Format:"image/png",Layers:"angiang:u_anh",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),L.tileLayer.wms(J,{Format:"image/png",Layers:"angiang:u_diem_sat_lo",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21})),fe=(L.tileLayer.wms(J,{Format:"image/png",Layers:"angiang:doan_sat_lo",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),L.tileLayer.wms(J,{Format:"image/png",Layers:"angiang:u_tram_do_thuy_van",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21})),ve=L.tileLayer(Z+"geoserver/gwc/service/wmts?layer=angiang%3Adem_2009&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),Le=L.tileLayer(Z+"geoserver/gwc/service/wmts?layer=angiang%3Adem_2019&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),Ee=L.tileLayer.wms(J,{Format:"image/png",Layers:"angiang:quy_hoach_khai_thac_cat_th",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),xe=L.tileLayer.wms(J,{Format:"image/png",Layers:"angiang:duongbinhdo_dangsau2019",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}).addTo(n),we=L.tileLayer.wms(J,{Format:"image/png",Layers:"angiang:duongbinhdo_dangsau2009",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),Te=L.tileLayer.wms(J,{Format:"image/png",Layers:"angiang:vanhdai_antoan",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),Se=L.tileLayer.wms(J,{Format:"image/png",Layers:"angiang:ranh_nguyhiem",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),be=L.tileLayer.wms(J,{Format:"image/png",Layers:"angiang:dieu_chinh_quy_hoach_th",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),_e=L.tileLayer(Z+"geoserver/gwc/service/wmts?layer=angiang%3Adu_bao_long_dan_2030&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),ke=(L.tileLayer(Z+"geoserver/gwc/service/wmts?layer=angiang%3Adu_bao_long_dan_2025&style=&tilematrixset=EPSG%3A900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=EPSG%3A900913%3A{z}&TileCol={x}&TileRow={y}"),L.tileLayer.wms(J,{Format:"image/png",Layers:"angiang:thuadat",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21})),Ie={minZoom:10,maxZoom:16,opacity:1,attribution:'Rendered with <a href="http://www.maptiler.com/">MapTiler Desktop</a>',tms:!1},Be=L.tileLayer("/storage/bandobosungvadieuchinh/{z}/{x}/{y}.png",Ie),Ae=L.tileLayer("/storage/bandophantich/{z}/{x}/{y}.png",Ie),Ce=L.tileLayer("/storage/bandotheoketqua/{z}/{x}/{y}.png",Ie);function Me(e,t,n){1==n?(n=$(this).is(":checked"),t.addLayer(e)):(n=$(this).is(":checked"),t.removeLayer(e))}$("#rungngapman").on("change",(function(){Me(X,n,this.checked)})),$("#bandobosung").on("change",(function(){Me(Be,n,this.checked)})),$("#bandoketqua").on("change",(function(){Me(Ce,n,this.checked)})),$("#bandophantich").on("change",(function(){Me(Ae,n,this.checked)})),$("#2009line").on("change",(function(){Me(ce,n,this.checked)})),$("#diemdosau20019").on("change",(function(){Me(de,n,this.checked)})),$("#satlomohinhthuyluch").on("change",(function(){Me(ue,n,this.checked)})),$("#diemdosau").on("change",(function(){Me(me,n,this.checked)})),$("#satlotruottongthe").on("change",(function(){Me(ge,n,this.checked)})),$("#satloduongbo").on("change",(function(){Me(he,n,this.checked)})),$("#diemanh").on("change",(function(){Me(Q,n,this.checked)})),$("#diemmatcatmoi").on("change",(function(){Me(pe,n,this.checked)})),$("#diemsatlo").on("change",(function(){Me(ye,n,this.checked)})),$("#doansatlo").on("change",(function(){Me(ee,n,this.checked)})),$("#tramdothuyvan").on("change",(function(){Me(fe,n,this.checked)})),$("#dem_2009").on("change",(function(){Me(ve,n,this.checked)})),$("#dem_2019").on("change",(function(){Me(Le,n,this.checked)})),$("#quy_hoach_khai_thac_cat_th").on("change",(function(){Me(Ee,n,this.checked)})),$("#duongbinhdo_dangsau2019").on("change",(function(){Me(xe,n,this.checked)})),$("#duongbinhdo_dangsau2009").on("change",(function(){Me(we,n,this.checked)})),$("#ranh_nguyhiem").on("change",(function(){Me(Se,n,this.checked)})),$("#vanhdai_antoan").on("change",(function(){Me(Te,n,this.checked)})),$("#dieu_chinh_quy_hoach_th").on("change",(function(){Me(be,n,this.checked)})),$("#du_bao_long_dan_2030").on("change",(function(){Me(_e,n,this.checked)})),$("#du_bao_long_dan_2025").on("change",(function(){Me(du_bao_long_dan_2050,n,this.checked)})),$("#thuadat").on("change",(function(){Me(ke,n,this.checked)})),n.addControl(new L.Control.Fullscreen);L.control.ruler({lengthUnit:{factor:1e3,display:"m",decimal:2,label:"Khoảng cách"}}).addTo(n),L.control.locate().addTo(n),n.pm.addControls({position:"topleft",drawCircle:!1});var Fe=L.esri.Geocoding.geosearch().addTo(n),Ge=2009,Pe=document.getElementsByClassName("leaflet-pm-icon-polyline")[0],Re=document.getElementById("btn-mc-2009"),Ne=document.getElementById("btn-mc-2019");Re.addEventListener("click",(function(){Pe.click(),Ge=2009})),Ne.addEventListener("click",(function(){Pe.click(),Ge=2019}));var $e=L.layerGroup().addTo(n);Fe.on("results",(function(e){$e.clearLayers();for(var t=e.results.length-1;t>=0;t--)$e.addLayer(L.marker(e.results[t].latlng))}));n.on("pm:create",(function(e){console.log(e.layer.getLatLngs());var t="",n=q+"api/get-matcat";n=2009==Ge?q+"api/get-matcat/dem2009":q+"api/get-matcat/dem2019";for(var a=new FormData,o=e.layer.getLatLngs(),i=0;i<o.length;i++)i==o.length-1?t+=o[i].lng+" "+o[i].lat:t+=o[i].lng+" "+o[i].lat+",";j=t,a.set("linestring",j),axios({method:"post",url:n,data:a,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){alert("Cập nhật điểm thành công"),console.log(e)})).catch((function(e){console.log(e)}))}))}});