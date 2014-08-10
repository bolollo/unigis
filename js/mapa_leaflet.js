//mapa
var map = L.map('map',{
	center: [41.39742, 2.16328],
	zoom: 13
});

//capas

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

var parques = L.geoJson(parquesjson, {
    onEachFeature: agregarPopup
}).addTo(map);


var estiloCirculosNaranja = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var bibliotecas = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		 return L.circleMarker(latlng, estiloCirculosNaranja);
	}
});

omnivore.kml('datos/bibliotecas.kml', null, bibliotecas).addTo(map);

//controles

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
	"Parques": parques
};

L.control.layers(baseMaps,overlays).addTo(map);

//funciones

function agregarPopup(feature, layer) {
	layer.bindPopup(feature.properties.nombre);
}