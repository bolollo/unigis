//Definimos la variable map
var map;

function init() {
    //Creamos un nuevo objeto map en el div con el id = map
    map = new OpenLayers.Map('map');
    //Creamos una capa de tipo WMS
    var ol_wms = new OpenLayers.Layer.WMS( "OpenLayers WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
    //Agregamos la capa creada al mapa
    map.addLayer(ol_wms);
    //Hacemos un zoom a la extensión máxima del mapa.
    map.zoomToMaxExtent();
}
