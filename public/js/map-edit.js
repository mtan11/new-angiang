!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=2)}({2:function(e,t,n){e.exports=n("Dbiy")},Dbiy:function(e,t){var n=L.map("map").setView([10.6079209,105.1175397],11),a=document.getElementById("close-btn"),o=document.getElementById("panel"),i=document.getElementById("panel-update"),r=document.getElementById("show-btn"),s=document.getElementById("accept-new-info"),c=document.getElementById("panel-title"),d=document.getElementById("layer-content"),l=document.getElementById("info-content"),m=(document.getElementById("input-name"),document.getElementById("input-name-show")),p=(document.getElementById("input-info"),document.getElementById("input-info-show")),g=document.getElementById("img-slider"),h=document.getElementById("close-update-btn"),u=document.getElementById("container-img"),y=document.getElementById("container-imgmc"),f=document.getElementById("selectKindMarker"),_=document.getElementById("btn-upload-shp-file"),S=document.getElementById("container-info-insert"),v="http://35.198.222.40/",b=0,E=0,k="",x="http://35.198.222.40:8080/geoserver/angiang/wms",w="http://35.198.222.40/storage/uploadedimages/",I=[],T=[],B=L.layerGroup(),F=L.layerGroup();T=L.layerGroup();var P=new L.icon({iconUrl:"/img/icon-camera.png",iconSize:[30,30],iconAnchor:[15,40],popupAnchor:[0,-40]});function G(){o.style.right="10px",c.innerHTML="Các lớp layer",r.classList.add("hidden"),l.classList.add("hidden"),d.classList.remove("hidden")}function C(e,t){t.on("click",(function(t){G();var n=v+"api/get-matcat-by-pointid/"+e.properties.Id,a=e.properties.Id;if(c.innerHTML="Thông tin điểm khảo sát",d.classList.add("hidden"),l.classList.remove("hidden"),g.innerHTML="",m.value=e.properties.Name,console.log(e.properties.Name),p.value=e.properties.Info,console.log(e.properties.Photos),null!=e.properties.Photos)JSON.parse(e.properties.Photos).img;else;for(var o=0;o<photo.length;o++)0==o&&Z(a,!0,"img",photo[o]),Z(a,!1,"img",photo[o]);axios({method:"get",url:n,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){console.log(e.data);console.log([{name:"USA",values:[{date:"2000",price:"100"},{date:"2001",price:"110"},{date:"2002",price:"145"},{date:"2003",price:"241"},{date:"2004",price:"101"},{date:"2005",price:"90"},{date:"2006",price:"10"},{date:"2007",price:"35"},{date:"2008",price:"21"},{date:"2009",price:"201"}]},{name:"Canada",values:[{date:"2000",price:"200"},{date:"2001",price:"120"},{date:"2002",price:"33"},{date:"2003",price:"21"},{date:"2004",price:"51"},{date:"2005",price:"190"},{date:"2006",price:"120"},{date:"2007",price:"85"},{date:"2008",price:"221"},{date:"2009",price:"101"}]},{name:"Maxico",values:[{date:"2000",price:"50"},{date:"2001",price:"10"},{date:"2002",price:"5"},{date:"2003",price:"71"},{date:"2004",price:"20"},{date:"2005",price:"9"},{date:"2006",price:"220"},{date:"2007",price:"235"},{date:"2008",price:"61"},{date:"2009",price:"10"}]}]),createChart(e.data)})).catch((function(e){console.log(e)}))}))}function Z(e,t,n,a){var o=document.createElement("div");o.className=1==t?"carousel-item active":"carousel-item";var i=document.createElement("img");i.className="d-block w-100",i.src=w+e+"/"+n+"/"+a,o.appendChild(i),g.appendChild(o)}f.addEventListener("change",(function(){S.classList.remove("hidden"),"diemks"==f.value?(y.classList.add("hidden"),u.classList.remove("hidden")):(u.classList.add("hidden"),y.classList.remove("hidden"))})),a.addEventListener("click",function(){o.style.right="-450px",r.classList.remove("hidden")}.bind(this)),h.addEventListener("click",function(){i.style.right="-450px"}.bind(this)),r.addEventListener("click",G.bind(this)),s.addEventListener("click",function(){var e=new FormData,t=(document.getElementById("selectKindMarker"),document.getElementById("input-name")),n=document.getElementById("input-info"),a=document.getElementById("input-images"),o=document.getElementById("input-images-mc"),i=E+" "+b,r=v+"api/insert-data-diemks",s=v+"api/insert-data-diemsl";if(null==t.value||null==n.value)alert("Vui lòng điền đầy đủ thông tin");else if(e.set("name",t.value),e.set("info",n.value),e.set("xy",i),"diemks"==f.value){for(var c=0;c<a.files.length;c++)e.append("photos[]",a.files[c]);axios({method:"post",url:r,data:e,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){alert("Cập nhật điểm thành công"),console.log(e)})).catch((function(e){console.log(e)}))}else{for(var d=0;d<o.files.length;d++)e.append("excelmc",o.files[d]);axios({method:"post",url:s,data:e,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){alert("Cập nhật điểm thành công"),console.log(e)})).catch((function(e){console.log(e)}))}}.bind(this)),_.addEventListener("click",function(){var e=v+"api/upload-shapefile",t=new FormData,n=document.getElementById("inputGroupSelectNameShp"),a=document.getElementById("inputShp");t.set("tablename",n.value),t.append("shpFile",a.files[0]),axios({method:"post",url:e,data:t,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){alert("Cập nhật dữ liệu thành công"),console.log(e)})).catch((function(e){alert("Có lỗi xảy ra trong quá trình cập nhật"),console.log(e)}))}.bind(this)),axios({method:"get",url:v+"api/get-all-data"}).then((function(e){var t=e.data.diemanhks,a=e.data.diemsl,o=e.data.doansl;console.log(e.data),I=[];for(var i=[],r=[],s=0;s<o.length;s++)i.push({type:"Feature",geometry:{type:JSON.parse(o[s].st_asgeojson).type,coordinates:JSON.parse(o[s].st_asgeojson).coordinates},properties:{Name:o[s].name,Info:o[s].info,Id:o[s].gid,Photos:o[s].photos}});for(s=0;s<i.length;s++){var c=L.geoJson(i[s],{onEachFeature:C.bind(this)});F.addLayer(c)}for(s=0;s<a.length;s++)r.push({type:"Feature",geometry:{type:JSON.parse(a[s].st_asgeojson).type,coordinates:JSON.parse(a[s].st_asgeojson).coordinates},properties:{Name:a[s].name,Info:a[s].info,Id:a[s].gid,Photos:a[s].photos}});for(s=0;s<r.length;s++){var d=L.geoJson(r[s],{onEachFeature:C.bind(this)});B.addLayer(d)}for(s=0;s<t.length;s++)I.push({type:"Feature",geometry:{type:JSON.parse(t[s].st_asgeojson).type,coordinates:JSON.parse(t[s].st_asgeojson).coordinates},properties:{Name:t[s].name,Info:t[s].info,Id:t[s].gid,Photos:t[s].photos}});for(s=0;s<I.length;s++){var l=L.geoJson(I[s],{pointToLayer:function(e,t){return L.marker(t,{icon:P})},onEachFeature:C.bind(this)});T.addLayer(l)}T.addTo(n),B.addTo(n),F.addTo(n)})),n.on("click",(function(e){G(),i.style.right="10px";new L.marker(e.latlng).addTo(n);b=e.latlng.lat,E=e.latlng.lng})),L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",{maxZoom:18,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',id:"mapbox.streets"}).addTo(n);var V=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:dangsau_2009_line",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),R=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:diemdosau_2019_point",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),N=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:diemdosau_2009_point",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),j=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:satlo_mohinhthuyluc_line",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),O=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:satlo_truottongthe_line",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),M=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:satloduongbo_gis_line",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),J=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:u_diem_mc_moi",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),q=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:u_anh",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),A=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:u_diem_sat_lo",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),D=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:u_doan_sat_lo",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),z=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:u_tram_do_thuy_van",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),Y=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:dem_2009",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),H=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:dem_2019",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),K=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:quy_hoach_khai_thac_cat_th",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),U=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:dieu_chinh_quy_hoach_th",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),X=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:du_bao_long_dan_2030",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),Q=L.tileLayer.wms(x,{Format:"image/png",Layers:"angiang:du_bao_long_dan_2025",Version:"1.1.1",Transparent:!0,SRS:"EPSG:900913",maxZoom:21}),W={minZoom:10,maxZoom:16,opacity:1,attribution:'Rendered with <a href="http://www.maptiler.com/">MapTiler Desktop</a>',tms:!1},ee=L.tileLayer("/storage/bandobosungvadieuchinh/{z}/{x}/{y}.png",W),te=L.tileLayer("/storage/bandophantich/{z}/{x}/{y}.png",W),ne=L.tileLayer("/storage/bandotheoketqua/{z}/{x}/{y}.png",W);function ae(e,t,n){1==n?(n=$(this).is(":checked"),t.addLayer(e)):(n=$(this).is(":checked"),t.removeLayer(e))}$("#rungngapman").on("change",(function(){ae(T,n,this.checked)})),$("#bandobosung").on("change",(function(){ae(ee,n,this.checked)})),$("#bandoketqua").on("change",(function(){ae(ne,n,this.checked)})),$("#bandophantich").on("change",(function(){ae(te,n,this.checked)})),$("#2009line").on("change",(function(){ae(V,n,this.checked)})),$("#diemdosau2019").on("change",(function(){ae(R,n,this.checked)})),$("#satlomohinhthuyluch").on("change",(function(){ae(j,n,this.checked)})),$("#diemdosau").on("change",(function(){ae(N,n,this.checked)})),$("#satlotruottongthe").on("change",(function(){ae(O,n,this.checked)})),$("#satloduongbo").on("change",(function(){ae(M,n,this.checked)})),$("#diemanh").on("change",(function(){ae(q,n,this.checked)})),$("#diemmatcatmoi").on("change",(function(){ae(J,n,this.checked)})),$("#diemsatlo").on("change",(function(){ae(A,n,this.checked)})),$("#doansatlo").on("change",(function(){ae(D,n,this.checked)})),$("#tramdothuyvan").on("change",(function(){ae(z,n,this.checked)})),$("#dem_2009").on("change",(function(){ae(Y,n,this.checked)})),$("#dem_2019").on("change",(function(){ae(H,n,this.checked)})),$("#quy_hoach_khai_thac_cat_th").on("change",(function(){ae(K,n,this.checked)})),$("#dieu_chinh_quy_hoach_th").on("change",(function(){ae(U,n,this.checked)})),$("#du_bao_long_dan_2030").on("change",(function(){ae(X,n,this.checked)})),$("#du_bao_long_dan_2025").on("change",(function(){ae(Q,n,this.checked)})),n.addControl(new L.Control.Fullscreen),L.control.ruler().addTo(n),L.control.locate().addTo(n),n.pm.addControls({position:"topleft",drawCircle:!1});var oe=L.esri.Geocoding.geosearch().addTo(n),ie=L.layerGroup().addTo(n);oe.on("results",(function(e){ie.clearLayers();for(var t=e.results.length-1;t>=0;t--)ie.addLayer(L.marker(e.results[t].latlng))}));n.on("pm:create",(function(e){console.log(e.layer.getLatLngs());for(var t="",n=new FormData,a=e.layer.getLatLngs(),o=0;o<a.length;o++)o==a.length-1?t+=a[o].lng+" "+a[o].lat:t+=a[o].lng+" "+a[o].lat+",";k=t,n.set("linestring",k),axios({method:"post",url:urlKS,data:n,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){alert("Cập nhật điểm thành công"),console.log(e)})).catch((function(e){console.log(e)}))}))}});