var map = L.map('map',{
	center: [41.39742, 2.16328],
	zoom: 13
});

var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);


L.control.scale({
	position: 'topright',
	imperial: true
}).addTo(map);


var baseMaps = {
    "Base de OpenStreetMap": osm
};

L.control.layers(baseMaps).addTo(map);