// Qgis2threejs Project
project = new Q3D.Project({crs:"EPSG:32648",wgs84Center:{lat:10.6428197771,lon:105.357797774},proj:"+proj=utm +zone=48 +datum=WGS84 +units=m +no_defs",title:"index",baseExtent:[473077.404804,1139606.62456,605190.086299,1213411.12456],rotation:0,zShift:0.0,width:1000.0,zExaggeration:20.0});

// Layer 0
lyr = project.addLayer(new Q3D.DEMLayer({q:1,shading:true,type:"dem",name:"angiang_dem"}));
