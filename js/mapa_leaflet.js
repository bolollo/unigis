var map = L.map('map',{
	center: [41.39742, 2.16328],
	zoom: 13
});

var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);


var paint = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
});

var icc = L.tileLayer.wms("http://geoserveis.icc.cat/icc_mapesbase/wms/service?", {
    layers: 'mtc25m',
    format: 'image/png',
    transparent: true,
    attribution: "Institut Cartogràfic y Geològic de Catalunya"
});


L.control.scale({
	position: 'topright',
	imperial: true
}).addTo(map);


var baseMaps = {
    "Base de OpenStreetMap": osm,
    "Acuarela": paint
};

var overlays = {
	"Topo ICGC": icc,
};

L.control.layers(baseMaps,overlays).addTo(map);